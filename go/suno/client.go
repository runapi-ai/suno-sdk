// Package suno provides the Suno music API client.
//
//	client, err := suno.NewClient(option.WithAPIKey("sk-your-api-key"))
//	result, err := client.TextToMusic.Run(ctx, suno.TextToMusicParams{
//	    SunoBaseParams: suno.SunoBaseParams{Model: suno.ModelV45Plus},
//	    Prompt: "A chill lo-fi beat",
//	})
package suno

import (
	"context"

	"github.com/runapi-ai/core-sdk/go/base"
	"github.com/runapi-ai/core-sdk/go/core"
	"github.com/runapi-ai/core-sdk/go/option"
)

const (
	textToMusicPath                = "/api/v1/suno/text_to_music"
	extendMusicPath                = "/api/v1/suno/extend_music"
	stitchAudioPath                = "/api/v1/suno/stitch_audio"
	remasterAudioPath              = "/api/v1/suno/remaster_audio"
	addSamplesPath                 = "/api/v1/suno/add_samples"
	inspireMusicPath               = "/api/v1/suno/inspire_music"
	generateArtworkPath            = "/api/v1/suno/generate_artwork"
	coverAudioPath                 = "/api/v1/suno/cover_audio"
	addInstrumentalPath            = "/api/v1/suno/add_instrumental"
	addVocalsPath                  = "/api/v1/suno/add_vocals"
	separateAudioStemsPath         = "/api/v1/suno/separate_audio_stems"
	generateMidiPath               = "/api/v1/suno/generate_midi"
	convertAudioPath               = "/api/v1/suno/convert_audio"
	visualizeMusicPath             = "/api/v1/suno/visualize_music"
	generateLyricsPath             = "/api/v1/suno/generate_lyrics"
	blendLyricsPath                = "/api/v1/suno/blend_lyrics"
	getTimestampedLyricsPath       = "/api/v1/suno/get_timestamped_lyrics"
	replaceSectionPath             = "/api/v1/suno/replace_section"
	createMashupPath               = "/api/v1/suno/create_mashup"
	textToSoundPath                = "/api/v1/suno/text_to_sound"
	generatePersonaPath            = "/api/v1/suno/generate_persona"
	boostStylePath                 = "/api/v1/suno/boost_style"
	voiceToValidationPhrasePath    = "/api/v1/suno/voice_to_validation_phrase"
	regenerateValidationPhrasePath = "/api/v1/suno/regenerate_validation_phrase"
	generateVoicePath              = "/api/v1/suno/generate_voice"
	checkVoicePath                 = "/api/v1/suno/check_voice"
)

// Client provides the full Suno music platform: song generation, extension, covers, stems,
// MIDI, lyrics, mashups, sound effects, visualization, personas, and voice cloning.
type Client struct {
	base.Base
	TextToMusic                *TextToMusic
	ExtendMusic                *ExtendMusic
	StitchAudio                *StitchAudio
	RemasterAudio              *RemasterAudio
	AddSamples                 *AddSamples
	InspireMusic               *InspireMusic
	GenerateArtwork            *GenerateArtwork
	CoverAudio                 *CoverAudio
	AddInstrumental            *AddInstrumental
	AddVocals                  *AddVocals
	SeparateAudioStems         *SeparateAudioStems
	GenerateMidi               *GenerateMidi
	ConvertAudio               *ConvertAudio
	VisualizeMusic             *VisualizeMusic
	GenerateLyrics             *GenerateLyrics
	BlendLyrics                *BlendLyrics
	GetTimestampedLyrics       *GetTimestampedLyrics
	ReplaceSection             *ReplaceSection
	CreateMashup               *CreateMashup
	TextToSound                *TextToSound
	GeneratePersona            *GeneratePersona
	BoostStyle                 *BoostStyle
	VoiceToValidationPhrase    *VoiceToValidationPhrase
	RegenerateValidationPhrase *RegenerateValidationPhrase
	GenerateVoice              *GenerateVoice
	CheckVoice                 *CheckVoice

	// Provider-neutral resources. These are the RunAPI-owned surface for Suno
	// workflows; the operation resources above stay available for callers that
	// already use them, and the ones a resource replaces say so in their own doc
	// comments.
	Personas            *Personas
	Voices              *Voices
	StyleExpansions     *StyleExpansions
	TimestampedLyrics   *TimestampedLyrics
	AudioExports        *AudioExports
	MusicVisualizations *MusicVisualizations
	MusicFromSample     *MusicFromSample
}

