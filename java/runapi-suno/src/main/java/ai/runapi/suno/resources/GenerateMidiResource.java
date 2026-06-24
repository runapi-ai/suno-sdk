package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedGenerateMidiResponse;
import ai.runapi.suno.types.GenerateMidiParams;
import ai.runapi.suno.types.GenerateMidiResponse;

/** Generate Midi operations. */
public final class GenerateMidiResource extends SunoResource {
  /** API endpoint path for generate midi operations. */
  public static final String ENDPOINT = "/api/v1/suno/generate_midi";

  /** Creates a resource bound to the supplied transport and client options. */
  public GenerateMidiResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a generate midi task. */
  public TaskCreateResponse create(GenerateMidiParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a generate midi task with per-request options. */
  public TaskCreateResponse create(GenerateMidiParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a generate midi task by ID. */
  public GenerateMidiResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a generate midi task by ID with per-request options. */
  public GenerateMidiResponse get(String id, RequestOptions options) {
    return getTask(id, options, GenerateMidiResponse.class);
  }

  /** Creates a generate midi task and polls until it completes. */
  public CompletedGenerateMidiResponse run(GenerateMidiParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a generate midi task with per-request options and polls until it completes. */
  public CompletedGenerateMidiResponse run(GenerateMidiParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, GenerateMidiResponse.class, CompletedGenerateMidiResponse.class);
  }
}
