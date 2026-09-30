package ai.runapi.suno.types;
import java.util.LinkedHashMap;
import java.util.Map;
/** Parameters for Suno audio actions. */
public final class AudioActionParams {
  private final Map<String, Object> values;
  public AudioActionParams(Map<String, Object> values) {
    this.values = new LinkedHashMap<>(values);
  }
  public static Builder builder() { return new Builder(); }
  public Map<String, Object> toMap() { return SunoParamUtils.compact(values); }
  public static final class Builder {
    private final Map<String,Object> values = new LinkedHashMap<>();
    public Builder model(String value) { values.put("model", value); return this; }
    public Builder sourceTaskId(String value) { values.put("source_task_id", value); return this; }
    public Builder audioId(String value) { values.put("audio_id", value); return this; }
    public Builder audioUrl(String value) { values.put("audio_url", value); return this; }
    public Builder prompt(String value) { values.put("prompt", value); return this; }
    public Builder startSeconds(double value) { values.put("start_seconds", value); return this; }
    public Builder endSeconds(double value) { values.put("end_seconds", value); return this; }
    public Builder variationCategory(String value) { values.put("variation_category", value); return this; }
    public Builder callbackUrl(String value) { values.put("callback_url", value); return this; }
    public AudioActionParams build() { return new AudioActionParams(values); }
  }
}
