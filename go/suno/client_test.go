package suno

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/runapi-ai/core-sdk/go/core"
)

type stubHTTPClient struct {
	method string
	path   string
	body   any
}

func (s *stubHTTPClient) Request(ctx context.Context, method, path string, opts *core.HTTPRequestOptions) (json.RawMessage, error) {
	s.method = method
	s.path = path
	if opts != nil {
		s.body = opts.Body
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
		PersonaType:   PersonaTypeStyle,
	})
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

func TestAddVocalsCreateUsesLyricsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.AddVocals.Create(context.Background(), AddVocalsParams{
		UploadURL:    "https://cdn.runapi.ai/public/samples/instrumental.mp3",
		Lyrics:       "[Verse] sing this",
		Title:        "Song",
		NegativeTags: "screaming",
		Style:        "Pop",
		Model:        ModelV5,
	})
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

func TestReplaceSectionCreateUsesLyricsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.ReplaceSection.Create(context.Background(), ReplaceSectionParams{
		TaskID:          "task-1",
		AudioID:         "audio-1",
		Lyrics:          "[Verse] replacement",
		Tags:            "Rock",
		Title:           "Song",
		InfillStartTime: 10,
		InfillEndTime:   20,
	})
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
	if _, ok := body["prompt"]; ok {
		t.Fatalf("did not expect prompt payload, got %#v", body)
	}
}

func TestVoiceToValidationPhraseCreateWrapsPayload(t *testing.T) {
	httpClient := &stubHTTPClient{}
	client := NewClientWithHTTP(httpClient)
	_, err := client.VoiceToValidationPhrase.Create(context.Background(), VoiceToValidationPhraseParams{
		VoiceURL:          "https://files.runapi.ai/suno/source-vocal.mp3",
		VocalStartSeconds: 2,
		VocalEndSeconds:   12,
		Language:          ValidationLanguageEnglish,
	})
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
		SingerSkillLevel: SingerSkillAdvanced,
	})
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
	httpClient := &stubHTTPClient{}
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
