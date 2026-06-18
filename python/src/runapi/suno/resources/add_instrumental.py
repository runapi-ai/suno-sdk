"""Suno add_instrumental resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedAddInstrumentalResponse, AddInstrumentalResponse


class AddInstrumental(Resource):
    """Add an instrumental backing to uploaded audio."""

    ENDPOINT = "/api/v1/suno/add_instrumental"

    RESPONSE_CLASS = AddInstrumentalResponse
    COMPLETED_RESPONSE_CLASS = CompletedAddInstrumentalResponse

    def run(self, **params: Any) -> Any:
        """Generate and add an instrumental backing track and poll until it completes.

        Args:
            **params: add-instrumental parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create an add-instrumental task and return immediately with an id.

        Args:
            **params: add-instrumental parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of an add-instrumental task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_add_instrumental(params)
