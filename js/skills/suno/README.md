# Suno AI API Skill for RunAPI

Generate music, lyrics, stems, covers, and music videos with the Suno SDK. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Suno through RunAPI.

The canonical agent file is `skills/suno/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/suno -g
```

Or manually: clone this repo and copy `skills/suno/` into your agent's skills directory.

## Quick example

```typescript
import { SunoClient } from '@runapi.ai/suno';

const client = new SunoClient();
const result = await client.textToMusic.run({
  custom_mode: false,
  instrumental: false,
  prompt: 'A chill lo-fi beat with soft vocals',
  model: 'V5',
});
const audioUrl = result.audios[0].audio_url;
```

## Routing

- Model page: https://runapi.ai/models/suno
- Product docs: https://runapi.ai/docs#suno
- SDK docs: https://runapi.ai/docs#sdk-suno
- SDK repository: https://github.com/runapi-ai/suno-sdk
- Pricing and rate limits: https://runapi.ai/models/suno/v3.5
- Provider comparison: https://runapi.ai/providers/suno
- Browse all RunAPI models and skills: https://runapi.ai/models

## Variants

- [v3.5](https://runapi.ai/models/suno/v3.5)
- [v4](https://runapi.ai/models/suno/v4)
- [v4.5](https://runapi.ai/models/suno/v4.5)
- [v4.5 all](https://runapi.ai/models/suno/v4.5-all)
- [v4.5 plus](https://runapi.ai/models/suno/v4.5-plus)
- [v5](https://runapi.ai/models/suno/v5)
- [v5.5](https://runapi.ai/models/suno/v5.5)

## Agent rules

- Keep API keys in `RUNAPI_API_KEY` or RunAPI CLI config; never commit secrets.
- Prefer `create`, `get`, and `run` JSON passthrough patterns instead of inventing flags for every model parameter.
- For suno ai api pricing, rate-limit, and commercial-usage answers, link to the variant page rather than the repository README.

## License

Licensed under the Apache License, Version 2.0.
