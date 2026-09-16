package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedMusicVisualizationResponse;
import ai.runapi.suno.types.MusicVisualizationParams;
import ai.runapi.suno.types.MusicVisualizationResponse;

/** Music visualization operations. */
public final class MusicVisualizationsResource extends SunoResource {
  /** API endpoint path for music visualization operations. */
  public static final String ENDPOINT = "/api/v1/music_visualizations";

  /** Creates a resource bound to the supplied transport and client options. */
  public MusicVisualizationsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a music visualization task. */
  public TaskCreateResponse create(MusicVisualizationParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a music visualization task with per-request options. */
  public TaskCreateResponse create(MusicVisualizationParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a music visualization task by ID. */
  public MusicVisualizationResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a music visualization task by ID with per-request options. */
  public MusicVisualizationResponse get(String id, RequestOptions options) {
    return getTask(id, options, MusicVisualizationResponse.class);
  }

  /** Creates a music visualization task and polls until it completes. */
  public CompletedMusicVisualizationResponse run(MusicVisualizationParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a music visualization task with per-request options and polls until it completes. */
  public CompletedMusicVisualizationResponse run(MusicVisualizationParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, MusicVisualizationResponse.class, CompletedMusicVisualizationResponse.class);
  }
}
