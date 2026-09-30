package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for creating a reusable voice resource. */
public final class VoiceParams {
  private final String sourceAudioUrl;
  private final String name;

  private VoiceParams(Builder builder) {
    this.sourceAudioUrl = builder.sourceAudioUrl;
    this.name = builder.name;
  }

  /** Creates a new VoiceParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/voices"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("source_audio_url", SunoParamUtils.wireValue(sourceAudioUrl));
    raw.put("name", SunoParamUtils.wireValue(name));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link VoiceParams}. */
  public static final class Builder {
    private String sourceAudioUrl;
    private String name;

    private Builder() {}

    /** Sets the public URL of the voice recording. */
    public Builder sourceAudioUrl(String value) {
      this.sourceAudioUrl = value;
      return this;
    }

    /** Sets the voice name. */
    public Builder name(String value) {
      this.name = value;
      return this;
    }

    /** Builds immutable voice parameters. */
    public VoiceParams build() { return new VoiceParams(this); }
  }
}
