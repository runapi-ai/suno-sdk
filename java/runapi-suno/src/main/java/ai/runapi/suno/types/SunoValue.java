package ai.runapi.suno.types;

import ai.runapi.core.types.RunApiValue;

abstract class SunoValue extends RunApiValue {
  SunoValue(String value) {
    super(value);
  }
}
