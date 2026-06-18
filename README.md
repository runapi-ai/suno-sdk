<p align="center">
  <a href="https://runapi.ai"><img src="https://runapi.ai/icon.svg" height="56" alt="RunAPI"></a>
</p>

<h3 align="center">
  <a href="https://github.com/runapi-ai/suno-sdk">Suno API SDK for RunAPI</a>
</h3>

<p align="center">
  Suno API SDKs for JavaScript, Ruby, and Go on RunAPI, including music generation, voice validation phrase, and custom voice workflows.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/@runapi.ai/suno)](https://www.npmjs.com/package/@runapi.ai/suno)
[![RubyGems](https://img.shields.io/gem/v/runapi-suno)](https://rubygems.org/gems/runapi-suno)
[![Go Reference](https://pkg.go.dev/badge/github.com/runapi-ai/suno-sdk/go.svg)](https://pkg.go.dev/github.com/runapi-ai/suno-sdk/go)
[![License](https://img.shields.io/github/license/runapi-ai/suno-sdk)](https://github.com/runapi-ai/suno-sdk/blob/main/LICENSE)

</div>
<br/>

The suno ai api SDK packages JavaScript, Ruby, and Go clients for Suno music generation on RunAPI. Use this suno ai api SDK for text-to-music, cover audio, music extension, stem separation, voice validation phrase, custom voice, and related audio workflows.

## Installation

```bash
npm install @runapi.ai/suno
# or
pnpm add @runapi.ai/suno
# or
yarn add @runapi.ai/suno
```

## Quick Start

```typescript
import { SunoClient } from '@runapi.ai/suno';

const client = new SunoClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://runapi.ai', // optional
});

const result = await client.textToMusic.run({
  prompt: 'A chill lo-fi beat with soft vocals',
  model: 'suno-v4.5-plus',
});

console.log('Music URL:', result.audios?.[0]?.audio_url);
```

## Features

- **Music Generation**: Create music from text prompts with multiple models
- **Cover Audio**: Transform uploaded audio into new styles
- **Extend Music**: Extend generated music with additional content
- **Upload and Extend Music**: Extend uploaded audio files
- **AddInstrumental**: Add instrumental backing to vocal tracks
- **Separate Audio Stems**: Separate vocals from instrumentals
- **MIDI Export**: Extract MIDI data from audio
- **Convert Audio**: Convert generated music to WAV format
- **Visualize Music**: Generate videos for your music
- **Generate Lyrics**: Generate and retrieve timestamped lyrics
- **Replace Section**: Replace specific sections of music
- **Voice Validation Phrase**: Generate and regenerate phrases for voice verification flows
- **Custom Voice Generation**: Create reusable custom voices, check availability, and use `voice_id` as `persona_id` with `persona_type: 'voice'`
- **Generate Persona & Boost Style**: Manage custom voice personas and music styles
- **Full TypeScript Support**: Complete type definitions for all API endpoints
- **Automatic Polling**: Built-in polling for async music generation
- **Error Handling**: Comprehensive error types from @runapi.ai/core

## API Reference

### Client Initialization

```typescript
const client = new SunoClient({
  apiKey: string;      // Required: Your RunAPI.ai API key
  baseUrl?: string;    // Optional: API base URL (defaults to production)
});
```

### Music Generation

#### Prompt Brief

```typescript
const result = await client.textToMusic.run({
  vocal_mode: 'auto_lyrics',
  prompt: 'A relaxing piano melody with soft ambient sounds',
  model: 'suno-v4.5-plus', // or 'suno-v5', 'suno-v4.5-all', 'suno-v4.5', 'suno-v4'
});
```

#### Exact Lyrics

```typescript
const result = await client.textToMusic.run({
  vocal_mode: 'exact_lyrics',
  lyrics: '[Verse]\nSoft piano melodies flowing gently',
  style: 'Classical, Ambient',
  title: 'Peaceful Piano Meditation',
  model: 'suno-v5',
  persona_id: 'persona_123', // optional
  persona_type: 'voice', // optional, suno-v5 only
});
```

#### Manual Control (Create + Poll)

```typescript
const task = await client.textToMusic.create({
  vocal_mode: 'instrumental',
  style: 'Electronic, Dance',
  title: 'Neon Pulse',
  model: 'suno-v4.5-plus',
});

const status = await client.textToMusic.get(task.id);
console.log('Status:', status.status);
```

### Cover Audio

Transform uploaded audio into new styles:

```typescript
const result = await client.coverAudio.run({
  upload_url: 'https://cdn.runapi.ai/public/samples/voice.mp3',
  prompt: 'Transform into a jazz version',
  model: 'suno-v4.5-plus',
});
```

### Generate Artwork

Generate cover images for existing generations:

```typescript
const result = await client.generateArtwork.run({
  task_id: 'original-task-id',
});
```

### Music Extension

Extend existing Suno generations:

```typescript
const original = await client.textToMusic.run({
  prompt: 'A short intro melody',
  model: 'suno-v4.5-plus',
});

const extended = await client.extendMusic.run({
  audio_id: original.audios?.[0]?.id,
  parameter_mode: "source",
  model: 'suno-v4.5-plus',
  prompt: 'Continue with an uplifting chorus',
});
```

### Upload and Extend Music

Extend uploaded audio files:

```typescript
const result = await client.extendMusic.run({
  upload_url: 'https://cdn.runapi.ai/public/samples/voice.mp3',
  parameter_mode: "source",
  model: 'suno-v4.5-plus',
  prompt: 'Continue with an uplifting chorus',
});
```

### Add Instrumental

```typescript
const result = await client.addInstrumental.run({
  upload_url: 'https://cdn.runapi.ai/public/samples/voice.mp3',
  title: 'My Song',
  tags: 'Pop, Energetic, Upbeat',
  negative_tags: 'Heavy Metal, Aggressive',
  model: 'suno-v4.5-plus',
});
```

### Add Vocals

Add AI-generated vocals to instrumental audio (suno-v4.5-plus/suno-v5 only):

```typescript
const result = await client.addVocals.run({
  upload_url: 'https://cdn.runapi.ai/public/samples/voice.mp3',
  lyrics: '[Verse]\nSoft romantic lyrics about summer love',
  title: 'Summer Love',
  style: 'Pop, Romantic',
  negative_tags: 'Screaming, Heavy Metal',
  model: 'suno-v4.5-plus',
});
```

### Separate Audio Stems

```typescript
const generation = await client.textToMusic.run({
  prompt: 'A song with vocals',
  model: 'suno-v4.5-plus',
});

const separation = await client.separateAudioStems.run({
  task_id: generation.id,
  audio_id: generation.audios?.[0]?.id,
});

console.log('Instrumental:', separation.separated_audios?.instrumental_url);
console.log('AddVocals:', separation.separated_audios?.vocal_url);
```

### MIDI Export

```typescript
// Requires a completed vocal-removal task with type: 'split_stem'
const midi = await client.generateMidi.run({
  task_id: 'split-stem-vocal-removal-task-id',
});

console.log('Detected instruments:', generateMidi.instruments?.map(i => i.name).join(', '));
```

### Convert Audio

```typescript
const wav = await client.convertAudio.run({
  task_id: 'generation-task-id',
  audio_id: 'audio-id',
});

console.log('WAV URL:', wav.wav_url);
```

### Visualize Music

```typescript
const video = await client.visualizeMusic.run({
  task_id: 'music-generation-id',
  audio_id: 'audio-id',
  prompt: 'A serene landscape with flowing water and mountains',
});

console.log('Video URL:', video.video_url);
```

### Generate Lyrics

```typescript
// Generate lyrics
const lyrics = await client.generateLyrics.run({
  prompt: 'A love song about summer nights',
});

console.log('Lyrics:', lyrics.lyrics);

// Get timestamped lyrics
const timestamped = await client.getTimestampedLyrics.run({
  task_id: 'generation-task-id',
  audio_id: 'audio-id',
});

timestamped.aligned_words?.forEach(word => {
  console.log(`[${word.start_time}s - ${word.end_time}s] ${word.word}`);
});
```

### Replace Section

```typescript
const result = await client.replaceSection.run({
  task_id: 'original-task-id',
  audio_id: 'audio-id',
  lyrics: '[Verse]\nA powerful guitar solo',
  tags: 'Rock, Energetic',
  title: 'Epic Guitar Solo',
  infill_start_time: 30.0,
  infill_end_time: 45.0,
});

console.log('Replaced track:', result.track?.audio_url);
```

### Voice Validation Phrase

Generate a phrase the user can read for a later voice verification step:

```typescript
const phrase = await client.voiceToValidationPhrase.run({
  voice_url: 'https://file.runapi.ai/source-vocal.mp3',
  vocal_start_seconds: 2,
  vocal_end_seconds: 12,
  language: 'en',
});

console.log('Validation phrase:', phrase.validation_phrase);
```

Regenerate the phrase from a prior validation phrase task:

```typescript
const replacement = await client.regenerateValidationPhrase.run({
  task_id: phrase.id,
});

console.log('Replacement phrase:', replacement.validation_phrase);
```

Create a reusable custom voice after the user records the validation phrase:

```typescript
const customVoice = await client.generateVoice.run({
  task_id: phrase.id,
  verify_url: 'https://file.runapi.ai/verify-read.mp3',
  voice_name: 'Warm Test Voice',
  description: 'Warm vocal identity',
  style: 'Pop, Female Vocal',
  singer_skill_level: 'advanced',
});

const availability = await client.checkVoice.run({
  task_id: customVoice.id,
});

console.log('Voice available:', availability.is_available);
console.log('Use as voice persona_id:', customVoice.voice_id);
```

Use a completed `voice_id` as `persona_id` with `persona_type: 'voice'` on supported Suno v5 music generation endpoints.

### Generate Persona & Boost Style

```typescript
// First generate some music with vocals
const generation = await client.textToMusic.run({
  prompt: 'A song with distinctive vocals',
  model: 'suno-v4.5-plus',
});

// Generate a persona from the audio's voice
const { persona } = await client.generatePersona.run({
  task_id: generation.id,
  audio_id: generation.audios?.[0]?.id,
  name: 'Warm Male Voice',
  description: 'A warm, friendly male voice',
});

console.log('Persona ID:', persona.id);

// Generate a style description from a prompt
const { style } = await client.boostStyle.run({
  name: 'Cinematic Epic',
  description: 'Epic orchestral music with powerful crescendos',
});

console.log('Generated Style:', style);
```

## Models

| Model | Description | Use Case |
|-------|-------------|----------|
| `suno-v5` | Latest model | Highest quality, latest features |
| `suno-v4.5-plus` | Enhanced suno-v4.5 | Great quality, cost-efficient |
| `suno-v4.5-all` | suno-v4.5 with all features | Smarter prompts, audio upload max 1 min |
| `suno-v4.5` | Mid-tier quality | Balanced quality and speed |
| `suno-v4` | Stable model | Stable, proven quality |

## Request Shapes

Choose `vocal_mode` for music, cover, and mashup requests.

### Automatic Lyrics

Use `auto_lyrics` when `prompt` is a brief and lyrics should be generated automatically. Keep prompt briefs under 500 characters.

### Exact Lyrics

Use `exact_lyrics` when `lyrics` is the text to sing.

### Instrumental

Use `instrumental` for tracks without vocals.

### Character Limits

**Text Limits**:
- `prompt`: 500 characters
- `lyrics` with suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5: 5000 characters
- `lyrics` with suno-v4: 3000 characters

**Style Limits**:
- suno-v4: 200 characters
- suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5: 1000 characters

**Title Limits**:
- suno-v4: 80 characters
- suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5: 100 characters

## Error Handling

```typescript
import {
  SunoClient,
  AuthenticationError,
  InsufficientCreditsError,
  ValidationError,
  TaskFailedError,
} from '@runapi.ai/suno';

try {
  const result = await client.textToMusic.run({
    prompt: 'A beautiful melody',
    model: 'suno-v4.5-plus',
  });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof InsufficientCreditsError) {
    console.error('Not enough credits');
  } else if (error instanceof ValidationError) {
    console.error('Invalid parameters');
  } else if (error instanceof TaskFailedError) {
    console.error('Music generation failed');
  }
}
```

## Advanced Usage

### Callbacks

```typescript
const result = await client.textToMusic.create({
  prompt: 'Test music',
  model: 'suno-v4.5-plus',
  callback_url: 'https://your-domain.com/webhook',
});
```

Webhook payload on completion:
```typescript
{
  id: string;
  status: 'completed' | 'failed';
  generation_stage: 'text_generated' | 'first_audio_ready' | 'all_audios_ready' | 'failed';
  audios?: Audio[];
  error?: string;
}
```

### Generation Stages

The webhook will be called at multiple stages:
1. **text_generated**: Text content ready (title, lyrics, etc.)
2. **first_audio_ready**: First audio completed
3. **all_audios_ready**: All audios completed
4. **failed**: Generation failed

### Fine-Tuning Parameters

```typescript
const result = await client.textToMusic.run({
  prompt: 'Energetic rock music',
  model: 'suno-v5',
  vocal_gender: 'male',        // Male vocals
  style_weight: 0.75,          // 0-1, higher = more style adherence
  weirdness_constraint: 0.50,  // 0-1, higher = more creative/experimental
  audio_weight: 0.65,          // 0-1, audio consistency weight
});
```

For full suno ai api documentation including all parameters and response formats, visit https://runapi.ai/docs#suno.

## Generated file storage

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## License

MIT

## Support

For issues and questions, please visit [https://github.com/runapi-ai/runapi.ai](https://github.com/runapi-ai/runapi.ai)
