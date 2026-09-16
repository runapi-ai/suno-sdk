package ai.runapi.suno.resources;

import ai.runapi.core.ClientOptions;
import ai.runapi.core.RequestOptions;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.suno.types.GetTimestampedLyricsResponse;
import ai.runapi.suno.types.TimestampedLyricsParams;

/** Timestamped lyrics operations. */
public final class TimestampedLyricsResource extends SunoResource {
  /** API endpoint path for timestamped lyrics operations. */
  public static final String ENDPOINT = "/api/v1/timestamped_lyrics";

  /** Creates a resource bound to the supplied transport and client options. */
  public TimestampedLyricsResource(HttpTransport transport, ClientOptions options) {
    super(transport, options, ENDPOINT);
  }

  /** Retrieves word-level timing alignment for existing audio. */
  public GetTimestampedLyricsResponse run(TimestampedLyricsParams params) {
    return run(params, RequestOptions.none());
  }

  /** Retrieves word-level timing alignment with per-request options. */
  public GetTimestampedLyricsResponse run(TimestampedLyricsParams params, RequestOptions options) {
    return runSync(params.action(), params.toMap(), options, GetTimestampedLyricsResponse.class);
  }
}
