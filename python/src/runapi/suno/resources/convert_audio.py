"""Suno convert_audio resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedConvertAudioResponse, ConvertAudioResponse


class ConvertAudio(Resource):
    """Convert a track to a WAV file."""

    ENDPOINT = "/api/v1/suno/convert_audio"

    RESPONSE_CLASS = ConvertAudioResponse
    COMPLETED_RESPONSE_CLASS = CompletedConvertAudioResponse

    def run(self, **params: Any) -> Any:
        """Convert a track to WAV and poll until it completes.

        Args:
            **params: convert-audio parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a convert-audio task and return immediately with an id.

        Args:
            **params: convert-audio parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a convert-audio task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_convert_audio(params)
