<p align="center">
  <a href="https://runapi.ai"><img src="https://runapi.ai/icon.svg" height="56" alt="RunAPI"></a>
</p>

<h3 align="center">
  <a href="https://github.com/runapi-ai/suno-sdk">Suno API SDK for RunAPI</a>
</h3>

<p align="center">
  Suno API SDKs for JavaScript, Python, Ruby, Go, and Java on RunAPI, covering text-to-music, cover audio, music extension, stem separation, voice validation phrase, custom voice, and related audio workflows.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/@runapi.ai/suno)](https://www.npmjs.com/package/@runapi.ai/suno)
[![PyPI](https://img.shields.io/pypi/v/runapi-suno)](https://pypi.org/project/runapi-suno/)
[![RubyGems](https://img.shields.io/gem/v/runapi-suno)](https://rubygems.org/gems/runapi-suno)
[![Go Reference](https://pkg.go.dev/badge/github.com/runapi-ai/suno-sdk/go.svg)](https://pkg.go.dev/github.com/runapi-ai/suno-sdk/go)
[![Maven Central](https://img.shields.io/maven-central/v/ai.runapi/runapi-suno)](https://central.sonatype.com/artifact/ai.runapi/runapi-suno)
[![License](https://img.shields.io/github/license/runapi-ai/suno-sdk)](https://github.com/runapi-ai/suno-sdk/blob/main/LICENSE)

</div>
<br/>

The Suno API SDK packages JavaScript, Python, Ruby, Go, and Java clients for Suno on RunAPI. Use it for text-to-music, cover audio, music extension, stem separation, voice validation phrase, custom voice, and related audio workflows when your app needs typed request builders, predictable task polling, file upload helpers, account helpers, and consistent RunAPI errors.

Suno is listed in the RunAPI model catalog at https://runapi.ai/models/suno. Variant pages below carry pricing, rate-limit, and commercial-usage details. The public `suno-sdk` repository groups the language packages, examples, CI, and release tags for this model.

## Install

```bash
npm install @runapi.ai/suno
pip install runapi-suno
gem install runapi-suno
go get github.com/runapi-ai/suno-sdk/go@latest
```

Gradle:

```kotlin
dependencies {
  implementation("ai.runapi:runapi-suno:0.1.0")
}
```

Maven:

```xml
<dependency>
  <groupId>ai.runapi</groupId>
  <artifactId>runapi-suno</artifactId>
  <version>0.1.0</version>
</dependency>
```

Use the Java BOM when installing multiple RunAPI Java modules:

```kotlin
dependencies {
  implementation(platform("ai.runapi:runapi-bom:0.1.0"))
  implementation("ai.runapi:runapi-suno")
}
```

## What you can build

- Build apps, agent workflows, batch jobs, and production services around Suno requests.
- Install only the language package your app needs while keeping one model-specific repository for docs and releases.
- Use `create` for submit-only jobs, `get` for status lookup, and `run` for submit-and-poll scripts.
- Upload local files, URL files, or base64 files through shared RunAPI file helpers.
- Handle validation, authentication, rate limits, insufficient credits, task failures, and polling timeouts through RunAPI SDK errors.

## Java quick start

```java
import ai.runapi.suno.SunoClient;
import ai.runapi.suno.types.TextToMusicParams;
import ai.runapi.suno.types.CompletedTextToMusicResponse;
import ai.runapi.suno.types.TextToMusicModel;

SunoClient client = SunoClient.builder()
    .apiKey(System.getenv("RUNAPI_API_KEY"))
    .build();

CompletedTextToMusicResponse result = client.textToMusic().run(
    TextToMusicParams.builder()
        .model(TextToMusicModel.SUNO_V5)
        .vocalMode("auto_lyrics")
        .prompt("A chill lo-fi beat with soft vocals")
        .durationSeconds(5)
        .build()
);
```

Java packages target Java 8 bytecode and are tested on Java 8, 11, 17, and 21. Each model artifact depends on `ai.runapi:runapi-core`, so application code normally installs only `ai.runapi:runapi-suno`.

## Task lifecycle

Most media endpoints are asynchronous. `create()` submits a task and returns its id, `get(id)` fetches the latest task state, and `run(params)` creates the task and polls until it reaches a terminal state. In web request handlers, prefer `create()` plus webhook or later `get()` polling so the server does not hold a worker open.

## Repository layout

- `js/` publishes `@runapi.ai/suno`.
- `python/` publishes `runapi-suno`.
- `ruby/` publishes `runapi-suno`.
- `go/` publishes `github.com/runapi-ai/suno-sdk/go`.
- `java/` publishes `ai.runapi:runapi-suno` and uses `ai.runapi:runapi-core`.

## Public links

- Model page: https://runapi.ai/models/suno
- SDK docs: https://runapi.ai/docs#sdk-suno
- Product docs: https://runapi.ai/docs#suno
- SDK repository: https://github.com/runapi-ai/suno-sdk
- Skill repository: https://github.com/runapi-ai/suno
- Provider comparison: https://runapi.ai/providers/suno
- Full catalog: https://runapi.ai/models

## Pricing and variants

Use the most specific Suno variant page for pricing, rate limits, and commercial usage:
- [v4](https://runapi.ai/models/suno/v4)
- [v4.5](https://runapi.ai/models/suno/v4.5)
- [v4.5 all](https://runapi.ai/models/suno/v4.5-all)
- [v4.5 plus](https://runapi.ai/models/suno/v4.5-plus)
- [v5](https://runapi.ai/models/suno/v5)
- [v5.5](https://runapi.ai/models/suno/v5.5)

Default pricing link for the Suno SDK: https://runapi.ai/models/suno/v4

## File storage

RunAPI-generated file URLs are temporary. Download and store generated images, videos, audio, or other files in your own durable storage within 7 days; do not treat returned URLs as long-term assets.

## FAQ

### Which package should I install for Suno work?

Install the model package for your language: `@runapi.ai/suno` on npm, `runapi-suno` on PyPI, `runapi-suno` on RubyGems, `github.com/runapi-ai/suno-sdk/go`, or `ai.runapi:runapi-suno`. Install core SDK packages only when you are building shared SDK infrastructure.

### Where should public links point?

Primary Suno links point to https://runapi.ai/models/suno. Pricing and usage-policy links point to variant pages such as https://runapi.ai/models/suno/v4. Provider comparisons point to https://runapi.ai/providers/suno, and broad browsing points to https://runapi.ai/models.

## License

Licensed under the Apache License, Version 2.0.
