package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for add vocals operations. */
public final class AddVocalsParams {
  private final String callbackUrl;
  private final String model;
  private final String vocalGender;
  private final Double styleWeight;
  private final Double weirdnessConstraint;
  private final Double audioWeight;
  private final String uploadUrl;
  private final String lyrics;
  private final String title;
  private final String negativeTags;
  private final String style;

  private AddVocalsParams(Builder builder) {
    this.callbackUrl = builder.callbackUrl;
    this.model = builder.model;
    this.vocalGender = builder.vocalGender;
    this.styleWeight = builder.styleWeight;
    this.weirdnessConstraint = builder.weirdnessConstraint;
    this.audioWeight = builder.audioWeight;
    this.uploadUrl = builder.uploadUrl;
    this.lyrics = builder.lyrics;
    this.title = builder.title;
    this.negativeTags = builder.negativeTags;
    this.style = builder.style;
  }

  /** Creates a new AddVocalsParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/add-vocals";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    raw.put("model", SunoParamUtils.wireValue(model));
    raw.put("vocal_gender", SunoParamUtils.wireValue(vocalGender));
    raw.put("style_weight", SunoParamUtils.wireValue(styleWeight));
    raw.put("weirdness_constraint", SunoParamUtils.wireValue(weirdnessConstraint));
    raw.put("audio_weight", SunoParamUtils.wireValue(audioWeight));
    raw.put("upload_url", SunoParamUtils.wireValue(uploadUrl));
    raw.put("lyrics", SunoParamUtils.wireValue(lyrics));
    raw.put("title", SunoParamUtils.wireValue(title));
    raw.put("negative_tags", SunoParamUtils.wireValue(negativeTags));
    raw.put("style", SunoParamUtils.wireValue(style));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link AddVocalsParams}. */
  public static final class Builder {
    private String callbackUrl;
    private String model;
    private String vocalGender;
    private Double styleWeight;
    private Double weirdnessConstraint;
    private Double audioWeight;
    private String uploadUrl;
    private String lyrics;
    private String title;
    private String negativeTags;
    private String style;

    private Builder() {}

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = value;
      return this;
    }

    /** Sets the model slug using a typed model value. */
    public Builder model(AddVocalsModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = value;
      return this;
    }


    /** Sets the vocal gender. */
    public Builder vocalGender(String value) {
      this.vocalGender = value;
      return this;
    }

    /** Sets the style weight. */
    public Builder styleWeight(double value) {
      this.styleWeight = value;
      return this;
    }

    /** Sets the weirdness constraint. */
    public Builder weirdnessConstraint(double value) {
      this.weirdnessConstraint = value;
      return this;
    }

    /** Sets the audio weight. */
    public Builder audioWeight(double value) {
      this.audioWeight = value;
      return this;
    }

    /** Sets the upload URL. */
    public Builder uploadUrl(String value) {
      this.uploadUrl = value;
      return this;
    }

    /** Sets the lyrics. */
    public Builder lyrics(String value) {
      this.lyrics = value;
      return this;
    }

    /** Sets the title. */
    public Builder title(String value) {
      this.title = value;
      return this;
    }

    /** Sets the negative tags. */
    public Builder negativeTags(String value) {
      this.negativeTags = value;
      return this;
    }

    /** Sets the style. */
    public Builder style(String value) {
      this.style = value;
      return this;
    }

    /** Builds immutable add vocals parameters. */
    public AddVocalsParams build() {
      return new AddVocalsParams(this);
    }
  }
}
