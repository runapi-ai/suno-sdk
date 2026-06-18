"""Suno generate_voice resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedVoiceGenerationResponse, VoiceGenerationResponse


class GenerateVoice(Resource):
    """Generate a custom voice."""

    ENDPOINT = "/api/v1/suno/generate_voice"

    RESPONSE_CLASS = VoiceGenerationResponse
    COMPLETED_RESPONSE_CLASS = CompletedVoiceGenerationResponse

    def run(self, **params: Any) -> Any:
        """Train a custom voice and poll until it completes.

        Args:
            **params: voice generation parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a voice generation task and return immediately with an id.

        Args:
            **params: voice generation parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a voice generation task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_generate_voice(params)
