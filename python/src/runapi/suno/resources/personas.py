"""Suno personas resource.

A persona is a RunAPI-owned resource: create it once, then keep passing its id
as ``persona_id`` in music generation parameters. Holding the resource id
instead of the creating request keeps a workflow resumable after that request
is gone.
"""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import PersonaCreationResponse, PersonaResourceResponse


class Personas(Resource):
    """Create a reusable persona and read it back as a RunAPI-owned resource."""

    ENDPOINT = "/api/v1/personas"

    RESPONSE_CLASS = PersonaCreationResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a persona, following an accepted task to its stored result.

        Args:
            **params: personas parameters.

        Returns:
            The created persona resource.
        """
        compacted = self._compact_params(params)
        return self._run_hybrid("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch a persona resource by its RunAPI-owned id.

        Args:
            id: The persona id returned by ``run``.

        Returns:
            The persona with its status and the task it came from.
        """
        return self._request(
            "get",
            f"{self.ENDPOINT}/{id}",
            options=options,
            response_class=PersonaResourceResponse,
        )
