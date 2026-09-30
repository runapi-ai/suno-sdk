"""Suno audio_exports resource."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import AudioExportResponse, CompletedAudioExportResponse


class AudioExports(Resource):
    """Export a track to a downloadable audio file."""

    ENDPOINT = "/api/v1/audio_exports"

    RESPONSE_CLASS = AudioExportResponse
    COMPLETED_RESPONSE_CLASS = CompletedAudioExportResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Export a track and poll until it completes.

        Args:
            **params: audio-exports parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create an audio export task and return immediately with an id.

        Args:
            **params: audio-exports parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of an audio export task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)
