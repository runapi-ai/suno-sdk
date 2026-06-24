package ai.runapi.suno;

import ai.runapi.core.BaseClient;
import ai.runapi.core.ClientOptions;
import ai.runapi.core.http.HttpTransport;
import java.net.URI;
import ai.runapi.suno.resources.AddInstrumentalResource;
import ai.runapi.suno.resources.AddVocalsResource;
import ai.runapi.suno.resources.BoostStyleResource;
import ai.runapi.suno.resources.CheckVoiceResource;
import ai.runapi.suno.resources.ConvertAudioResource;
import ai.runapi.suno.resources.CoverAudioResource;
import ai.runapi.suno.resources.CreateMashupResource;
import ai.runapi.suno.resources.ExtendMusicResource;
import ai.runapi.suno.resources.GenerateArtworkResource;
import ai.runapi.suno.resources.GenerateLyricsResource;
import ai.runapi.suno.resources.GenerateMidiResource;
import ai.runapi.suno.resources.GeneratePersonaResource;
import ai.runapi.suno.resources.GenerateVoiceResource;
import ai.runapi.suno.resources.GetTimestampedLyricsResource;
import ai.runapi.suno.resources.RegenerateValidationPhraseResource;
import ai.runapi.suno.resources.ReplaceSectionResource;
import ai.runapi.suno.resources.SeparateAudioStemsResource;
import ai.runapi.suno.resources.TextToMusicResource;
import ai.runapi.suno.resources.TextToSoundResource;
import ai.runapi.suno.resources.VisualizeMusicResource;
import ai.runapi.suno.resources.VoiceToValidationPhraseResource;

/** Suno model-family Java SDK client. */
public final class SunoClient extends BaseClient {
  private final AddInstrumentalResource addInstrumental;
  private final AddVocalsResource addVocals;
  private final BoostStyleResource boostStyle;
  private final CheckVoiceResource checkVoice;
  private final ConvertAudioResource convertAudio;
  private final CoverAudioResource coverAudio;
  private final CreateMashupResource createMashup;
  private final ExtendMusicResource extendMusic;
  private final GenerateArtworkResource generateArtwork;
  private final GenerateLyricsResource generateLyrics;
  private final GenerateMidiResource generateMidi;
  private final GeneratePersonaResource generatePersona;
  private final GenerateVoiceResource generateVoice;
  private final GetTimestampedLyricsResource getTimestampedLyrics;
  private final RegenerateValidationPhraseResource regenerateValidationPhrase;
  private final ReplaceSectionResource replaceSection;
  private final SeparateAudioStemsResource separateAudioStems;
  private final TextToMusicResource textToMusic;
  private final TextToSoundResource textToSound;
  private final VisualizeMusicResource visualizeMusic;
  private final VoiceToValidationPhraseResource voiceToValidationPhrase;

  private SunoClient(ClientOptions options) {
    super(options);
    this.addInstrumental = new AddInstrumentalResource(transport(), options());
    this.addVocals = new AddVocalsResource(transport(), options());
    this.boostStyle = new BoostStyleResource(transport(), options());
    this.checkVoice = new CheckVoiceResource(transport(), options());
    this.convertAudio = new ConvertAudioResource(transport(), options());
    this.coverAudio = new CoverAudioResource(transport(), options());
    this.createMashup = new CreateMashupResource(transport(), options());
    this.extendMusic = new ExtendMusicResource(transport(), options());
    this.generateArtwork = new GenerateArtworkResource(transport(), options());
    this.generateLyrics = new GenerateLyricsResource(transport(), options());
    this.generateMidi = new GenerateMidiResource(transport(), options());
    this.generatePersona = new GeneratePersonaResource(transport(), options());
    this.generateVoice = new GenerateVoiceResource(transport(), options());
    this.getTimestampedLyrics = new GetTimestampedLyricsResource(transport(), options());
    this.regenerateValidationPhrase = new RegenerateValidationPhraseResource(transport(), options());
    this.replaceSection = new ReplaceSectionResource(transport(), options());
    this.separateAudioStems = new SeparateAudioStemsResource(transport(), options());
    this.textToMusic = new TextToMusicResource(transport(), options());
    this.textToSound = new TextToSoundResource(transport(), options());
    this.visualizeMusic = new VisualizeMusicResource(transport(), options());
    this.voiceToValidationPhrase = new VoiceToValidationPhraseResource(transport(), options());
  }

