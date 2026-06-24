package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for text to sound operations. */
public final class TextToSoundParams {
  private final String prompt;
  private final String model;
  private final Boolean soundLoop;
  private final Integer soundTempo;
  private final String soundKey;
  private final Boolean grabLyrics;
  private final String callbackUrl;

  private TextToSoundParams(Builder builder) {
    this.prompt = SunoParamUtils.requireNonBlank(builder.prompt, "prompt");
    this.model = SunoParamUtils.requireNonBlankTrim(builder.model, "model");
    this.soundLoop = builder.soundLoop;
    this.soundTempo = builder.soundTempo;
    this.soundKey = builder.soundKey;
    this.grabLyrics = builder.grabLyrics;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new TextToSoundParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/text-to-sound";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("prompt", SunoParamUtils.wireValue(prompt));
    raw.put("model", SunoParamUtils.wireValue(model));
    raw.put("sound_loop", SunoParamUtils.wireValue(soundLoop));
    raw.put("sound_tempo", SunoParamUtils.wireValue(soundTempo));
    raw.put("sound_key", SunoParamUtils.wireValue(soundKey));
    raw.put("grab_lyrics", SunoParamUtils.wireValue(grabLyrics));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link TextToSoundParams}. */
  public static final class Builder {
    private String prompt;
    private String model;
    private Boolean soundLoop;
    private Integer soundTempo;
    private String soundKey;
    private Boolean grabLyrics;
    private String callbackUrl;

    private Builder() {}

    /** Sets the text prompt. */
    public Builder prompt(String value) {
      this.prompt = SunoParamUtils.requireNonBlank(value, "prompt");
      return this;
    }

    /** Sets the model slug using a typed model value. */
    public Builder model(TextToSoundModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = SunoParamUtils.requireNonBlankTrim(value, "model");
      return this;
    }


    /** Sets the sound loop. */
    public Builder soundLoop(boolean value) {
      this.soundLoop = value;
      return this;
    }

    /** Sets the sound tempo. */
    public Builder soundTempo(int value) {
      this.soundTempo = value;
      return this;
    }

    /** Sets the sound key. */
    public Builder soundKey(String value) {
      this.soundKey = SunoParamUtils.requireNonBlank(value, "soundKey");
      return this;
    }

    /** Sets the grab lyrics. */
    public Builder grabLyrics(boolean value) {
      this.grabLyrics = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable text to sound parameters. */
    public TextToSoundParams build() {
      return new TextToSoundParams(this);
    }
  }
}
