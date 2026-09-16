package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for music-from-sample operations. */
public final class MusicFromSampleModel extends SunoValue {
  /** suno-v4 model slug. */
  public static final MusicFromSampleModel SUNO_V4 = new MusicFromSampleModel("suno-v4");
  /** suno-v4.5 model slug. */
  public static final MusicFromSampleModel SUNO_V4_5 = new MusicFromSampleModel("suno-v4.5");
  /** suno-v4.5-plus model slug. */
  public static final MusicFromSampleModel SUNO_V4_5_PLUS = new MusicFromSampleModel("suno-v4.5-plus");
  /** suno-v5 model slug. */
  public static final MusicFromSampleModel SUNO_V5 = new MusicFromSampleModel("suno-v5");
  /** suno-v5.5 model slug. */
  public static final MusicFromSampleModel SUNO_V5_5 = new MusicFromSampleModel("suno-v5.5");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public MusicFromSampleModel(String value) { super(value); }
}
