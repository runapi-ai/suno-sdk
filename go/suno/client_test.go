package suno

import (
	"context"
	"encoding/json"
	"math"
	"strings"
	"testing"

	"github.com/runapi-ai/core-sdk/go/core"
)

type stubHTTPClient struct {
	method   string
	path     string
	body     any
	response json.RawMessage
}

func (s *stubHTTPClient) Request(ctx context.Context, method, path string, opts *core.HTTPRequestOptions) (json.RawMessage, error) {
	s.method = method
	s.path = path
	if opts != nil {
		s.body = opts.Body
	}
	if s.response != nil {
		return s.response, nil
	}
	return json.RawMessage(`{"id":"task_123","status":"processing"}`), nil
}

func TestCreateMashupCreateWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.CreateMashup.Create(context.Background(), CreateMashupParams{
		UploadURLList: [2]string{"a", "b"},
		Model:         ModelV45Plus,
		VocalMode:     VocalModeAutoLyrics,
		Prompt:        "hi",
		PersonaID:     "persona_123",
		PersonaType:   PersonaTypeStyle})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/create_mashup" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if _, ok := body["upload_url_list"]; !ok {
		t.Fatalf("expected flat payload, got %#v", body)
	}
	if _, ok := body["mashup"]; ok {
		t.Fatalf("did not expect nested root key, got %#v", body)
	}
	if body["persona_id"] != "persona_123" || body["persona_type"] != string(PersonaTypeStyle) {
		t.Fatalf("expected persona payload, got %#v", body)
	}
}

func TestTextToMusicCreateAcceptsCanonicalVoiceHandle(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.TextToMusic.Create(context.Background(), TextToMusicParams{
		SunoBaseParams: SunoBaseParams{Model: ModelV55},
		VocalMode:   VocalModeExactLyrics,
		Lyrics:      "[Verse] hello",
		Style:       "acoustic pop",
		Title:       "Hello",
		VoiceID:     "res_voice_handle"})
	if err != nil {
		t.Fatal(err)
	}
	body := httpClient.body.(map[string]any)
	if body["voice_id"] != "res_voice_handle" {
		t.Fatalf("expected canonical voice_id, got %#v", body)
	}
}

func TestAddVocalsCreateUsesLyricsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.AddVocals.Create(context.Background(), AddVocalsParams{
		UploadURL:    "https://cdn.runapi.ai/public/samples/instrumental.mp3",
		Lyrics:       "[Verse] sing this",
		Title:        "Song",
		NegativeTags: "screaming",
		Style:        "Pop",
		Model:        ModelV5})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/add_vocals" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["lyrics"] != "[Verse] sing this" {
		t.Fatalf("expected lyrics payload, got %#v", body)
	}
	if _, ok := body["prompt"]; ok {
		t.Fatalf("did not expect prompt payload, got %#v", body)
	}
}

func TestAudioActionsCreateUsePublicRequestShapes(t *testing.T) {
	tests := []struct {
		name string
		path string
		call func(*Client) error
		want map[string]any
	}{
		{
			name: "stitch",
			path: "/api/v1/suno/stitch_audio",
			call: func(client *Client) error {
				_, err := client.StitchAudio.Create(context.Background(), StitchAudioParams{
					Model: ModelV5, SourceTaskID: "task-source", AudioID: "audio-source"})
				return err
			},
			want: map[string]any{"model": string(ModelV5), "source_task_id": "task-source", "audio_id": "audio-source"}},
		{
			name: "remaster",
			path: "/api/v1/suno/remaster_audio",
			call: func(client *Client) error {
				_, err := client.RemasterAudio.Create(context.Background(), RemasterAudioParams{
					Model: ModelV5, SourceTaskID: "task-source", AudioID: "audio-source"})
				return err
			},
			want: map[string]any{"model": string(ModelV5), "source_task_id": "task-source", "audio_id": "audio-source"}},
		{
			name: "remaster with variation category",
			path: "/api/v1/suno/remaster_audio",
			call: func(client *Client) error {
				_, err := client.RemasterAudio.Create(context.Background(), RemasterAudioParams{
					Model: ModelV55, SourceTaskID: "task-source", AudioID: "audio-source", VariationCategory: "high"})
				return err
			},
			want: map[string]any{"model": string(ModelV55), "source_task_id": "task-source", "audio_id": "audio-source", "variation_category": "high"}},
		{
			name: "samples",
			path: "/api/v1/suno/add_samples",
			call: func(client *Client) error {
				_, err := client.AddSamples.Create(context.Background(), AddSamplesParams{
					Model: ModelV5, AudioURL: "https://file.runapi.ai/source.mp3", Prompt: "Add a crisp handclap sample to the chorus", StartSeconds: 5, EndSeconds: 20})
				return err
			},
			want: map[string]any{"model": string(ModelV5), "audio_url": "https://file.runapi.ai/source.mp3", "prompt": "Add a crisp handclap sample to the chorus", "start_seconds": float64(5), "end_seconds": float64(20)}}}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			httpClient := &stubHTTPClient{}
			if err := tt.call(NewClientWithHTTP(httpClient)); err != nil {
				t.Fatal(err)
			}
			if httpClient.method != "POST" || httpClient.path != tt.path {
				t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
			}
			body, ok := httpClient.body.(map[string]any)
			if !ok {
				t.Fatalf("expected flat body map, got %T", httpClient.body)
			}
			for key, want := range tt.want {
				if body[key] != want {
					t.Fatalf("expected %s=%v, got %#v", key, want, body)
				}
			}
		})
	}
}

