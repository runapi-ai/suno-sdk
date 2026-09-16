"""Suno style_expansions resource (synchronous)."""

from __future__ import annotations

from typing import Any, Dict, Optional

from runapi.core import Resource, RequestOptions

from ..contract_gen import CONTRACT
from ..types import BoostStyleResponse


class StyleExpansions(Resource):
    """Expand a style description into genre tags. Synchronous: run() returns the result directly."""

    ENDPOINT = "/api/v1/style_expansions"

    RESPONSE_CLASS = BoostStyleResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Expand a style description into genre tags (synchronous).

        Args:
            **params: style-expansions parameters.

        Returns:
            The result.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        self._validate_contract(CONTRACT["style-expansions"], params)
