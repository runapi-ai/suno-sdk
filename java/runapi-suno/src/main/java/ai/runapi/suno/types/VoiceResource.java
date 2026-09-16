package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** A RunAPI-owned voice resource. */
public final class VoiceResource {
  @JsonProperty("id") private String id;
  @JsonProperty("name") private String name;

  public String getId() { return id; }
  public String getName() { return name; }
}
