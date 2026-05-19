---
name: suno
description: Generate music (simple or custom mode, cover, extension, vocals/instrumentals, audio stem separation, stems, MIDI, WAV, music videos, lyrics, personas) through RunAPI.ai using the @runapi.ai/suno Node/TypeScript SDK. Use when the user asks to add AI music generation, mentions Suno, or writes against @runapi.ai/suno. Triggers on "suno", "music generation", "生成音乐", "AI 音乐", "@runapi.ai/suno".
documentation: https://runapi.ai/models/suno
provider_page: https://runapi.ai/providers/suno
catalog: https://runapi.ai/models
---

# @runapi.ai/suno — RunAPI.ai Suno music generation

Build Node / TypeScript integrations that generate music, lyrics, stems, and music videos through RunAPI.ai.

## Setup

Requires **Node 18+** (global `fetch`).

```bash
npm install @runapi.ai/suno
```

Set your API key in the environment:

```dotenv
# .env
RUNAPI_API_KEY=runapi_xxx   # get one at https://runapi.ai/settings/api_keys
```

```ts
import { SunoClient } from '@runapi.ai/suno';

// The SDK reads RUNAPI_API_KEY from the environment automatically.
const client = new SunoClient();
```

Pass `{ apiKey }` explicitly if you manage secrets differently. `baseUrl` defaults to `https://runapi.ai`; override only for local development.

## Core recipe — music generation

Two modes share one endpoint. Use `custom_mode: false` for quick results; `custom_mode: true` when you want control over style, title, and persona.

```ts
// Simple mode — prompt drives everything.
const result = await client.textToMusic.run({
  custom_mode: false,
  instrumental: false,
  prompt: 'A chill lo-fi beat with soft vocals',
  model: 'V5',
});

const audioUrl = result.audios[0].audio_url;
```

```ts
// Custom mode — style, title, and prompt are all required.
await client.textToMusic.run({
  custom_mode: true,
  instrumental: false,
  style: 'Jazz, Bossa Nova',
  title: 'Midnight Blues',
  prompt: 'Soft vocals over a walking bassline...',
  model: 'V5',
});
```

`run()` creates the task, auto-polls, and resolves only when the task completes — `audios[0].audio_url` is guaranteed on the resolved value. On failure it throws `TaskFailedError`; on polling timeout it throws `TaskTimeoutError`. Suno tasks take several minutes, so split `run()` into `create()` + webhook / `get()` for web handlers:

```ts
const { id } = await client.textToMusic.create({ custom_mode: false, instrumental: false, prompt: '...', model: 'V5' });
// return 202 immediately; fetch later:
const status = await client.textToMusic.get(id);
if (status.status === 'completed') { /* ... */ }
```

`run()` polls every 2 s for up to 15 min by default. Tune for long tracks:

```ts
await client.textToMusic.run(params, { maxWaitMs: 30 * 60_000, pollIntervalMs: 5_000 });
```

If `TaskTimeoutError` fires, the task is still running server-side — resume with `textToMusic.get(id)` or finish via webhook.

## Other resources

`SunoClient` exposes these resources; each has the same `create / get / run` shape:

| Resource | Purpose |
|---|---|
| `textToMusic` | Core text-to-music |
| `extendMusic` | Extend an existing generated track |
| `extendMusic` | Extend an uploaded audio file |
| `generateArtwork` | Generate cover images for an existing track |
| `coverAudio` | Restyle an uploaded track |
| `addInstrumental` | Add instrumental backing to a vocal upload (V4_5PLUS / V5) |
| `addVocals` | Add vocals to an instrumental upload (V4_5PLUS / V5) |
| `separateAudioStems` | Split vocals from instrumentals (or up to 12 stems) |
| `generateMidi` | Extract MIDI from a completed `split_stem` audio stem separation |
| `convertAudio` | Convert a generated audio to WAV |
| `visualizeMusic` | Render a music video for a generated audio |
| `generateLyrics` / `getTimestampedLyrics` | Generate lyrics / word-level timing |
| `replaceSection` | Regenerate a time range of an existing track |
| `createMashup` | Blend two uploaded tracks |
| `generatePersona` / `boostStyle` | Create reusable vocal personas / style descriptors |

### Upload-and-cover — restyle an external track

```ts
const restyled = await client.coverAudio.run({
  upload_url: 'https://cdn.example.com/song.mp3',
  custom_mode: false,
  instrumental: false,
  prompt: 'Transform into a jazz cover',
  model: 'V4_5PLUS',
});
```

### Extension — continue a generated track

```ts
const base = await client.textToMusic.run({ custom_mode: false, instrumental: false, prompt: '...', model: 'V5' });
await client.extendMusic.run({
  audio_id: base.audios[0].id,
  default_param_flag: false,
  model: 'V5',
  prompt: 'Continue with an uplifting chorus',
});
```

