package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.BoostStyleResponse;
import ai.runapi.suno.types.StyleExpansionParams;

/** Style expansion operations. */
public final class StyleExpansionsResource extends SunoResource {
  /** API endpoint path for style expansion operations. */
  public static final String ENDPOINT = "/api/v1/style_expansions";

  /** Creates a resource bound to the supplied transport and client options. */
  public StyleExpansionsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Expands a style description. */
  public BoostStyleResponse run(StyleExpansionParams params) {
    return run(params, RequestOptions.none());
  }

  /** Expands a style description with per-request options. */
  public BoostStyleResponse run(StyleExpansionParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, BoostStyleResponse.class);
  }
}
