# Suno API Go SDK for RunAPI

The Suno Go SDK is the language-specific package for Suno on RunAPI. Use this package for song generation, lyrics, vocals, extension, and audio transformation workflows when your application needs request bodies, task status lookup, and consistent RunAPI errors in Go.

This README is the Go package guide inside the public `suno-sdk` repository. For the repository overview, start at `../README.md`; for model details, use https://runapi.ai/models/suno; for API reference, use https://runapi.ai/docs#suno; for SDK docs, use https://runapi.ai/docs#sdk-suno.

## Install

```bash
go get github.com/runapi-ai/suno-sdk/go@latest
```

## Quick start

```go
import (
  "context"

  "github.com/runapi-ai/suno-sdk/go/suno"
)

client, err := suno.NewClient()
task, err := client.TextToMusic.Create(context.Background(), suno.TextToMusicParams{
  // Pass the Suno JSON request body from https://runapi.ai/docs#suno.
})
status, err := client.TextToMusic.Get(context.Background(), task.ID)
```

Use `create` when you want to submit a task and return quickly, `get` when you need the latest task state, and `run` when a script should create and poll until completion. In web request handlers, prefer `create` plus webhook or later `get` polling so a worker is not held open.

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## Language notes

Use the public Go module with `github.com/runapi-ai/core-sdk/go` options when building music services, CLIs, or workers. The available resources are `TextToMusic`, `ExtendMusic`, `GenerateArtwork`, `CoverAudio`, `AddInstrumental`, `AddVocals`, `SeparateAudioStems`, `GenerateMidi`, `ConvertAudio`, `VisualizeMusic`, `GenerateLyrics`, `GetTimestampedLyrics`, `ReplaceSection`, `CreateMashup`, `TextToSound`, `GeneratePersona`, `BoostStyle`, `VoiceToValidationPhrase`, `RegenerateValidationPhrase`, `GenerateVoice`, and `CheckVoice`. Keep `RUNAPI_API_KEY` in the environment or your secret manager; never commit API keys or callback secrets.

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
