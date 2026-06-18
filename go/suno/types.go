package suno

// SunoModel selects the Suno music generation engine version.
type SunoModel string

// VocalGender controls the vocal gender of generated singing.
type VocalGender string

// PersonaType distinguishes between style personas and voice personas.
type PersonaType string

// ParameterMode controls whether [ExtendMusicParams] inherits settings from the source
// track ("source") or lets you override style, title, and continue_at ("custom").
type ParameterMode string

// VocalMode controls vocal generation behavior for music creation.
type VocalMode string

// GenerationStage indicates the current phase of a multi-step music generation task.
type GenerationStage string

// TaskStatus is the async task lifecycle state (e.g. "processing", "completed", "failed").
type TaskStatus string

// SoundKey is a musical key (e.g. "C", "Am") for sound effects generation.
type SoundKey string

// ValidationPhraseLanguage controls which language the voice-cloning validation phrase is
// generated in. Used by [VoiceToValidationPhraseParams]: the service generates a short
// sentence in this language for the user to read back, and [GenerateVoice] compares the
// recording to clone the voice.
type ValidationPhraseLanguage string

// SingerSkillLevel indicates the singing ability of the voice being cloned,
// which helps the model calibrate expectations during voice generation.
type SingerSkillLevel string

const (
	// ModelV55 is the latest generation with the highest music quality and style range.
	ModelV55 SunoModel = "suno-v5.5"
	// ModelV5 offers near-V5.5 quality with faster generation.
	ModelV5 SunoModel = "suno-v5"
	// ModelV45Plus is V4.5 with extended style support.
	ModelV45Plus SunoModel = "suno-v4.5-plus"
	// ModelV45All is the broadest V4.5 variant covering all styles.
	ModelV45All SunoModel = "suno-v4.5-all"
	// ModelV45 is the base V4.5 model.
	ModelV45 SunoModel = "suno-v4.5"
	// ModelV4 is the earliest available generation.
	ModelV4 SunoModel = "suno-v4"

	GenderMale   VocalGender = "male"
	GenderFemale VocalGender = "female"
	// PersonaTypeStyle applies a persona's style (genre, mood) without changing the voice.
	PersonaTypeStyle PersonaType = "style"
	// PersonaTypeVoice applies a persona's cloned voice characteristics.
	PersonaTypeVoice PersonaType = "voice"
	// ParameterModeSource inherits style, title, and continue_at from the source track.
	ParameterModeSource ParameterMode = "source"
	// ParameterModeCustom requires you to set Style, Title, and ContinueAt explicitly.
	ParameterModeCustom ParameterMode = "custom"
	// VocalModeAutoLyrics generates lyrics automatically from the Prompt field.
	VocalModeAutoLyrics VocalMode = "auto_lyrics"
	// VocalModeExactLyrics sings the exact text provided in the Lyrics field.
	VocalModeExactLyrics VocalMode = "exact_lyrics"
	// VocalModeInstrumental produces music with no vocals.
	VocalModeInstrumental VocalMode = "instrumental"

	ValidationLanguageEnglish    ValidationPhraseLanguage = "en"
	ValidationLanguageChinese    ValidationPhraseLanguage = "zh"
	ValidationLanguageSpanish    ValidationPhraseLanguage = "es"
	ValidationLanguageFrench     ValidationPhraseLanguage = "fr"
	ValidationLanguagePortuguese ValidationPhraseLanguage = "pt"
	ValidationLanguageGerman     ValidationPhraseLanguage = "de"
	ValidationLanguageJapanese   ValidationPhraseLanguage = "ja"
	ValidationLanguageKorean     ValidationPhraseLanguage = "ko"
	ValidationLanguageHindi      ValidationPhraseLanguage = "hi"
	ValidationLanguageRussian    ValidationPhraseLanguage = "ru"

	SingerSkillBeginner     SingerSkillLevel = "beginner"
	SingerSkillIntermediate SingerSkillLevel = "intermediate"
	SingerSkillAdvanced     SingerSkillLevel = "advanced"
	SingerSkillProfessional SingerSkillLevel = "professional"
)

