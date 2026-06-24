package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for check voice operations. */
public final class CheckVoiceParams {
  private final String taskId;

  private CheckVoiceParams(Builder builder) {
    this.taskId = SunoParamUtils.requireNonBlank(builder.taskId, "taskId");
  }

  /** Creates a new CheckVoiceParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/check-voice";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link CheckVoiceParams}. */
  public static final class Builder {
    private String taskId;

    private Builder() {}

    /** Sets the task ID. */
    public Builder taskId(String value) {
      this.taskId = SunoParamUtils.requireNonBlank(value, "taskId");
      return this;
    }

    /** Builds immutable check voice parameters. */
    public CheckVoiceParams build() {
      return new CheckVoiceParams(this);
    }
  }
}
