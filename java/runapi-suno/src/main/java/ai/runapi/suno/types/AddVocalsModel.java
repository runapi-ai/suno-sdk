package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for add vocals operations. */
public final class AddVocalsModel extends SunoValue {
  /** suno-v4.5-plus model slug. */
  public static final AddVocalsModel SUNO_V4_5_PLUS = new AddVocalsModel("suno-v4.5-plus");
  /** suno-v5 model slug. */
  public static final AddVocalsModel SUNO_V5 = new AddVocalsModel("suno-v5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public AddVocalsModel(String value) {
    super(value);
  }
}
