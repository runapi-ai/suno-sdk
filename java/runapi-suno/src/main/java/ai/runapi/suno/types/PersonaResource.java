package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** A RunAPI-owned persona resource. */
public final class PersonaResource {
  @JsonProperty("id") private String id;
  @JsonProperty("name") private String name;
  @JsonProperty("description") private String description;

  public String getId() { return id; }
  public String getName() { return name; }
  public String getDescription() { return description; }
}
