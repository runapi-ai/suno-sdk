"""Suno create_mashup resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource, ValidationError

from ..contract_gen import CONTRACT
from ..types import CompletedCreateMashupResponse, CreateMashupResponse


class CreateMashup(Resource):
    """Create a mashup from two uploaded tracks."""

    ENDPOINT = "/api/v1/suno/create_mashup"

    RESPONSE_CLASS = CreateMashupResponse
    COMPLETED_RESPONSE_CLASS = CompletedCreateMashupResponse

    def run(self, **params: Any) -> Any:
        """Blend two tracks into one and poll until it completes.

        Args:
            **params: mashup parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a mashup task and return immediately with an id.

        Args:
            **params: mashup parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a mashup task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        upload_url_list = params.get("upload_url_list")
        if not (isinstance(upload_url_list, list) and len(upload_url_list) == 2):
            raise ValidationError("upload_url_list must contain exactly 2 URLs")
        self._validate_contract(CONTRACT["create-mashup"], params)
