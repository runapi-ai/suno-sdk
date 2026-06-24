package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.TaskCreateResponse;
import ai.runapi.suno.types.CompletedRegenerateValidationPhraseResponse;
import ai.runapi.suno.types.RegenerateValidationPhraseParams;
import ai.runapi.suno.types.RegenerateValidationPhraseResponse;

/** Regenerate Validation Phrase operations. */
public final class RegenerateValidationPhraseResource extends SunoResource {
  /** API endpoint path for regenerate validation phrase operations. */
  public static final String ENDPOINT = "/api/v1/suno/regenerate_validation_phrase";

  /** Creates a resource bound to the supplied transport and client options. */
  public RegenerateValidationPhraseResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a regenerate validation phrase task. */
  public TaskCreateResponse create(RegenerateValidationPhraseParams params) {
    return create(params, RequestOptions.none());
  }

  /** Creates a regenerate validation phrase task with per-request options. */
  public TaskCreateResponse create(RegenerateValidationPhraseParams params, RequestOptions options) {
    return createTask(params.action(), params.toMap(), options);
  }

  /** Retrieves a regenerate validation phrase task by ID. */
  public RegenerateValidationPhraseResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a regenerate validation phrase task by ID with per-request options. */
  public RegenerateValidationPhraseResponse get(String id, RequestOptions options) {
    return getTask(id, options, RegenerateValidationPhraseResponse.class);
  }

  /** Creates a regenerate validation phrase task and polls until it completes. */
  public CompletedRegenerateValidationPhraseResponse run(RegenerateValidationPhraseParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a regenerate validation phrase task with per-request options and polls until it completes. */
  public CompletedRegenerateValidationPhraseResponse run(RegenerateValidationPhraseParams params, RequestOptions options) {
    return runTask(params.action(), params.toMap(), options, RegenerateValidationPhraseResponse.class, CompletedRegenerateValidationPhraseResponse.class);
  }
}
