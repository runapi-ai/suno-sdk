package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for add instrumental operations. */
public final class AddInstrumentalParams {
  private final String callbackUrl;
  private final String model;
  private final String vocalGender;
  private final Double styleWeight;
  private final Double weirdnessConstraint;
  private final Double audioWeight;
  private final String uploadUrl;
  private final String title;
  private final String negativeTags;
  private final String tags;

  private AddInstrumentalParams(Builder builder) {
    this.callbackUrl = builder.callbackUrl;
    this.model = SunoParamUtils.requireNonBlankTrim(builder.model, "model");
    this.vocalGender = builder.vocalGender;
    this.styleWeight = builder.styleWeight;
    this.weirdnessConstraint = builder.weirdnessConstraint;
    this.audioWeight = builder.audioWeight;
    this.uploadUrl = SunoParamUtils.requireNonBlank(builder.uploadUrl, "uploadUrl");
    this.title = builder.title;
    this.negativeTags = builder.negativeTags;
    this.tags = builder.tags;
  }

  /** Creates a new AddInstrumentalParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/add-instrumental";
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
    raw.put("title", SunoParamUtils.wireValue(title));
    raw.put("negative_tags", SunoParamUtils.wireValue(negativeTags));
    raw.put("tags", SunoParamUtils.wireValue(tags));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link AddInstrumentalParams}. */
  public static final class Builder {
    private String callbackUrl;
    private String model;
    private String vocalGender;
    private Double styleWeight;
    private Double weirdnessConstraint;
    private Double audioWeight;
    private String uploadUrl;
    private String title;
    private String negativeTags;
    private String tags;

    private Builder() {}

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Sets the model slug using a typed model value. */
    public Builder model(AddInstrumentalModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = SunoParamUtils.requireNonBlankTrim(value, "model");
      return this;
    }


    /** Sets the vocal gender. */
    public Builder vocalGender(String value) {
      this.vocalGender = SunoParamUtils.requireNonBlank(value, "vocalGender");
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
      this.uploadUrl = SunoParamUtils.requireNonBlank(value, "uploadUrl");
      return this;
    }

    /** Sets the title. */
    public Builder title(String value) {
      this.title = SunoParamUtils.requireNonBlank(value, "title");
      return this;
    }

    /** Sets the negative tags. */
    public Builder negativeTags(String value) {
      this.negativeTags = SunoParamUtils.requireNonBlank(value, "negativeTags");
      return this;
    }

    /** Sets the tags. */
    public Builder tags(String value) {
      this.tags = SunoParamUtils.requireNonBlank(value, "tags");
      return this;
    }

    /** Builds immutable add instrumental parameters. */
    public AddInstrumentalParams build() {
      return new AddInstrumentalParams(this);
    }
  }
}
