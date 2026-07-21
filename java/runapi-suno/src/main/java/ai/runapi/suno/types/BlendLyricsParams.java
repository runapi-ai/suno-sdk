package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for blending two caller-authored lyrics texts. */
public final class BlendLyricsParams {
  private final String lyricsA;
  private final String lyricsB;
  private final String callbackUrl;

  private BlendLyricsParams(Builder builder) {
    this.lyricsA = SunoParamUtils.requireNonBlank(builder.lyricsA, "lyricsA");
    this.lyricsB = SunoParamUtils.requireNonBlank(builder.lyricsB, "lyricsB");
    this.callbackUrl = builder.callbackUrl;
  }

  public static Builder builder() {
    return new Builder();
  }

  public String action() {
    return "suno/blend-lyrics";
  }

  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("lyrics_a", SunoParamUtils.wireValue(lyricsA));
    raw.put("lyrics_b", SunoParamUtils.wireValue(lyricsB));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link BlendLyricsParams}. */
  public static final class Builder {
    private String lyricsA;
    private String lyricsB;
    private String callbackUrl;

    private Builder() {}

    public Builder lyricsA(String value) {
      this.lyricsA = value;
      return this;
    }

    public Builder lyricsB(String value) {
      this.lyricsB = value;
      return this;
    }

    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    public BlendLyricsParams build() {
      return new BlendLyricsParams(this);
    }
  }
}
