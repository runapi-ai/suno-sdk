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

	"github.com/runapi-ai/core-sdk/go/core"
	"github.com/runapi-ai/core-sdk/go/option"
)

const (
	textToMusicPath                = "/api/v1/suno/text_to_music"
	extendMusicPath                = "/api/v1/suno/extend_music"
	generateArtworkPath            = "/api/v1/suno/generate_artwork"
	coverAudioPath                 = "/api/v1/suno/cover_audio"
	addInstrumentalPath            = "/api/v1/suno/add_instrumental"
	addVocalsPath                  = "/api/v1/suno/add_vocals"
	separateAudioStemsPath         = "/api/v1/suno/separate_audio_stems"
	generateMidiPath               = "/api/v1/suno/generate_midi"
	convertAudioPath               = "/api/v1/suno/convert_audio"
	visualizeMusicPath             = "/api/v1/suno/visualize_music"
	generateLyricsPath             = "/api/v1/suno/generate_lyrics"
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

type Client struct {
	TextToMusic                *TextToMusic
	ExtendMusic                *ExtendMusic
	GenerateArtwork            *GenerateArtwork
	CoverAudio                 *CoverAudio
	AddInstrumental            *AddInstrumental
	AddVocals                  *AddVocals
	SeparateAudioStems         *SeparateAudioStems
	GenerateMidi               *GenerateMidi
	ConvertAudio               *ConvertAudio
	VisualizeMusic             *VisualizeMusic
	GenerateLyrics             *GenerateLyrics
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
}

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

func NewClientWithHTTP(httpClient core.HTTPClient) *Client {
	return &Client{
		TextToMusic:                &TextToMusic{http: httpClient},
		ExtendMusic:                &ExtendMusic{http: httpClient},
		GenerateArtwork:            &GenerateArtwork{http: httpClient},
		CoverAudio:                 &CoverAudio{http: httpClient},
		AddInstrumental:            &AddInstrumental{http: httpClient},
		AddVocals:                  &AddVocals{http: httpClient},
		SeparateAudioStems:         &SeparateAudioStems{http: httpClient},
		GenerateMidi:               &GenerateMidi{http: httpClient},
		ConvertAudio:               &ConvertAudio{http: httpClient},
		VisualizeMusic:             &VisualizeMusic{http: httpClient},
		GenerateLyrics:             &GenerateLyrics{http: httpClient},
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
	}
}

type TextToMusic struct{ http core.HTTPClient }
type ExtendMusic struct{ http core.HTTPClient }
type GenerateArtwork struct{ http core.HTTPClient }
type CoverAudio struct{ http core.HTTPClient }
type AddInstrumental struct{ http core.HTTPClient }
type AddVocals struct{ http core.HTTPClient }
type SeparateAudioStems struct{ http core.HTTPClient }
type GenerateMidi struct{ http core.HTTPClient }
type ConvertAudio struct{ http core.HTTPClient }
type VisualizeMusic struct{ http core.HTTPClient }
type GenerateLyrics struct{ http core.HTTPClient }
type GetTimestampedLyrics struct{ http core.HTTPClient }
type ReplaceSection struct{ http core.HTTPClient }
type CreateMashup struct{ http core.HTTPClient }
type TextToSound struct{ http core.HTTPClient }
type GeneratePersona struct{ http core.HTTPClient }
type BoostStyle struct{ http core.HTTPClient }
type VoiceToValidationPhrase struct{ http core.HTTPClient }
type RegenerateValidationPhrase struct{ http core.HTTPClient }
type GenerateVoice struct{ http core.HTTPClient }
type CheckVoice struct{ http core.HTTPClient }

func (r *TextToMusic) Create(ctx context.Context, params TextToMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToMusicPath, core.CompactParams(params), requestOptions)
}
func (r *TextToMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToMusicResponse](ctx, r.http, core.ResourcePath(textToMusicPath, id), requestOptions)
}
func (r *TextToMusic) Run(ctx context.Context, params TextToMusicParams, opts ...option.RequestOption) (*TextToMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*TextToMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *ExtendMusic) Create(ctx context.Context, params ExtendMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, extendMusicPath, core.CompactParams(params), requestOptions)
}
func (r *ExtendMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ExtendMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ExtendMusicResponse](ctx, r.http, core.ResourcePath(extendMusicPath, id), requestOptions)
}
func (r *ExtendMusic) Run(ctx context.Context, params ExtendMusicParams, opts ...option.RequestOption) (*ExtendMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ExtendMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *GenerateArtwork) Create(ctx context.Context, params GenerateArtworkParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateArtworkPath, core.CompactParams(params), requestOptions)
}
func (r *GenerateArtwork) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateArtworkResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateArtworkResponse](ctx, r.http, core.ResourcePath(generateArtworkPath, id), requestOptions)
}
func (r *GenerateArtwork) Run(ctx context.Context, params GenerateArtworkParams, opts ...option.RequestOption) (*GenerateArtworkResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateArtworkResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *CoverAudio) Create(ctx context.Context, params CoverAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, coverAudioPath, core.CompactParams(params), requestOptions)
}
func (r *CoverAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*CoverAudioResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[CoverAudioResponse](ctx, r.http, core.ResourcePath(coverAudioPath, id), requestOptions)
}
func (r *CoverAudio) Run(ctx context.Context, params CoverAudioParams, opts ...option.RequestOption) (*CoverAudioResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*CoverAudioResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *AddInstrumental) Create(ctx context.Context, params AddInstrumentalParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, addInstrumentalPath, core.CompactParams(params), requestOptions)
}
func (r *AddInstrumental) Get(ctx context.Context, id string, opts ...option.RequestOption) (*AddInstrumentalResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[AddInstrumentalResponse](ctx, r.http, core.ResourcePath(addInstrumentalPath, id), requestOptions)
}
func (r *AddInstrumental) Run(ctx context.Context, params AddInstrumentalParams, opts ...option.RequestOption) (*AddInstrumentalResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*AddInstrumentalResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *AddVocals) Create(ctx context.Context, params AddVocalsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, addVocalsPath, core.CompactParams(params), requestOptions)
}
func (r *AddVocals) Get(ctx context.Context, id string, opts ...option.RequestOption) (*AddVocalsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[AddVocalsResponse](ctx, r.http, core.ResourcePath(addVocalsPath, id), requestOptions)
}
func (r *AddVocals) Run(ctx context.Context, params AddVocalsParams, opts ...option.RequestOption) (*AddVocalsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*AddVocalsResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *SeparateAudioStems) Create(ctx context.Context, params SeparateAudioStemsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, separateAudioStemsPath, core.CompactParams(params), requestOptions)
}
func (r *SeparateAudioStems) Get(ctx context.Context, id string, opts ...option.RequestOption) (*SeparateAudioStemsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[SeparateAudioStemsResponse](ctx, r.http, core.ResourcePath(separateAudioStemsPath, id), requestOptions)
}
func (r *SeparateAudioStems) Run(ctx context.Context, params SeparateAudioStemsParams, opts ...option.RequestOption) (*SeparateAudioStemsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*SeparateAudioStemsResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

func (r *GenerateMidi) Create(ctx context.Context, params GenerateMidiParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateMidiPath, core.CompactParams(params), requestOptions)
}
func (r *GenerateMidi) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateMidiResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateMidiResponse](ctx, r.http, core.ResourcePath(generateMidiPath, id), requestOptions)
}
func (r *GenerateMidi) Run(ctx context.Context, params GenerateMidiParams, opts ...option.RequestOption) (*GenerateMidiResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateMidiResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *ConvertAudio) Create(ctx context.Context, params ConvertAudioParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, convertAudioPath, core.CompactParams(params), requestOptions)
}
func (r *ConvertAudio) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ConvertAudioResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ConvertAudioResponse](ctx, r.http, core.ResourcePath(convertAudioPath, id), requestOptions)
}
func (r *ConvertAudio) Run(ctx context.Context, params ConvertAudioParams, opts ...option.RequestOption) (*ConvertAudioResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ConvertAudioResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *VisualizeMusic) Create(ctx context.Context, params VisualizeMusicParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, visualizeMusicPath, core.CompactParams(params), requestOptions)
}
func (r *VisualizeMusic) Get(ctx context.Context, id string, opts ...option.RequestOption) (*VisualizeMusicResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[VisualizeMusicResponse](ctx, r.http, core.ResourcePath(visualizeMusicPath, id), requestOptions)
}
func (r *VisualizeMusic) Run(ctx context.Context, params VisualizeMusicParams, opts ...option.RequestOption) (*VisualizeMusicResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*VisualizeMusicResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *GenerateLyrics) Create(ctx context.Context, params GenerateLyricsParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateLyricsPath, core.CompactParams(params), requestOptions)
}
func (r *GenerateLyrics) Get(ctx context.Context, id string, opts ...option.RequestOption) (*GenerateLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[GenerateLyricsResponse](ctx, r.http, core.ResourcePath(generateLyricsPath, id), requestOptions)
}
func (r *GenerateLyrics) Run(ctx context.Context, params GenerateLyricsParams, opts ...option.RequestOption) (*GenerateLyricsResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*GenerateLyricsResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *GetTimestampedLyrics) Run(ctx context.Context, params GetTimestampedLyricsParams, opts ...option.RequestOption) (*GetTimestampedLyricsResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[GetTimestampedLyricsResponse](ctx, r.http, getTimestampedLyricsPath, core.CompactParams(params), requestOptions)
}

