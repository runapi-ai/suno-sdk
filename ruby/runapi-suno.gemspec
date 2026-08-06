# frozen_string_literal: true

Dir.chdir(__dir__) do

  Gem::Specification.new do |spec|
    spec.name = "runapi-suno"
    spec.version = "0.3.3"
    spec.metadata["runapi_slug"] = "suno"
    spec.authors = ["RunAPI"]
    spec.email = ["contact@runapi.ai"]

    spec.summary = "Suno API Ruby SDK for RunAPI"
    spec.description = "The Suno Ruby SDK is the language-specific package for Suno on RunAPI. Use this package for song generation, lyrics, vocals, extension, and audio transformation workflows when your application needs request bodies, task status lookup, and consistent RunAPI errors in Ruby."
    spec.homepage = "https://runapi.ai/models/suno"
    spec.license = "Apache-2.0"
    spec.required_ruby_version = ">= 3.1.0"
    spec.metadata["homepage_uri"] = "https://runapi.ai/models/suno"
    spec.metadata["documentation_uri"] = "https://github.com/runapi-ai/suno-sdk/blob/main/ruby/README.md"
    spec.metadata["source_code_uri"] = "https://github.com/runapi-ai/suno-sdk"
    spec.metadata["bug_tracker_uri"] = "https://github.com/runapi-ai/suno-sdk/issues"
    spec.metadata["changelog_uri"] = "https://github.com/runapi-ai/suno-sdk/blob/main/CHANGELOG.md"


    spec.files = Dir.glob("lib/**/*") + %w[LICENSE README.md]
    spec.extra_rdoc_files = ["README.md"]
        spec.require_paths = ["lib"]

    spec.add_dependency "runapi-core", "~> 0.3.2"
  end
end