// SunoBaseParams holds fields shared across most Suno music generation endpoints.
// Embed this in specific params structs. StyleWeight, WeirdnessConstraint, and AudioWeight
// are generation knobs ranging from 0 to 1 that tune style adherence, creative deviation, and
// audio fidelity respectively.
type SunoBaseParams struct {
	CallbackURL         string      `json:"callback_url,omitempty" help:"optional; webhook URL for async notifications"`
	Model               SunoModel   `json:"model,omitempty" help:"required; model slug"`
	VocalGender         VocalGender `json:"vocal_gender,omitempty" help:"optional; vocal gender"`
	StyleWeight         *float64    `json:"style_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
	WeirdnessConstraint *float64    `json:"weirdness_constraint,omitempty" help:"optional; 0-1, 2 decimal places"`
	AudioWeight         *float64    `json:"audio_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
}

// TextToMusicParams configures music generation from text.
// VocalMode determines how lyrics are handled: [VocalModeAutoLyrics] auto-generates lyrics from Prompt,
// [VocalModeExactLyrics] sings the exact Lyrics text, and [VocalModeInstrumental] produces no vocals.
type TextToMusicParams struct {
	SunoBaseParams
	VocalMode       VocalMode   `json:"vocal_mode" help:"required; vocal generation mode"`
	Prompt          string      `json:"prompt,omitempty" help:"song brief for automatic lyrics"`
	Lyrics          string      `json:"lyrics,omitempty" help:"exact lyrics to sing"`
	Style           string      `json:"style,omitempty" help:"music style"`
	Title           string      `json:"title,omitempty" help:"music title"`
	NegativeTags    string      `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
	PersonaID       string      `json:"persona_id,omitempty" help:"optional; persona ID"`
	PersonaType     PersonaType `json:"persona_type,omitempty" help:"optional; persona type"`
	DurationSeconds *int        `json:"duration_seconds,omitempty" help:"optional; duration in seconds"`
	ContinueAt      *float64    `json:"continue_at,omitempty" help:"optional; timestamp in seconds to continue from"`
	Endpoint        string      `json:"endpoint,omitempty" help:"optional; API endpoint override"`
}

// ExtendMusicParams configures music extension from an existing track.
// Provide exactly one source: TaskID, AudioID, AudioURL, or UploadURL.
// ParameterMode controls whether to inherit the source track's settings ([ParameterModeSource])
// or override Style, Title, and ContinueAt ([ParameterModeCustom]).
type ExtendMusicParams struct {
	SunoBaseParams
	TaskID        string        `json:"task_id,omitempty" help:"optional; source task ID to extend"`
	AudioID       string        `json:"audio_id,omitempty" help:"optional; source audio ID to extend"`
	AudioURL      string        `json:"audio_url,omitempty" help:"optional; source audio URL to extend"`
	UploadURL     string        `json:"upload_url,omitempty" help:"optional; uploaded source audio URL to extend"`
	ParameterMode ParameterMode `json:"parameter_mode" help:"required; source or custom"`
	Instrumental  *bool         `json:"instrumental,omitempty" help:"optional; true=no vocals"`
	Prompt        string        `json:"prompt,omitempty" help:"extension brief; required when parameter_mode=custom for task/audio ID extensions, or when parameter_mode=source for uploaded audio"`
	Lyrics        string        `json:"lyrics,omitempty" help:"exact lyrics for custom uploaded audio extensions"`
	Style         string        `json:"style,omitempty" help:"required in custom parameter mode; style preset"`
	Title         string        `json:"title,omitempty" help:"required in custom parameter mode; song title (<=80-100)"`
	ContinueAt    *float64      `json:"continue_at,omitempty" help:"required in custom parameter mode; seconds, >0 and <total duration"`
	PersonaID     string        `json:"persona_id,omitempty" help:"optional; persona ID"`
	PersonaType   PersonaType   `json:"persona_type,omitempty" help:"optional; persona type"`
	Model         SunoModel     `json:"model" help:"required; model slug"`
	NegativeTags  string        `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
}

