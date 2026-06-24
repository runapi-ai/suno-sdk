package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;

/** Response for get timestamped lyrics operations. */
public class GetTimestampedLyricsResponse {
  @JsonProperty("id")
  private String id;

  @JsonProperty("error")
  private String error;

  @JsonProperty("aligned_words")
  private List<Map<String, Object>> alignedWords;

  private final Map<String, JsonNode> extraFields = new LinkedHashMap<String, JsonNode>();

  /** Returns the response ID. */
  public String getId() {
    return id;
  }

  /** Returns the error message, if the request failed. */
  public String getError() {
    return error;
  }

  /** Returns the aligned words, when present. */
  public List<Map<String, Object>> getAlignedWords() {
    return alignedWords == null ? null : Collections.unmodifiableList(alignedWords);
  }

  /** Returns unrecognized response fields preserved from the API response. */
  @JsonAnyGetter
  public Map<String, JsonNode> extraFields() {
    return Collections.unmodifiableMap(extraFields);
  }

  @JsonAnySetter
  void putExtraField(String name, JsonNode value) {
    extraFields.put(name, value);
  }
}
