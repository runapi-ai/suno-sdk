"""Suno visualize_music resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedVisualizeMusicResponse, VisualizeMusicResponse


class VisualizeMusic(Resource):
    """Render a music visualization video."""

    ENDPOINT = "/api/v1/suno/visualize_music"

    RESPONSE_CLASS = VisualizeMusicResponse
    COMPLETED_RESPONSE_CLASS = CompletedVisualizeMusicResponse

    def run(self, **params: Any) -> Any:
        """Generate a music visualization video and poll until it completes.

        Args:
            **params: visualization parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a visualization task and return immediately with an id.

        Args:
            **params: visualization parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a visualization task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_visualize_music(params)
