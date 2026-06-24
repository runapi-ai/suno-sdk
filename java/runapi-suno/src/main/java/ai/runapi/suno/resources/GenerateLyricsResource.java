package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedGenerateLyricsResponse;
import ai.runapi.suno.types.GenerateLyricsParams;
import ai.runapi.suno.types.GenerateLyricsResponse;

/** Generate Lyrics operations. */
public final class GenerateLyricsResource extends SunoResource {
  /** API endpoint path for generate lyrics operations. */
  public static final String ENDPOINT = "/api/v1/suno/generate_lyrics";

  /** Creates a resource bound to the supplied transport and client options. */
  public GenerateLyricsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a generate lyrics task. */
  public TaskCreateResponse create(GenerateLyricsParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a generate lyrics task with per-request options. */
  public TaskCreateResponse create(GenerateLyricsParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a generate lyrics task by ID. */
  public GenerateLyricsResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a generate lyrics task by ID with per-request options. */
  public GenerateLyricsResponse get(String id, RequestOptions options) {
    return getTask(id, options, GenerateLyricsResponse.class);
  }

  /** Creates a generate lyrics task and polls until it completes. */
  public CompletedGenerateLyricsResponse run(GenerateLyricsParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a generate lyrics task with per-request options and polls until it completes. */
  public CompletedGenerateLyricsResponse run(GenerateLyricsParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, GenerateLyricsResponse.class, CompletedGenerateLyricsResponse.class);
  }
}
