package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.GetTimestampedLyricsParams;
import ai.runapi.suno.types.GetTimestampedLyricsResponse;

/** Get Timestamped Lyrics operations. */
public final class GetTimestampedLyricsResource extends SunoResource {
  /** API endpoint path for get timestamped lyrics operations. */
  public static final String ENDPOINT = "/api/v1/suno/get_timestamped_lyrics";

  /** Creates a resource bound to the supplied transport and client options. */
  public GetTimestampedLyricsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Runs get timestamped lyrics and returns the response. */
  public GetTimestampedLyricsResponse run(GetTimestampedLyricsParams params) {
    return run(params, RequestOptions.none());
  }

  /** Runs get timestamped lyrics with per-request options and returns the response. */
  public GetTimestampedLyricsResponse run(GetTimestampedLyricsParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, GetTimestampedLyricsResponse.class);
  }
}
