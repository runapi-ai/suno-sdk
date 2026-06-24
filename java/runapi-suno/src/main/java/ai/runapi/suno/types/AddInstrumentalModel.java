package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for add instrumental operations. */
public final class AddInstrumentalModel extends SunoValue {
  /** suno-v4.5-plus model slug. */
  public static final AddInstrumentalModel SUNO_V4_5_PLUS = new AddInstrumentalModel("suno-v4.5-plus");
  /** suno-v5 model slug. */
  public static final AddInstrumentalModel SUNO_V5 = new AddInstrumentalModel("suno-v5");
  /** suno-v5.5 model slug. */
  public static final AddInstrumentalModel SUNO_V5_5 = new AddInstrumentalModel("suno-v5.5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public AddInstrumentalModel(String value) {
    super(value);
  }
}
