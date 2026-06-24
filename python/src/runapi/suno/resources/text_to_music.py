"""Suno text_to_music resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from ..contract_gen import CONTRACT
from ..types import CompletedTextToMusicResponse, TextToMusicResponse


class TextToMusic(Resource):
    """Generate music from a text prompt."""

    ENDPOINT = "/api/v1/suno/text_to_music"

    RESPONSE_CLASS = TextToMusicResponse
    COMPLETED_RESPONSE_CLASS = CompletedTextToMusicResponse

    def run(self, **params: Any) -> Any:
        """Generate music from a text prompt and poll until it completes.

        Args:
            **params: text-to-music parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a text-to-music task and return immediately with an id.

        Args:
            **params: text-to-music parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a text-to-music task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        self._validate_contract(CONTRACT["text-to-music"], params)
