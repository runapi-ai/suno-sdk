package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedMusicFromSampleResponse;
import ai.runapi.suno.types.MusicFromSampleParams;
import ai.runapi.suno.types.MusicFromSampleResponse;

/** Music-from-sample operations. */
public final class MusicFromSampleResource extends SunoResource {
  /** API endpoint path for music-from-sample operations. */
  public static final String ENDPOINT = "/api/v1/music_from_sample";

  /** Creates a resource bound to the supplied transport and client options. */
  public MusicFromSampleResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a music-from-sample task. */
  public TaskCreateResponse create(MusicFromSampleParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a music-from-sample task with per-request options. */
  public TaskCreateResponse create(MusicFromSampleParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a music-from-sample task by ID. */
  public MusicFromSampleResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a music-from-sample task by ID with per-request options. */
  public MusicFromSampleResponse get(String id, RequestOptions options) {
    return getTask(id, options, MusicFromSampleResponse.class);
  }

  /** Creates a music-from-sample task and polls until it completes. */
  public CompletedMusicFromSampleResponse run(MusicFromSampleParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a music-from-sample task with per-request options and polls until it completes. */
  public CompletedMusicFromSampleResponse run(MusicFromSampleParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, MusicFromSampleResponse.class, CompletedMusicFromSampleResponse.class);
  }
}
