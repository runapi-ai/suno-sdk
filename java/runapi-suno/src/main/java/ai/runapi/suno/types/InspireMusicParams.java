package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for creating music guided by reference audio URLs. */
public final class InspireMusicParams {
  private final String model;
  private final List<String> audioUrls;
  private final String callbackUrl;

  private InspireMusicParams(Builder builder) {
    this.model = SunoParamUtils.requireNonBlank(builder.model, "model");
    this.audioUrls = SunoParamUtils.requiredStrings(builder.audioUrls, "audioUrls");
    this.callbackUrl = builder.callbackUrl;
  }

  public static Builder builder() {
    return new Builder();
  }

  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", SunoParamUtils.wireValue(model));
    raw.put("audio_urls", SunoParamUtils.wireValue(audioUrls));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link InspireMusicParams}. */
  public static final class Builder {
    private String model;
    private List<String> audioUrls;
    private String callbackUrl;

    private Builder() {}

    public Builder model(String value) {
      this.model = value;
      return this;
    }

    public Builder audioUrls(List<String> value) {
      this.audioUrls = value;
      return this;
    }

    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    public InspireMusicParams build() {
      return new InspireMusicParams(this);
    }
  }
}
