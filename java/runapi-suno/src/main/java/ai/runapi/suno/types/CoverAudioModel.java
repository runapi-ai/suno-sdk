package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for cover audio operations. */
public final class CoverAudioModel extends SunoValue {
  /** suno-v4 model slug. */
  public static final CoverAudioModel SUNO_V4 = new CoverAudioModel("suno-v4");
  /** suno-v4.5 model slug. */
  public static final CoverAudioModel SUNO_V4_5 = new CoverAudioModel("suno-v4.5");
  /** suno-v4.5-all model slug. */
  public static final CoverAudioModel SUNO_V4_5_ALL = new CoverAudioModel("suno-v4.5-all");
  /** suno-v4.5-plus model slug. */
  public static final CoverAudioModel SUNO_V4_5_PLUS = new CoverAudioModel("suno-v4.5-plus");
  /** suno-v5 model slug. */
  public static final CoverAudioModel SUNO_V5 = new CoverAudioModel("suno-v5");
  /** suno-v5.5 model slug. */
  public static final CoverAudioModel SUNO_V5_5 = new CoverAudioModel("suno-v5.5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public CoverAudioModel(String value) {
    super(value);
  }
}
