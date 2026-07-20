package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;

/** Extracted target stem and the audio remaining after removing it. */
public final class AdvancedStemPair {
  @JsonProperty("stem_name")
  private String stemName;

  @JsonProperty("extracted_audio")
  private AdvancedStemAudio extractedAudio;

  @JsonProperty("remaining_audio")
  private AdvancedStemAudio remainingAudio;

  /** Returns the target stem name. */
  public String getStemName() {
    return stemName;
  }

  /** Returns the extracted target stem. */
  public AdvancedStemAudio getExtractedAudio() {
    return extractedAudio;
  }

  /** Returns the audio remaining after the target stem was removed. */
  public AdvancedStemAudio getRemainingAudio() {
    return remainingAudio;
  }
}
