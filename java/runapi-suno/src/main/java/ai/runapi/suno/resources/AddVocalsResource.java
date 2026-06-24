package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedAddVocalsResponse;
import ai.runapi.suno.types.AddVocalsParams;
import ai.runapi.suno.types.AddVocalsResponse;

/** Add Vocals operations. */
public final class AddVocalsResource extends SunoResource {
  /** API endpoint path for add vocals operations. */
  public static final String ENDPOINT = "/api/v1/suno/add_vocals";

  /** Creates a resource bound to the supplied transport and client options. */
  public AddVocalsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a add vocals task. */
  public TaskCreateResponse create(AddVocalsParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a add vocals task with per-request options. */
  public TaskCreateResponse create(AddVocalsParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a add vocals task by ID. */
  public AddVocalsResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a add vocals task by ID with per-request options. */
  public AddVocalsResponse get(String id, RequestOptions options) {
    return getTask(id, options, AddVocalsResponse.class);
  }

  /** Creates a add vocals task and polls until it completes. */
  public CompletedAddVocalsResponse run(AddVocalsParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a add vocals task with per-request options and polls until it completes. */
  public CompletedAddVocalsResponse run(AddVocalsParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, AddVocalsResponse.class, CompletedAddVocalsResponse.class);
  }
}
