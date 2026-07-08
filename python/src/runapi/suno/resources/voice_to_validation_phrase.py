"""Suno voice_to_validation_phrase resource."""

from __future__ import annotations

from typing import Any, Dict, Optional

from runapi.core import Resource, RequestOptions

from .. import _validators
from ..types import CompletedValidationPhraseResponse, ValidationPhraseResponse


class VoiceToValidationPhrase(Resource):
    """Create a validation phrase from a voice sample."""

    ENDPOINT = "/api/v1/suno/voice_to_validation_phrase"

    RESPONSE_CLASS = ValidationPhraseResponse
    COMPLETED_RESPONSE_CLASS = CompletedValidationPhraseResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Extract a validation phrase from a recording and poll until it completes.

        Args:
            **params: validation-phrase parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a validation-phrase task and return immediately with an id.

        Args:
            **params: validation-phrase parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of a validation-phrase task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_voice_to_validation_phrase(params)
