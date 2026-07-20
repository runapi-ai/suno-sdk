package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Collections;
import java.util.List;

/** Legacy separated stem URLs plus advanced extracted/remaining pairs. */
public final class SeparatedAudio {
  @JsonProperty("vocal_url") private String vocalUrl;
  @JsonProperty("instrumental_url") private String instrumentalUrl;
  @JsonProperty("backing_vocals_url") private String backingVocalsUrl;
  @JsonProperty("bass_url") private String bassUrl;
  @JsonProperty("brass_url") private String brassUrl;
  @JsonProperty("drums_url") private String drumsUrl;
  @JsonProperty("fx_url") private String fxUrl;
  @JsonProperty("guitar_url") private String guitarUrl;
  @JsonProperty("keyboard_url") private String keyboardUrl;
  @JsonProperty("percussion_url") private String percussionUrl;
  @JsonProperty("piano_url") private String pianoUrl;
  @JsonProperty("strings_url") private String stringsUrl;
  @JsonProperty("synth_url") private String synthUrl;
  @JsonProperty("woodwinds_url") private String woodwindsUrl;
  @JsonProperty("pairs") private List<AdvancedStemPair> pairs;

  public String getVocalUrl() { return vocalUrl; }
  public String getInstrumentalUrl() { return instrumentalUrl; }
  public String getBackingVocalsUrl() { return backingVocalsUrl; }
  public String getBassUrl() { return bassUrl; }
  public String getBrassUrl() { return brassUrl; }
  public String getDrumsUrl() { return drumsUrl; }
  public String getFxUrl() { return fxUrl; }
  public String getGuitarUrl() { return guitarUrl; }
  public String getKeyboardUrl() { return keyboardUrl; }
  public String getPercussionUrl() { return percussionUrl; }
  public String getPianoUrl() { return pianoUrl; }
  public String getStringsUrl() { return stringsUrl; }
  public String getSynthUrl() { return synthUrl; }
  public String getWoodwindsUrl() { return woodwindsUrl; }

  /** Returns advanced extracted/remaining audio pairs. */
  public List<AdvancedStemPair> getPairs() {
    return pairs == null ? null : Collections.unmodifiableList(pairs);
  }
}
