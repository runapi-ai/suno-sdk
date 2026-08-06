from .audio_actions import AudioAction
from runapi.core.errors import ValidationError

class AddSamples(AudioAction):
    ENDPOINT = "/api/v1/suno/add_samples"
    ACTION = "add-samples"

    def create(self, options=None, **params):
        if params.get("end_seconds", 0) <= params.get("start_seconds", 0):
            raise ValidationError("end_seconds must be greater than start_seconds")
        return super().create(options=options, **params)
