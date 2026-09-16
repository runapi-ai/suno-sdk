package ai.runapi.suno.types;

import ai.runapi.core.billing.TaskBillingFacts;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Persona creation result. Billing is the request's task billing shape:
 * reservation, settlement, and refund facts, each of which may be absent.
 */
public final class PersonaCreationResponse {
  @JsonProperty("persona") private PersonaResource persona;
  @JsonProperty("billing") private TaskBillingFacts billing;
  @JsonProperty("error") private String error;

  public PersonaResource getPersona() { return persona; }
  public TaskBillingFacts getBilling() { return billing; }
  public String getError() { return error; }
}
