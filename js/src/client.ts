import { BaseClient, type ClientOptions } from '@runapi.ai/core';
import { TextToMusic } from './resources/text-to-music';
import { ExtendMusic } from './resources/extend-music';
import { GenerateArtwork } from './resources/generate-artwork';
import { CoverAudio } from './resources/cover-audio';
import { AddInstrumental } from './resources/add-instrumental';
import { AddVocals } from './resources/add-vocals';
import { SeparateAudioStems } from './resources/separate-audio-stems';
import { GenerateMidi } from './resources/generate-midi';
import { ConvertAudio } from './resources/convert-audio';
import { VisualizeMusic } from './resources/visualize-music';
import { GenerateLyrics } from './resources/generate-lyrics';
import { GetTimestampedLyrics } from './resources/get-timestamped-lyrics';
import { ReplaceSection } from './resources/replace-section';
import { CreateMashup } from './resources/create-mashup';
import { TextToSound } from './resources/text-to-sound';
import { GeneratePersona } from './resources/generate-persona';
import { BoostStyle } from './resources/boost-style';
import { VoiceToValidationPhrase } from './resources/voice-to-validation-phrase';
import { RegenerateValidationPhrase } from './resources/regenerate-validation-phrase';
import { GenerateVoice } from './resources/generate-voice';
import { CheckVoice } from './resources/check-voice';

/**
 * Suno music platform client covering song generation, extension, covers, stems,
 * MIDI, lyrics, mashups, sound effects, visualization, personas, and voice cloning.
 *
 * @example
 * ```typescript
 * const client = new SunoClient({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://runapi.ai',
 * });
 *
 * const result = await client.textToMusic.run({
 *   prompt: 'A chill lo-fi beat with soft vocals',
 *   model: 'suno-v4.5-plus',
 * });
 * ```
 */
export class SunoClient extends BaseClient {
  /** Generates songs from a text prompt with configurable vocal mode, style, and persona. */
  public readonly textToMusic: TextToMusic;
  /** Continues an existing track from a specified timestamp, inheriting or overriding its settings. */
  public readonly extendMusic: ExtendMusic;
  /** Creates cover artwork for an existing music task. */
  public readonly generateArtwork: GenerateArtwork;
  /** Re-records vocals over an uploaded audio file with a new style or voice. */
  public readonly coverAudio: CoverAudio;
  /** Generates and adds an instrumental backing track to uploaded audio. */
  public readonly addInstrumental: AddInstrumental;
  /** Generates and adds vocals to an uploaded instrumental track. */
  public readonly addVocals: AddVocals;
  /** Splits a track into individual instrument stems (vocals, drums, bass, guitar, etc.). */
  public readonly separateAudioStems: SeparateAudioStems;
  /** Extracts per-instrument MIDI note data from a generated track. */
  public readonly generateMidi: GenerateMidi;
  /** Converts a generated track to WAV format. */
  public readonly convertAudio: ConvertAudio;
  /** Generates a music visualization video from an existing track. */
  public readonly visualizeMusic: VisualizeMusic;
  /** Produces AI-generated lyrics from a text prompt. */
  public readonly generateLyrics: GenerateLyrics;
  /** Retrieves word-level timing alignment for a track. Synchronous (run only). */
  public readonly getTimestampedLyrics: GetTimestampedLyrics;
  /** Re-generates a time range within an existing track with new lyrics and style. */
  public readonly replaceSection: ReplaceSection;
  /** Blends two audio tracks into a single new composition. */
  public readonly createMashup: CreateMashup;
  /** Generates sound effects (not music) from a text description with optional looping and BPM control. */
  public readonly textToSound: TextToSound;
  /** Creates a reusable style or voice persona from a track's vocals. Synchronous (run only). */
  public readonly generatePersona: GeneratePersona;
  /** Generates style/genre tags from a text description for use in style fields. Synchronous (run only). */
  public readonly boostStyle: BoostStyle;
  /** Step 1 of voice cloning: extracts a validation phrase from a voice recording. */
  public readonly voiceToValidationPhrase: VoiceToValidationPhrase;
  /** Step 2 (optional) of voice cloning: requests a new, easier validation phrase. */
  public readonly regenerateValidationPhrase: RegenerateValidationPhrase;
  /** Step 3 of voice cloning: trains a custom voice from the user's recording of the validation phrase. */
  public readonly generateVoice: GenerateVoice;
  /** Step 4 of voice cloning: checks whether a custom voice is ready for use. Synchronous (run only). */
  public readonly checkVoice: CheckVoice;

  constructor(options: ClientOptions = {}) {
    super(options);
    this.textToMusic = new TextToMusic(this.http);
    this.extendMusic = new ExtendMusic(this.http);
    this.generateArtwork = new GenerateArtwork(this.http);
    this.coverAudio = new CoverAudio(this.http);
    this.addInstrumental = new AddInstrumental(this.http);
    this.addVocals = new AddVocals(this.http);
    this.separateAudioStems = new SeparateAudioStems(this.http);
    this.generateMidi = new GenerateMidi(this.http);
    this.convertAudio = new ConvertAudio(this.http);
    this.visualizeMusic = new VisualizeMusic(this.http);
    this.generateLyrics = new GenerateLyrics(this.http);
    this.getTimestampedLyrics = new GetTimestampedLyrics(this.http);
    this.replaceSection = new ReplaceSection(this.http);
    this.createMashup = new CreateMashup(this.http);
    this.textToSound = new TextToSound(this.http);
    this.generatePersona = new GeneratePersona(this.http);
    this.boostStyle = new BoostStyle(this.http);
    this.voiceToValidationPhrase = new VoiceToValidationPhrase(this.http);
    this.regenerateValidationPhrase = new RegenerateValidationPhrase(this.http);
    this.generateVoice = new GenerateVoice(this.http);
    this.checkVoice = new CheckVoice(this.http);
  }
}
