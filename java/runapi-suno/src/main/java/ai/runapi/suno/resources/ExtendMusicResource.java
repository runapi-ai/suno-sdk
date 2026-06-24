package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedExtendMusicResponse;
import ai.runapi.suno.types.ExtendMusicParams;
import ai.runapi.suno.types.ExtendMusicResponse;

/** Extend Music operations. */
public final class ExtendMusicResource extends SunoResource {
  /** API endpoint path for extend music operations. */
  public static final String ENDPOINT = "/api/v1/suno/extend_music";

  /** Creates a resource bound to the supplied transport and client options. */
  public ExtendMusicResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a extend music task. */
  public TaskCreateResponse create(ExtendMusicParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a extend music task with per-request options. */
  public TaskCreateResponse create(ExtendMusicParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a extend music task by ID. */
  public ExtendMusicResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a extend music task by ID with per-request options. */
  public ExtendMusicResponse get(String id, RequestOptions options) {
    return getTask(id, options, ExtendMusicResponse.class);
  }

  /** Creates a extend music task and polls until it completes. */
  public CompletedExtendMusicResponse run(ExtendMusicParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a extend music task with per-request options and polls until it completes. */
  public CompletedExtendMusicResponse run(ExtendMusicParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, ExtendMusicResponse.class, CompletedExtendMusicResponse.class);
  }
}
