# Suno AI API Ruby SDK for RunAPI

The suno ai api Ruby SDK is the language-specific package for Suno on RunAPI. Use this suno ai api package for song generation, lyrics, vocal, extension, and audio transformation flows when your application needs JSON request bodies, task status lookup, and consistent RunAPI errors in Ruby.

This suno ai api README is the Ruby package guide inside the public `suno-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/suno; for API reference, use https://runapi.ai/docs#suno; for SDK docs, use https://runapi.ai/docs#sdk-suno.

## Install

```bash
gem install runapi-suno
```

## Quick start

```ruby
require "runapi-suno"

client = RunApi::Suno::Client.new
task = client.generations.create(
  # Pass the Suno JSON request body from https://runapi.ai/docs#suno.
)
status = client.generations.get(task.id)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

## Language notes

Use Ruby keyword arguments and the `RunApi::Suno` error classes when building music jobs, Rails workers, or scripts. The available resources include generations, extensions, upload and extensions, covers, upload and covers, instrumentals, vocals, vocal removals, midi, wav conversions, music videos, lyrics, timestamped lyrics, section replacements, mashups, sounds, personas, and styles. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

## Links

- Model page: https://runapi.ai/models/suno
- SDK docs: https://runapi.ai/docs#sdk-suno
- Product docs: https://runapi.ai/docs#suno
- Pricing and rate limits: https://runapi.ai/models/suno/v3.5
- Provider comparison: https://runapi.ai/providers/suno
- Full catalog: https://runapi.ai/models
- Repository: https://github.com/runapi-ai/suno-sdk

## License

Licensed under the Apache License, Version 2.0.
