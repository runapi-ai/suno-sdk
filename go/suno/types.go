package suno

type SunoModel string

type VocalGender string

type PersonaModel string

type GenerationStage string

type TaskStatus string

type SoundKey string

const (
	ModelV55     SunoModel    = "suno-v5.5"
	ModelV5      SunoModel    = "suno-v5"
	ModelV45Plus SunoModel    = "suno-v4.5-plus"
	ModelV45All  SunoModel    = "suno-v4.5-all"
	ModelV45     SunoModel    = "suno-v4.5"
	ModelV4      SunoModel    = "suno-v4"
	ModelV35     SunoModel    = "suno-v3.5"
	GenderMale   VocalGender  = "m"
	GenderFemale VocalGender  = "f"
	StylePersona PersonaModel = "style_persona"
	VoicePersona PersonaModel = "voice_persona"
)

type SunoBaseParams struct {
	CallbackURL         string      `json:"callback_url,omitempty" help:"optional; webhook URL for async notifications"`
	Model               SunoModel   `json:"model,omitempty" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
	VocalGender         VocalGender `json:"vocal_gender,omitempty" help:"optional; m or f (custom_mode only, not guaranteed)"`
	StyleWeight         *float64    `json:"style_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
	WeirdnessConstraint *float64    `json:"weirdness_constraint,omitempty" help:"optional; 0-1, 2 decimal places"`
	AudioWeight         *float64    `json:"audio_weight,omitempty" help:"optional; 0-1, 2 decimal places"`
}

