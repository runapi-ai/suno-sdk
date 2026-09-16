package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for retrieving timestamped lyrics from an existing audio resource. */
public final class TimestampedLyricsParams {
  private final String sourceAudioId;
  private final String sourceTaskId;

  private TimestampedLyricsParams(Builder builder) {
    this.sourceAudioId = builder.sourceAudioId;
    this.sourceTaskId = builder.sourceTaskId;
  }

  /** Creates a new TimestampedLyricsParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/timestamped-lyrics"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("source_audio_id", SunoParamUtils.wireValue(sourceAudioId));
    raw.put("source_task_id", SunoParamUtils.wireValue(sourceTaskId));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link TimestampedLyricsParams}. */
  public static final class Builder {
    private String sourceAudioId;
    private String sourceTaskId;
    private Builder() {}

    /** Sets the audio ID or RunAPI-owned audio resource ID. */
    public Builder sourceAudioId(String value) {
      this.sourceAudioId = SunoParamUtils.requireNonBlank(value, "sourceAudioId");
      return this;
    }

    /** Sets the producing RunAPI task ID when the audio ID alone is not sufficient. */
    public Builder sourceTaskId(String value) {
      this.sourceTaskId = SunoParamUtils.requireNonBlank(value, "sourceTaskId");
      return this;
    }

    /** Builds immutable timestamped lyrics parameters. */
    public TimestampedLyricsParams build() { return new TimestampedLyricsParams(this); }
  }
}
