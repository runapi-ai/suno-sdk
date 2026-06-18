"""Suno generate_artwork resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedGenerateArtworkResponse, GenerateArtworkResponse


class GenerateArtwork(Resource):
    """Generate cover artwork for a prior task."""

    ENDPOINT = "/api/v1/suno/generate_artwork"

    RESPONSE_CLASS = GenerateArtworkResponse
    COMPLETED_RESPONSE_CLASS = CompletedGenerateArtworkResponse

    def run(self, **params: Any) -> Any:
        """Create cover artwork and poll until it completes.

        Args:
            **params: artwork parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a artwork task and return immediately with an id.

        Args:
            **params: artwork parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a artwork task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_generate_artwork(params)
