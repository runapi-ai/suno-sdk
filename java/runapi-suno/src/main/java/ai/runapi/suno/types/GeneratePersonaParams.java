package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for generate persona operations. */
public final class GeneratePersonaParams {
  private final String taskId;
  private final String audioId;
  private final String name;
  private final String description;

  private GeneratePersonaParams(Builder builder) {
    this.taskId = builder.taskId;
    this.audioId = builder.audioId;
    this.name = builder.name;
    this.description = builder.description;
  }

  /** Creates a new GeneratePersonaParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/generate-persona";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("audio_id", SunoParamUtils.wireValue(audioId));
    raw.put("name", SunoParamUtils.wireValue(name));
    raw.put("description", SunoParamUtils.wireValue(description));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GeneratePersonaParams}. */
  public static final class Builder {
    private String taskId;
    private String audioId;
    private String name;
    private String description;

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

    /** Sets the item name. */
    public Builder name(String value) {
      this.name = SunoParamUtils.requireNonBlank(value, "name");
      return this;
    }

    /** Sets the item description. */
    public Builder description(String value) {
      this.description = SunoParamUtils.requireNonBlank(value, "description");
      return this;
    }

    /** Builds immutable generate persona parameters. */
    public GeneratePersonaParams build() {
      return new GeneratePersonaParams(this);
    }
  }
}
