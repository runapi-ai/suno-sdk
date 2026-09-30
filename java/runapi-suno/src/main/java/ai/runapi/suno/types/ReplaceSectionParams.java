package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for replace section operations. */
public final class ReplaceSectionParams {
  private final String taskId;
  private final String audioId;
  private final String uploadUrl;
  private final String model;
  private final String lyrics;
  private final String tags;
  private final String title;
  private final Double infillStartTime;
  private final Double infillEndTime;
  private final String callbackUrl;
  private final String negativeTags;
  private final String fullLyrics;

  private ReplaceSectionParams(Builder builder) {
    this.taskId = builder.taskId;
    this.audioId = builder.audioId;
    this.uploadUrl = builder.uploadUrl;
    this.model = builder.model;
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
    raw.put("upload_url", SunoParamUtils.wireValue(uploadUrl));
    raw.put("model", SunoParamUtils.wireValue(model));
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
    private String uploadUrl;
    private String model;
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
      this.taskId = value;
      return this;
    }

    /** Sets the audio ID. */
    public Builder audioId(String value) {
      this.audioId = value;
      return this;
    }

    /** Sets the uploaded source audio URL. */
    public Builder uploadUrl(String value) {
      this.uploadUrl = value;
      return this;
    }

    /** Sets the model slug using a typed model value. */
    public Builder model(ReplaceSectionModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = value;
      return this;
    }

    /** Sets the lyrics. */
    public Builder lyrics(String value) {
      this.lyrics = value;
      return this;
    }

    /** Sets the tags. */
    public Builder tags(String value) {
      this.tags = value;
      return this;
    }

    /** Sets the title. */
    public Builder title(String value) {
      this.title = value;
      return this;
    }

    /** Sets the infill start time. The replacement duration must be at least 10 seconds. */
    public Builder infillStartTime(double value) {
      this.infillStartTime = value;
      return this;
    }

    /** Sets the infill end time. Must be greater than infillStartTime. */
    public Builder infillEndTime(double value) {
      this.infillEndTime = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = value;
      return this;
    }

    /** Sets the negative tags. */
    public Builder negativeTags(String value) {
      this.negativeTags = value;
      return this;
    }

    /** Sets the full lyrics. */
    public Builder fullLyrics(String value) {
      this.fullLyrics = value;
      return this;
    }

    /** Builds immutable replace section parameters. */
    public ReplaceSectionParams build() {
      return new ReplaceSectionParams(this);
    }
  }
}
