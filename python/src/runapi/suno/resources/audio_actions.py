from typing import Any, Optional
from runapi.core import Resource, RequestOptions

class AudioAction(Resource):
    ENDPOINT = ""
    ACTION = ""
    def create(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        body = self._compact_params(params)
        return self._request("post", self.ENDPOINT, body=body, options=options)
    def get(self, id: str, options: Optional[RequestOptions] = None) -> Any:
        return self._request("get", f"{self.ENDPOINT}/{id}", options=options)
    def run(self, options: Optional[RequestOptions] = None, **params: Any) -> Any:
        task = self.create(options=options, **params); return self._poll_until_complete(lambda: self.get(task.id, options=options))
