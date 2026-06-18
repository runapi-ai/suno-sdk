"""Suno get_timestamped_lyrics resource (synchronous)."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import GetTimestampedLyricsResponse


class GetTimestampedLyrics(Resource):
    """Fetch timestamped lyrics for a track. Synchronous: run() returns the result directly."""

    ENDPOINT = "/api/v1/suno/get_timestamped_lyrics"

    RESPONSE_CLASS = GetTimestampedLyricsResponse

    def run(self, **params: Any) -> Any:
        """Retrieve word-level lyric timing (synchronous).

        Args:
            **params: timestamped-lyrics parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_get_timestamped_lyrics(params)
