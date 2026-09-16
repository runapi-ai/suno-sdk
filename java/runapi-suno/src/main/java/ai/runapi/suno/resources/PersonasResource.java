package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.polling.Task;
import ai.runapi.suno.types.PersonaCreationResponse;
import ai.runapi.suno.types.PersonaParams;
import ai.runapi.suno.types.PersonaResourceResponse;

/** Persona resource operations. */
public final class PersonasResource extends SunoResource {
  /** API endpoint path for persona operations. */
  public static final String ENDPOINT = "/api/v1/personas";

  /** Creates a resource bound to the supplied transport and client options. */
  public PersonasResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Starts persona creation and returns a terminal result or an accepted Task. */
  public Task<PersonaCreationResponse> create(PersonaParams params) {
    return create(params, RequestOptions.none());
  }

  /** Starts persona creation with per-request options. */
  public Task<PersonaCreationResponse> create(PersonaParams params, RequestOptions options) {
    return createHybridTask(params.action(), params.toMap(), options, PersonaCreationResponse.class);
  }

  /** Creates a persona, following an accepted Task to its stored result. */
  public PersonaCreationResponse run(PersonaParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a persona with per-request options. */
  public PersonaCreationResponse run(PersonaParams params, RequestOptions options) {
    return create(params, options).subscribe();
  }

  /** Retrieves a persona resource by ID. */
  public PersonaResourceResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a persona resource by ID with per-request options. */
  public PersonaResourceResponse get(String id, RequestOptions options) {
    return getResource(id, options, PersonaResourceResponse.class);
  }
}