func (r *ReplaceSection) Create(ctx context.Context, params ReplaceSectionParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, replaceSectionPath, core.CompactParams(params), requestOptions)
}
func (r *ReplaceSection) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ReplaceSectionResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ReplaceSectionResponse](ctx, r.http, core.ResourcePath(replaceSectionPath, id), requestOptions)
}
func (r *ReplaceSection) Run(ctx context.Context, params ReplaceSectionParams, opts ...option.RequestOption) (*ReplaceSectionResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ReplaceSectionResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *CreateMashup) Create(ctx context.Context, params CreateMashupParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, createMashupPath, core.CompactParams(params), requestOptions)
}
func (r *CreateMashup) Get(ctx context.Context, id string, opts ...option.RequestOption) (*CreateMashupResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[CreateMashupResponse](ctx, r.http, core.ResourcePath(createMashupPath, id), requestOptions)
}
func (r *CreateMashup) Run(ctx context.Context, params CreateMashupParams, opts ...option.RequestOption) (*CreateMashupResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*CreateMashupResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *TextToSound) Create(ctx context.Context, params TextToSoundParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, textToSoundPath, core.CompactParams(params), requestOptions)
}
func (r *TextToSound) Get(ctx context.Context, id string, opts ...option.RequestOption) (*TextToSoundResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[TextToSoundResponse](ctx, r.http, core.ResourcePath(textToSoundPath, id), requestOptions)
}
func (r *TextToSound) Run(ctx context.Context, params TextToSoundParams, opts ...option.RequestOption) (*TextToSoundResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*TextToSoundResponse, error) { return r.Get(ctx, id, opts...) }, pollingOptions)
}