// NewClient creates a Suno client with the given options.
func NewClient(opts ...option.ClientOption) (*Client, error) {
	resolved, err := option.ResolveClientOptions(opts...)
	if err != nil {
		return nil, err
	}
	httpClient, err := core.NewHTTPClient(resolved)
	if err != nil {
		return nil, err
	}
	return NewClientWithHTTP(httpClient), nil
}

// NewClientWithHTTP creates a Suno client with a pre-configured HTTP transport.
func NewClientWithHTTP(httpClient core.HTTPClient) *Client {
	return &Client{
		Base:                       base.New(httpClient),
		TextToMusic:                &TextToMusic{http: httpClient},
		ExtendMusic:                &ExtendMusic{http: httpClient},
		StitchAudio:                &StitchAudio{http: httpClient},
		RemasterAudio:              &RemasterAudio{http: httpClient},
		AddSamples:                 &AddSamples{http: httpClient},
		InspireMusic:               &InspireMusic{http: httpClient},
		GenerateArtwork:            &GenerateArtwork{http: httpClient},
		CoverAudio:                 &CoverAudio{http: httpClient},
		AddInstrumental:            &AddInstrumental{http: httpClient},
		AddVocals:                  &AddVocals{http: httpClient},
		SeparateAudioStems:         &SeparateAudioStems{http: httpClient},
		GenerateMidi:               &GenerateMidi{http: httpClient},
		ConvertAudio:               &ConvertAudio{http: httpClient},
		VisualizeMusic:             &VisualizeMusic{http: httpClient},
		GenerateLyrics:             &GenerateLyrics{http: httpClient},
		BlendLyrics:                &BlendLyrics{http: httpClient},
		GetTimestampedLyrics:       &GetTimestampedLyrics{http: httpClient},
		ReplaceSection:             &ReplaceSection{http: httpClient},
		CreateMashup:               &CreateMashup{http: httpClient},
		TextToSound:                &TextToSound{http: httpClient},
		GeneratePersona:            &GeneratePersona{http: httpClient},
		BoostStyle:                 &BoostStyle{http: httpClient},
		VoiceToValidationPhrase:    &VoiceToValidationPhrase{http: httpClient},
		RegenerateValidationPhrase: &RegenerateValidationPhrase{http: httpClient},
		GenerateVoice:              &GenerateVoice{http: httpClient},
		CheckVoice:                 &CheckVoice{http: httpClient},
		Personas:                   &Personas{http: httpClient},
		Voices:                     &Voices{http: httpClient},
		StyleExpansions:            &StyleExpansions{http: httpClient},
		TimestampedLyrics:          &TimestampedLyrics{http: httpClient},
		AudioExports:               &AudioExports{http: httpClient},
		MusicVisualizations:        &MusicVisualizations{http: httpClient},
		MusicFromSample:            &MusicFromSample{http: httpClient},
	}
}

// TextToMusic generates songs from a text prompt with configurable vocal mode, style, and persona.
type TextToMusic struct{ http core.HTTPClient }

// ExtendMusic continues an existing track from a specified timestamp, inheriting or overriding its settings.
type ExtendMusic struct{ http core.HTTPClient }
type StitchAudio struct{ http core.HTTPClient }
type RemasterAudio struct{ http core.HTTPClient }

// AddSamples adds a sample of an uploaded audio file to new music.
//
// Deprecated: use [MusicFromSample].
type AddSamples struct{ http core.HTTPClient }
type InspireMusic struct{ http core.HTTPClient }

