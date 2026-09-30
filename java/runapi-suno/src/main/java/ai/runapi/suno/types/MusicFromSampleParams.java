package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

/** Parameters for creating music guided by an audio sample. */
public final class MusicFromSampleParams {
  private final String model;
  private final String audioUrl;
  private final String prompt;
  private final Double startSeconds;
  private final Double endSeconds;
  private final String callbackUrl;

  private MusicFromSampleParams(Builder builder) {
    this.model = builder.model;
    this.audioUrl = builder.audioUrl;
    this.prompt = builder.prompt;
    this.startSeconds = builder.startSeconds;
    this.endSeconds = builder.endSeconds;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new MusicFromSampleParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/music-from-sample"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", SunoParamUtils.wireValue(model));
    raw.put("audio_url", SunoParamUtils.wireValue(audioUrl));
    raw.put("prompt", SunoParamUtils.wireValue(prompt));
    raw.put("start_seconds", SunoParamUtils.wireValue(startSeconds));
    raw.put("end_seconds", SunoParamUtils.wireValue(endSeconds));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link MusicFromSampleParams}. */
  public static final class Builder {
    private String model;
    private String audioUrl;
    private String prompt;
    private Double startSeconds;
    private Double endSeconds;
    private String callbackUrl;
    private Builder() {}

    /** Sets the model slug using a typed model value. */
    public Builder model(MusicFromSampleModel value) {
      this.model = Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = value;
      return this;
    }

    /** Sets the source audio URL. */
    public Builder audioUrl(String value) {
      this.audioUrl = value;
      return this;
    }

    /** Sets the optional sample description. */
    public Builder prompt(String value) {
      this.prompt = value;
      return this;
    }

    /** Sets the start of the sample range in seconds. */
    public Builder startSeconds(double value) { this.startSeconds = value; return this; }

    /** Sets the end of the sample range in seconds. */
    public Builder endSeconds(double value) { this.endSeconds = value; return this; }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = value;
      return this;
    }

    /** Builds immutable music-from-sample parameters. */
    public MusicFromSampleParams build() { return new MusicFromSampleParams(this); }
  }
}
