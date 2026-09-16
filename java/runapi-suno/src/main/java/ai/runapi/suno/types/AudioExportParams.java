package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for exporting an existing audio resource. */
public final class AudioExportParams {
  private final String sourceAudioId;
  private final String sourceTaskId;
  private final String callbackUrl;

  private AudioExportParams(Builder builder) {
    this.sourceAudioId = builder.sourceAudioId;
    this.sourceTaskId = builder.sourceTaskId;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new AudioExportParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/audio-exports"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("source_audio_id", SunoParamUtils.wireValue(sourceAudioId));
    raw.put("source_task_id", SunoParamUtils.wireValue(sourceTaskId));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link AudioExportParams}. */
  public static final class Builder {
    private String sourceAudioId;
    private String sourceTaskId;
    private String callbackUrl;
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

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable audio export parameters. */
    public AudioExportParams build() { return new AudioExportParams(this); }
  }
}
