package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for create mashup operations. */
public final class CreateMashupModel extends SunoValue {
  /** suno-v4 model slug. */
  public static final CreateMashupModel SUNO_V4 = new CreateMashupModel("suno-v4");
  /** suno-v4.5 model slug. */
  public static final CreateMashupModel SUNO_V4_5 = new CreateMashupModel("suno-v4.5");
  /** suno-v4.5-all model slug. */
  public static final CreateMashupModel SUNO_V4_5_ALL = new CreateMashupModel("suno-v4.5-all");
  /** suno-v4.5-plus model slug. */
  public static final CreateMashupModel SUNO_V4_5_PLUS = new CreateMashupModel("suno-v4.5-plus");
  /** suno-v5 model slug. */
  public static final CreateMashupModel SUNO_V5 = new CreateMashupModel("suno-v5");
  /** suno-v5.5 model slug. */
  public static final CreateMashupModel SUNO_V5_5 = new CreateMashupModel("suno-v5.5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public CreateMashupModel(String value) {
    super(value);
  }
}
