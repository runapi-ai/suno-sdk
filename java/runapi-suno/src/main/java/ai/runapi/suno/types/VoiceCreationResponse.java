package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Voice creation result. */
public final class VoiceCreationResponse {
  @JsonProperty("voice") private VoiceResource voice;
  @JsonProperty("error") private String error;

  public VoiceResource getVoice() { return voice; }
  public String getError() { return error; }
}
