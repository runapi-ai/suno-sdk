from .audio_actions import AudioAction
class StitchAudio(AudioAction):
    ENDPOINT = "/api/v1/suno/stitch_audio"
    ACTION = "stitch-audio"
    def create(self, options=None, **params): return super().create(options=options, **params)