func (r *StitchAudio) Create(ctx context.Context, params StitchAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, stitchAudioPath, body, requestOptions)
}
func (r *StitchAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(stitchAudioPath, id), requestOptions)
}
func (r *StitchAudio) Run(ctx context.Context, p StitchAudioParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, po := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, p, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, po)
}
func (r *RemasterAudio) Create(ctx context.Context, params RemasterAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, remasterAudioPath, body, requestOptions)
}
func (r *RemasterAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(remasterAudioPath, id), requestOptions)
}
func (r *RemasterAudio) Run(ctx context.Context, p RemasterAudioParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, po := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, p, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, po)
}
func (r *AddSamples) Create(ctx context.Context, params AddSamplesParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, addSamplesPath, body, requestOptions)
}
func (r *AddSamples) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(addSamplesPath, id), requestOptions)
}
func (r *AddSamples) Run(ctx context.Context, p AddSamplesParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, po := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, p, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, po)
}
func (r *InspireMusic) Create(ctx context.Context, params InspireMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, inspireMusicPath, body, requestOptions)
}
func (r *InspireMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(inspireMusicPath, id), requestOptions)
}
func (r *InspireMusic) Run(ctx context.Context, p InspireMusicParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, po := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, p, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, po)
}

// GenerateArtwork creates cover artwork for an existing music task.
type GenerateArtwork struct{ http core.HTTPClient }

// CoverAudio re-records vocals over an uploaded audio file with a new style or voice.
type CoverAudio struct{ http core.HTTPClient }

// AddInstrumental generates and adds an instrumental backing track to uploaded audio.
type AddInstrumental struct{ http core.HTTPClient }

// AddVocals generates and adds vocals to an uploaded instrumental track.
type AddVocals struct{ http core.HTTPClient }

// SeparateAudioStems splits a track into individual instrument stems (vocals, drums, bass, guitar, etc.).
type SeparateAudioStems struct{ http core.HTTPClient }

// GenerateMidi extracts per-instrument MIDI note data from a generated track.
type GenerateMidi struct{ http core.HTTPClient }

// ConvertAudio converts a generated track to WAV format.
//
// Deprecated: use [AudioExports].
type ConvertAudio struct{ http core.HTTPClient }

// VisualizeMusic generates a music visualization video from an existing track.
//
// Deprecated: use [MusicVisualizations].
type VisualizeMusic struct{ http core.HTTPClient }

// GenerateLyrics produces AI-generated lyrics from a text prompt.
type GenerateLyrics struct{ http core.HTTPClient }

// BlendLyrics blends two caller-authored lyrics texts.
type BlendLyrics struct{ http core.HTTPClient }

// GetTimestampedLyrics retrieves word-level timing alignment for a track. Synchronous (Run only).
//
// Deprecated: use [TimestampedLyrics].
type GetTimestampedLyrics struct{ http core.HTTPClient }

// ReplaceSection re-generates a time range within an existing track with new lyrics and style.
type ReplaceSection struct{ http core.HTTPClient }

// CreateMashup blends two audio tracks into a single new composition.
type CreateMashup struct{ http core.HTTPClient }

// TextToSound generates sound effects (not music) from a text description with optional looping and BPM control.
type TextToSound struct{ http core.HTTPClient }

// GeneratePersona creates a reusable style or voice persona from an existing track's vocals. Synchronous (Run only).
//
// Deprecated: use [Personas], which returns a RunAPI-owned persona resource.
type GeneratePersona struct{ http core.HTTPClient }

// BoostStyle generates style/genre tags from a text description for use in Style fields. Synchronous (Run only).
//
// Deprecated: use [StyleExpansions].
type BoostStyle struct{ http core.HTTPClient }

// VoiceToValidationPhrase starts the voice cloning pipeline by extracting a validation phrase from a voice recording.
type VoiceToValidationPhrase struct{ http core.HTTPClient }

