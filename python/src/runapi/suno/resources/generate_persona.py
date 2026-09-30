"""Suno generate_persona resource (synchronous)."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import GeneratePersonaResponse


class GeneratePersona(Resource):
    """Generate a reusable persona. Synchronous: run() returns the result directly.

    .. deprecated::
        Use :class:`Personas`, which returns a RunAPI-owned persona resource.
    """

    ENDPOINT = "/api/v1/suno/generate_persona"

    RESPONSE_CLASS = GeneratePersonaResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a reusable style or voice persona (synchronous).

        Args:
            **params: persona parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)
