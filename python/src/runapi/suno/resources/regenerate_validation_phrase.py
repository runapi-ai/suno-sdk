"""Suno regenerate_validation_phrase resource."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import CompletedValidationPhraseResponse, ValidationPhraseResponse


class RegenerateValidationPhrase(Resource):
    """Regenerate a validation phrase for a prior task."""

    ENDPOINT = "/api/v1/suno/regenerate_validation_phrase"

    RESPONSE_CLASS = ValidationPhraseResponse
    COMPLETED_RESPONSE_CLASS = CompletedValidationPhraseResponse

    def run(self, **params: Any) -> Any:
        """Request a new validation phrase and poll until it completes.

        Args:
            **params: validation-phrase parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(**params)
        return self._poll_until_complete(lambda: self.get(task.id))

    def create(self, **params: Any) -> Any:
        """Create a validation-phrase task and return immediately with an id.

        Args:
            **params: validation-phrase parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def get(self, id: str) -> Any:
        """Fetch the current status of a validation-phrase task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}")

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_regenerate_validation_phrase(params)
