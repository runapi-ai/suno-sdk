package ai.runapi.suno.types;

import ai.runapi.core.billing.TaskBillingFacts;
import com.fasterxml.jackson.annotation.JsonProperty;

/** Voice creation result with task reservation, settlement, and refund billing facts. */
public final class VoiceCreationResponse {
  @JsonProperty("voice") private VoiceResource voice;
  @JsonProperty("billing") private TaskBillingFacts billing;
  @JsonProperty("error") private String error;

  public VoiceResource getVoice() { return voice; }
  public TaskBillingFacts getBilling() { return billing; }
  public String getError() { return error; }
}
