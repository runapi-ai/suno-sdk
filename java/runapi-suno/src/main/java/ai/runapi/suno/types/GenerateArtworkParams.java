package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for generate artwork operations. */
public final class GenerateArtworkParams {
  private final String taskId;
  private final String callbackUrl;

  private GenerateArtworkParams(Builder builder) {
    this.taskId = SunoParamUtils.requireNonBlank(builder.taskId, "taskId");
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new GenerateArtworkParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/generate-artwork";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GenerateArtworkParams}. */
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

    /** Builds immutable generate artwork parameters. */
    public GenerateArtworkParams build() {
      return new GenerateArtworkParams(this);
    }
  }
}
