package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.GeneratePersonaParams;
import ai.runapi.suno.types.GeneratePersonaResponse;

/** Generate Persona operations. */
public final class GeneratePersonaResource extends SunoResource {
  /** API endpoint path for generate persona operations. */
  public static final String ENDPOINT = "/api/v1/suno/generate_persona";

  /** Creates a resource bound to the supplied transport and client options. */
  public GeneratePersonaResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Runs generate persona and returns the response. */
  public GeneratePersonaResponse run(GeneratePersonaParams params) {
    return run(params, RequestOptions.none());
  }

  /** Runs generate persona with per-request options and returns the response. */
  public GeneratePersonaResponse run(GeneratePersonaParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, GeneratePersonaResponse.class);
  }
}