func TestAddSamplesRejectsInvalidWindow(t *testing.T) {
	client := NewClientWithHTTP(&stubHTTPClient{})
	_, err := client.AddSamples.Create(context.Background(), AddSamplesParams{
		Model: ModelV5, AudioURL: "https://file.runapi.ai/source.mp3", StartSeconds: 20, EndSeconds: 20})
	if err == nil || err.Error() != "end_seconds must be greater than start_seconds" {
		t.Fatalf("expected invalid window error, got %v", err)
	}
}

func TestInspireMusicCreateUsesCallerAudioURLs(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	audioURLs := []string{
		"https://file.runapi.ai/inspiration-one.mp3",
		"https://file.runapi.ai/inspiration-two.mp3"}
	_, err := client.InspireMusic.Create(context.Background(), InspireMusicParams{
		Model: ModelV5, AudioURLs: audioURLs})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/inspire_music" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	bodyURLs, ok := body["audio_urls"].([]any)
	if !ok || len(bodyURLs) != len(audioURLs) {
		t.Fatalf("expected caller audio URLs, got %#v", body)
	}
	for index, expected := range audioURLs {
		if bodyURLs[index] != expected {
			t.Fatalf("expected audio URL %q at index %d, got %#v", expected, index, bodyURLs)
		}
	}
	if _, ok := body["audio_id"]; ok {
		t.Fatalf("did not expect audio_id, got %#v", body)
	}
}

