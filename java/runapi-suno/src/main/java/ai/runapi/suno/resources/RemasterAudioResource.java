package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.AudioActionParams;
import ai.runapi.suno.types.AudioActionResponse;
import ai.runapi.suno.types.CompletedAudioActionResponse;

/** Remaster audio operations. */
public final class RemasterAudioResource extends SunoResource {
  /** API endpoint path for remaster audio operations. */
  public static final String ENDPOINT = "/api/v1/suno/remaster_audio";

  /** Creates a resource bound to the supplied transport and client options. */
  public RemasterAudioResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a remaster audio task. */
  public TaskCreateResponse create(AudioActionParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a remaster audio task with per-request options. */
  public TaskCreateResponse create(AudioActionParams params, RequestOptions options) {
    return createTask("suno/remaster-audio", params.toMap(), options);
  }

  /** Retrieves a remaster audio task by ID. */
  public AudioActionResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a remaster audio task by ID with per-request options. */
  public AudioActionResponse get(String id, RequestOptions options) {
    return getTask(id, options, AudioActionResponse.class);
  }

  /** Creates a remaster audio task and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a remaster audio task with per-request options and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params, RequestOptions options) {
    return runTask(
        "suno/remaster-audio", params.toMap(), options, AudioActionResponse.class, CompletedAudioActionResponse.class);
  }
}
