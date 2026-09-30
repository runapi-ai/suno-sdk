"""Suno get_timestamped_lyrics resource (synchronous)."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import GetTimestampedLyricsResponse


class GetTimestampedLyrics(Resource):
    """Fetch timestamped lyrics for a track. Synchronous: run() returns the result directly.

    .. deprecated::
        Use :class:`TimestampedLyrics`.
    """

    ENDPOINT = "/api/v1/suno/get_timestamped_lyrics"

    RESPONSE_CLASS = GetTimestampedLyricsResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Retrieve word-level lyric timing (synchronous).

        Args:
            **params: timestamped-lyrics parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)
