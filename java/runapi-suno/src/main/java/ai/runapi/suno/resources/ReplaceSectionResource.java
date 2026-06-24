package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedReplaceSectionResponse;
import ai.runapi.suno.types.ReplaceSectionParams;
import ai.runapi.suno.types.ReplaceSectionResponse;

/** Replace Section operations. */
public final class ReplaceSectionResource extends SunoResource {
  /** API endpoint path for replace section operations. */
  public static final String ENDPOINT = "/api/v1/suno/replace_section";

  /** Creates a resource bound to the supplied transport and client options. */
  public ReplaceSectionResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a replace section task. */
  public TaskCreateResponse create(ReplaceSectionParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a replace section task with per-request options. */
  public TaskCreateResponse create(ReplaceSectionParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a replace section task by ID. */
  public ReplaceSectionResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a replace section task by ID with per-request options. */
  public ReplaceSectionResponse get(String id, RequestOptions options) {
    return getTask(id, options, ReplaceSectionResponse.class);
  }

  /** Creates a replace section task and polls until it completes. */
  public CompletedReplaceSectionResponse run(ReplaceSectionParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a replace section task with per-request options and polls until it completes. */
  public CompletedReplaceSectionResponse run(ReplaceSectionParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, ReplaceSectionResponse.class, CompletedReplaceSectionResponse.class);
  }
}
