package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for visualize music operations. */
public final class VisualizeMusicParams {
  private final String taskId;
  private final String audioId;
  private final String callbackUrl;
  private final String author;
  private final String domainName;

  private VisualizeMusicParams(Builder builder) {
    this.taskId = builder.taskId;
    this.audioId = builder.audioId;
    this.callbackUrl = builder.callbackUrl;
    this.author = builder.author;
    this.domainName = builder.domainName;
  }

  /** Creates a new VisualizeMusicParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/visualize-music";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("audio_id", SunoParamUtils.wireValue(audioId));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    raw.put("author", SunoParamUtils.wireValue(author));
    raw.put("domain_name", SunoParamUtils.wireValue(domainName));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link VisualizeMusicParams}. */
  public static final class Builder {
    private String taskId;
    private String audioId;
    private String callbackUrl;
    private String author;
    private String domainName;

    private Builder() {}

    /** Sets the task ID. */
    public Builder taskId(String value) {
      this.taskId = SunoParamUtils.requireNonBlank(value, "taskId");
      return this;
    }

    /** Sets the audio ID. */
    public Builder audioId(String value) {
      this.audioId = SunoParamUtils.requireNonBlank(value, "audioId");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Sets the author. */
    public Builder author(String value) {
      this.author = SunoParamUtils.requireNonBlank(value, "author");
      return this;
    }

    /** Sets the domain name. */
    public Builder domainName(String value) {
      this.domainName = SunoParamUtils.requireNonBlank(value, "domainName");
      return this;
    }

    /** Builds immutable visualize music parameters. */
    public VisualizeMusicParams build() {
      return new VisualizeMusicParams(this);
    }
  }
}
