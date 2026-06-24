package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for text to sound operations. */
public final class TextToSoundModel extends SunoValue {
  /** suno-v5 model slug. */
  public static final TextToSoundModel SUNO_V5 = new TextToSoundModel("suno-v5");
  /** suno-v5.5 model slug. */
  public static final TextToSoundModel SUNO_V5_5 = new TextToSoundModel("suno-v5.5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public TextToSoundModel(String value) {
    super(value);
  }
}
