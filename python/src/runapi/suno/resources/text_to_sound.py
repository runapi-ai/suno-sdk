"""Suno text_to_sound resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedTextToSoundResponse, TextToSoundResponse


class TextToSound(Resource):
    """Generate a sound effect from a text prompt."""

    ENDPOINT = "/api/v1/suno/text_to_sound"

    RESPONSE_CLASS = TextToSoundResponse
    COMPLETED_RESPONSE_CLASS = CompletedTextToSoundResponse

    def run(self, **params: Any) -> Any:
        """Generate sound effects and poll until it completes.

        Args:
            **params: text-to-sound parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a text-to-sound task and return immediately with an id.

        Args:
            **params: text-to-sound parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a text-to-sound task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_text_to_sound(params)
