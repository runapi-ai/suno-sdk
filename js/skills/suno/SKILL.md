---
name: suno
description: Generate and transform music with Suno through RunAPI. Use when the user asks an agent to create, extend, transform music/audio, prepare voice validation phrases, or create reusable custom voices with Suno. Default to the RunAPI CLI for one-off generation; use SDKs only when the user is integrating RunAPI into an app or backend.
documentation: https://runapi.ai/models/suno.md
provider_page: https://runapi.ai/providers/suno.md
catalog: https://runapi.ai/models.md
metadata:
  openclaw:
    homepage: https://runapi.ai/models/suno
    requires:
      bins:
      - runapi
    install:
    - kind: brew
      formula: runapi-ai/tap/runapi
      bins:
      - runapi
    envVars:
    - name: RUNAPI_API_KEY
      required: false
      description: Optional RunAPI API key; agents should prefer environment auth or saved CLI config. Browser login is interactive fallback only.
---

# Suno on RunAPI

Generate and transform music with Suno through RunAPI, including voice validation phrase and custom voice workflows. The default path for one-off agent tasks is the `runapi` CLI; SDKs are for application integration.

## Routing decision

- One-off generation, editing, or transformation for the user → use the **CLI path** with the `runapi` binary.
- Building an app, backend, worker, library, or production codebase → use the **SDK integration path**.

## CLI path

The `runapi` binary is the runtime dependency. Run `runapi auth status` first. For agents and headless runs, prefer `RUNAPI_API_KEY` or import it into saved config with `printf '%s' "$RUNAPI_API_KEY" | runapi auth import-token --token -`. Use `runapi login` only when the user explicitly wants interactive browser auth.

Inspect the available commands and request fields with CLI help:

```shell
runapi suno --help
runapi suno text-to-music --help
runapi suno voice-to-validation-phrase --help
runapi suno regenerate-validation-phrase --help
runapi suno generate-voice --help
runapi suno check-voice --help
```

Run a one-off task (synchronous — polls until the task completes):

```shell
runapi suno text-to-music --input-file request.json
runapi suno voice-to-validation-phrase --input-file voice-phrase.json
runapi suno generate-voice --input-file generate-voice.json
runapi suno check-voice --input-file check-voice.json
```

Submit asynchronously and poll separately:

```shell
runapi suno text-to-music --async --input-file request.json
runapi wait <task-id> --service suno --action text-to-music
```

Available commands: `text-to-music`, `extend-music`, `generate-artwork`, `cover-audio`, `add-instrumental`, `add-vocals`, `separate-audio-stems`, `generate-midi`, `convert-audio`, `visualize-music`, `generate-lyrics`, `get-timestamped-lyrics`, `replace-section`, `create-mashup`, `text-to-sound`, `voice-to-validation-phrase`, `regenerate-validation-phrase`, `generate-voice`, `check-voice`, `generate-persona`, `boost-style`.

For custom voice workflows: generate or regenerate a validation phrase, create a custom voice with `generate-voice`, then use the completed `voice_id` as `persona_id` with `persona_type: "voice"` on supported Suno v5 music generation endpoints. Use `check-voice` to confirm availability before depending on that voice in a generation request.

## SDK integration path

When integrating Suno into an app, backend, worker, or library — not for one-off tasks — use a RunAPI SDK package:

- JavaScript / TypeScript: `@runapi.ai/suno`
- Ruby: `runapi-suno`
- Go: `github.com/runapi-ai/suno-sdk/go`

## References

- Model overview, pricing, and rate limits: https://runapi.ai/models/suno.md
- Provider comparison: https://runapi.ai/providers/suno.md
- Full model catalog: https://runapi.ai/models.md

## Variants

- [v3.5](https://runapi.ai/models/suno/v3.5.md)
- [v4](https://runapi.ai/models/suno/v4.md)
- [v4.5](https://runapi.ai/models/suno/v4.5.md)
- [v4.5 all](https://runapi.ai/models/suno/v4.5-all.md)
- [v4.5 plus](https://runapi.ai/models/suno/v4.5-plus.md)
- [v5](https://runapi.ai/models/suno/v5.md)
- [v5.5](https://runapi.ai/models/suno/v5.5.md)
