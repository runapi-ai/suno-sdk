package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedGenerateVoiceResponse;
import ai.runapi.suno.types.GenerateVoiceParams;
import ai.runapi.suno.types.GenerateVoiceResponse;

/** Generate Voice operations. */
public final class GenerateVoiceResource extends SunoResource {
  /** API endpoint path for generate voice operations. */
  public static final String ENDPOINT = "/api/v1/suno/generate_voice";

  /** Creates a resource bound to the supplied transport and client options. */
  public GenerateVoiceResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a generate voice task. */
  public TaskCreateResponse create(GenerateVoiceParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a generate voice task with per-request options. */
  public TaskCreateResponse create(GenerateVoiceParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a generate voice task by ID. */
  public GenerateVoiceResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a generate voice task by ID with per-request options. */
  public GenerateVoiceResponse get(String id, RequestOptions options) {
    return getTask(id, options, GenerateVoiceResponse.class);
  }

  /** Creates a generate voice task and polls until it completes. */
  public CompletedGenerateVoiceResponse run(GenerateVoiceParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a generate voice task with per-request options and polls until it completes. */
  public CompletedGenerateVoiceResponse run(GenerateVoiceParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, GenerateVoiceResponse.class, CompletedGenerateVoiceResponse.class);
  }
}
