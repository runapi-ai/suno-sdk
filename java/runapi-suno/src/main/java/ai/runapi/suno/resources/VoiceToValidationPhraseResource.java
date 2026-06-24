package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedVoiceToValidationPhraseResponse;
import ai.runapi.suno.types.VoiceToValidationPhraseParams;
import ai.runapi.suno.types.VoiceToValidationPhraseResponse;

/** Voice To Validation Phrase operations. */
public final class VoiceToValidationPhraseResource extends SunoResource {
  /** API endpoint path for voice to validation phrase operations. */
  public static final String ENDPOINT = "/api/v1/suno/voice_to_validation_phrase";

  /** Creates a resource bound to the supplied transport and client options. */
  public VoiceToValidationPhraseResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a voice to validation phrase task. */
  public TaskCreateResponse create(VoiceToValidationPhraseParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a voice to validation phrase task with per-request options. */
  public TaskCreateResponse create(VoiceToValidationPhraseParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a voice to validation phrase task by ID. */
  public VoiceToValidationPhraseResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a voice to validation phrase task by ID with per-request options. */
  public VoiceToValidationPhraseResponse get(String id, RequestOptions options) {
    return getTask(id, options, VoiceToValidationPhraseResponse.class);
  }

  /** Creates a voice to validation phrase task and polls until it completes. */
  public CompletedVoiceToValidationPhraseResponse run(VoiceToValidationPhraseParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a voice to validation phrase task with per-request options and polls until it completes. */
  public CompletedVoiceToValidationPhraseResponse run(VoiceToValidationPhraseParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, VoiceToValidationPhraseResponse.class, CompletedVoiceToValidationPhraseResponse.class);
  }
}
