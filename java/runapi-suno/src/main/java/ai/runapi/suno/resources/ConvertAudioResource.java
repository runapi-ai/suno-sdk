package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedConvertAudioResponse;
import ai.runapi.suno.types.ConvertAudioParams;
import ai.runapi.suno.types.ConvertAudioResponse;

/** Convert Audio operations. */
public final class ConvertAudioResource extends SunoResource {
  /** API endpoint path for convert audio operations. */
  public static final String ENDPOINT = "/api/v1/suno/convert_audio";

  /** Creates a resource bound to the supplied transport and client options. */
  public ConvertAudioResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a convert audio task. */
  public TaskCreateResponse create(ConvertAudioParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a convert audio task with per-request options. */
  public TaskCreateResponse create(ConvertAudioParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a convert audio task by ID. */
  public ConvertAudioResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a convert audio task by ID with per-request options. */
  public ConvertAudioResponse get(String id, RequestOptions options) {
    return getTask(id, options, ConvertAudioResponse.class);
  }

  /** Creates a convert audio task and polls until it completes. */
  public CompletedConvertAudioResponse run(ConvertAudioParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a convert audio task with per-request options and polls until it completes. */
  public CompletedConvertAudioResponse run(ConvertAudioParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, ConvertAudioResponse.class, CompletedConvertAudioResponse.class);
  }
}
