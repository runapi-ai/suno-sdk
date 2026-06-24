"""Suno cover_audio resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from ..contract_gen import CONTRACT
from ..types import CompletedCoverAudioResponse, CoverAudioResponse


class CoverAudio(Resource):
    """Create a cover of uploaded audio."""

    ENDPOINT = "/api/v1/suno/cover_audio"

    RESPONSE_CLASS = CoverAudioResponse
    COMPLETED_RESPONSE_CLASS = CompletedCoverAudioResponse

    def run(self, **params: Any) -> Any:
        """Re-record vocals over an audio file and poll until it completes.

        Args:
            **params: cover-audio parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a cover-audio task and return immediately with an id.

        Args:
            **params: cover-audio parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a cover-audio task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        self._validate_contract(CONTRACT["cover-audio"], params)
