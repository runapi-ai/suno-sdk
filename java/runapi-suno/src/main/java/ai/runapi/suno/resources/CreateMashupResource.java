package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedCreateMashupResponse;
import ai.runapi.suno.types.CreateMashupParams;
import ai.runapi.suno.types.CreateMashupResponse;

/** Create Mashup operations. */
public final class CreateMashupResource extends SunoResource {
  /** API endpoint path for create mashup operations. */
  public static final String ENDPOINT = "/api/v1/suno/create_mashup";

  /** Creates a resource bound to the supplied transport and client options. */
  public CreateMashupResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a create mashup task. */
  public TaskCreateResponse create(CreateMashupParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a create mashup task with per-request options. */
  public TaskCreateResponse create(CreateMashupParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a create mashup task by ID. */
  public CreateMashupResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a create mashup task by ID with per-request options. */
  public CreateMashupResponse get(String id, RequestOptions options) {
    return getTask(id, options, CreateMashupResponse.class);
  }

  /** Creates a create mashup task and polls until it completes. */
  public CompletedCreateMashupResponse run(CreateMashupParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a create mashup task with per-request options and polls until it completes. */
  public CompletedCreateMashupResponse run(CreateMashupParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, CreateMashupResponse.class, CompletedCreateMashupResponse.class);
  }
}
