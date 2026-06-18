"""Suno boost_style resource (synchronous)."""

from __future__ import annotations

from typing import Any, Dict

from runapi.core import Resource

from .. import _validators
from ..types import BoostStyleResponse


class BoostStyle(Resource):
    """Boost a style description. Synchronous: run() returns the result directly."""

    ENDPOINT = "/api/v1/suno/boost_style"

    RESPONSE_CLASS = BoostStyleResponse

    def run(self, **params: Any) -> Any:
        """Generate style/genre tags from a description (synchronous).

        Args:
            **params: boost-style parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_boost_style(params)
