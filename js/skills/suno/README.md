<p align="center">
  <a href="https://github.com/runapi-ai/suno">
    <h3 align="center">Suno AI API Skill for RunAPI</h3>
  </a>
</p>

<p align="center">
  Install this agent skill, inspect Suno fields, then run jobs through the RunAPI CLI.
</p>

<p align="center">
  <a href="https://runapi.ai/models/suno"><strong>Model Reference</strong></a> · <a href="https://github.com/runapi-ai/cli"><strong>CLI</strong></a> · <a href="https://github.com/runapi-ai/suno-sdk"><strong>SDK</strong></a>
</p>

<div align="center">

[![skills.sh](https://www.skills.sh/b/runapi-ai/suno)](https://www.skills.sh/runapi-ai/suno/suno)
[![ClawHub](https://img.shields.io/badge/ClawHub-runapi--suno-111827)](https://clawhub.ai/runapi-ai/runapi-suno)
[![License](https://img.shields.io/github/license/runapi-ai/suno)](https://github.com/runapi-ai/suno/blob/main/LICENSE)

</div>
<br/>

Generate music, lyrics, stems, covers, and music videos with the Suno SDK. This skill helps Claude Code, Codex, Gemini CLI, Cursor, and 50+ agents integrate Suno through RunAPI.

The canonical agent file is `skills/suno/SKILL.md`.

## Install

```bash
npx skills add runapi-ai/suno -g
```

Or paste this prompt to your AI agent:

```text
Install the suno skill for me:

1. Clone https://github.com/runapi-ai/suno
2. Copy the skills/suno/ directory into your
   user-level skills directory (e.g. ~/.claude/skills/
   for Claude Code, ~/.codex/skills/ for Codex).
3. Verify that SKILL.md is present.
4. Confirm the install path when done.
```

## Quick example

```typescript
import { SunoClient } from '@runapi.ai/suno';

const client = new SunoClient();
const result = await client.textToMusic.run({
  custom_mode: false,
  instrumental: false,
  prompt: 'A chill lo-fi beat with soft vocals',
  model: 'suno-v5',
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
