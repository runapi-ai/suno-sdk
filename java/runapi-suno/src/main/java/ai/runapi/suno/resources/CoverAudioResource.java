package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedCoverAudioResponse;
import ai.runapi.suno.types.CoverAudioParams;
import ai.runapi.suno.types.CoverAudioResponse;

/** Cover Audio operations. */
public final class CoverAudioResource extends SunoResource {
  /** API endpoint path for cover audio operations. */
  public static final String ENDPOINT = "/api/v1/suno/cover_audio";

  /** Creates a resource bound to the supplied transport and client options. */
  public CoverAudioResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a cover audio task. */
  public TaskCreateResponse create(CoverAudioParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a cover audio task with per-request options. */
  public TaskCreateResponse create(CoverAudioParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a cover audio task by ID. */
  public CoverAudioResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a cover audio task by ID with per-request options. */
  public CoverAudioResponse get(String id, RequestOptions options) {
    return getTask(id, options, CoverAudioResponse.class);
  }

  /** Creates a cover audio task and polls until it completes. */
  public CompletedCoverAudioResponse run(CoverAudioParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a cover audio task with per-request options and polls until it completes. */
  public CompletedCoverAudioResponse run(CoverAudioParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, CoverAudioResponse.class, CompletedCoverAudioResponse.class);
  }
}
