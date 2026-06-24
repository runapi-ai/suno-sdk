package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for get timestamped lyrics operations. */
public final class GetTimestampedLyricsParams {
  private final String taskId;
  private final String audioId;

  private GetTimestampedLyricsParams(Builder builder) {
    this.taskId = builder.taskId;
    this.audioId = builder.audioId;
  }

  /** Creates a new GetTimestampedLyricsParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/get-timestamped-lyrics";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("audio_id", SunoParamUtils.wireValue(audioId));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link GetTimestampedLyricsParams}. */
  public static final class Builder {
    private String taskId;
    private String audioId;

    private Builder() {}

    /** Sets the task ID. */
    public Builder taskId(String value) {
      this.taskId = SunoParamUtils.requireNonBlank(value, "taskId");
      return this;
    }

    /** Sets the audio ID. */
    public Builder audioId(String value) {
      this.audioId = SunoParamUtils.requireNonBlank(value, "audioId");
      return this;
    }

    /** Builds immutable get timestamped lyrics parameters. */
    public GetTimestampedLyricsParams build() {
      return new GetTimestampedLyricsParams(this);
    }
  }
}