func TestBlendLyricsCreateUsesLyricsPair(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.BlendLyrics.Create(context.Background(), BlendLyricsParams{
		LyricsA: "First verse",
		LyricsB: "Second verse"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/blend_lyrics" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["lyrics_a"] != "First verse" || body["lyrics_b"] != "Second verse" {
		t.Fatalf("expected lyrics pair, got %#v", body)
	}
}

func TestSeparateAudioStemsCreateUsesAdvancedStemPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.SeparateAudioStems.Create(context.Background(), SeparateAudioStemsParams{
		TaskID:   "task-1",
		AudioID:  "audio-1",
		Type:     "split_stem_advanced",
		StemName: "Bass"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/separate_audio_stems" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["type"] != "split_stem_advanced" || body["stem_name"] != "Bass" {
		t.Fatalf("expected advanced stem payload, got %#v", body)
	}
}

func TestSeparateAudioStemsCreateRequiresAdvancedStemName(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.SeparateAudioStems.Create(context.Background(), SeparateAudioStemsParams{
		TaskID:  "task-1",
		AudioID: "audio-1",
		Type:    "split_stem_advanced"})
	if err == nil || !strings.Contains(err.Error(), "stem_name is required when type is split_stem_advanced") {
		t.Fatalf("expected advanced stem_name validation error, got %v", err)
	}
	if httpClient.method != "" {
		t.Fatalf("did not expect an HTTP request, got %s %s", httpClient.method, httpClient.path)
	}
}

func TestSeparateAudioStemsGetDecodesAdvancedPair(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{
		"id":"advanced-stem-123",
		"status":"completed", "usage": {"cost": 0.05},
		"separated_audios":{"pairs":[{
			"stem_name":"Bass",
			"extracted_audio":{"id":"audio-bass","duration_seconds":116.28,"audio_url":"https://file.runapi.ai/bass.mp3"},
			"remaining_audio":{"id":"audio-without-bass","duration_seconds":116.28,"audio_url":"https://file.runapi.ai/without-bass.mp3"}
		}]}
	}`)}
	client := NewClientWithHTTP(httpClient)

	response, err := client.SeparateAudioStems.Get(context.Background(), "advanced-stem-123")
	if err != nil {
		t.Fatal(err)
	}
	pair := response.SeparatedAudios.Pairs[0]
	if pair.StemName != "Bass" || pair.ExtractedAudio.ID != "audio-bass" {
		t.Fatalf("unexpected advanced pair: %#v", pair)
	}
	if pair.RemainingAudio.AudioURL != "https://file.runapi.ai/without-bass.mp3" {
		t.Fatalf("unexpected remaining audio: %#v", pair.RemainingAudio)
	}
}

func TestReplaceSectionCreateUsesLyricsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 10,
		InfillEndTime:   20})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/replace_section" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["lyrics"] != "[Verse] replacement" {
		t.Fatalf("expected lyrics payload, got %#v", body)
	}
	if body["full_lyrics"] != "[Verse] replacement\n[Chorus] return" {
		t.Fatalf("expected full_lyrics payload, got %#v", body)
	}
	if _, ok := body["prompt"]; ok {
		t.Fatalf("did not expect prompt payload, got %#v", body)
	}
}

func TestReplaceSectionCreateSupportsUploadedAudioSource(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		UploadURL:       "https://cdn.runapi.ai/public/samples/music.mp3",
		Model:           ModelV55,
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 10,
		InfillEndTime:   20})
	if err != nil {
		t.Fatal(err)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["upload_url"] != "https://cdn.runapi.ai/public/samples/music.mp3" || body["model"] != string(ModelV55) {
		t.Fatalf("expected uploaded audio payload, got %#v", body)
	}
	if _, ok := body["task_id"]; ok {
		t.Fatalf("did not expect task_id payload, got %#v", body)
	}
	if _, ok := body["audio_id"]; ok {
		t.Fatalf("did not expect audio_id payload, got %#v", body)
	}
}

func TestReplaceSectionCreateRejectsMixedSources(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		UploadURL:       "https://cdn.runapi.ai/public/samples/music.mp3",
		Model:           ModelV55,
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 10,
		InfillEndTime:   20})
	if err == nil || !strings.Contains(err.Error(), "task_id/audio_id cannot be combined with upload_url/model") {
		t.Fatalf("expected mixed source validation error, got %v", err)
	}
	if httpClient.path != "" {
		t.Fatalf("did not expect HTTP request, got %s", httpClient.path)
	}
}

func TestReplaceSectionCreateRejectsInvalidTimeWindow(t *testing.T) {
	cases := []struct {
		name      string
		startTime float64
		endTime   float64
		message   string
	}{
		{
			name:      "end before start",
			startTime: 10,
			endTime:   5,
			message:   "infill_end_time must be greater than infill_start_time"},
		{
			name:      "duration too short",
			startTime: 10,
			endTime:   19.999,
			message:   "replacement duration must be at least 10 seconds"}}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			httpClient := &stubHTTPClient{}
			client := NewClientWithHTTP(httpClient)
			_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
				TaskID:          "task-1",
				AudioID:         "audio-1",
				Lyrics:          "[Verse] replacement",
				FullLyrics:      "[Verse] replacement\n[Chorus] return",
				Tags:            "Rock",
				Title:           "Song",
				InfillStartTime: tc.startTime,
				InfillEndTime:   tc.endTime})
			if err == nil || !strings.Contains(err.Error(), tc.message) {
				t.Fatalf("expected %q validation error, got %v", tc.message, err)
			}
			if httpClient.path != "" {
				t.Fatalf("did not expect HTTP request, got %s", httpClient.path)
			}
		})
	}
}

func TestReplaceSectionCreateAcceptsDurationLongerThanSixtySeconds(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"id":"task-1","status":"processing"}`)}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 10,
		InfillEndTime:   71})
	if err != nil {
		t.Fatalf("expected duration longer than sixty seconds to be accepted, got %v", err)
	}
	if httpClient.path != replaceSectionPath {
		t.Fatalf("expected request to %s, got %s", replaceSectionPath, httpClient.path)
	}
}

