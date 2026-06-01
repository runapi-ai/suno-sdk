import { createHttpClient, type ClientOptions } from '@runapi.ai/core';
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
 * Suno API client.
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
export class SunoClient {
  public readonly textToMusic: TextToMusic;
  public readonly extendMusic: ExtendMusic;
  public readonly generateArtwork: GenerateArtwork;
  public readonly coverAudio: CoverAudio;
  public readonly addInstrumental: AddInstrumental;
  public readonly addVocals: AddVocals;
  public readonly separateAudioStems: SeparateAudioStems;
  public readonly generateMidi: GenerateMidi;
  public readonly convertAudio: ConvertAudio;
  public readonly visualizeMusic: VisualizeMusic;
  public readonly generateLyrics: GenerateLyrics;
  public readonly getTimestampedLyrics: GetTimestampedLyrics;
  public readonly replaceSection: ReplaceSection;
  public readonly createMashup: CreateMashup;
  public readonly textToSound: TextToSound;
  public readonly generatePersona: GeneratePersona;
  public readonly boostStyle: BoostStyle;
  public readonly voiceToValidationPhrase: VoiceToValidationPhrase;
  public readonly regenerateValidationPhrase: RegenerateValidationPhrase;
  public readonly generateVoice: GenerateVoice;
  public readonly checkVoice: CheckVoice;

  constructor(options: ClientOptions = {}) {
    const http = createHttpClient(options);
    this.textToMusic = new TextToMusic(http);
    this.extendMusic = new ExtendMusic(http);
    this.generateArtwork = new GenerateArtwork(http);
    this.coverAudio = new CoverAudio(http);
    this.addInstrumental = new AddInstrumental(http);
    this.addVocals = new AddVocals(http);
    this.separateAudioStems = new SeparateAudioStems(http);
    this.generateMidi = new GenerateMidi(http);
    this.convertAudio = new ConvertAudio(http);
    this.visualizeMusic = new VisualizeMusic(http);
    this.generateLyrics = new GenerateLyrics(http);
    this.getTimestampedLyrics = new GetTimestampedLyrics(http);
    this.replaceSection = new ReplaceSection(http);
    this.createMashup = new CreateMashup(http);
    this.textToSound = new TextToSound(http);
    this.generatePersona = new GeneratePersona(http);
    this.boostStyle = new BoostStyle(http);
    this.voiceToValidationPhrase = new VoiceToValidationPhrase(http);
    this.regenerateValidationPhrase = new RegenerateValidationPhrase(http);
    this.generateVoice = new GenerateVoice(http);
    this.checkVoice = new CheckVoice(http);
  }
}