// GenerateArtworkParams configures cover artwork generation for an existing music task.
type GenerateArtworkParams struct {
	TaskID      string `json:"task_id" help:"required; source music task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// CoverAudioParams configures a vocal cover of an uploaded audio file.
// VocalMode works the same as in [TextToMusicParams]: auto_lyrics, exact_lyrics, or instrumental.
type CoverAudioParams struct {
	SunoBaseParams
	UploadURL    string      `json:"upload_url" help:"required; URL of audio file to cover"`
	VocalMode    VocalMode   `json:"vocal_mode" help:"required; vocal generation mode"`
	Prompt       string      `json:"prompt,omitempty" help:"cover brief for automatic lyrics"`
	Lyrics       string      `json:"lyrics,omitempty" help:"exact cover lyrics to sing"`
	Model        SunoModel   `json:"model" help:"required; model slug"`
	Style        string      `json:"style,omitempty" help:"music style"`
	Title        string      `json:"title,omitempty" help:"music title"`
	PersonaID    string      `json:"persona_id,omitempty" help:"optional; persona ID"`
	PersonaType  PersonaType `json:"persona_type,omitempty" help:"optional; persona type"`
	NegativeTags string      `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
}

// AddInstrumentalParams configures adding an instrumental backing track to uploaded audio.
// Tags and NegativeTags control the generated style; pass empty strings if no preference.
type AddInstrumentalParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Tags         string    `json:"tags" help:"required; style/genre tags"`
	Model        SunoModel `json:"model" help:"required; model slug"`
}

// AddVocalsParams configures adding vocals to an uploaded instrumental track.
type AddVocalsParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Lyrics       string    `json:"lyrics" help:"required; vocal lyrics"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Style        string    `json:"style" help:"required; style preset"`
	Model        SunoModel `json:"model" help:"required; model slug"`
}

// SeparateAudioStemsParams configures stem separation, splitting a track into individual instrument stems
// (vocals, drums, bass, guitar, piano, etc.).
type SeparateAudioStemsParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	Type        string `json:"type,omitempty" help:"optional; separation type"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// GenerateMidiParams configures MIDI extraction from an existing music task, producing per-instrument note data.
type GenerateMidiParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// ConvertAudioParams configures conversion of a generated track to WAV format.
type ConvertAudioParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// VisualizeMusicParams configures generation of a music visualization video from an existing track.
type VisualizeMusicParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
	Author      string `json:"author,omitempty" help:"optional; author name for the video"`
	DomainName  string `json:"domain_name,omitempty" help:"optional; domain name watermark"`
}

// GenerateLyricsParams configures AI-powered lyrics generation from a text prompt.
type GenerateLyricsParams struct {
	Prompt      string `json:"prompt" help:"required; lyrics generation prompt"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// GetTimestampedLyricsParams retrieves word-level timing data for a generated track.
// This is synchronous (use Run directly, no Create/Get polling).
type GetTimestampedLyricsParams struct {
	TaskID  string `json:"task_id" help:"required; source task ID"`
	AudioID string `json:"audio_id" help:"required; audio ID within the task"`
}

// ReplaceSectionParams configures replacing a time range within an existing track with new lyrics and style.
// InfillStartTime and InfillEndTime define the section boundaries in seconds.
type ReplaceSectionParams struct {
	TaskID          string  `json:"task_id" help:"required; source task ID"`
	AudioID         string  `json:"audio_id" help:"required; audio ID within the task"`
	Lyrics          string  `json:"lyrics" help:"required; replacement section lyrics"`
	Tags            string  `json:"tags" help:"required; style/genre tags"`
	Title           string  `json:"title" help:"required; song title"`
	InfillStartTime float64 `json:"infill_start_time" help:"required; section start time in seconds"`
	InfillEndTime   float64 `json:"infill_end_time" help:"required; section end time in seconds"`
	CallbackURL     string  `json:"callback_url,omitempty" help:"optional; webhook URL"`
	NegativeTags    string  `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
	FullLyrics      string  `json:"full_lyrics,omitempty" help:"optional; complete song lyrics for context"`
}

// GeneratePersonaParams creates a reusable persona (style or voice) from an existing music task's vocals.
// The persona can then be referenced by ID in generation params. This is synchronous (use Run directly).
type GeneratePersonaParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID with reference vocals"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	Name        string `json:"name" help:"required; persona name"`
	Description string `json:"description" help:"required; persona description"`
}

