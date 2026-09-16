"""Suno voices resource.

A voice is a RunAPI-owned resource: create it from a recording, then keep
passing its id wherever a voice persona is accepted. ``get`` reports whether the
voice is ready, which replaces polling a separate availability operation.
"""

from __future__ import annotations

from typing import Any, Dict, Optional

from runapi.core import Resource, RequestOptions

from ..contract_gen import CONTRACT
from ..types import VoiceCreationResponse, VoiceResourceResponse


class Voices(Resource):
    """Create a reusable voice and read it back as a RunAPI-owned resource."""

    ENDPOINT = "/api/v1/voices"

    RESPONSE_CLASS = VoiceCreationResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create a voice from a recording (synchronous).

        Voice creation is synchronous, so this returns the created voice rather
        than a task to poll.

        Args:
            **params: voices parameters.

        Returns:
            The created voice resource.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch a voice resource by its RunAPI-owned id.

        Args:
            id: The voice id returned by ``run``.

        Returns:
            The voice with its status and the task it came from.
        """
        return self._request(
            "get",
            f"{self.ENDPOINT}/{id}",
            options=options,
            response_class=VoiceResourceResponse,
        )

    def _validate_params(self, params: Dict[str, Any]) -> None:
        self._validate_contract(CONTRACT["voices"], params)
