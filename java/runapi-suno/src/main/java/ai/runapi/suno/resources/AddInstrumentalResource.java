package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedAddInstrumentalResponse;
import ai.runapi.suno.types.AddInstrumentalParams;
import ai.runapi.suno.types.AddInstrumentalResponse;

/** Add Instrumental operations. */
public final class AddInstrumentalResource extends SunoResource {
  /** API endpoint path for add instrumental operations. */
  public static final String ENDPOINT = "/api/v1/suno/add_instrumental";

  /** Creates a resource bound to the supplied transport and client options. */
  public AddInstrumentalResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a add instrumental task. */
  public TaskCreateResponse create(AddInstrumentalParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a add instrumental task with per-request options. */
  public TaskCreateResponse create(AddInstrumentalParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a add instrumental task by ID. */
  public AddInstrumentalResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a add instrumental task by ID with per-request options. */
  public AddInstrumentalResponse get(String id, RequestOptions options) {
    return getTask(id, options, AddInstrumentalResponse.class);
  }

  /** Creates a add instrumental task and polls until it completes. */
  public CompletedAddInstrumentalResponse run(AddInstrumentalParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a add instrumental task with per-request options and polls until it completes. */
  public CompletedAddInstrumentalResponse run(AddInstrumentalParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, AddInstrumentalResponse.class, CompletedAddInstrumentalResponse.class);
  }
}
