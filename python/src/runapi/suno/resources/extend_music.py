"""Suno extend_music resource."""

from __future__ import annotations

from typing import Any, Dict, Optional

from runapi.core import Resource, RequestOptions

from .. import _validators
from ..types import CompletedExtendMusicResponse, ExtendMusicResponse


class ExtendMusic(Resource):
    """Extend an existing track."""

    ENDPOINT = "/api/v1/suno/extend_music"

    RESPONSE_CLASS = ExtendMusicResponse
    COMPLETED_RESPONSE_CLASS = CompletedExtendMusicResponse

    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Continue an existing track and poll until it completes.

        Args:
            **params: extend-music parameters.

        Returns:
            The completed (narrowed) response.
        """
        task = self.create(options=options, **params)
        return self._poll_until_complete(lambda: self.get(task.id, options=options))

    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        """Create an extend-music task and return immediately with an id.

        Args:
            **params: extend-music parameters.

        Returns:
            The task creation result with an id.
        """
        compacted = self._compact_params(params)
        self._validate_params(compacted)
        return self._request("post", self.ENDPOINT, body=compacted, options=options)

    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        """Fetch the current status of an extend-music task.

        Args:
            id: The task id returned by ``create``.

        Returns:
            The current task status.
        """
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)

    def _validate_params(self, params: Dict[str, Any]) -> None:
        _validators.validate_extend_music(params)