// BoostStyleParams generates style/genre tags from a text description.
// Useful for filling Style fields in other params. This is synchronous (use Run directly).
type BoostStyleParams struct {
	Description string `json:"description" help:"required; style description to generate tags from"`
}

// TextToSoundParams configures sound effect generation (not music -- use [TextToMusicParams] for songs).
// Supports loopable audio, BPM control, and musical key selection.
type TextToSoundParams struct {
	Prompt      string    `json:"prompt" help:"required; sound description (<=500 chars)"`
	Model       SunoModel `json:"model" help:"required; model slug"`
	SoundLoop   *bool     `json:"sound_loop,omitempty" help:"optional; true=loopable audio, default false"`
	SoundTempo  *int      `json:"sound_tempo,omitempty" help:"optional; BPM 1-300"`
	SoundKey    SoundKey  `json:"sound_key,omitempty" help:"optional; musical key; default Any"`
	GrabLyrics  *bool     `json:"grab_lyrics,omitempty" help:"optional; capture lyric subtitles, default false"`
	CallbackURL string    `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// VoiceToValidationPhraseParams starts the voice cloning pipeline. Upload a voice recording and specify
// the vocal segment boundaries. The response contains a validation phrase that the user must re-record
// and submit via [GenerateVoiceParams]. This is step 1 of 4 in the voice cloning workflow:
// VoiceToValidationPhrase -> RegenerateValidationPhrase (optional) -> GenerateVoice -> CheckVoice.
type VoiceToValidationPhraseParams struct {
	VoiceURL          string                   `json:"voice_url" help:"required; source voice recording URL"`
	VocalStartSeconds int                      `json:"vocal_start_seconds" help:"required; source vocal segment start time in seconds"`
	VocalEndSeconds   int                      `json:"vocal_end_seconds" help:"required; source vocal segment end time in seconds"`
	Language          ValidationPhraseLanguage `json:"language,omitempty" help:"optional; language code"`
	CallbackURL       string                   `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// RegenerateValidationPhraseParams requests a new validation phrase for an existing voice cloning task,
// in case the original phrase was too difficult to pronounce. Step 2 (optional) of the voice cloning workflow.
type RegenerateValidationPhraseParams struct {
	TaskID      string `json:"task_id" help:"required; prior validation phrase task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// GenerateVoiceParams submits the user's recording of the validation phrase to train a custom voice.
// TaskID is from the prior VoiceToValidationPhrase task; VerifyURL is the user's recording of the phrase.
// Step 3 of the voice cloning workflow.
type GenerateVoiceParams struct {
	TaskID           string           `json:"task_id" help:"required; prior validation phrase task ID"`
	VerifyURL        string           `json:"verify_url" help:"required; user recording URL of the validation phrase"`
	VoiceName        string           `json:"voice_name,omitempty" help:"optional; custom voice display name"`
	Description      string           `json:"description,omitempty" help:"optional; custom voice description"`
	Style            string           `json:"style,omitempty" help:"optional; style preset"`
	SingerSkillLevel SingerSkillLevel `json:"singer_skill_level,omitempty" help:"optional; singer skill level"`
	CallbackURL      string           `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

// CheckVoiceParams checks whether a custom voice from [GenerateVoice] is ready for use.
// This is synchronous (use Run directly). Step 4 (final) of the voice cloning workflow.
type CheckVoiceParams struct {
	TaskID string `json:"task_id" help:"required; custom voice task ID"`
}

// CreateMashupParams configures a mashup of exactly two audio tracks into a new composition.
// VocalMode controls how vocals are generated for the mashup.
type CreateMashupParams struct {
	SunoBaseParams
	UploadURLList [2]string   `json:"upload_url_list" help:"required; two audio URLs to mashup"`
	VocalMode     VocalMode   `json:"vocal_mode" help:"required; vocal generation mode"`
	Prompt        string      `json:"prompt,omitempty" help:"mashup brief for automatic lyrics"`
	Lyrics        string      `json:"lyrics,omitempty" help:"exact mashup lyrics to sing"`
	Style         string      `json:"style,omitempty" help:"music style"`
	Title         string      `json:"title,omitempty" help:"music title"`
	Model         SunoModel   `json:"model" help:"required; model slug"`
	PersonaID     string      `json:"persona_id,omitempty" help:"optional; persona ID"`
	PersonaType   PersonaType `json:"persona_type,omitempty" help:"optional; persona type"`
}

// AsyncTaskResponse carries the task ID, lifecycle status, generation stage, and error for Suno async operations.
type AsyncTaskResponse struct {
	ID              string          `json:"id"`
	Status          TaskStatus      `json:"status"`
	GenerationStage GenerationStage `json:"generation_stage,omitempty"`
	Error           string          `json:"error,omitempty"`
}

func (r AsyncTaskResponse) GetID() string     { return r.ID }
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }
func (r AsyncTaskResponse) GetError() string  { return r.Error }

// Audio holds metadata and URLs for a generated music track.
type Audio struct {
	ID             string   `json:"id"`
	AudioURL       string   `json:"audio_url"`
	StreamAudioURL string   `json:"stream_audio_url,omitempty"`
	ImageURL       string   `json:"image_url,omitempty"`
	Lyrics         string   `json:"lyrics,omitempty"`
	ModelName      string   `json:"model_name,omitempty"`
	Title          string   `json:"title,omitempty"`
	Tags           []string `json:"tags,omitempty"`
	Duration       float64  `json:"duration,omitempty"`
}

// SoundAudio holds metadata and URLs for a generated sound effect (distinct from music [Audio]).
type SoundAudio struct {
	ID             string   `json:"id"`
	AudioURL       string   `json:"audio_url"`
	StreamAudioURL string   `json:"stream_audio_url,omitempty"`
	ImageURL       string   `json:"image_url,omitempty"`
	Prompt         string   `json:"prompt,omitempty"`
	ModelName      string   `json:"model_name,omitempty"`
	Title          string   `json:"title,omitempty"`
	Tags           []string `json:"tags,omitempty"`
	Duration       float64  `json:"duration,omitempty"`
}

// TextToMusicResponse is the completed result of a text-to-music task.
type TextToMusicResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

// ExtendMusicResponse is the completed result of a music extension task.
// OriginalTaskID references the source track that was extended.
type ExtendMusicResponse struct {
	AsyncTaskResponse
	OriginalTaskID string  `json:"original_task_id,omitempty"`
	Audios         []Audio `json:"audios,omitempty"`
}

// CoverImage holds a URL to a generated cover artwork image.
type CoverImage struct {
	URL string `json:"url"`
}

// GenerateArtworkResponse is the completed result of an artwork generation task.
type GenerateArtworkResponse struct {
	AsyncTaskResponse
	Covers []CoverImage `json:"covers,omitempty"`
}

// CoverAudioResponse is the completed result of a cover audio task.
type CoverAudioResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

// AddInstrumentalResponse is the completed result of adding an instrumental track.
type AddInstrumentalResponse struct{ TextToMusicResponse }

// AddVocalsResponse is the completed result of adding vocals to a track.
type AddVocalsResponse struct{ TextToMusicResponse }

// TextToSoundResponse is the completed result of a sound effect generation task.
type TextToSoundResponse struct {
	AsyncTaskResponse
	Audios []SoundAudio `json:"audios,omitempty"`
}

// SeparatedAudio holds URLs for each isolated instrument stem after separation.
type SeparatedAudio struct {
	VocalURL         string `json:"vocal_url,omitempty"`
	InstrumentalURL  string `json:"instrumental_url,omitempty"`
	BackingVocalsURL string `json:"backing_vocals_url,omitempty"`
	BassURL          string `json:"bass_url,omitempty"`
	BrassURL         string `json:"brass_url,omitempty"`
	DrumsURL         string `json:"drums_url,omitempty"`
	FXURL            string `json:"fx_url,omitempty"`
	GuitarURL        string `json:"guitar_url,omitempty"`
	KeyboardURL      string `json:"keyboard_url,omitempty"`
	PercussionURL    string `json:"percussion_url,omitempty"`
	PianoURL         string `json:"piano_url,omitempty"`
	StringsURL       string `json:"strings_url,omitempty"`
	SynthURL         string `json:"synth_url,omitempty"`
	WoodwindsURL     string `json:"woodwinds_url,omitempty"`
}

// SeparateAudioStemsResponse is the completed result of a stem separation task.
type SeparateAudioStemsResponse struct {
	AsyncTaskResponse
	SeparatedAudios *SeparatedAudio `json:"separated_audios,omitempty"`
}

// MIDINote represents a single note event within a MIDI instrument track.
type MIDINote struct {
	Pitch     int     `json:"pitch"`
	StartTime float64 `json:"start_time"`
	EndTime   float64 `json:"end_time"`
	Velocity  float64 `json:"velocity"`
}

// MIDIInstrument groups all notes for a single instrument extracted from a track.
type MIDIInstrument struct {
	Name  string     `json:"name"`
	Notes []MIDINote `json:"notes,omitempty"`
}

// GenerateMidiResponse is the completed result of a MIDI extraction task.
type GenerateMidiResponse struct {
	AsyncTaskResponse
	Instruments []MIDIInstrument `json:"instruments,omitempty"`
}

// ConvertAudioResponse is the completed result of a WAV conversion task.
type ConvertAudioResponse struct {
	AsyncTaskResponse
	WavURL         string `json:"wav_url,omitempty"`
	OriginalTaskID string `json:"original_task_id,omitempty"`
}

// VisualizeMusicResponse is the completed result of a music visualization task.
type VisualizeMusicResponse struct {
	AsyncTaskResponse
	VideoURL       string `json:"video_url,omitempty"`
	OriginalTaskID string `json:"original_task_id,omitempty"`
}

// LyricsItem holds a section of generated lyrics with an optional section title (e.g. "Chorus", "Verse 1").
type LyricsItem struct {
	Title string `json:"title,omitempty"`
	Text  string `json:"text"`
}

// GenerateLyricsResponse is the completed result of a lyrics generation task.
type GenerateLyricsResponse struct {
	AsyncTaskResponse
	Lyrics []LyricsItem `json:"lyrics,omitempty"`
}

// AlignedWord holds word-level timing alignment for a single word in a track.
type AlignedWord struct {
	Word      string  `json:"word"`
	Success   bool    `json:"success"`
	StartTime float64 `json:"start_time"`
	EndTime   float64 `json:"end_time"`
	PAlign    float64 `json:"palign"`
}

// GetTimestampedLyricsResponse contains word-level timing data and waveform for a track.
type GetTimestampedLyricsResponse struct {
	AlignedWords []AlignedWord `json:"aligned_words,omitempty"`
	WaveformData []float64     `json:"waveform_data,omitempty"`
	HootCER      *float64      `json:"hoot_cer,omitempty"`
	IsStreamed   *bool         `json:"is_streamed,omitempty"`
}

// ReplaceSectionResponse is the completed result of a section replacement task.
type ReplaceSectionResponse struct {
	AsyncTaskResponse
	Track *Audio `json:"track,omitempty"`
}

// Persona holds the ID and metadata for a reusable style or voice persona.
type Persona struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// GeneratePersonaResponse is the synchronous result of persona creation.
type GeneratePersonaResponse struct {
	Persona *Persona `json:"persona,omitempty"`
	Error   string   `json:"error,omitempty"`
}

// BoostStyleResponse is the synchronous result of style tag generation.
type BoostStyleResponse struct {
	Style string `json:"style,omitempty"`
	Error string `json:"error,omitempty"`
}

// CreateMashupResponse is the completed result of a mashup task.
type CreateMashupResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

// ValidationPhraseResponse carries the validation phrase text that the user must re-record
// for voice cloning verification.
type ValidationPhraseResponse struct {
	AsyncTaskResponse
	ProviderStatus   string `json:"provider_status,omitempty"`
	ValidationPhrase string `json:"validation_phrase,omitempty"`
}

// VoiceGenerationResponse is the completed result of a voice generation task.
// VoiceID is the custom voice identifier, usable in subsequent music generation params.
type VoiceGenerationResponse struct {
	AsyncTaskResponse
	ProviderStatus string `json:"provider_status,omitempty"`
	VoiceID        string `json:"voice_id,omitempty"`
}

// CheckVoiceResponse indicates whether a custom voice is ready for use.
type CheckVoiceResponse struct {
	IsAvailable *bool  `json:"is_available,omitempty"`
	Error       string `json:"error,omitempty"`
}
