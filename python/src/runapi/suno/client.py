"""Suno client."""

from __future__ import annotations

from typing import Any, Optional

from runapi.core import ProviderClient

from .resources.add_instrumental import AddInstrumental
from .resources.add_vocals import AddVocals
from .resources.add_samples import AddSamples
from .resources.remaster_audio import RemasterAudio
from .resources.stitch_audio import StitchAudio
from .resources.boost_style import BoostStyle
from .resources.blend_lyrics import BlendLyrics
from .resources.check_voice import CheckVoice
from .resources.convert_audio import ConvertAudio
from .resources.cover_audio import CoverAudio
from .resources.create_mashup import CreateMashup
from .resources.extend_music import ExtendMusic
from .resources.generate_artwork import GenerateArtwork
from .resources.generate_lyrics import GenerateLyrics
from .resources.generate_midi import GenerateMidi
from .resources.generate_persona import GeneratePersona
from .resources.generate_voice import GenerateVoice
from .resources.get_timestamped_lyrics import GetTimestampedLyrics
from .resources.regenerate_validation_phrase import RegenerateValidationPhrase
from .resources.replace_section import ReplaceSection
from .resources.separate_audio_stems import SeparateAudioStems
from .resources.text_to_music import TextToMusic
from .resources.text_to_sound import TextToSound
from .resources.visualize_music import VisualizeMusic
from .resources.voice_to_validation_phrase import VoiceToValidationPhrase


class SunoClient(ProviderClient):
    """Suno music, sound, lyrics, and voice client.

    Example::

        client = SunoClient(api_key="sk-...")
        result = client.text_to_music.run(
            prompt="A chill lo-fi beat with soft vocals",
            model="suno-v4.5-plus",
            vocal_mode="auto_lyrics",
        )
    """

    def __init__(self, api_key: Optional[str] = None, **options: Any) -> None:
        super().__init__(api_key, **options)
        http = self._http

        self.text_to_music = TextToMusic(http)
        self.extend_music = ExtendMusic(http)
        self.generate_artwork = GenerateArtwork(http)
        self.cover_audio = CoverAudio(http)
        self.add_instrumental = AddInstrumental(http)
        self.add_vocals = AddVocals(http)
        self.add_samples = AddSamples(http)
        self.remaster_audio = RemasterAudio(http)
        self.stitch_audio = StitchAudio(http)
        self.separate_audio_stems = SeparateAudioStems(http)
        self.generate_midi = GenerateMidi(http)
        self.convert_audio = ConvertAudio(http)
        self.visualize_music = VisualizeMusic(http)
        self.generate_lyrics = GenerateLyrics(http)
        self.blend_lyrics = BlendLyrics(http)
        self.get_timestamped_lyrics = GetTimestampedLyrics(http)
        self.replace_section = ReplaceSection(http)
        self.create_mashup = CreateMashup(http)
        self.text_to_sound = TextToSound(http)
        self.voice_to_validation_phrase = VoiceToValidationPhrase(http)
        self.regenerate_validation_phrase = RegenerateValidationPhrase(http)
        self.generate_voice = GenerateVoice(http)
        self.check_voice = CheckVoice(http)
        self.generate_persona = GeneratePersona(http)
        self.boost_style = BoostStyle(http)
