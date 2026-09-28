package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Persona creation result. */
public final class PersonaCreationResponse {
  @JsonProperty("persona") private PersonaResource persona;
  @JsonProperty("error") private String error;

  public PersonaResource getPersona() { return persona; }
  public String getError() { return error; }
}
