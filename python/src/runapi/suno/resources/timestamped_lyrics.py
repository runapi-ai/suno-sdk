"""Suno timestamped_lyrics resource (synchronous)."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import GetTimestampedLyricsResponse


class TimestampedLyrics(Resource):
    """Retrieve word-level lyric timing for a track. Synchronous: run() returns the result directly."""

    ENDPOINT = "/api/v1/timestamped_lyrics"

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