// RegenerateValidationPhrase requests a new, easier validation phrase for an in-progress voice cloning task.
type RegenerateValidationPhrase struct{ http core.HTTPClient }

// GenerateVoice trains a custom voice from the user's recording of the validation phrase.
//
// Deprecated: use [Voices].
type GenerateVoice struct{ http core.HTTPClient }

// CheckVoice checks whether a custom voice from [GenerateVoice] is ready for use. Synchronous (Run only).
//
// Deprecated: use [Voices.Get], which reports the voice resource status directly.
type CheckVoice struct{ http core.HTTPClient }

// Create submits a song-generation task and returns immediately with a task id.
func (r *TextToMusic) Create(ctx context.Context, params TextToMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToMusicPath, body, requestOptions)
}

// Get fetches the current status of a song-generation task by id.
func (r *TextToMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(textToMusicPath, id), requestOptions)
}

// Run submits a song-generation task and polls until it completes.
func (r *TextToMusic) Run(ctx context.Context, params TextToMusicParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a music-extension task and returns immediately with a task id.
func (r *ExtendMusic) Create(ctx context.Context, params ExtendMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, extendMusicPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a music-extension task by id.
func (r *ExtendMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ExtendMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ExtendMusicResponse](ctx, r.http, core.ResourcePath(extendMusicPath, id), requestOptions)
}

// Run submits a music-extension task and polls until it completes.
func (r *ExtendMusic) Run(ctx context.Context, params ExtendMusicParams, opts ...option.RequestOption) (*ExtendMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ExtendMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits an artwork-generation task and returns immediately with a task id.
func (r *GenerateArtwork) Create(ctx context.Context, params GenerateArtworkParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateArtworkPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of an artwork-generation task by id.
func (r *GenerateArtwork) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateArtworkResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateArtworkResponse](ctx, r.http, core.ResourcePath(generateArtworkPath, id), requestOptions)
}

// Run submits an artwork-generation task and polls until it completes.
func (r *GenerateArtwork) Run(ctx context.Context, params GenerateArtworkParams, opts ...option.RequestOption) (*GenerateArtworkResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateArtworkResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a cover-audio task and returns immediately with a task id.
func (r *CoverAudio) Create(ctx context.Context, params CoverAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, coverAudioPath, body, requestOptions)
}

// Get fetches the current status of a cover-audio task by id.
func (r *CoverAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*CoverAudioResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[CoverAudioResponse](ctx, r.http, core.ResourcePath(coverAudioPath, id), requestOptions)
}

// Run submits a cover-audio task and polls until it completes.
func (r *CoverAudio) Run(ctx context.Context, params CoverAudioParams, opts ...option.RequestOption) (*CoverAudioResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*CoverAudioResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits an add-instrumental task and returns immediately with a task id.
func (r *AddInstrumental) Create(ctx context.Context, params AddInstrumentalParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, addInstrumentalPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of an add-instrumental task by id.
func (r *AddInstrumental) Get(ctx context.Context, id string, opts ...option.RequestOption) (*AddInstrumentalResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[AddInstrumentalResponse](ctx, r.http, core.ResourcePath(addInstrumentalPath, id), requestOptions)
}

// Run submits an add-instrumental task and polls until it completes.
func (r *AddInstrumental) Run(ctx context.Context, params AddInstrumentalParams, opts ...option.RequestOption) (*AddInstrumentalResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*AddInstrumentalResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits an add-vocals task and returns immediately with a task id.
func (r *AddVocals) Create(ctx context.Context, params AddVocalsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, addVocalsPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of an add-vocals task by id.
func (r *AddVocals) Get(ctx context.Context, id string, opts ...option.RequestOption) (*AddVocalsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[AddVocalsResponse](ctx, r.http, core.ResourcePath(addVocalsPath, id), requestOptions)
}

// Run submits an add-vocals task and polls until it completes.
func (r *AddVocals) Run(ctx context.Context, params AddVocalsParams, opts ...option.RequestOption) (*AddVocalsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*AddVocalsResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits an audio-stem-separation task and returns immediately with a task id.
func (r *SeparateAudioStems) Create(ctx context.Context, params SeparateAudioStemsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, separateAudioStemsPath, body, requestOptions)
}

// Get fetches the current status of an audio-stem-separation task by id.
func (r *SeparateAudioStems) Get(ctx context.Context, id string, opts ...option.RequestOption) (*SeparateAudioStemsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[SeparateAudioStemsResponse](ctx, r.http, core.ResourcePath(separateAudioStemsPath, id), requestOptions)
}

// Run submits an audio-stem-separation task and polls until it completes.
func (r *SeparateAudioStems) Run(ctx context.Context, params SeparateAudioStemsParams, opts ...option.RequestOption) (*SeparateAudioStemsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*SeparateAudioStemsResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// Create submits a MIDI-extraction task and returns immediately with a task id.
func (r *GenerateMidi) Create(ctx context.Context, params GenerateMidiParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateMidiPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a MIDI-extraction task by id.
func (r *GenerateMidi) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateMidiResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateMidiResponse](ctx, r.http, core.ResourcePath(generateMidiPath, id), requestOptions)
}

// Run submits a MIDI-extraction task and polls until it completes.
func (r *GenerateMidi) Run(ctx context.Context, params GenerateMidiParams, opts ...option.RequestOption) (*GenerateMidiResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateMidiResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits an audio-conversion task and returns immediately with a task id.
func (r *ConvertAudio) Create(ctx context.Context, params ConvertAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, convertAudioPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of an audio-conversion task by id.
func (r *ConvertAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ConvertAudioResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ConvertAudioResponse](ctx, r.http, core.ResourcePath(convertAudioPath, id), requestOptions)
}

// Run submits an audio-conversion task and polls until it completes.
func (r *ConvertAudio) Run(ctx context.Context, params ConvertAudioParams, opts ...option.RequestOption) (*ConvertAudioResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ConvertAudioResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a music-visualization task and returns immediately with a task id.
func (r *VisualizeMusic) Create(ctx context.Context, params VisualizeMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, visualizeMusicPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a music-visualization task by id.
func (r *VisualizeMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*VisualizeMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[VisualizeMusicResponse](ctx, r.http, core.ResourcePath(visualizeMusicPath, id), requestOptions)
}

// Run submits a music-visualization task and polls until it completes.
func (r *VisualizeMusic) Run(ctx context.Context, params VisualizeMusicParams, opts ...option.RequestOption) (*VisualizeMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*VisualizeMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a lyrics-generation task and returns immediately with a task id.
func (r *GenerateLyrics) Create(ctx context.Context, params GenerateLyricsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateLyricsPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a lyrics-generation task by id.
func (r *GenerateLyrics) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateLyricsResponse](ctx, r.http, core.ResourcePath(generateLyricsPath, id), requestOptions)
}

// Run submits a lyrics-generation task and polls until it completes.
func (r *GenerateLyrics) Run(ctx context.Context, params GenerateLyricsParams, opts ...option.RequestOption) (*GenerateLyricsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateLyricsResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a lyrics-blending task and returns immediately with a task id.
func (r *BlendLyrics) Create(ctx context.Context, params BlendLyricsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, blendLyricsPath, body, requestOptions)
}

// Get fetches the current status of a lyrics-blending task by id.
func (r *BlendLyrics) Get(ctx context.Context, id string, opts ...option.RequestOption) (*BlendLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[BlendLyricsResponse](ctx, r.http, core.ResourcePath(blendLyricsPath, id), requestOptions)
}

// Run submits a lyrics-blending task and polls until it completes.
func (r *BlendLyrics) Run(ctx context.Context, params BlendLyricsParams, opts ...option.RequestOption) (*BlendLyricsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*BlendLyricsResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Run retrieves word-level timing alignment for a track and returns the result.
func (r *GetTimestampedLyrics) Run(ctx context.Context, params GetTimestampedLyricsParams, opts ...option.RequestOption) (*GetTimestampedLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[GetTimestampedLyricsResponse](ctx, r.http, getTimestampedLyricsPath, core.CompactParams(params), requestOptions)
}

// Create submits a section-replacement task and returns immediately with a task id.
func (r *ReplaceSection) Create(ctx context.Context, params ReplaceSectionParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, replaceSectionPath, body, requestOptions)
}

// Get fetches the current status of a section-replacement task by id.
func (r *ReplaceSection) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ReplaceSectionResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ReplaceSectionResponse](ctx, r.http, core.ResourcePath(replaceSectionPath, id), requestOptions)
}

// Run submits a section-replacement task and polls until it completes.
func (r *ReplaceSection) Run(ctx context.Context, params ReplaceSectionParams, opts ...option.RequestOption) (*ReplaceSectionResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ReplaceSectionResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a mashup task and returns immediately with a task id.
func (r *CreateMashup) Create(ctx context.Context, params CreateMashupParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, createMashupPath, body, requestOptions)
}

// Get fetches the current status of a mashup task by id.
func (r *CreateMashup) Get(ctx context.Context, id string, opts ...option.RequestOption) (*CreateMashupResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[CreateMashupResponse](ctx, r.http, core.ResourcePath(createMashupPath, id), requestOptions)
}

// Run submits a mashup task and polls until it completes.
func (r *CreateMashup) Run(ctx context.Context, params CreateMashupParams, opts ...option.RequestOption) (*CreateMashupResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*CreateMashupResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a sound-effects task and returns immediately with a task id.
func (r *TextToSound) Create(ctx context.Context, params TextToSoundParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToSoundPath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a sound-effects task by id.
func (r *TextToSound) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToSoundResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToSoundResponse](ctx, r.http, core.ResourcePath(textToSoundPath, id), requestOptions)
}

// Run submits a sound-effects task and polls until it completes.
func (r *TextToSound) Run(ctx context.Context, params TextToSoundParams, opts ...option.RequestOption) (*TextToSoundResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*TextToSoundResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

// Create submits a validation-phrase extraction task and returns immediately with a task id.
func (r *VoiceToValidationPhrase) Create(ctx context.Context, params VoiceToValidationPhraseParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, voiceToValidationPhrasePath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a validation-phrase extraction task by id.
func (r *VoiceToValidationPhrase) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ValidationPhraseResponse](ctx, r.http, core.ResourcePath(voiceToValidationPhrasePath, id), requestOptions)
}

// Run submits a validation-phrase extraction task and polls until it completes.
func (r *VoiceToValidationPhrase) Run(ctx context.Context, params VoiceToValidationPhraseParams, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ValidationPhraseResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// Create submits a validation-phrase regeneration task and returns immediately with a task id.
func (r *RegenerateValidationPhrase) Create(ctx context.Context, params RegenerateValidationPhraseParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, regenerateValidationPhrasePath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a validation-phrase regeneration task by id.
func (r *RegenerateValidationPhrase) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ValidationPhraseResponse](ctx, r.http, core.ResourcePath(regenerateValidationPhrasePath, id), requestOptions)
}

// Run submits a validation-phrase regeneration task and polls until it completes.
func (r *RegenerateValidationPhrase) Run(ctx context.Context, params RegenerateValidationPhraseParams, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ValidationPhraseResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// Create submits a voice-training task and returns immediately with a task id.
func (r *GenerateVoice) Create(ctx context.Context, params GenerateVoiceParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateVoicePath, core.CompactParams(params), requestOptions)
}

// Get fetches the current status of a voice-training task by id.
func (r *GenerateVoice) Get(ctx context.Context, id string, opts ...option.RequestOption) (*VoiceGenerationResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[VoiceGenerationResponse](ctx, r.http, core.ResourcePath(generateVoicePath, id), requestOptions)
}

// Run submits a voice-training task and polls until it completes.
func (r *GenerateVoice) Run(ctx context.Context, params GenerateVoiceParams, opts ...option.RequestOption) (*VoiceGenerationResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*VoiceGenerationResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// Run checks whether a custom voice is ready for use and returns the result.
func (r *CheckVoice) Run(ctx context.Context, params CheckVoiceParams, opts ...option.RequestOption) (*CheckVoiceResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[CheckVoiceResponse](ctx, r.http, checkVoicePath, core.CompactParams(params), requestOptions)
}

// Run creates a reusable style or voice persona from an existing track and returns the result.
func (r *GeneratePersona) Run(ctx context.Context, params GeneratePersonaParams, opts ...option.RequestOption) (*GeneratePersonaResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[GeneratePersonaResponse](ctx, r.http, generatePersonaPath, core.CompactParams(params), requestOptions)
}

// Run generates style/genre tags from a text description and returns the result.
func (r *BoostStyle) Run(ctx context.Context, params BoostStyleParams, opts ...option.RequestOption) (*BoostStyleResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[BoostStyleResponse](ctx, r.http, boostStylePath, core.CompactParams(params), requestOptions)
}

// Provider-neutral resource paths. These name the resource a request works on
// rather than the provider operation that produced it; the operation routes
// above stay available for callers that already use them.
const (
	personasPath            = "/api/v1/personas"
	voicesPath              = "/api/v1/voices"
	styleExpansionsPath     = "/api/v1/style_expansions"
	timestampedLyricsPath   = "/api/v1/timestamped_lyrics"
	audioExportsPath        = "/api/v1/audio_exports"
	musicVisualizationsPath = "/api/v1/music_visualizations"
	musicFromSamplePath     = "/api/v1/music_from_sample"
)

// Personas creates and retrieves the personas a music request can reuse.
//
// A persona is a RunAPI-owned resource: create it once, then pass its ID in the
// persona_id field of music generation parameters. Holding the resource ID
// instead of the creating request keeps a workflow resumable after that request
// is gone.
type Personas struct{ http core.HTTPClient }

// Create submits a persona request. A request the service accepted for local
// execution returns an accepted Task to follow with [Personas.Run]; otherwise
// the returned Terminal holds the finished persona.
func (r *Personas) Create(ctx context.Context, params PersonaParams, opts ...option.RequestOption) (*core.HybridCreateResponse[PersonaCreationResponse], error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.CreateHybrid[PersonaCreationResponse](ctx, r.http, personasPath, body, requestOptions)
}

// Run submits a persona request and follows an accepted Task to its stored result.
func (r *Personas) Run(ctx context.Context, params PersonaParams, opts ...option.RequestOption) (*PersonaCreationResponse, error) {
	requestOptions, pollingOptions := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.RunHybrid[PersonaCreationResponse](ctx, r.http, personasPath, body, requestOptions, pollingOptions)
}

// Get retrieves a persona resource by its RunAPI-owned ID.
func (r *Personas) Get(ctx context.Context, id string, opts ...option.RequestOption) (*PersonaResourceResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[PersonaResourceResponse](ctx, r.http, core.ResourcePath(personasPath, id), requestOptions)
}

// Voices creates and retrieves the voices a music request can reuse.
//
// A voice is a RunAPI-owned resource: create it from a recording, then pass its
// ID wherever a voice persona is accepted. [Voices.Get] reports whether the
// voice is ready, which replaces polling a separate availability operation.
type Voices struct{ http core.HTTPClient }

// Run submits a voice recording and returns the created voice resource.
func (r *Voices) Run(ctx context.Context, params VoiceParams, opts ...option.RequestOption) (*VoiceCreationResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[VoiceCreationResponse](ctx, r.http, voicesPath, body, requestOptions)
}

// Get retrieves a voice resource by its RunAPI-owned ID.
func (r *Voices) Get(ctx context.Context, id string, opts ...option.RequestOption) (*VoiceResourceResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[VoiceResourceResponse](ctx, r.http, core.ResourcePath(voicesPath, id), requestOptions)
}

// StyleExpansions expands a style description into genre tags. Synchronous (Run only).
type StyleExpansions struct{ http core.HTTPClient }

// Run expands a style description into genre tags and returns the result.
func (r *StyleExpansions) Run(ctx context.Context, params StyleExpansionParams, opts ...option.RequestOption) (*BoostStyleResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[BoostStyleResponse](ctx, r.http, styleExpansionsPath, body, requestOptions)
}

// TimestampedLyrics retrieves word-level timing alignment for an existing track.
// Synchronous (Run only).
type TimestampedLyrics struct{ http core.HTTPClient }

// Run retrieves word-level timing alignment and returns the result.
func (r *TimestampedLyrics) Run(ctx context.Context, params TimestampedLyricsParams, opts ...option.RequestOption) (*GetTimestampedLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[GetTimestampedLyricsResponse](ctx, r.http, timestampedLyricsPath, body, requestOptions)
}

// AudioExports exports an existing track to a downloadable audio file.
type AudioExports struct{ http core.HTTPClient }

// Create submits an audio export and returns immediately with a task id. The
// export body is available from [AudioExports.Get] once the task completes.
func (r *AudioExports) Create(ctx context.Context, params AudioExportParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, audioExportsPath, body, requestOptions)
}

// Get fetches the current status of an audio export by id.
func (r *AudioExports) Get(ctx context.Context, id string, opts ...option.RequestOption) (*AudioExportResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[AudioExportResponse](ctx, r.http, core.ResourcePath(audioExportsPath, id), requestOptions)
}

// Run submits an audio export and polls until it completes.
func (r *AudioExports) Run(ctx context.Context, params AudioExportParams, opts ...option.RequestOption) (*AudioExportResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) {
		return r.Create(ctx, params, opts...)
	}, func(ctx context.Context, id string) (*AudioExportResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// MusicVisualizations renders a visualization video for an existing track.
type MusicVisualizations struct{ http core.HTTPClient }

// Create submits a visualization request and returns immediately with a task id.
func (r *MusicVisualizations) Create(ctx context.Context, params MusicVisualizationParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, musicVisualizationsPath, body, requestOptions)
}

// Get fetches the current status of a visualization request by id.
func (r *MusicVisualizations) Get(ctx context.Context, id string, opts ...option.RequestOption) (*MusicVisualizationResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[MusicVisualizationResponse](ctx, r.http, core.ResourcePath(musicVisualizationsPath, id), requestOptions)
}

// Run submits a visualization request and polls until it completes.
func (r *MusicVisualizations) Run(ctx context.Context, params MusicVisualizationParams, opts ...option.RequestOption) (*MusicVisualizationResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) {
		return r.Create(ctx, params, opts...)
	}, func(ctx context.Context, id string) (*MusicVisualizationResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

// MusicFromSample creates music guided by a sample of an uploaded audio file.
type MusicFromSample struct{ http core.HTTPClient }

// Create submits a music-from-sample request and returns immediately with a task id.
func (r *MusicFromSample) Create(ctx context.Context, params MusicFromSampleParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	body := core.CompactParams(params)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, musicFromSamplePath, body, requestOptions)
}

// Get fetches the current status of a music-from-sample request by id.
func (r *MusicFromSample) Get(ctx context.Context, id string, opts ...option.RequestOption) (*MusicFromSampleResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[MusicFromSampleResponse](ctx, r.http, core.ResourcePath(musicFromSamplePath, id), requestOptions)
}

// Run submits a music-from-sample request and polls until it completes.
func (r *MusicFromSample) Run(ctx context.Context, params MusicFromSampleParams, opts ...option.RequestOption) (*MusicFromSampleResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) {
		return r.Create(ctx, params, opts...)
	}, func(ctx context.Context, id string) (*MusicFromSampleResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}
