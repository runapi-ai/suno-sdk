package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.AudioExportParams;
import ai.runapi.suno.types.AudioExportResponse;
import ai.runapi.suno.types.CompletedAudioExportResponse;

/** Audio export operations. */
public final class AudioExportsResource extends SunoResource {
  /** API endpoint path for audio export operations. */
  public static final String ENDPOINT = "/api/v1/audio_exports";

  /** Creates a resource bound to the supplied transport and client options. */
  public AudioExportsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates an audio export task. */
  public TaskCreateResponse create(AudioExportParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates an audio export task with per-request options. */
  public TaskCreateResponse create(AudioExportParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves an audio export task by ID. */
  public AudioExportResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves an audio export task by ID with per-request options. */
  public AudioExportResponse get(String id, RequestOptions options) {
    return getTask(id, options, AudioExportResponse.class);
  }

  /** Creates an audio export task and polls until it completes. */
  public CompletedAudioExportResponse run(AudioExportParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates an audio export task with per-request options and polls until it completes. */
  public CompletedAudioExportResponse run(AudioExportParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, AudioExportResponse.class, CompletedAudioExportResponse.class);
  }
}
