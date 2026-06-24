import pytest

from runapi.core import config
from runapi.core.errors import AuthenticationError, ValidationError
from runapi.suno import SunoClient
from runapi.suno import resources as R
from runapi.suno.types import (
    BoostStyleResponse,
    CheckVoiceResponse,
    CompletedTextToMusicResponse,
    GeneratePersonaResponse,
    GetTimestampedLyricsResponse,
    TextToMusicResponse,
)


class FakeHttp:
    def __init__(self, *responses):
        self._responses = list(responses)
        self.calls = []

    def request(self, method, path, body=None, options=None):
        self.calls.append((method, path, body))
        if self._responses:
            return self._responses.pop(0)
        return {"id": "task_1", "status": "pending"}


@pytest.fixture(autouse=True)
def reset_config(monkeypatch):
    monkeypatch.delenv("RUNAPI_API_KEY", raising=False)
    monkeypatch.setattr(config, "api_key", None)
    yield


# --- auth -----------------------------------------------------------------


def test_accepts_api_key_parameter():
    assert isinstance(SunoClient(api_key="k", http_client=FakeHttp()), SunoClient)


def test_falls_back_to_global(monkeypatch):
    monkeypatch.setattr(config, "api_key", "global-key")
    assert isinstance(SunoClient(http_client=FakeHttp()), SunoClient)


def test_falls_back_to_env(monkeypatch):
    monkeypatch.setenv("RUNAPI_API_KEY", "env-key")
    assert isinstance(SunoClient(http_client=FakeHttp()), SunoClient)


def test_raises_without_api_key():
    with pytest.raises(AuthenticationError, match="API key is required"):
        SunoClient()


# --- injection / accessors ------------------------------------------------


def test_uses_injected_http_client():
    fake = FakeHttp()
    client = SunoClient(api_key="k", http_client=fake)
    assert client.text_to_music._http is fake
    assert client.boost_style._http is fake


def test_exposes_all_resource_accessors():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    expected = {
        "text_to_music": R.TextToMusic,
        "extend_music": R.ExtendMusic,
        "generate_artwork": R.GenerateArtwork,
        "cover_audio": R.CoverAudio,
        "add_instrumental": R.AddInstrumental,
        "add_vocals": R.AddVocals,
        "separate_audio_stems": R.SeparateAudioStems,
        "generate_midi": R.GenerateMidi,
        "convert_audio": R.ConvertAudio,
        "visualize_music": R.VisualizeMusic,
        "generate_lyrics": R.GenerateLyrics,
        "get_timestamped_lyrics": R.GetTimestampedLyrics,
        "replace_section": R.ReplaceSection,
        "create_mashup": R.CreateMashup,
        "text_to_sound": R.TextToSound,
        "voice_to_validation_phrase": R.VoiceToValidationPhrase,
        "regenerate_validation_phrase": R.RegenerateValidationPhrase,
        "generate_voice": R.GenerateVoice,
        "check_voice": R.CheckVoice,
        "generate_persona": R.GeneratePersona,
        "boost_style": R.BoostStyle,
    }
    assert len(expected) == 21
    for name, cls in expected.items():
        assert isinstance(getattr(client, name), cls), name


# --- async request shapes -------------------------------------------------


def test_create_posts_compacted_body():
    fake = FakeHttp({"id": "t1", "status": "pending"})
    client = SunoClient(api_key="k", http_client=fake)
    result = client.text_to_music.create(
        model="suno-v4.5-plus", vocal_mode="auto_lyrics", prompt="hello", title=None
    )
    assert fake.calls == [
        (
            "post",
            "/api/v1/suno/text_to_music",
            {"model": "suno-v4.5-plus", "vocal_mode": "auto_lyrics", "prompt": "hello"},
        ),
    ]
    assert isinstance(result, TextToMusicResponse)


