package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedSeparateAudioStemsResponse;
import ai.runapi.suno.types.SeparateAudioStemsParams;
import ai.runapi.suno.types.SeparateAudioStemsResponse;

/** Separate Audio Stems operations. */
public final class SeparateAudioStemsResource extends SunoResource {
  /** API endpoint path for separate audio stems operations. */
  public static final String ENDPOINT = "/api/v1/suno/separate_audio_stems";

  /** Creates a resource bound to the supplied transport and client options. */
  public SeparateAudioStemsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a separate audio stems task. */
  public TaskCreateResponse create(SeparateAudioStemsParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a separate audio stems task with per-request options. */
  public TaskCreateResponse create(SeparateAudioStemsParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a separate audio stems task by ID. */
  public SeparateAudioStemsResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a separate audio stems task by ID with per-request options. */
  public SeparateAudioStemsResponse get(String id, RequestOptions options) {
    return getTask(id, options, SeparateAudioStemsResponse.class);
  }

  /** Creates a separate audio stems task and polls until it completes. */
  public CompletedSeparateAudioStemsResponse run(SeparateAudioStemsParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a separate audio stems task with per-request options and polls until it completes. */
  public CompletedSeparateAudioStemsResponse run(SeparateAudioStemsParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, SeparateAudioStemsResponse.class, CompletedSeparateAudioStemsResponse.class);
  }
}
