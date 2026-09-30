from .audio_actions import AudioAction

class AddSamples(AudioAction):
    """Add a sample of an uploaded audio file to new music.

    .. deprecated::
        Use :class:`MusicFromSample`.
    """

    ENDPOINT = "/api/v1/suno/add_samples"
    ACTION = "add-samples"

    def create(self, options=None, **params):
        return super().create(options=options, **params)
