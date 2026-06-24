package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.CheckVoiceParams;
import ai.runapi.suno.types.CheckVoiceResponse;

/** Check Voice operations. */
public final class CheckVoiceResource extends SunoResource {
  /** API endpoint path for check voice operations. */
  public static final String ENDPOINT = "/api/v1/suno/check_voice";

  /** Creates a resource bound to the supplied transport and client options. */
  public CheckVoiceResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Runs check voice and returns the response. */
  public CheckVoiceResponse run(CheckVoiceParams params) {
    return run(params, RequestOptions.none());
  }

  /** Runs check voice with per-request options and returns the response. */
  public CheckVoiceResponse run(CheckVoiceParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, CheckVoiceResponse.class);
  }
}
