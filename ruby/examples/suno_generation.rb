#!/usr/bin/env ruby
# frozen_string_literal: true

require "bundler/setup"
require "runapi/suno"

def run_example(title)
  puts "\n=== #{title} ==="
  yield
rescue RunApi::Core::Error => e
  puts "Skipped: #{e.message}"
end

client = RunApi::Suno::Client.new(
  api_key: ENV.fetch("RUNAPI_API_KEY", "runapi_test_token"),
  base_url: ENV.fetch("RUNAPI_BASE_URL", "http://localhost:3000")
)

gen_task_id = nil
gen_audio_id = nil
gen_audio_url = nil

# 1. Simple mode generation
run_example("1. Simple Mode Generation") do
  result = client.text_to_music.run(
    custom_mode: false,
    instrumental: false,
    prompt: "A chill lo-fi beat with warm piano melodies",
    model: "suno-v4.5-plus"
  )
  puts "Status: #{result["status"]}"
  gen_task_id = result["id"]
  gen_audio_id = result.dig("audios", 0, "id")
  gen_audio_url = result.dig("audios", 0, "audio_url")
  result["audios"]&.each_with_index do |audio, i|
    puts "  Audio #{i + 1}: #{audio["audio_url"]}"
  end
end

# 2. Custom mode generation
run_example("2. Custom Mode Generation") do
  result = client.text_to_music.run(
    custom_mode: true,
    instrumental: false,
    style: "Classical, Ambient, Piano",
    title: "Morning Light",
    prompt: "Sunlight filters through the window, a new day begins with hope",
    model: "suno-v5"
  )
  puts "Status: #{result["status"]}"
  result["audios"]&.each_with_index do |audio, i|
    puts "  Audio #{i + 1}: #{audio["audio_url"]}"
  end
end

# 3. Lyrics generation
run_example("3. Lyrics") do
  lyrics_result = client.generate_lyrics.run(prompt: "A song about coding late at night")
  puts "Status: #{lyrics_result["status"]}"
  first_lyric = lyrics_result["lyrics"]&.first
  puts "  Title: #{first_lyric["title"]}" if first_lyric && first_lyric["title"]
  puts "  Lyrics: #{first_lyric["text"].to_s.slice(0, 100)}..." if first_lyric
end

# 4. Extension
run_example("4. Extension") do
  ext_result = client.extend_music.run(
    audio_id: gen_audio_id || raise("No audio_id"),
    default_param_flag: true,
    model: "suno-v4.5-plus",
    prompt: "Continue with a soaring chorus",
    style: "Pop, Uplifting",
    title: "Soaring Chorus",
    continue_at: 30.0
  )
  puts "Status: #{ext_result["status"]}"
end

# 5. Upload and Extension (uses audio from step 1)
run_example("5. Upload and Extension") do
  raise RunApi::Core::Error, "No audio_url from step 1" unless gen_audio_url

  ue_result = client.extend_music.run(
    upload_url: gen_audio_url,
    default_param_flag: false,
    instrumental: false,
    prompt: "Continue with a soaring chorus",
    model: "suno-v4.5-plus",
    continue_at: 30.0
  )
  puts "Status: #{ue_result["status"]}"
end

# 6. Cover
run_example("6. Cover") do
  cover_result = client.generate_artwork.run(task_id: gen_task_id || raise("No task_id"))
  puts "Status: #{cover_result["status"]}"
  cover_result["covers"]&.each_with_index do |cover, i|
    puts "  Cover #{i + 1}: #{cover["url"]}"
  end
end

# 7. Upload and Cover (uses audio from step 1)
run_example("7. Upload and Cover") do
  raise RunApi::Core::Error, "No audio_url from step 1" unless gen_audio_url

  uc_result = client.cover_audio.run(
    upload_url: gen_audio_url,
    custom_mode: false,
    instrumental: false,
    prompt: "A relaxing cover version",
    model: "suno-v4.5-plus"
  )
  puts "Status: #{uc_result["status"]}"
end

# 8. Vocal Removal
run_example("8. Vocal Removal") do
  vr_result = client.separate_audio_stems.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id")
  )
  puts "Status: #{vr_result["status"]}"
  separated = vr_result["separated_audios"]
  if separated
    puts "  Vocal URL: #{separated["vocal_url"]}" if separated["vocal_url"]
    puts "  Instrumental URL: #{separated["instrumental_url"]}" if separated["instrumental_url"]
  end
end

# 9. WAV Conversion
run_example("9. WAV Conversion") do
  wav_result = client.convert_audio.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id")
  )
  puts "Status: #{wav_result["status"]}"
  puts "  WAV URL: #{wav_result["wav_url"]}" if wav_result["wav_url"]
