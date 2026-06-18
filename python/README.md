# Suno AI API Python SDK for RunAPI

The suno ai api Python SDK is the language-specific package for Suno on RunAPI. Use this suno ai api package for song generation, lyrics, vocal, extension, and audio transformation flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in Python.

This suno ai api README is the Python package guide inside the public `suno-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/suno; for API reference, use https://runapi.ai/docs#suno; for SDK docs, use https://runapi.ai/docs#sdk-suno.

## Install

```bash
pip install runapi-suno
```

## Quick start

```python
from runapi.suno import SunoClient

client = SunoClient()  # reads RUNAPI_API_KEY, or pass api_key="sk-..."

# Generate music and poll until completion.
result = client.text_to_music.run(
    model="suno-v4.5-plus",
    vocal_mode="auto_lyrics",
    prompt="A chill lo-fi beat with soft vocals",
)
print(result.audios[0].audio_url)

# Generate lyrics from a prompt.
lyrics = client.generate_lyrics.run(prompt="a song about the ocean at night")
print(lyrics.lyrics[0].text)
```

Use `create` to submit a task and return quickly, `get` to fetch the latest task state, and `run` when a script should create and poll until completion:

```python
task = client.text_to_music.create(
    model="suno-v4.5-plus",
    vocal_mode="instrumental",
    style="ambient piano",
    title="Quiet Morning",
)
status = client.text_to_music.get(task.id)
```

In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Pass parameters as keyword arguments and catch the `runapi.suno` error classes when building music jobs or scripts. The available resources are `text_to_music`, `extend_music`, `cover_audio`, `add_instrumental`, `add_vocals`, `replace_section`, `create_mashup`, `text_to_sound`, `generate_lyrics`, `get_timestamped_lyrics`, `separate_audio_stems`, `generate_midi`, `convert_audio`, `visualize_music`, `generate_artwork`, `voice_to_validation_phrase`, `regenerate_validation_phrase`, `generate_voice`, `check_voice`, `generate_persona`, and `boost_style`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/suno
- SDK docs: https://runapi.ai/docs#sdk-suno
- Product docs: https://runapi.ai/docs#suno
- Pricing and rate limits: https://runapi.ai/models/suno/v4
- Provider comparison: https://runapi.ai/providers/suno
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/suno-sdk

## License

Licensed under the Apache License, Version 2.0.