type TextToMusicParams struct {
	SunoBaseParams
	Prompt       string       `json:"prompt,omitempty" help:"required; song description (<=500) or lyrics when custom_mode (suno-v4:<=3000, suno-v5:<=5000)"`
	Style        string       `json:"style,omitempty" help:"required when custom_mode; genre tags (suno-v4:<=200, suno-v5:<=1000)"`
	Title        string       `json:"title,omitempty" help:"required when custom_mode; song title (suno-v4:<=80, suno-v4.5+:<=100)"`
	CustomMode   bool         `json:"custom_mode" help:"required; true=provide lyrics/style/title, false=prompt only"`
	Instrumental bool         `json:"instrumental" help:"required; true=no vocals"`
	NegativeTags string       `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
	PersonaID    string       `json:"persona_id,omitempty" help:"optional; voice persona ID (custom_mode only)"`
	PersonaModel PersonaModel `json:"persona_model,omitempty" help:"optional; style_persona (default) or voice_persona (suno-v5 only)"`
	Duration     *int         `json:"duration,omitempty" help:"optional; target duration in seconds (suno-v4:<=240, suno-v5:<=480)"`
	ContinueAt   *float64     `json:"continue_at,omitempty" help:"optional; timestamp in seconds to continue from"`
	Endpoint     string       `json:"endpoint,omitempty" help:"optional; API endpoint override"`
}

type ExtendMusicParams struct {
	SunoBaseParams
	TaskID           string       `json:"task_id,omitempty" help:"optional; source task ID to extend"`
	AudioID          string       `json:"audio_id,omitempty" help:"optional; source audio ID to extend"`
	AudioURL         string       `json:"audio_url,omitempty" help:"optional; source audio URL to extend"`
	UploadURL        string       `json:"upload_url,omitempty" help:"optional; uploaded source audio URL to extend"`
	DefaultParamFlag bool         `json:"default_param_flag" help:"required; true=provide custom params, false=inherit from source"`
	Instrumental     *bool        `json:"instrumental,omitempty" help:"optional; true=no vocals"`
	Prompt           string       `json:"prompt,omitempty" help:"required when default_param_flag; lyrics (suno-v4:<=3000, suno-v5:<=5000)"`
	Style            string       `json:"style,omitempty" help:"required when default_param_flag; genre tags (suno-v4:<=200, suno-v5:<=1000)"`
	Title            string       `json:"title,omitempty" help:"required when default_param_flag; song title (<=80-100)"`
	ContinueAt       *float64     `json:"continue_at,omitempty" help:"required when default_param_flag; seconds, >0 and <total duration"`
	PersonaID        string       `json:"persona_id,omitempty" help:"optional; voice persona ID"`
	PersonaModel     PersonaModel `json:"persona_model,omitempty" help:"optional; style_persona (default) or voice_persona (suno-v5 only)"`
	Model            SunoModel    `json:"model" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
	NegativeTags     string       `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
}

type GenerateArtworkParams struct {
	TaskID      string `json:"task_id" help:"required; source music task ID"`
	CallbackURL string `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type CoverAudioParams struct {
	SunoBaseParams
	UploadURL    string       `json:"upload_url" help:"required; URL of audio file to cover"`
	Prompt       string       `json:"prompt,omitempty" help:"required when custom_mode; cover lyrics"`
	CustomMode   bool         `json:"custom_mode" help:"required; true=provide lyrics/style/title"`
	Instrumental bool         `json:"instrumental" help:"required; true=no vocals"`
	Model        SunoModel    `json:"model" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
	Style        string       `json:"style,omitempty" help:"required when custom_mode; genre tags"`
	Title        string       `json:"title,omitempty" help:"required when custom_mode; song title"`
	PersonaID    string       `json:"persona_id,omitempty" help:"optional; voice persona ID"`
	PersonaModel PersonaModel `json:"persona_model,omitempty" help:"optional; style_persona or voice_persona"`
	NegativeTags string       `json:"negative_tags,omitempty" help:"optional; styles to avoid"`
}

type AddInstrumentalParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Tags         string    `json:"tags" help:"required; style/genre tags"`
	Model        SunoModel `json:"model" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
}

type AddVocalsParams struct {
	SunoBaseParams
	UploadURL    string    `json:"upload_url" help:"required; URL of audio file"`
	Prompt       string    `json:"prompt" help:"required; vocal generation prompt"`
	Title        string    `json:"title" help:"required; song title"`
	NegativeTags string    `json:"negative_tags" help:"required; styles to avoid (can be empty string)"`
	Style        string    `json:"style" help:"required; music style/genre tags"`
	Model        SunoModel `json:"model" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
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
	Prompt          string  `json:"prompt" help:"required; replacement section lyrics"`
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
	Model       SunoModel `json:"model" help:"required; suno-v5 or suno-v5.5"`
	SoundLoop   *bool     `json:"sound_loop,omitempty" help:"optional; true=loopable audio, default false"`
	SoundTempo  *int      `json:"sound_tempo,omitempty" help:"optional; BPM 1-300"`
	SoundKey    SoundKey  `json:"sound_key,omitempty" help:"optional; musical key (Cm, C#m...Bm, C, C#...B), default Any"`
	GrabLyrics  *bool     `json:"grab_lyrics,omitempty" help:"optional; capture lyric subtitles, default false"`
	CallbackURL string    `json:"callback_url,omitempty" help:"optional; webhook URL"`
}

type CreateMashupParams struct {
	SunoBaseParams
	UploadURLList [2]string `json:"upload_url_list" help:"required; two audio URLs to mashup"`
	Prompt        string    `json:"prompt,omitempty" help:"required when custom_mode is false, or when custom_mode is true and instrumental is false; mashup lyrics"`
	Style         string    `json:"style,omitempty" help:"required when custom_mode is true; genre tags"`
	Title         string    `json:"title,omitempty" help:"required when custom_mode is true; song title"`
	CustomMode    bool      `json:"custom_mode" help:"required; true=provide lyrics/style/title"`
	Instrumental  *bool     `json:"instrumental,omitempty" help:"optional; true=no vocals"`
	Model         SunoModel `json:"model" help:"required; suno-v5, suno-v4.5-plus, suno-v4.5-all, suno-v4.5, suno-v4, suno-v3.5"`
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

type TextToSoundResponse struct{ TextToMusicResponse }

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
