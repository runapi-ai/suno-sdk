"""Suno check_voice resource (synchronous)."""

from __future__ import annotations

from typing import Any, Dict, Optional

from runapi.core import Resource, RequestOptions

from .. import _validators
from ..types import CheckVoiceResponse


class CheckVoice(Resource):
    """Check whether a generated voice is available. Synchronous: run() returns the result directly."""

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
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_check_voice(params)
