package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for separate audio stems operations. */
public final class SeparateAudioStemsParams {
  private final String taskId;
  private final String audioId;
  private final String type;
  private final String callbackUrl;

  private SeparateAudioStemsParams(Builder builder) {
    this.taskId = SunoParamUtils.requireNonBlank(builder.taskId, "taskId");
    this.audioId = SunoParamUtils.requireNonBlank(builder.audioId, "audioId");
    this.type = builder.type;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new SeparateAudioStemsParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/separate-audio-stems";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("audio_id", SunoParamUtils.wireValue(audioId));
    raw.put("type", SunoParamUtils.wireValue(type));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link SeparateAudioStemsParams}. */
  public static final class Builder {
    private String taskId;
    private String audioId;
    private String type;
    private String callbackUrl;

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

    /** Sets the type. */
    public Builder type(String value) {
      this.type = SunoParamUtils.requireNonBlank(value, "type");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable separate audio stems parameters. */
    public SeparateAudioStemsParams build() {
      return new SeparateAudioStemsParams(this);
    }
  }
}
