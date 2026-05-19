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
	_, err := client.CreateMashup.Create(context.Background(), CreateMashupParams{UploadURLList: [2]string{"a", "b"}, CustomMode: false, Model: ModelV45Plus, Prompt: "hi"})
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
}
