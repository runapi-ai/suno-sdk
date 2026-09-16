package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for rendering a music visualization. */
public final class MusicVisualizationParams {
  private final String sourceAudioId;
  private final String sourceTaskId;
  private final String callbackUrl;
  private final String author;
  private final String domainName;

  private MusicVisualizationParams(Builder builder) {
    this.sourceAudioId = builder.sourceAudioId;
    this.sourceTaskId = builder.sourceTaskId;
    this.callbackUrl = builder.callbackUrl;
    this.author = builder.author;
    this.domainName = builder.domainName;
  }

  /** Creates a new MusicVisualizationParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/music-visualizations"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("source_audio_id", SunoParamUtils.wireValue(sourceAudioId));
    raw.put("source_task_id", SunoParamUtils.wireValue(sourceTaskId));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    raw.put("author", SunoParamUtils.wireValue(author));
    raw.put("domain_name", SunoParamUtils.wireValue(domainName));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link MusicVisualizationParams}. */
  public static final class Builder {
    private String sourceAudioId;
    private String sourceTaskId;
    private String callbackUrl;
    private String author;
    private String domainName;
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

    /** Sets the author name shown in the video. */
    public Builder author(String value) {
      this.author = SunoParamUtils.requireNonBlank(value, "author");
      return this;
    }

    /** Sets the domain name watermark. */
    public Builder domainName(String value) {
      this.domainName = SunoParamUtils.requireNonBlank(value, "domainName");
      return this;
    }

    /** Builds immutable music visualization parameters. */
    public MusicVisualizationParams build() { return new MusicVisualizationParams(this); }
  }
}
