package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for voice to validation phrase operations. */
public final class VoiceToValidationPhraseParams {
  private final String voiceUrl;
  private final Integer vocalStartSeconds;
  private final Integer vocalEndSeconds;
  private final String language;
  private final String callbackUrl;

  private VoiceToValidationPhraseParams(Builder builder) {
    this.voiceUrl = builder.voiceUrl;
    this.vocalStartSeconds = java.util.Objects.requireNonNull(builder.vocalStartSeconds, "vocalStartSeconds");
    this.vocalEndSeconds = java.util.Objects.requireNonNull(builder.vocalEndSeconds, "vocalEndSeconds");
    this.language = builder.language;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new VoiceToValidationPhraseParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/voice-to-validation-phrase";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("voice_url", SunoParamUtils.wireValue(voiceUrl));
    raw.put("vocal_start_seconds", SunoParamUtils.wireValue(vocalStartSeconds));
    raw.put("vocal_end_seconds", SunoParamUtils.wireValue(vocalEndSeconds));
    raw.put("language", SunoParamUtils.wireValue(language));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link VoiceToValidationPhraseParams}. */
  public static final class Builder {
    private String voiceUrl;
    private Integer vocalStartSeconds;
    private Integer vocalEndSeconds;
    private String language;
    private String callbackUrl;

    private Builder() {}

    /** Sets the voice URL. */
    public Builder voiceUrl(String value) {
      this.voiceUrl = SunoParamUtils.requireNonBlank(value, "voiceUrl");
      return this;
    }

    /** Sets the vocal start seconds. */
    public Builder vocalStartSeconds(int value) {
      this.vocalStartSeconds = value;
      return this;
    }

    /** Sets the vocal end seconds. */
    public Builder vocalEndSeconds(int value) {
      this.vocalEndSeconds = value;
      return this;
    }

    /** Sets the language. */
    public Builder language(String value) {
      this.language = SunoParamUtils.requireNonBlank(value, "language");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable voice to validation phrase parameters. */
    public VoiceToValidationPhraseParams build() {
      return new VoiceToValidationPhraseParams(this);
    }
  }
}