def test_get_fetches_by_id():
    fake = FakeHttp({"id": "t1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)
    client.text_to_music.get("t1")
    assert fake.calls == [("get", "/api/v1/suno/text_to_music/t1", None)]


def test_run_narrows_completed_type():
    fake = FakeHttp(
        {"id": "t1", "status": "pending"},
        {
            "id": "t1",
            "status": "completed",
            "audios": [{"id": "a1", "audio_url": "https://x/y.mp3"}],
        },
    )
    client = SunoClient(api_key="k", http_client=fake)
    result = client.text_to_music.run(
        model="suno-v4.5-plus", vocal_mode="auto_lyrics", prompt="a calm tune"
    )
    assert isinstance(result, CompletedTextToMusicResponse)
    assert result.audios[0].audio_url == "https://x/y.mp3"


def test_extend_music_run_narrows_completed():
    fake = FakeHttp(
        {"id": "t2", "status": "pending"},
        {"id": "t2", "status": "completed", "audios": [{"id": "a2"}]},
    )
    client = SunoClient(api_key="k", http_client=fake)
    result = client.extend_music.run(
        task_id="src", parameter_mode="source", model="suno-v4.5-plus"
    )
    from runapi.suno.types import CompletedExtendMusicResponse

    assert isinstance(result, CompletedExtendMusicResponse)


# --- synchronous request shapes -------------------------------------------


def test_check_voice_sync_run():
    fake = FakeHttp({"is_available": True})
    client = SunoClient(api_key="k", http_client=fake)
    result = client.check_voice.run(task_id="t9")
    assert fake.calls == [("post", "/api/v1/suno/check_voice", {"task_id": "t9"})]
    assert isinstance(result, CheckVoiceResponse)
    assert result.is_available is True


def test_boost_style_sync_run():
    fake = FakeHttp({"style": "dreamy synthwave"})
    client = SunoClient(api_key="k", http_client=fake)
    result = client.boost_style.run(description="make it dreamy")
    assert fake.calls == [("post", "/api/v1/suno/boost_style", {"description": "make it dreamy"})]
    assert isinstance(result, BoostStyleResponse)


def test_generate_persona_sync_run():
    fake = FakeHttp({"persona": {"id": "p1", "name": "Echo", "description": "soft"}})
    client = SunoClient(api_key="k", http_client=fake)
    result = client.generate_persona.run(
        task_id="t", audio_id="a", name="Echo", description="soft"
    )
    assert isinstance(result, GeneratePersonaResponse)
    assert result.persona.name == "Echo"


def test_get_timestamped_lyrics_sync_run():
    fake = FakeHttp({"aligned_words": [{"word": "hi", "success": True, "start_time": 0.0, "end_time": 0.5, "palign": 1.0}]})
    client = SunoClient(api_key="k", http_client=fake)
    result = client.get_timestamped_lyrics.run(task_id="t", audio_id="a")
    assert fake.calls == [
        ("post", "/api/v1/suno/get_timestamped_lyrics", {"task_id": "t", "audio_id": "a"}),
    ]
    assert isinstance(result, GetTimestampedLyricsResponse)


# --- validation: distinct validator patterns ------------------------------


def test_text_to_music_requires_model():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    # valid auto_lyrics shape but no model
    with pytest.raises(ValidationError, match="model must be one of:"):
        client.text_to_music.create(vocal_mode="auto_lyrics", prompt="hi")


def test_music_prompt_shape_error():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="vocal_mode is required"):
        client.text_to_music.create(model="suno-v4.5-plus", prompt="hi")


def test_text_to_music_rejects_unknown_model():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="model must be one of:"):
        client.text_to_music.create(model="nope", vocal_mode="auto_lyrics", prompt="hi")


def test_extend_music_requires_a_source():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="task_id, audio_id, audio_url, or upload_url is required"):
        client.extend_music.create(parameter_mode="source", model="suno-v5")


def test_extend_music_custom_requires_style_title_continue_at():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="style is required"):
        client.extend_music.create(task_id="x", parameter_mode="custom", model="suno-v5")


def test_extend_music_lyrics_combination_rule():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="prompt cannot be combined with lyrics"):
        client.extend_music.create(
            task_id="x",
            parameter_mode="source",
            model="suno-v5",
            lyrics="la la",
            prompt="hi",
        )


def test_require_all_add_instrumental():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="upload_url is required"):
        client.add_instrumental.create(model="suno-v5")


def test_replace_section_time_ordering():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="infill_end_time must be greater than infill_start_time"):
        client.replace_section.create(
            task_id="t",
            audio_id="a",
            lyrics="x",
            tags="y",
            title="z",
            infill_start_time=10.0,
            infill_end_time=5.0,
        )


def test_create_mashup_requires_two_urls():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="upload_url_list must contain exactly 2 URLs"):
        client.create_mashup.create(upload_url_list=["only-one"], model="suno-v5")


def test_text_to_sound_tempo_range():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="sound_tempo must be between 1 and 300"):
        client.text_to_sound.create(prompt="rain", model="suno-v5", sound_tempo=900)


def test_text_to_sound_rejects_non_sound_model():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="Invalid model"):
        client.text_to_sound.create(prompt="rain", model="suno-v4")


def test_voice_to_validation_phrase_seconds_ordering():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="vocal_end_seconds must be greater than vocal_start_seconds"):
        client.voice_to_validation_phrase.create(
            voice_url="https://x/v.mp3", vocal_start_seconds=10, vocal_end_seconds=5
        )


def test_separate_audio_stems_enum():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="Invalid type"):
        client.separate_audio_stems.create(task_id="t", audio_id="a", type="nope")


def test_generate_voice_skill_level_enum():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="Invalid singer_skill_level"):
        client.generate_voice.create(task_id="t", verify_url="https://x", singer_skill_level="nope")


def test_check_voice_requires_task_id():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="task_id is required"):
        client.check_voice.run()


def test_boost_style_requires_description():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="description is required"):
        client.boost_style.run()


def test_response_without_status_coerces_cleanly():
    # Regression: status is optional (matching the base TaskResponse and every
    # other line) — a response body omitting status must coerce, not raise
    # "status is required" before polling can decide.
    from runapi.core import BaseModel
    from runapi.suno.types import TextToMusicResponse

    m = BaseModel.coerce({"id": "t1", "audios": []}, as_=TextToMusicResponse)
    assert m.id == "t1"
    assert m.status is None
