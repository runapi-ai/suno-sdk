# Changelog

## [js/v0.3.3](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.3.3), [ruby/v0.3.3](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.3.3), [go/v0.3.3](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.3.3), [python/v0.3.2](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.3.2), [java/v0.2.2](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.2.2) - 2026-08-06

### Added
- Add typed clients for stitching audio, remastering audio, and adding samples from a selected time range.


## [js/v0.3.2](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.3.2), [ruby/v0.3.2](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.3.2), [go/v0.3.2](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.3.2), [python/v0.3.1](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.3.1), [java/v0.2.1](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.2.1) - 2026-07-28

### Fixed
- Validate required utility and audio request fields before sending requests.


## [go/v0.3.1](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.3.1) - 2026-07-28

### Added
- Expose persisted billing facts on task responses.

## [js/v0.3.1](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.3.1), [ruby/v0.3.1](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.3.1) - 2026-07-28

### Added
- Type task billing facts on task-backed responses.


## [python/v0.3.0](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.3.0) - 2026-07-24

### Added
- Expose shared Files, Account, and Pricing resources plus typed Task Billing Facts through the Provider Client.


## [js/v0.3.0](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.3.0), [ruby/v0.3.0](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.3.0), [go/v0.3.0](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.3.0), [python/v0.2.0](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.2.0), [java/v0.2.0](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.2.0) - 2026-07-21

### Added
- Add lyrics generation queries and lyric blending with typed request and response models.


## [js/v0.2.10](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.10), [ruby/v0.2.10](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.10), [go/v0.2.10](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.10), [python/v0.1.3](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.1.3) - 2026-07-20

### Changed
- Validate that Suno mashup requests contain exactly 2 upload URLs.


## [js/v0.2.9](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.9), [ruby/v0.2.9](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.9), [go/v0.2.9](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.9), [python/v0.1.2](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.1.2), [java/v0.1.3](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.1.3) - 2026-07-20

### Added
- Add advanced stem separation parameters, validation, and typed completed response models.


## [js/v0.2.8](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.8), [ruby/v0.2.8](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.8), [go/v0.2.8](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.8), [python/v0.1.1](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.1.1), [java/v0.1.2](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.1.2) - 2026-07-08

### Changed
- Refresh Suno replace-section input validation for current RunAPI inputs.

## [java/v0.1.1](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.1.1) - 2026-06-25

### Fixed
- Fixed Java retry handling for Retry-After response headers.
- Fixed Java contract validation for action-level conditional rules.
- Refreshed Java SDK metadata for v0.1.1.

## [java/v0.1.0](https://github.com/runapi-ai/suno-sdk/releases/tag/java%2Fv0.1.0) - 2026-06-24

### Added
- Publish `ai.runapi:runapi-suno` for Java SDK consumers.
- Include typed Java builders, synchronous client resources, sources, and Javadocs.

## [js/v0.2.7](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.7), [ruby/v0.2.7](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.7), [go/v0.2.7](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.7), [python/v0.1.0](https://github.com/runapi-ai/suno-sdk/releases/tag/python%2Fv0.1.0) - 2026-06-18

### Changed
- Per-method documentation for all resource methods

## [js/v0.2.6](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.6), [ruby/v0.2.6](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.6), [go/v0.2.6](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.6) - 2026-06-01

### Changed
- Align SDK with upstream Input Contract and public API vocabulary changes
- Update endpoint definitions and field constraints

## [js/v0.2.4](https://github.com/runapi-ai/suno-sdk/releases/tag/js%2Fv0.2.4), [ruby/v0.2.4](https://github.com/runapi-ai/suno-sdk/releases/tag/ruby%2Fv0.2.4), [go/v0.2.4](https://github.com/runapi-ai/suno-sdk/releases/tag/go%2Fv0.2.4) - 2026-05-22

### Changed
- Publish JavaScript, Ruby, and Go SDK artifacts for suno with per-language GitHub release tags.
- Refresh public README metadata.

## [v0.2.1](https://github.com/runapi-ai/suno-sdk/releases/tag/v0.2.1) - 2026-05-19

Initial release.
