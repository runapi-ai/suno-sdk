package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for replace section operations. */
public final class ReplaceSectionParams {
  private final String taskId;
  private final String audioId;
  private final String lyrics;
  private final String tags;
  private final String title;
  private final Double infillStartTime;
  private final Double infillEndTime;
  private final String callbackUrl;
  private final String negativeTags;
  private final String fullLyrics;

  private ReplaceSectionParams(Builder builder) {
    this.taskId = SunoParamUtils.requireNonBlank(builder.taskId, "taskId");
    this.audioId = SunoParamUtils.requireNonBlank(builder.audioId, "audioId");
    this.lyrics = builder.lyrics;
    this.tags = builder.tags;
    this.title = builder.title;
    this.infillStartTime = builder.infillStartTime;
    this.infillEndTime = builder.infillEndTime;
    this.callbackUrl = builder.callbackUrl;
    this.negativeTags = builder.negativeTags;
    this.fullLyrics = builder.fullLyrics;
  }

  /** Creates a new ReplaceSectionParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/replace-section";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("task_id", SunoParamUtils.wireValue(taskId));
    raw.put("audio_id", SunoParamUtils.wireValue(audioId));
    raw.put("lyrics", SunoParamUtils.wireValue(lyrics));
    raw.put("tags", SunoParamUtils.wireValue(tags));
    raw.put("title", SunoParamUtils.wireValue(title));
    raw.put("infill_start_time", SunoParamUtils.wireValue(infillStartTime));
    raw.put("infill_end_time", SunoParamUtils.wireValue(infillEndTime));
    raw.put("callback_url", SunoParamUtils.wireValue(callbackUrl));
    raw.put("negative_tags", SunoParamUtils.wireValue(negativeTags));
    raw.put("full_lyrics", SunoParamUtils.wireValue(fullLyrics));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link ReplaceSectionParams}. */
  public static final class Builder {
    private String taskId;
    private String audioId;
    private String lyrics;
    private String tags;
    private String title;
    private Double infillStartTime;
    private Double infillEndTime;
    private String callbackUrl;
    private String negativeTags;
    private String fullLyrics;

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

    /** Sets the lyrics. */
    public Builder lyrics(String value) {
      this.lyrics = SunoParamUtils.requireNonBlank(value, "lyrics");
      return this;
    }

    /** Sets the tags. */
    public Builder tags(String value) {
      this.tags = SunoParamUtils.requireNonBlank(value, "tags");
      return this;
    }

    /** Sets the title. */
    public Builder title(String value) {
      this.title = SunoParamUtils.requireNonBlank(value, "title");
      return this;
    }

    /** Sets the infill start time. */
    public Builder infillStartTime(double value) {
      this.infillStartTime = value;
      return this;
    }

    /** Sets the infill end time. */
    public Builder infillEndTime(double value) {
      this.infillEndTime = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = SunoParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Sets the negative tags. */
    public Builder negativeTags(String value) {
      this.negativeTags = SunoParamUtils.requireNonBlank(value, "negativeTags");
      return this;
    }

    /** Sets the full lyrics. */
    public Builder fullLyrics(String value) {
      this.fullLyrics = SunoParamUtils.requireNonBlank(value, "fullLyrics");
      return this;
    }

    /** Builds immutable replace section parameters. */
    public ReplaceSectionParams build() {
      return new ReplaceSectionParams(this);
    }
  }
}
