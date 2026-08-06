from .audio_actions import AudioAction
class RemasterAudio(AudioAction):
    ENDPOINT = "/api/v1/suno/remaster_audio"
    ACTION = "remaster-audio"
    def create(self, options=None, **params): return super().create(options=options, **params)
