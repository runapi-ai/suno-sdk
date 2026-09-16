package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Voice resource envelope with provenance billing. */
public final class VoiceResourceResponse {
  @JsonProperty("voice") private VoiceResource voice;
  @JsonProperty("status") private ResourceStatus status;
  @JsonProperty("billing") private ResourceBilling billing;

  public VoiceResource getVoice() { return voice; }
  public ResourceStatus getStatus() { return status; }
  public ResourceBilling getBilling() { return billing; }
}
