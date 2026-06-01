package suno

type SunoModel string

type VocalGender string

type PersonaType string

type ParameterMode string

type VocalMode string

type GenerationStage string

type TaskStatus string

type SoundKey string

type ValidationPhraseLanguage string

type SingerSkillLevel string

const (
	ModelV55              SunoModel     = "suno-v5.5"
	ModelV5               SunoModel     = "suno-v5"
	ModelV45Plus          SunoModel     = "suno-v4.5-plus"
	ModelV45All           SunoModel     = "suno-v4.5-all"
	ModelV45              SunoModel     = "suno-v4.5"
	ModelV4               SunoModel     = "suno-v4"
	GenderMale            VocalGender   = "male"
	GenderFemale          VocalGender   = "female"
	PersonaTypeStyle      PersonaType   = "style"
	PersonaTypeVoice      PersonaType   = "voice"
	ParameterModeSource   ParameterMode = "source"
	ParameterModeCustom   ParameterMode = "custom"
	VocalModeAutoLyrics   VocalMode     = "auto_lyrics"
	VocalModeExactLyrics  VocalMode     = "exact_lyrics"
	VocalModeInstrumental VocalMode     = "instrumental"

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

type SunoBaseParams struct {
	CallbackURL         string      `json:"callback_url,omitempty" help:"optional; webhook URL for async notifications"`
	Model               SunoModel   `json:"model,omitempty" help:"required; model slug"`
	VocalGender         VocalGender `json:"vocal_gender,omitempty" help:"optional; vocal gender"`
	StyleWeight         *float64    `json:"style_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
	WeirdnessConstraint *float64    `json:"weirdness_constraint,omitempty" help:"optional; 0-1, 2 decimal places"`
	AudioWeight         *float64    `json:"audio_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
}

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

type GenerateArtworkParams struct {
	TaskID      string `json:"task_id" help:"required; source music task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

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

type AddInstrumentalParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Tags         string    `json:"tags" help:"required; style/genre tags"`
	Model        SunoModel `json:"model" help:"required; model slug"`
}

type AddVocalsParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Lyrics       string    `json:"lyrics" help:"required; vocal lyrics"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Style        string    `json:"style" help:"required; style preset"`
	Model        SunoModel `json:"model" help:"required; model slug"`
}

type SeparateAudioStemsParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	Type        string `json:"type,omitempty" help:"optional; separation type"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type GenerateMidiParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type ConvertAudioParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type VisualizeMusicParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
	Author      string `json:"author,omitempty" help:"optional; author name for the video"`
	DomainName  string `json:"domain_name,omitempty" help:"optional; domain name watermark"`
}

type GenerateLyricsParams struct {
	Prompt      string `json:"prompt" help:"required; lyrics generation prompt"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type GetTimestampedLyricsParams struct {
	TaskID  string `json:"task_id" help:"required; source task ID"`
	AudioID string `json:"audio_id" help:"required; audio ID within the task"`
}

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

type GeneratePersonaParams struct {
	TaskID      string `json:"task_id" help:"required; source task ID with reference vocals"`
	AudioID     string `json:"audio_id" help:"required; audio ID within the task"`
	Name        string `json:"name" help:"required; persona name"`
	Description string `json:"description" help:"required; persona description"`
}

type BoostStyleParams struct {
	Description string `json:"description" help:"required; style description to generate tags from"`
}

type TextToSoundParams struct {
	Prompt      string    `json:"prompt" help:"required; sound description (<=500 chars)"`
	Model       SunoModel `json:"model" help:"required; model slug"`
	SoundLoop   *bool     `json:"sound_loop,omitempty" help:"optional; true=loopable audio, default false"`
	SoundTempo  *int      `json:"sound_tempo,omitempty" help:"optional; BPM 1-300"`
	SoundKey    SoundKey  `json:"sound_key,omitempty" help:"optional; musical key; default Any"`
	GrabLyrics  *bool     `json:"grab_lyrics,omitempty" help:"optional; capture lyric subtitles, default false"`
	CallbackURL string    `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type VoiceToValidationPhraseParams struct {
	VoiceURL          string                   `json:"voice_url" help:"required; source voice recording URL"`
	VocalStartSeconds int                      `json:"vocal_start_seconds" help:"required; source vocal segment start time in seconds"`
	VocalEndSeconds   int                      `json:"vocal_end_seconds" help:"required; source vocal segment end time in seconds"`
	Language          ValidationPhraseLanguage `json:"language,omitempty" help:"optional; language code"`
	CallbackURL       string                   `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type RegenerateValidationPhraseParams struct {
	TaskID      string `json:"task_id" help:"required; prior validation phrase task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type GenerateVoiceParams struct {
	TaskID           string           `json:"task_id" help:"required; prior validation phrase task ID"`
	VerifyURL        string           `json:"verify_url" help:"required; user recording URL of the validation phrase"`
	VoiceName        string           `json:"voice_name,omitempty" help:"optional; custom voice display name"`
	Description      string           `json:"description,omitempty" help:"optional; custom voice description"`
	Style            string           `json:"style,omitempty" help:"optional; style preset"`
	SingerSkillLevel SingerSkillLevel `json:"singer_skill_level,omitempty" help:"optional; singer skill level"`
	CallbackURL      string           `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type CheckVoiceParams struct {
	TaskID string `json:"task_id" help:"required; custom voice task ID"`
}

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

type AsyncTaskResponse struct {
	ID              string          `json:"id"`
	Status          TaskStatus      `json:"status"`
	GenerationStage GenerationStage `json:"generation_stage,omitempty"`
	Error           string          `json:"error,omitempty"`
}

func (r AsyncTaskResponse) GetID() string     { return r.ID }
func (r AsyncTaskResponse) GetStatus() string { return string(r.Status) }
func (r AsyncTaskResponse) GetError() string  { return r.Error }

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

type TextToMusicResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

type ExtendMusicResponse struct {
	AsyncTaskResponse
	OriginalTaskID string  `json:"original_task_id,omitempty"`
	Audios         []Audio `json:"audios,omitempty"`
}

type CoverImage struct {
	URL string `json:"url"`
}

type GenerateArtworkResponse struct {
	AsyncTaskResponse
	Covers []CoverImage `json:"covers,omitempty"`
}

type CoverAudioResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

type AddInstrumentalResponse struct{ TextToMusicResponse }

type AddVocalsResponse struct{ TextToMusicResponse }

type TextToSoundResponse struct {
	AsyncTaskResponse
	Audios []SoundAudio `json:"audios,omitempty"`
}

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

type SeparateAudioStemsResponse struct {
	AsyncTaskResponse
	SeparatedAudios *SeparatedAudio `json:"separated_audios,omitempty"`
}

type MIDINote struct {
	Pitch     int     `json:"pitch"`
	StartTime float64 `json:"start_time"`
	EndTime   float64 `json:"end_time"`
	Velocity  float64 `json:"velocity"`
}

type MIDIInstrument struct {
	Name  string     `json:"name"`
	Notes []MIDINote `json:"notes,omitempty"`
}

type GenerateMidiResponse struct {
	AsyncTaskResponse
	Instruments []MIDIInstrument `json:"instruments,omitempty"`
}

type ConvertAudioResponse struct {
	AsyncTaskResponse
	WavURL         string `json:"wav_url,omitempty"`
	OriginalTaskID string `json:"original_task_id,omitempty"`
}

type VisualizeMusicResponse struct {
	AsyncTaskResponse
	VideoURL       string `json:"video_url,omitempty"`
	OriginalTaskID string `json:"original_task_id,omitempty"`
}

type LyricsItem struct {
	Title string `json:"title,omitempty"`
	Text  string `json:"text"`
}

type GenerateLyricsResponse struct {
	AsyncTaskResponse
	Lyrics []LyricsItem `json:"lyrics,omitempty"`
}

type AlignedWord struct {
	Word      string  `json:"word"`
	Success   bool    `json:"success"`
	StartTime float64 `json:"start_time"`
	EndTime   float64 `json:"end_time"`
	PAlign    float64 `json:"palign"`
}

type GetTimestampedLyricsResponse struct {
	AlignedWords []AlignedWord `json:"aligned_words,omitempty"`
	WaveformData []float64     `json:"waveform_data,omitempty"`
	HootCER      *float64      `json:"hoot_cer,omitempty"`
	IsStreamed   *bool         `json:"is_streamed,omitempty"`
}

type ReplaceSectionResponse struct {
	AsyncTaskResponse
	Track *Audio `json:"track,omitempty"`
}

type Persona struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type GeneratePersonaResponse struct {
	Persona *Persona `json:"persona,omitempty"`
	Error   string   `json:"error,omitempty"`
}

type BoostStyleResponse struct {
	Style string `json:"style,omitempty"`
	Error string `json:"error,omitempty"`
}

type CreateMashupResponse struct {
	AsyncTaskResponse
	Audios []Audio `json:"audios,omitempty"`
}

type ValidationPhraseResponse struct {
	AsyncTaskResponse
	ProviderStatus   string `json:"provider_status,omitempty"`
	ValidationPhrase string `json:"validation_phrase,omitempty"`
}

type VoiceGenerationResponse struct {
	AsyncTaskResponse
	ProviderStatus string `json:"provider_status,omitempty"`
	VoiceID        string `json:"voice_id,omitempty"`
}

type CheckVoiceResponse struct {
	IsAvailable *bool  `json:"is_available,omitempty"`
	Error       string `json:"error,omitempty"`
}
