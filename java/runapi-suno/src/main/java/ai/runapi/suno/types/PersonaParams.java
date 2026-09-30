package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for creating a reusable persona resource. */
public final class PersonaParams {
  private final String sourceTaskId;
  private final String sourceAudioId;
  private final String name;
  private final String description;

  private PersonaParams(Builder builder) {
    this.sourceTaskId = builder.sourceTaskId;
    this.sourceAudioId = builder.sourceAudioId;
    this.name = builder.name;
    this.description = builder.description;
  }

  /** Creates a new PersonaParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/personas"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("source_task_id", SunoParamUtils.wireValue(sourceTaskId));
    raw.put("source_audio_id", SunoParamUtils.wireValue(sourceAudioId));
    raw.put("name", SunoParamUtils.wireValue(name));
    raw.put("description", SunoParamUtils.wireValue(description));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link PersonaParams}. */
  public static final class Builder {
    private String sourceTaskId;
    private String sourceAudioId;
    private String name;
    private String description;

    private Builder() {}

    /** Sets the RunAPI task ID that produced the reference audio. */
    public Builder sourceTaskId(String value) {
      this.sourceTaskId = value;
      return this;
    }

    /** Sets the audio ID within the source task. */
    public Builder sourceAudioId(String value) {
      this.sourceAudioId = value;
      return this;
    }

    /** Sets the persona name. */
    public Builder name(String value) {
      this.name = value;
      return this;
    }

    /** Sets the persona description. */
    public Builder description(String value) {
      this.description = value;
      return this;
    }

    /** Builds immutable persona parameters. */
    public PersonaParams build() { return new PersonaParams(this); }
  }
}