### Vocal removal — separate stems

```ts
const gen = await client.textToMusic.run({ custom_mode: false, instrumental: false, prompt: '...', model: 'V5' });
const sep = await client.separateAudioStems.run({
  task_id: gen.id,
  audio_id: gen.audios[0].id,
  type: 'split_stem', // or 'separate_vocal' for just vocals + instrumental
});

console.log(sep.separated_audios.vocal_url);
```

## Models

| `model` | Notes |
|---|---|
| `V5` | Latest model; best musical expression. |
| `V4_5PLUS` | Rich sound, max 8 min. |
| `V4_5ALL` | All features, max 8 min (audio upload max 1 min). |
| `V4_5` | Balanced quality and speed. |
| `V4` | Stable, max 4 min. |
| `V3_5` | Legacy. |

Instrumental / vocal endpoints require `V4_5PLUS` or `V5`. Exact credit costs per model are shown at https://runapi.ai/pricing and in the dashboard — do not hardcode prices in application code.

## Callbacks (webhooks)

Pass `callback_url` on `create()` (or any `run()` call) and RunAPI will POST the payload to you:

```ts
await client.textToMusic.create({
  custom_mode: false,
  instrumental: false,
  prompt: '...',
  model: 'V5',
  callback_url: 'https://your.app/webhooks/runapi/suno',
});
```

Suno fires the callback at multiple stages — `generation_stage` tells you which:

```ts
{
  id: string;
  status: 'processing' | 'completed' | 'failed';
  generation_stage: 'text_generated' | 'first_audio_ready' | 'all_audios_ready' | 'failed';
  audios?: Audio[];
  error?: string;
}
```

Treat `all_audios_ready` as the terminal success stage. **Always verify the signature before trusting the body.** RunAPI signs every callback with your account's Callback Secret (rotate at `/accounts/callback_secret`). Headers:

- `X-Callback-Id` — UUID, store to make handler idempotent
- `X-Callback-Timestamp` — unix seconds, reject if `|now - ts| > 300`
- `X-Callback-Signature` — base64 HMAC-SHA256 over `` `${id}.${ts}.${rawBody}` `` using the base64-decoded secret

```ts
import crypto from 'node:crypto';

function verify(raw: string, id: string, ts: string, sig: string, secret: string) {
  const key = Buffer.from(secret, 'base64');
  const mac = crypto.createHmac('sha256', key)
    .update(`${id}.${ts}.${raw}`)
    .digest('base64');
  return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(sig));
}
```

Reply `2xx` within 10s; any non-2xx triggers retries.

## Errors

All errors are re-exported from `@runapi.ai/core`. Always `instanceof` — never string-match messages.

| Error | Status | Action |
|---|---|---|
| `AuthenticationError` | 401 | abort; surface "reconnect your API key" |
| `InsufficientCreditsError` | 402 | prompt user to top up at runapi.ai/billing |
| `ValidationError` | 400 / 422 | fix params; do not retry |
| `RateLimitError` | 429 | sleep `err.retryAfterMs`, then retry |
| `ServiceUnavailableError` | 503 / 455 | retry with backoff; transient service issue |
| `TaskFailedError` | — | show `err.details` to user; do not auto-retry |
| `TaskTimeoutError` | — | re-poll with `<resource>.get(id)` |

```ts
import { InsufficientCreditsError, TaskFailedError } from '@runapi.ai/suno';

try {
  await client.textToMusic.run({ custom_mode: false, instrumental: false, prompt: '...', model: 'V5' });
} catch (err) {
  if (err instanceof InsufficientCreditsError) { /* surface top-up CTA */ }
  else if (err instanceof TaskFailedError)       { /* show err.details */ }
  else throw err;
}
```

## Gotchas

- `model` is required on every call, even endpoints where it looks optional.
- Custom mode requires `style` **and** `title`. Prompt is required unless `instrumental: true`.
- `vocal_gender`, `style_weight`, `weirdness_constraint`, and `audio_weight` only apply when advanced settings are on — custom mode, or `default_param_flag: true` on extendMusic.
- `generateMidi.run()` requires a completed `separateAudioStems` task created with `type: 'split_stem'` — `separate_vocal` does not produce MIDI.
- `replaceSection` replacement duration should not exceed 50% of the total track.
- Callbacks fire multiple times; the `all_audios_ready` stage is the final one. Handle every stage idempotently using `X-Callback-Id`.
- `callback_url` must be reachable from the public internet. `localhost` / `127.0.0.1` URLs will never fire — use a tunnel (cloudflared, ngrok, tailscale funnel) when developing locally.

## Dig deeper

Package README (full API surface, all params): `node_modules/@runapi.ai/suno/README.md`. Types: `@runapi.ai/suno/dist/types.d.ts`. Product docs: https://runapi.ai/docs.
