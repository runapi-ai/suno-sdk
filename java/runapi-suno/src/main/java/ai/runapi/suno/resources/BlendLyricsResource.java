package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.BlendLyricsParams;
import ai.runapi.suno.types.BlendLyricsResponse;
import ai.runapi.suno.types.CompletedBlendLyricsResponse;

/** Blend Lyrics operations. */
public final class BlendLyricsResource extends SunoResource {
  public static final String ENDPOINT = "/api/v1/suno/blend_lyrics";

  public BlendLyricsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  public TaskCreateResponse create(BlendLyricsParams params) {
    return create(params, RequestOptions.none());
  }

  public TaskCreateResponse create(BlendLyricsParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  public BlendLyricsResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  public BlendLyricsResponse get(String id, RequestOptions options) {
    return getTask(id, options, BlendLyricsResponse.class);
  }

  public CompletedBlendLyricsResponse run(BlendLyricsParams params) {
    return run(params, RequestOptions.none());
  }

  public CompletedBlendLyricsResponse run(BlendLyricsParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, BlendLyricsResponse.class, CompletedBlendLyricsResponse.class);
  }
}
