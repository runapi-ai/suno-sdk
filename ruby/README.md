# Suno API Ruby SDK for RunAPI

The Suno Ruby SDK is the language-specific package for Suno on RunAPI. Use this package for song generation, lyrics, vocals, extension, and audio transformation workflows when your application needs request bodies, task status lookup, and consistent RunAPI errors in Ruby.

This README is the Ruby package guide inside the public `suno-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/suno; for API reference, use https://runapi.ai/docs/api/suno/text-to-music; for SDK docs, use https://runapi.ai/docs/resources/sdks.

## Install

```bash
gem install runapi-suno
```

## Quick start

```ruby
require "runapi/suno"

client = RunApi::Suno::Client.new
task = client.text_to_music.create(
  # Pass the Suno JSON request body from https://runapi.ai/docs/api/suno/text-to-music.
)
status = client.text_to_music.get(task.id)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Use Ruby keyword arguments and the `RunApi::Suno` error classes when building music jobs, Rails workers, or scripts. The available resources are `text_to_music`, `extend_music`, `generate_artwork`, `cover_audio`, `add_instrumental`, `add_vocals`, `separate_audio_stems`, `generate_midi`, `convert_audio`, `visualize_music`, `generate_lyrics`, `blend_lyrics`, `get_timestamped_lyrics`, `replace_section`, `create_mashup`, `text_to_sound`, `voice_to_validation_phrase`, `regenerate_validation_phrase`, `generate_voice`, `check_voice`, `generate_persona`, and `boost_style`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/suno
- SDK docs: https://runapi.ai/docs/resources/sdks
- Product docs: https://runapi.ai/docs/api/suno/text-to-music
- Pricing and rate limits: https://runapi.ai/models/suno/v4
- Provider comparison: https://runapi.ai/providers/suno
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/suno-sdk

## License

Licensed under the Apache License, Version 2.0.
