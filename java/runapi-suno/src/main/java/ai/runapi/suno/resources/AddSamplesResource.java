package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.AudioActionParams;
import ai.runapi.suno.types.AudioActionResponse;
import ai.runapi.suno.types.CompletedAudioActionResponse;

/** Add samples operations. */
public final class AddSamplesResource extends SunoResource {
  /** API endpoint path for add samples operations. */
  public static final String ENDPOINT = "/api/v1/suno/add_samples";

  /** Creates a resource bound to the supplied transport and client options. */
  public AddSamplesResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates an add samples task. */
  public TaskCreateResponse create(AudioActionParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates an add samples task with per-request options. */
  public TaskCreateResponse create(AudioActionParams params, RequestOptions options) {
    return createTask("suno/add-samples", params.toMap(), options);
  }

  /** Retrieves an add samples task by ID. */
  public AudioActionResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves an add samples task by ID with per-request options. */
  public AudioActionResponse get(String id, RequestOptions options) {
    return getTask(id, options, AudioActionResponse.class);
  }

  /** Creates an add samples task and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates an add samples task with per-request options and polls until it completes. */
  public CompletedAudioActionResponse run(AudioActionParams params, RequestOptions options) {
    return runTask(
        "suno/add-samples", params.toMap(), options, AudioActionResponse.class, CompletedAudioActionResponse.class);
  }
}
