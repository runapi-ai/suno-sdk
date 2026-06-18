"""Suno generate_persona resource (synchronous)."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import GeneratePersonaResponse


class GeneratePersona(Resource):
    """Generate a reusable persona. Synchronous: run() returns the result directly."""

    ENDPOINT = "/api/v1/suno/generate_persona"

    RESPONSE_CLASS = GeneratePersonaResponse

    def run(self, **params: Any) -> Any:
        """Create a reusable style or voice persona (synchronous).

        Args:
            **params: persona parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_generate_persona(params)
