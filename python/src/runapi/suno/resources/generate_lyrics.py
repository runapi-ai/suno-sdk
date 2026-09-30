"""Suno generate_lyrics resource."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import CompletedGenerateLyricsResponse, GenerateLyricsResponse


class GenerateLyrics(Resource):
    """Generate lyrics from a prompt."""

    ENDPOINT = "/api/v1/suno/generate_lyrics"

    RESPONSE_CLASS = GenerateLyricsResponse
    COMPLETED_RESPONSE_CLASS = CompletedGenerateLyricsResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Generate lyrics and poll until it completes.

        Args:
            **params: lyrics parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a lyrics task and return immediately with an id.

        Args:
            **params: lyrics parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of a lyrics task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)
