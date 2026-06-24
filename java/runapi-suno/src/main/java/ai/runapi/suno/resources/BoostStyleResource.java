package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.BoostStyleParams;
import ai.runapi.suno.types.BoostStyleResponse;

/** Boost Style operations. */
public final class BoostStyleResource extends SunoResource {
  /** API endpoint path for boost style operations. */
  public static final String ENDPOINT = "/api/v1/suno/boost_style";

  /** Creates a resource bound to the supplied transport and client options. */
  public BoostStyleResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Runs boost style and returns the response. */
  public BoostStyleResponse run(BoostStyleParams params) {
    return run(params, RequestOptions.none());
  }

  /** Runs boost style with per-request options and returns the response. */
  public BoostStyleResponse run(BoostStyleParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, BoostStyleResponse.class);
  }
}