  /** Creates a new SunoClient builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Add Instrumental operations. */
  public AddInstrumentalResource addInstrumental() {
    return addInstrumental;
  }

  /** Add Vocals operations. */
  public AddVocalsResource addVocals() {
    return addVocals;
  }

  /** Boost Style operations. */
  public BoostStyleResource boostStyle() {
    return boostStyle;
  }

  /** Check Voice operations. */
  public CheckVoiceResource checkVoice() {
    return checkVoice;
  }

  /** Convert Audio operations. */
  public ConvertAudioResource convertAudio() {
    return convertAudio;
  }

  /** Cover Audio operations. */
  public CoverAudioResource coverAudio() {
    return coverAudio;
  }

  /** Create Mashup operations. */
  public CreateMashupResource createMashup() {
    return createMashup;
  }

  /** Extend Music operations. */
  public ExtendMusicResource extendMusic() {
    return extendMusic;
  }

  /** Generate Artwork operations. */
  public GenerateArtworkResource generateArtwork() {
    return generateArtwork;
  }

  /** Generate Lyrics operations. */
  public GenerateLyricsResource generateLyrics() {
    return generateLyrics;
  }

  /** Generate Midi operations. */
  public GenerateMidiResource generateMidi() {
    return generateMidi;
  }

  /** Generate Persona operations. */
  public GeneratePersonaResource generatePersona() {
    return generatePersona;
  }

  /** Generate Voice operations. */
  public GenerateVoiceResource generateVoice() {
    return generateVoice;
  }

  /** Get Timestamped Lyrics operations. */
  public GetTimestampedLyricsResource getTimestampedLyrics() {
    return getTimestampedLyrics;
  }

  /** Regenerate Validation Phrase operations. */
  public RegenerateValidationPhraseResource regenerateValidationPhrase() {
    return regenerateValidationPhrase;
  }

  /** Replace Section operations. */
  public ReplaceSectionResource replaceSection() {
    return replaceSection;
  }

  /** Separate Audio Stems operations. */
  public SeparateAudioStemsResource separateAudioStems() {
    return separateAudioStems;
  }

  /** Text To Music operations. */
  public TextToMusicResource textToMusic() {
    return textToMusic;
  }

  /** Text To Sound operations. */
  public TextToSoundResource textToSound() {
    return textToSound;
  }

  /** Visualize Music operations. */
  public VisualizeMusicResource visualizeMusic() {
    return visualizeMusic;
  }

  /** Voice To Validation Phrase operations. */
  public VoiceToValidationPhraseResource voiceToValidationPhrase() {
    return voiceToValidationPhrase;
  }

  /** Builder for {@link SunoClient}. */
  public static final class Builder extends BaseClient.Builder<Builder> {
    private Builder() {}

    /** Sets the API key. If omitted, the SDK reads {@code RUNAPI_API_KEY}. */
    @Override
    public Builder apiKey(String value) {
      return super.apiKey(value);
    }

    /** Sets the RunAPI base URL. If omitted, the SDK reads {@code RUNAPI_BASE_URL}. */
    @Override
    public Builder baseUrl(String value) {
      return super.baseUrl(value);
    }

    /** Sets the RunAPI base URL from a URI. */
    @Override
    public Builder baseUrl(URI value) {
      return super.baseUrl(value);
    }

    /** Sets a custom HTTP transport. User-provided transports are not closed by SDK clients. */
    @Override
    public Builder transport(HttpTransport value) {
      return super.transport(value);
    }

    /** Builds an immutable SunoClient. */
    @Override
    public SunoClient build() {
      return new SunoClient(options.build());
    }
  }
}
