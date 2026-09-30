"""Suno music_from_sample resource."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import CompletedMusicFromSampleResponse, MusicFromSampleResponse


class MusicFromSample(Resource):
    """Create music guided by a sample of an uploaded audio file."""

    ENDPOINT = "/api/v1/music_from_sample"

    RESPONSE_CLASS = MusicFromSampleResponse
    COMPLETED_RESPONSE_CLASS = CompletedMusicFromSampleResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create music from a sample and poll until it completes.

        Args:
            **params: music-from-sample parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a music-from-sample task and return immediately with an id.

        Args:
            **params: music-from-sample parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of a music-from-sample task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)
