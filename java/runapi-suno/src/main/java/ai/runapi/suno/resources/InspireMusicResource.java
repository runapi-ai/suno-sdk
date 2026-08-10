package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.AudioActionResponse;
import ai.runapi.suno.types.CompletedAudioActionResponse;
import ai.runapi.suno.types.InspireMusicParams;

/** Music inspiration operations. */
public final class InspireMusicResource extends SunoResource {
  /** API endpoint path for music inspiration operations. */
  public static final String ENDPOINT = "/api/v1/suno/inspire_music";

  /** Creates a resource bound to the supplied transport and client options. */
  public InspireMusicResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a music inspiration task. */
  public TaskCreateResponse create(InspireMusicParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a music inspiration task with per-request options. */
  public TaskCreateResponse create(InspireMusicParams params, RequestOptions options) {
    return createTask("suno/inspire-music", params.toMap(), options);
  }

  /** Retrieves a music inspiration task by ID. */
  public AudioActionResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a music inspiration task by ID with per-request options. */
  public AudioActionResponse get(String id, RequestOptions options) {
    return getTask(id, options, AudioActionResponse.class);
  }

  /** Creates a music inspiration task and polls until it completes. */
  public CompletedAudioActionResponse run(InspireMusicParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a music inspiration task with per-request options and polls until it completes. */
  public CompletedAudioActionResponse run(InspireMusicParams params, RequestOptions options) {
    return runTask(
        "suno/inspire-music", params.toMap(), options, AudioActionResponse.class, CompletedAudioActionResponse.class);
  }
}
