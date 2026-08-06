package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.AudioActionParams;
import ai.runapi.suno.types.AudioActionResponse;
import ai.runapi.suno.types.CompletedAudioActionResponse;

/** Stitch audio operations. */
public final class StitchAudioResource extends SunoResource {
  /** API endpoint path for stitch audio operations. */
  public static final String ENDPOINT = "/api/v1/suno/stitch_audio";

  /** Creates a resource bound to the supplied transport and client options. */
  public StitchAudioResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a stitch audio task. */
  public TaskCreateResponse create(AudioActionParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a stitch audio task with per-request options. */
  public TaskCreateResponse create(AudioActionParams params, RequestOptions options) {
    return createTask("suno/stitch-audio", params.toMap(), options);
  }

  /** Retrieves a stitch audio task by ID. */
  public AudioActionResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a stitch audio task by ID with per-request options. */
  public AudioActionResponse get(String id, RequestOptions options) {
    return getTask(id, options, AudioActionResponse.class);
  }

  /** Creates a stitch audio task and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a stitch audio task with per-request options and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params, RequestOptions options) {
    return runTask(
        "suno/stitch-audio", params.toMap(), options, AudioActionResponse.class, CompletedAudioActionResponse.class);
  }
}