func TestReplaceSectionCreateAcceptsDecimalDurationOfExactlyTenSeconds(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"id":"task-1","status":"processing"}`)}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 6.016,
		InfillEndTime:   16.016})
	if err != nil {
		t.Fatalf("expected decimal duration of exactly ten seconds to be accepted, got %v", err)
	}
}

func TestReplaceSectionCreateRejectsNonFiniteTimes(t *testing.T) {
	client := NewClientWithHTTP(&stubHTTPClient{})
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		Lyrics:          "[Verse] replacement",
		FullLyrics:      "[Verse] replacement\n[Chorus] return",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 0,
		InfillEndTime:   math.Inf(1)})
	if err == nil || err.Error() != "infill_end_time must be a finite number" {
		t.Fatalf("expected finite-number validation error, got %v", err)
	}
}

func TestVoiceToValidationPhraseCreateWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.VoiceToValidationPhrase.Create(context.Background(), VoiceToValidationPhraseParams{
		VoiceURL:          "https://files.runapi.ai/suno/source-vocal.mp3",
		VocalStartSeconds: 2,
		VocalEndSeconds:   12,
		Language:          ValidationLanguageEnglish})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/voice_to_validation_phrase" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["voice_url"] != "https://files.runapi.ai/suno/source-vocal.mp3" || body["language"] != string(ValidationLanguageEnglish) {
		t.Fatalf("expected validation phrase payload, got %#v", body)
	}
}

func TestRegenerateValidationPhraseCreateWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.RegenerateValidationPhrase.Create(context.Background(), RegenerateValidationPhraseParams{TaskID: "validate-task-1"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/regenerate_validation_phrase" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["task_id"] != "validate-task-1" {
		t.Fatalf("expected regeneration payload, got %#v", body)
	}
}

func TestGenerateVoiceCreateWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.GenerateVoice.Create(context.Background(), GenerateVoiceParams{
		TaskID:           "validate-task-1",
		VerifyURL:        "https://files.runapi.ai/suno/verify-read.mp3",
		VoiceName:        "Warm Test Voice",
		SingerSkillLevel: SingerSkillAdvanced})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/generate_voice" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["task_id"] != "validate-task-1" || body["verify_url"] != "https://files.runapi.ai/suno/verify-read.mp3" || body["singer_skill_level"] != string(SingerSkillAdvanced) {
		t.Fatalf("expected generate voice payload, got %#v", body)
	}
}

func TestCheckVoiceRunWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"is_available":true}`)}
	client := NewClientWithHTTP(httpClient)
	_, err := client.CheckVoice.Run(context.Background(), CheckVoiceParams{TaskID: "voice-task-1"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/suno/check_voice" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["task_id"] != "voice-task-1" {
		t.Fatalf("expected check voice payload, got %#v", body)
	}
}

func TestPersonasCreatePostsCanonicalResourcePayload(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"persona":{"id":"res_abc","name":"Lo-fi persona","description":"Warm vocals"}}`)}
	client := NewClientWithHTTP(httpClient)

	created, err := client.Personas.Create(context.Background(), PersonaParams{
		SourceTaskID:  "task-1",
		SourceAudioID: "audio-1",
		Name:          "Lo-fi persona",
		Description:   "Warm vocals"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/personas" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body, ok := httpClient.body.(map[string]any)
	if !ok {
		t.Fatalf("expected flat body map, got %T", httpClient.body)
	}
	if body["source_task_id"] != "task-1" || body["source_audio_id"] != "audio-1" || body["name"] != "Lo-fi persona" {
		t.Fatalf("expected canonical persona payload, got %#v", body)
	}
	if _, ok := body["task_id"]; ok {
		t.Fatalf("canonical persona payload must not carry the legacy task_id, got %#v", body)
	}
	if created.Terminal == nil || created.Terminal.Persona == nil || created.Terminal.Persona.ID != "res_abc" {
		t.Fatalf("expected decoded persona resource, got %#v", created)
	}
}

func TestPersonasGetReadsResourceEnvelope(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"persona":{"id":"res_abc","name":"Lo-fi persona"},"status":"available"}`)}
	client := NewClientWithHTTP(httpClient)

	persona, err := client.Personas.Get(context.Background(), "res_abc")
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "GET" || httpClient.path != "/api/v1/personas/res_abc" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	if persona.Status != ResourceStatusAvailable {
		t.Fatalf("expected resolved persona resource, got %#v", persona)
	}
}

