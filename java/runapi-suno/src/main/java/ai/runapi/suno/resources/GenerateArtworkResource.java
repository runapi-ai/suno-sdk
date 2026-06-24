package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedGenerateArtworkResponse;
import ai.runapi.suno.types.GenerateArtworkParams;
import ai.runapi.suno.types.GenerateArtworkResponse;

/** Generate Artwork operations. */
public final class GenerateArtworkResource extends SunoResource {
  /** API endpoint path for generate artwork operations. */
  public static final String ENDPOINT = "/api/v1/suno/generate_artwork";

  /** Creates a resource bound to the supplied transport and client options. */
  public GenerateArtworkResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a generate artwork task. */
  public TaskCreateResponse create(GenerateArtworkParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a generate artwork task with per-request options. */
  public TaskCreateResponse create(GenerateArtworkParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a generate artwork task by ID. */
  public GenerateArtworkResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a generate artwork task by ID with per-request options. */
  public GenerateArtworkResponse get(String id, RequestOptions options) {
    return getTask(id, options, GenerateArtworkResponse.class);
  }

  /** Creates a generate artwork task and polls until it completes. */
  public CompletedGenerateArtworkResponse run(GenerateArtworkParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a generate artwork task with per-request options and polls until it completes. */
  public CompletedGenerateArtworkResponse run(GenerateArtworkParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, GenerateArtworkResponse.class, CompletedGenerateArtworkResponse.class);
  }
}
