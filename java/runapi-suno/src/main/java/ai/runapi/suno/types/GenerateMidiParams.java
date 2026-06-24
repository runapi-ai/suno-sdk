package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for generate midi operations. */
public final class GenerateMidiParams {
  private final String taskId;
  private final String callbackUrl;

  private GenerateMidiParams(Builder builder) {
    this.taskId = builder.taskId;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new GenerateMidiParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/generate-midi";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GenerateMidiParams}. */
  public static final class Builder {
    private String taskId;
    private String callbackUrl;

    private Builder() {}

    /** Sets the task ID. */
    public Builder taskId(String value) {
      this.taskId = SunoParamUtils.requireNonBlank(value, "taskId");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable generate midi parameters. */
    public GenerateMidiParams build() {
      return new GenerateMidiParams(this);
    }
  }
}
