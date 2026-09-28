package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Voice resource envelope. */
public final class VoiceResourceResponse {
  @JsonProperty("voice") private VoiceResource voice;
  @JsonProperty("status") private ResourceStatus status;

  public VoiceResource getVoice() { return voice; }
  public ResourceStatus getStatus() { return status; }
}