func TestVoicesRunPostsRecordingAndGetReportsStatus(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"voice":{"id":"res_voice","name":"Studio Voice"}}`)}
	client := NewClientWithHTTP(httpClient)

	created, err := client.Voices.Run(context.Background(), VoiceParams{
		SourceAudioURL: "https://files.example.test/voice.mp3",
		Name:           "Studio Voice"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/voices" {
		t.Fatalf("unexpected request: %s %s", httpClient.method, httpClient.path)
	}
	body := httpClient.body.(map[string]any)
	if body["source_audio_url"] != "https://files.example.test/voice.mp3" {
		t.Fatalf("expected canonical voice payload, got %#v", body)
	}
	if created.Voice == nil || created.Voice.ID != "res_voice" {
		t.Fatalf("expected decoded voice resource, got %#v", created)
	}

	httpClient.response = json.RawMessage(`{"voice":{"id":"res_voice"},"status":"available"}`)
	voice, err := client.Voices.Get(context.Background(), "res_voice")
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.path != "/api/v1/voices/res_voice" || voice.Status != ResourceStatusAvailable {
		t.Fatalf("expected voice status, got %s %#v", httpClient.path, voice)
	}
}

func TestCanonicalSynchronousHelpersPostCanonicalPaths(t *testing.T) {
	httpClient := &stubHTTPClient{response: json.RawMessage(`{"style":"lo-fi"}`)}
	client := NewClientWithHTTP(httpClient)

	_, err := client.StyleExpansions.Run(context.Background(), StyleExpansionParams{Description: "A chill lo-fi beat"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.path != "/api/v1/style_expansions" {
		t.Fatalf("unexpected style expansion path: %s", httpClient.path)
	}

	httpClient.response = json.RawMessage(`{"aligned_words":[]}`)
	_, err = client.TimestampedLyrics.Run(context.Background(), TimestampedLyricsParams{SourceAudioID: "audio-1"})
	if err != nil {
		t.Fatal(err)
	}
	if httpClient.path != "/api/v1/timestamped_lyrics" {
		t.Fatalf("unexpected timestamped lyrics path: %s", httpClient.path)
	}
	body := httpClient.body.(map[string]any)
	if body["source_audio_id"] != "audio-1" {
		t.Fatalf("expected canonical audio reference, got %#v", body)
	}
	if _, ok := body["audio_id"]; ok {
		t.Fatalf("canonical audio reference must not carry the legacy audio_id, got %#v", body)
	}
}

func TestCanonicalAudioOperationsUseResourcePaths(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)

	if _, err := client.AudioExports.Create(context.Background(), AudioExportParams{SourceAudioID: "audio-1"}); err != nil {
		t.Fatal(err)
	}
	if httpClient.method != "POST" || httpClient.path != "/api/v1/audio_exports" {
		t.Fatalf("unexpected export request: %s %s", httpClient.method, httpClient.path)
	}

	httpClient.response = json.RawMessage(`{"wav_url":"https://files.runapi.ai/export.wav"}`)
	export, err := client.AudioExports.Get(context.Background(), "task-1")
	if err != nil || export.WavURL == "" {
		t.Fatalf("expected completed export, response=%#v err=%v", export, err)
	}
	if httpClient.path != "/api/v1/audio_exports/task-1" {
		t.Fatalf("unexpected export path: %s", httpClient.path)
	}

	if _, err := client.MusicVisualizations.Create(context.Background(), MusicVisualizationParams{SourceAudioID: "audio-1", Author: "Studio"}); err != nil {
		t.Fatal(err)
	}
	if httpClient.path != "/api/v1/music_visualizations" {
		t.Fatalf("unexpected visualization path: %s", httpClient.path)
	}

	if _, err := client.MusicFromSample.Create(context.Background(), MusicFromSampleParams{
		Model: ModelV45Plus, AudioURL: "https://files.example.test/sample.mp3", StartSeconds: 0, EndSeconds: 10}); err != nil {
		t.Fatal(err)
	}
	if httpClient.path != "/api/v1/music_from_sample" {
		t.Fatalf("unexpected music-from-sample path: %s", httpClient.path)
	}
}
