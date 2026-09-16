package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Persona resource envelope with provenance billing. */
public final class PersonaResourceResponse {
  @JsonProperty("persona") private PersonaResource persona;
  @JsonProperty("status") private ResourceStatus status;
  @JsonProperty("billing") private ResourceBilling billing;

  public PersonaResource getPersona() { return persona; }
  public ResourceStatus getStatus() { return status; }
  public ResourceBilling getBilling() { return billing; }
}
