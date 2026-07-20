package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** One audio result in an advanced stem extraction pair. */
public final class AdvancedStemAudio {
  @JsonProperty("id")
  private String id;

  @JsonProperty("duration_seconds")
  private Double durationSeconds;

  @JsonProperty("audio_url")
  private String audioUrl;

  /** Returns the audio ID. */
  public String getId() {
    return id;
  }

  /** Returns the audio duration in seconds. */
  public Double getDurationSeconds() {
    return durationSeconds;
  }

  /** Returns the audio URL. */
  public String getAudioUrl() {
    return audioUrl;
  }
}