func (r *VoiceToValidationPhrase) Create(ctx context.Context, params VoiceToValidationPhraseParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, voiceToValidationPhrasePath, core.CompactParams(params), requestOptions)
}
func (r *VoiceToValidationPhrase) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ValidationPhraseResponse](ctx, r.http, core.ResourcePath(voiceToValidationPhrasePath, id), requestOptions)
}
func (r *VoiceToValidationPhrase) Run(ctx context.Context, params VoiceToValidationPhraseParams, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ValidationPhraseResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

func (r *RegenerateValidationPhrase) Create(ctx context.Context, params RegenerateValidationPhraseParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, regenerateValidationPhrasePath, core.CompactParams(params), requestOptions)
}
func (r *RegenerateValidationPhrase) Get(ctx context.Context, id string, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[ValidationPhraseResponse](ctx, r.http, core.ResourcePath(regenerateValidationPhrasePath, id), requestOptions)
}
func (r *RegenerateValidationPhrase) Run(ctx context.Context, params RegenerateValidationPhraseParams, opts ...option.RequestOption) (*ValidationPhraseResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*ValidationPhraseResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

func (r *GenerateVoice) Create(ctx context.Context, params GenerateVoiceParams, opts ...option.RequestOption) (*core.TaskCreateResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[core.TaskCreateResponse](ctx, r.http, generateVoicePath, core.CompactParams(params), requestOptions)
}
func (r *GenerateVoice) Get(ctx context.Context, id string, opts ...option.RequestOption) (*VoiceGenerationResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.GetJSON[VoiceGenerationResponse](ctx, r.http, core.ResourcePath(generateVoicePath, id), requestOptions)
}
func (r *GenerateVoice) Run(ctx context.Context, params GenerateVoiceParams, opts ...option.RequestOption) (*VoiceGenerationResponse, error) {
	_, pollingOptions := option.ResolveRequestOptions(opts...)
	return core.RunAsync(ctx, func(ctx context.Context) (*core.TaskCreateResponse, error) { return r.Create(ctx, params, opts...) }, func(ctx context.Context, id string) (*VoiceGenerationResponse, error) {
		return r.Get(ctx, id, opts...)
	}, pollingOptions)
}

func (r *CheckVoice) Run(ctx context.Context, params CheckVoiceParams, opts ...option.RequestOption) (*CheckVoiceResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[CheckVoiceResponse](ctx, r.http, checkVoicePath, core.CompactParams(params), requestOptions)
}

func (r *GeneratePersona) Run(ctx context.Context, params GeneratePersonaParams, opts ...option.RequestOption) (*GeneratePersonaResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[GeneratePersonaResponse](ctx, r.http, generatePersonaPath, core.CompactParams(params), requestOptions)
}

func (r *BoostStyle) Run(ctx context.Context, params BoostStyleParams, opts ...option.RequestOption) (*BoostStyleResponse, error) {
	requestOptions, _ := option.ResolveRequestOptions(opts...)
	return core.PostJSON[BoostStyleResponse](ctx, r.http, boostStylePath, core.CompactParams(params), requestOptions)
}
