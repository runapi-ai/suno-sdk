"""Suno boost_style resource (synchronous)."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import Resource, RequestOptions

from ..types import BoostStyleResponse


class BoostStyle(Resource):
    """Boost a style description. Synchronous: run() returns the result directly.

    .. deprecated::
        Use :class:`StyleExpansions`.
    """

    ENDPOINT = "/api/v1/suno/boost_style"

    RESPONSE_CLASS = BoostStyleResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Generate style/genre tags from a description (synchronous).

        Args:
            **params: boost-style parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)
