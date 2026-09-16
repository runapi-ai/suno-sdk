package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.VoiceCreationResponse;
import ai.runapi.suno.types.VoiceParams;
import ai.runapi.suno.types.VoiceResourceResponse;

/** Voice resource operations. */
public final class VoicesResource extends SunoResource {
  /** API endpoint path for voice operations. */
  public static final String ENDPOINT = "/api/v1/voices";

  /** Creates a resource bound to the supplied transport and client options. */
  public VoicesResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Creates a voice from a recording. */
  public VoiceCreationResponse run(VoiceParams params) {
    return run(params, RequestOptions.none());
  }

  /** Creates a voice from a recording with per-request options. */
  public VoiceCreationResponse run(VoiceParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, VoiceCreationResponse.class);
  }

  /** Retrieves a voice resource by ID. */
  public VoiceResourceResponse get(String id) {
    return get(id, RequestOptions.none());
  }

  /** Retrieves a voice resource by ID with per-request options. */
  public VoiceResourceResponse get(String id, RequestOptions options) {
    return getResource(id, options, VoiceResourceResponse.class);
  }
}
