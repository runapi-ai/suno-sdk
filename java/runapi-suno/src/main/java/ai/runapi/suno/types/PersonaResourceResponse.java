package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Persona resource envelope. */
public final class PersonaResourceResponse {
  @JsonProperty("persona") private PersonaResource persona;
  @JsonProperty("status") private ResourceStatus status;

  public PersonaResource getPersona() { return persona; }
  public ResourceStatus getStatus() { return status; }
}
