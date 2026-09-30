"""Suno check_voice resource (synchronous)."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import CheckVoiceResponse


class CheckVoice(Resource):
    """Check whether a generated voice is available. Synchronous: run() returns the result directly.

    .. deprecated::
        Use :meth:`Voices.get`, which reports the voice resource status directly.
    """

    ENDPOINT = "/api/v1/suno/check_voice"

    RESPONSE_CLASS = CheckVoiceResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Check whether a custom voice is ready (synchronous).

        Args:
            **params: check-voice parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)
