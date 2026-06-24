package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedVisualizeMusicResponse;
import ai.runapi.suno.types.VisualizeMusicParams;
import ai.runapi.suno.types.VisualizeMusicResponse;

/** Visualize Music operations. */
public final class VisualizeMusicResource extends SunoResource {
  /** API endpoint path for visualize music operations. */
  public static final String ENDPOINT = "/api/v1/suno/visualize_music";

  /** Creates a resource bound to the supplied transport and client options. */
  public VisualizeMusicResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a visualize music task. */
  public TaskCreateResponse create(VisualizeMusicParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a visualize music task with per-request options. */
  public TaskCreateResponse create(VisualizeMusicParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a visualize music task by ID. */
  public VisualizeMusicResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a visualize music task by ID with per-request options. */
  public VisualizeMusicResponse get(String id, RequestOptions options) {
    return getTask(id, options, VisualizeMusicResponse.class);
  }

  /** Creates a visualize music task and polls until it completes. */
  public CompletedVisualizeMusicResponse run(VisualizeMusicParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a visualize music task with per-request options and polls until it completes. */
  public CompletedVisualizeMusicResponse run(VisualizeMusicParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, VisualizeMusicResponse.class, CompletedVisualizeMusicResponse.class);
  }
}
