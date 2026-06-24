package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for generate lyrics operations. */
public final class GenerateLyricsParams {
  private final String prompt;
  private final String callbackUrl;

  private GenerateLyricsParams(Builder builder) {
    this.prompt = builder.prompt;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new GenerateLyricsParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/generate-lyrics";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("prompt", SunoParamUtils.wireValue(prompt));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GenerateLyricsParams}. */
  public static final class Builder {
    private String prompt;
    private String callbackUrl;

    private Builder() {}

    /** Sets the text prompt. */
    public Builder prompt(String value) {
      this.prompt = SunoParamUtils.requireNonBlank(value, "prompt");
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable generate lyrics parameters. */
    public GenerateLyricsParams build() {
      return new GenerateLyricsParams(this);
    }
  }
}
