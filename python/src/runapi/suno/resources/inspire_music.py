from .audio_actions import AudioAction


class InspireMusic(AudioAction):
    ENDPOINT = "/api/v1/suno/inspire_music"
    ACTION = "inspire-music"

    def create(self, options=None, **params):
        return super().create(options=options, **params)
