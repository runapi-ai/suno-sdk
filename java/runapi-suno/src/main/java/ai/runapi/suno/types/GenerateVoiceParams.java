package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for generate voice operations. */
public final class GenerateVoiceParams {
  private final String taskId;
  private final String verifyUrl;
  private final String voiceName;
  private final String description;
  private final String style;
  private final String singerSkillLevel;
  private final String callbackUrl;

  private GenerateVoiceParams(Builder builder) {
    this.taskId = SunoParamUtils.requireNonBlank(builder.taskId, "taskId");
    this.verifyUrl = SunoParamUtils.requireNonBlank(builder.verifyUrl, "verifyUrl");
    this.voiceName = builder.voiceName;
    this.description = builder.description;
    this.style = builder.style;
    this.singerSkillLevel = builder.singerSkillLevel;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new GenerateVoiceParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/generate-voice";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("verify_url", SunoParamUtils.wireValue(verifyUrl));
    raw.put("voice_name", SunoParamUtils.wireValue(voiceName));
    raw.put("description", SunoParamUtils.wireValue(description));
    raw.put("style", SunoParamUtils.wireValue(style));
    raw.put("singer_skill_level", SunoParamUtils.wireValue(singerSkillLevel));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GenerateVoiceParams}. */
  public static final class Builder {
    private String taskId;
    private String verifyUrl;
    private String voiceName;
    private String description;
    private String style;
    private String singerSkillLevel;
    private String callbackUrl;

    private Builder() {}

    /** Sets the task ID. */
    public Builder taskId(String value) {
      this.taskId = SunoParamUtils.requireNonBlank(value, "taskId");
      return this;
    }

    /** Sets the verify URL. */
    public Builder verifyUrl(String value) {
      this.verifyUrl = SunoParamUtils.requireNonBlank(value, "verifyUrl");
      return this;
    }

    /** Sets the voice name. */
    public Builder voiceName(String value) {
      this.voiceName = SunoParamUtils.requireNonBlank(value, "voiceName");
      return this;
    }

    /** Sets the item description. */
    public Builder description(String value) {
      this.description = SunoParamUtils.requireNonBlank(value, "description");
      return this;
    }

    /** Sets the style. */
    public Builder style(String value) {
      this.style = SunoParamUtils.requireNonBlank(value, "style");
      return this;
    }

    /** Sets the singer skill level. */
    public Builder singerSkillLevel(String value) {
      this.singerSkillLevel = SunoParamUtils.requireNonBlank(value, "singerSkillLevel");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable generate voice parameters. */
    public GenerateVoiceParams build() {
      return new GenerateVoiceParams(this);
    }
  }
}