end

# 10. Music Video
run_example("10. Music Video") do
  mv_result = client.visualize_music.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id"),
    prompt: "A dreamy music video with floating clouds"
  )
  puts "Status: #{mv_result["status"]}"
  puts "  Video URL: #{mv_result["video_url"]}" if mv_result["video_url"]
end

# 11. Instrumentals (uses audio from step 1)
run_example("11. Instrumentals") do
  raise RunApi::Core::Error, "No audio_url from step 1" unless gen_audio_url

  inst_result = client.add_instrumental.run(
    upload_url: gen_audio_url,
    title: "Instrumental Mix",
    negative_tags: "vocals, singing",
    tags: "piano, ambient, chill",
    model: "suno-v4.5-plus"
  )
  puts "Status: #{inst_result["status"]}"
end

# 12. Vocals (uses audio from step 1)
run_example("12. Vocals") do
  raise RunApi::Core::Error, "No audio_url from step 1" unless gen_audio_url

  vocal_result = client.add_vocals.run(
    upload_url: gen_audio_url,
    prompt: "Gentle humming melody over the beat",
    title: "Vocal Layer",
    negative_tags: "screaming, harsh",
    style: "Pop, Soft",
    model: "suno-v4.5-plus"
  )
  puts "Status: #{vocal_result["status"]}"
end

# 13. MIDI (requires a split_stem vocal removal task)
run_example("13. MIDI") do
  stem_result = client.separate_audio_stems.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id"),
    type: "split_stem"
  )
  midi_result = client.generate_midi.run(task_id: stem_result["id"] || raise("No stem task_id"))
  puts "Status: #{midi_result["status"]}"
  midi_result["instruments"]&.each { |inst| puts "  Instrument: #{inst["name"]}" }
end

# 14. Section Replacement
run_example("14. Section Replacement") do
  sr_result = client.replace_section.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id"),
    prompt: "A bright and uplifting verse",
    tags: "Pop, Upbeat",
    title: "Replaced Section",
    full_lyrics: "[Verse]\nA chill lo-fi beat with warm piano melodies",
    infill_start_time: 5.0,
    infill_end_time: 15.0
  )
  puts "Status: #{sr_result["status"]}"
end

# 15. Timestamped Lyrics (non-polled)
run_example("15. Timestamped Lyrics") do
  tl_result = client.get_timestamped_lyrics.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id")
  )
  puts "Status: #{tl_result["status"] || "returned"}"
  if tl_result["aligned_words"]
    puts "  Words: #{tl_result["aligned_words"].size}"
    tl_result["aligned_words"].first(3).each do |w|
      puts "    #{w["word"]} (#{w["start_time"]}s - #{w["end_time"]}s)"
    end
  end
end

# 16. Personas (non-polled)
run_example("16. Persona") do
  persona_result = client.generate_persona.run(
    task_id: gen_task_id || raise("No task_id"),
    audio_id: gen_audio_id || raise("No audio_id"),
    name: "Test Voice",
    description: "A warm and gentle voice for testing"
  )
  puts "Status: #{persona_result["status"] || "returned"}"
  puts "  Persona ID: #{persona_result.dig("persona", "id")}" if persona_result["persona"]
end

# 17. Styles (non-polled)
run_example("17. Style") do
  style_result = client.boost_style.run(
    name: "Chill Vibes",
    description: "Relaxing lo-fi beats with warm textures"
  )
  puts "Status: #{style_result["status"] || "returned"}"
  puts "  Style: #{style_result["style"]}" if style_result["style"]
end

# 18. Manual polling (create + get)
puts "\n=== 18. Manual Polling ==="
task = client.text_to_music.create(
  custom_mode: false,
  instrumental: true,
  prompt: "An energetic electronic dance beat",
  model: "suno-v4.5-plus"
)
raise "Failed to create task" unless task["id"]
puts "Task ID: #{task["id"]}"

max_attempts = 60
attempts = 0
loop do
  status = client.text_to_music.get(task["id"])
  puts "Polling... status=#{status["status"]}"
  break if status["status"] == "completed" || status["status"] == "failed"

  attempts += 1
  raise "Polling timeout after #{max_attempts * 2}s" if attempts >= max_attempts
  sleep 2
end

# 19. Error handling
puts "\n=== 19. Error Handling ==="
begin
  client.text_to_music.create(custom_mode: false, instrumental: false)
rescue RunApi::Core::ValidationError => e
  puts "Caught ValidationError: #{e.message}"
end

begin
  client.text_to_music.create(custom_mode: false, instrumental: false, prompt: "test", model: "INVALID")
rescue RunApi::Core::ValidationError => e
  puts "Caught ValidationError: #{e.message}"
end
