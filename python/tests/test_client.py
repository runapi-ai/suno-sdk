import pytest

from runapi.core import ApiResponse, config
from runapi.core.errors import AuthenticationError, ValidationError
from runapi.suno import SunoClient
from runapi.suno import resources as R
from runapi.suno.types import (
    AudioExportResponse,
    BoostStyleResponse,
    CheckVoiceResponse,
    CompletedAudioExportResponse,
    CompletedMusicFromSampleResponse,
    CompletedMusicVisualizationResponse,
    CompletedTextToMusicResponse,
    GeneratePersonaResponse,
    GetTimestampedLyricsResponse,
    MusicFromSampleResponse,
    MusicVisualizationResponse,
    PersonaCreationResponse,
    PersonaResourceResponse,
    SeparateAudioStemsResponse,
    TextToMusicResponse,
    VoiceCreationResponse,
    VoiceResourceResponse,
)


class FakeHttp:
    def __init__(self, *responses):
        self._responses = list(responses)
        self.calls = []
        self.options = []

    def request(self, method, path, body=None, options=None):
        self.calls.append((method, path, body))
        self.options.append(options)
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
        "stitch_audio": R.StitchAudio,
        "remaster_audio": R.RemasterAudio,
        "add_samples": R.AddSamples,
        "inspire_music": R.InspireMusic,
        "separate_audio_stems": R.SeparateAudioStems,
        "generate_midi": R.GenerateMidi,
        "convert_audio": R.ConvertAudio,
        "visualize_music": R.VisualizeMusic,
        "generate_lyrics": R.GenerateLyrics,
        "blend_lyrics": R.BlendLyrics,
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
        "personas": R.Personas,
        "voices": R.Voices,
        "style_expansions": R.StyleExpansions,
        "timestamped_lyrics": R.TimestampedLyrics,
        "audio_exports": R.AudioExports,
        "music_visualizations": R.MusicVisualizations,
        "music_from_sample": R.MusicFromSample,
    }
    assert len(expected) == 33
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


def test_create_accepts_canonical_voice_handle():
    fake = FakeHttp({"id": "voice_task", "status": "pending"})
    client = SunoClient(api_key="k", http_client=fake)
    client.text_to_music.create(
        model="suno-v5.5", vocal_mode="exact_lyrics", lyrics="[Verse] hello",
        style="acoustic pop", title="Hello", voice_id="res_voice_handle",
    )
    assert fake.calls[0][2]["voice_id"] == "res_voice_handle"


def test_get_fetches_by_id():
    fake = FakeHttp({"id": "t1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)
    client.text_to_music.get("t1")
    assert fake.calls == [("get", "/api/v1/suno/text_to_music/t1", None)]


def test_blend_lyrics_posts_flat_lyrics_pair():
    fake = FakeHttp({"id": "blend_1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)

    client.blend_lyrics.create(lyrics_a="First verse", lyrics_b="Second verse")

    assert fake.calls == [
        ("post", "/api/v1/suno/blend_lyrics", {"lyrics_a": "First verse", "lyrics_b": "Second verse"}),
    ]


def test_audio_actions_post_public_request_shapes():
    fake = FakeHttp()
    client = SunoClient(api_key="k", http_client=fake)

    client.stitch_audio.create(model="suno-v5", source_task_id="source", audio_id="audio")
    client.remaster_audio.create(model="suno-v5", source_task_id="source", audio_id="audio")
    client.add_samples.create(
        model="suno-v5", audio_url="https://file.runapi.ai/source.mp3", prompt="Add a crisp handclap sample to the chorus", start_seconds=5, end_seconds=20
    )
    client.inspire_music.create(
        model="suno-v5",
        audio_urls=["https://file.runapi.ai/inspiration-one.mp3", "https://file.runapi.ai/inspiration-two.mp3"],
    )

    assert fake.calls == [
        ("post", "/api/v1/suno/stitch_audio", {"model": "suno-v5", "source_task_id": "source", "audio_id": "audio"}),
        ("post", "/api/v1/suno/remaster_audio", {"model": "suno-v5", "source_task_id": "source", "audio_id": "audio"}),
        ("post", "/api/v1/suno/add_samples", {
            "model": "suno-v5", "audio_url": "https://file.runapi.ai/source.mp3", "prompt": "Add a crisp handclap sample to the chorus", "start_seconds": 5, "end_seconds": 20,
        }),
        ("post", "/api/v1/suno/inspire_music", {
            "model": "suno-v5",
            "audio_urls": ["https://file.runapi.ai/inspiration-one.mp3", "https://file.runapi.ai/inspiration-two.mp3"],
        }),
    ]


def test_add_samples_rejects_invalid_window():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="end_seconds must be greater than start_seconds"):
        client.add_samples.create(
            model="suno-v5", audio_url="https://file.runapi.ai/source.mp3", start_seconds=20, end_seconds=20
        )


def test_blend_lyrics_requires_both_lyrics_texts():
    client = SunoClient(api_key="k", http_client=FakeHttp())

    with pytest.raises(ValidationError, match="lyrics_b"):
        client.blend_lyrics.create(lyrics_a="First verse")


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
            full_lyrics="[Verse] x",
            tags="y",
            title="z",
            infill_start_time=10.0,
            infill_end_time=5.0,
        )


def test_replace_section_rejects_duration_shorter_than_ten_seconds():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="replacement duration must be at least 10 seconds"):
        client.replace_section.create(
            task_id="t",
            audio_id="a",
            lyrics="x",
            full_lyrics="[Verse] x",
            tags="y",
            title="z",
            infill_start_time=10.0,
            infill_end_time=19.999,
        )


def test_replace_section_accepts_duration_longer_than_sixty_seconds():
    fake = FakeHttp({"id": "section_1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)
    client.replace_section.create(
        task_id="t",
        audio_id="a",
        lyrics="x",
        full_lyrics="[Verse] x",
        tags="y",
        title="z",
        infill_start_time=10.0,
        infill_end_time=71.0,
    )

    assert fake.calls[0][1] == "/api/v1/suno/replace_section"


def test_replace_section_accepts_decimal_duration_of_exactly_ten_seconds():
    fake = FakeHttp({"id": "section_1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)
    client.replace_section.create(
        task_id="t",
        audio_id="a",
        lyrics="x",
        full_lyrics="[Verse] x",
        tags="y",
        title="z",
        infill_start_time=6.016,
        infill_end_time=16.016,
    )

    assert fake.calls[0][1] == "/api/v1/suno/replace_section"


def test_replace_section_rejects_non_finite_times():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="infill_end_time must be a finite number"):
        client.replace_section.create(
            task_id="t",
            audio_id="a",
            lyrics="x",
            full_lyrics="[Verse] x",
            tags="y",
            title="z",
            infill_start_time=0.0,
            infill_end_time=float("inf"),
        )


def test_replace_section_upload_source_posts_body():
    fake = FakeHttp({"id": "section_1", "status": "pending"})
    client = SunoClient(api_key="k", http_client=fake)
    client.replace_section.create(
        upload_url="https://cdn.runapi.ai/public/samples/music.mp3",
        model="suno-v5.5",
        lyrics="x",
        full_lyrics="[Verse] x",
        tags="y",
        title="z",
        infill_start_time=10.0,
        infill_end_time=20.0,
    )
    assert fake.calls == [
        (
            "post",
            "/api/v1/suno/replace_section",
            {
                "upload_url": "https://cdn.runapi.ai/public/samples/music.mp3",
                "model": "suno-v5.5",
                "lyrics": "x",
                "full_lyrics": "[Verse] x",
                "tags": "y",
                "title": "z",
                "infill_start_time": 10.0,
                "infill_end_time": 20.0,
            },
        )
    ]


def test_replace_section_rejects_mixed_sources():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="cannot be combined"):
        client.replace_section.create(
            task_id="t",
            audio_id="a",
            upload_url="https://cdn.runapi.ai/public/samples/music.mp3",
            model="suno-v5.5",
            lyrics="x",
            full_lyrics="[Verse] x",
            tags="y",
            title="z",
            infill_start_time=10.0,
            infill_end_time=20.0,
        )


def test_create_mashup_requires_two_urls():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="upload_url_list must contain between 2 and 2 items"):
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
    with pytest.raises(ValidationError, match="type must be one of"):
        client.separate_audio_stems.create(task_id="t", audio_id="a", type="nope")


def test_separate_audio_stems_advanced_payload():
    fake = FakeHttp({"id": "advanced_1", "status": "processing"})
    client = SunoClient(api_key="k", http_client=fake)

    client.separate_audio_stems.create(
        task_id="t", audio_id="a", type="split_stem_advanced", stem_name="Bass"
    )

    assert fake.calls == [
        (
            "post",
            "/api/v1/suno/separate_audio_stems",
            {"task_id": "t", "audio_id": "a", "type": "split_stem_advanced", "stem_name": "Bass"},
        )
    ]


def test_separate_audio_stems_advanced_requires_stem_name():
    client = SunoClient(api_key="k", http_client=FakeHttp())

    with pytest.raises(ValidationError, match="stem_name is required when type is split_stem_advanced"):
        client.separate_audio_stems.create(task_id="t", audio_id="a", type="split_stem_advanced")


def test_separate_audio_stems_advanced_response_is_typed():
    fake = FakeHttp(
        {
            "id": "advanced_1",
            "status": "completed",
            "separated_audios": {
                "pairs": [
                    {
                        "stem_name": "Bass",
                        "extracted_audio": {
                            "id": "audio-bass",
                            "duration_seconds": 116.28,
                            "audio_url": "https://file.runapi.ai/bass.mp3",
                        },
                        "remaining_audio": {
                            "id": "audio-without-bass",
                            "duration_seconds": 116.28,
                            "audio_url": "https://file.runapi.ai/without-bass.mp3",
                        },
                    }
                ]
            },
        }
    )
    client = SunoClient(api_key="k", http_client=fake)

    response = client.separate_audio_stems.get("advanced_1")
    pair = response.separated_audios.pairs[0]

    assert isinstance(response, SeparateAudioStemsResponse)
    assert pair.stem_name == "Bass"
    assert pair.extracted_audio.id == "audio-bass"
    assert pair.remaining_audio.audio_url == "https://file.runapi.ai/without-bass.mp3"


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


# --- provider-neutral resources -------------------------------------------

PERSONA_ID = "res_" + "a" * 48
BILLING = {"reservation": None, "settlement": None, "refund": None}


def test_personas_run_posts_compacted_body_and_decodes_persona():
    fake = FakeHttp({"persona": {"id": PERSONA_ID, "name": "Echo", "description": "soft and airy"}, "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.personas.run(
        source_task_id="task_1",
        source_audio_id="audio_1",
        name="Echo",
        description="soft and airy",
    )

    assert fake.calls == [
        (
            "post",
            "/api/v1/personas",
            {
                "source_task_id": "task_1",
                "source_audio_id": "audio_1",
                "name": "Echo",
                "description": "soft and airy",
            },
        ),
    ]
    assert isinstance(result, PersonaCreationResponse)
    assert result.persona.name == "Echo"


def test_personas_run_follows_accepted_task_to_stored_result():
    location = "https://runapi.ai/api/v1/tasks/task_1"
    fake = FakeHttp(
        ApiResponse({"id": "task_1", "status": "pending"}, {"Location": location}, status_code=202),
        ApiResponse(
            {
                "id": "task_1",
                "status": "completed",
                "response": {
                    "status": 200,
                    "content_type": "application/json",
                    "headers": {},
                    "body": {"persona": {"id": PERSONA_ID, "name": "Echo"}, "billing": BILLING},
                },
            }
        ),
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.personas.run(
        source_task_id="task_1", source_audio_id="audio_1", name="Echo", description="soft and airy"
    )

    assert [call[:2] for call in fake.calls] == [("post", "/api/v1/personas"), ("get", location)]
    assert fake.options[0].headers["Idempotency-Key"]
    assert fake.options[1].headers == fake.options[0].headers
    assert isinstance(result, PersonaCreationResponse)
    assert result.persona.id == PERSONA_ID


def test_personas_get_decodes_resource_envelope():
    fake = FakeHttp(
        {
            "persona": {"id": PERSONA_ID, "name": "Echo", "description": "soft and airy"},
            "status": "available",
            "billing": {},
        }
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.personas.get(PERSONA_ID)

    assert fake.calls == [("get", f"/api/v1/personas/{PERSONA_ID}", None)]
    assert isinstance(result, PersonaResourceResponse)
    assert result.status == "available"
    assert result.billing is not None


def test_personas_requires_a_source_audio_and_metadata():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="source_audio_id is required"):
        client.personas.run(source_task_id="task_1", name="Echo", description="soft and airy")


def test_voices_run_posts_recording_and_decodes_voice():
    fake = FakeHttp({"voice": {"id": "res_1", "name": "Narrator"}, "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.voices.run(source_audio_url="https://cdn.runapi.ai/narrator.mp3", name=None)

    assert fake.calls == [
        ("post", "/api/v1/voices", {"source_audio_url": "https://cdn.runapi.ai/narrator.mp3"}),
    ]
    assert isinstance(result, VoiceCreationResponse)
    assert result.voice.id == "res_1"


def test_voices_get_decodes_resource_envelope():
    fake = FakeHttp(
        {
            "voice": {"id": "res_1", "name": "Narrator"},
            "status": "failed",
            "billing": {},
        }
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.voices.get("res_1")

    assert fake.calls == [("get", "/api/v1/voices/res_1", None)]
    assert isinstance(result, VoiceResourceResponse)
    assert result.status == "failed"
    assert result.billing is not None


def test_voices_requires_a_recording():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="source_audio_url is required"):
        client.voices.run(name="Narrator")


def test_style_expansions_run_posts_description():
    fake = FakeHttp({"style": "dreamy synthwave", "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.style_expansions.run(description="dreamy synth")

    assert fake.calls == [("post", "/api/v1/style_expansions", {"description": "dreamy synth"})]
    assert isinstance(result, BoostStyleResponse)
    assert result.style == "dreamy synthwave"


def test_style_expansions_requires_description():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="description is required"):
        client.style_expansions.run()


def test_timestamped_lyrics_run_posts_audio_reference():
    fake = FakeHttp(
        {
            "aligned_words": [
                {"word": "hi", "success": True, "start_time": 0.0, "end_time": 0.5, "palign": 1.0},
            ],
            "waveform_data": [0.1, 0.2],
            "hoct_cer": 0.02,
            "is_streamed": False,
            "billing": BILLING,
        }
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.timestamped_lyrics.run(source_audio_id=PERSONA_ID, source_task_id=None)

    assert fake.calls == [("post", "/api/v1/timestamped_lyrics", {"source_audio_id": PERSONA_ID})]
    assert isinstance(result, GetTimestampedLyricsResponse)
    assert result.aligned_words[0].word == "hi"
    assert result.waveform_data == [0.1, 0.2]


def test_timestamped_lyrics_requires_audio_id():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="source_audio_id is required"):
        client.timestamped_lyrics.run(source_task_id="task_1")


def test_audio_exports_create_posts_compacted_body():
    fake = FakeHttp({"id": "export_1", "status": "pending", "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.audio_exports.create(
        source_audio_id="res_1", source_task_id="task_1", callback_url=None
    )

    assert fake.calls == [
        ("post", "/api/v1/audio_exports", {"source_audio_id": "res_1", "source_task_id": "task_1"}),
    ]
    assert isinstance(result, AudioExportResponse)
    assert result.id == "export_1"


def test_audio_exports_run_narrows_completed_response():
    fake = FakeHttp(
        {"id": "export_1", "status": "pending", "billing": BILLING},
        {
            "id": "export_1",
            "status": "completed",
            "wav_url": "https://file.runapi.ai/track.wav",
            "billing": BILLING,
        },
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.audio_exports.run(source_audio_id="res_1")

    assert fake.calls == [
        ("post", "/api/v1/audio_exports", {"source_audio_id": "res_1"}),
        ("get", "/api/v1/audio_exports/export_1", None),
    ]
    assert isinstance(result, CompletedAudioExportResponse)
    assert result.wav_url == "https://file.runapi.ai/track.wav"


def test_music_visualizations_create_posts_compacted_body():
    fake = FakeHttp({"id": "viz_1", "status": "pending", "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.music_visualizations.create(
        source_audio_id="res_1",
        author="Ada",
        callback_url="https://hooks.example.test/visualizations",
    )

    assert fake.calls == [
        (
            "post",
            "/api/v1/music_visualizations",
            {
                "source_audio_id": "res_1",
                "author": "Ada",
                "callback_url": "https://hooks.example.test/visualizations",
            },
        ),
    ]
    assert isinstance(result, MusicVisualizationResponse)
    assert result.id == "viz_1"


def test_music_visualizations_run_narrows_completed_response():
    fake = FakeHttp(
        {"id": "viz_1", "status": "pending", "billing": BILLING},
        {
            "id": "viz_1",
            "status": "completed",
            "video_url": "https://file.runapi.ai/visualization.mp4",
            "billing": BILLING,
        },
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.music_visualizations.run(source_audio_id="res_1", domain_name="runapi.ai")

    assert fake.calls == [
        ("post", "/api/v1/music_visualizations", {"source_audio_id": "res_1", "domain_name": "runapi.ai"}),
        ("get", "/api/v1/music_visualizations/viz_1", None),
    ]
    assert isinstance(result, CompletedMusicVisualizationResponse)
    assert result.video_url == "https://file.runapi.ai/visualization.mp4"


def test_music_from_sample_create_posts_compacted_body():
    fake = FakeHttp({"id": "sample_1", "status": "pending", "billing": BILLING})
    client = SunoClient(api_key="k", http_client=fake)

    result = client.music_from_sample.create(
        model="suno-v5",
        audio_url="https://cdn.runapi.ai/sample.mp3",
        start_seconds=12,
        end_seconds=32,
        prompt=None,
    )

    assert fake.calls == [
        (
            "post",
            "/api/v1/music_from_sample",
            {
                "model": "suno-v5",
                "audio_url": "https://cdn.runapi.ai/sample.mp3",
                "start_seconds": 12,
                "end_seconds": 32,
            },
        ),
    ]
    assert isinstance(result, MusicFromSampleResponse)
    assert result.id == "sample_1"


def test_music_from_sample_run_narrows_completed_response():
    fake = FakeHttp(
        {"id": "sample_1", "status": "pending", "billing": BILLING},
        {
            "id": "sample_1",
            "status": "completed",
            "audios": [{"id": "a1", "audio_url": "https://file.runapi.ai/sample.mp3"}],
            "billing": BILLING,
        },
    )
    client = SunoClient(api_key="k", http_client=fake)

    result = client.music_from_sample.run(
        model="suno-v5", audio_url="https://cdn.runapi.ai/sample.mp3", start_seconds=12, end_seconds=32
    )

    assert fake.calls == [
        (
            "post",
            "/api/v1/music_from_sample",
            {
                "model": "suno-v5",
                "audio_url": "https://cdn.runapi.ai/sample.mp3",
                "start_seconds": 12,
                "end_seconds": 32,
            },
        ),
        ("get", "/api/v1/music_from_sample/sample_1", None),
    ]
    assert isinstance(result, CompletedMusicFromSampleResponse)
    assert result.audios[0].audio_url == "https://file.runapi.ai/sample.mp3"


def test_music_from_sample_rejects_unknown_model():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="model must be one of:"):
        client.music_from_sample.create(
            model="nope", audio_url="https://cdn.runapi.ai/sample.mp3", start_seconds=0, end_seconds=1
        )


def test_music_from_sample_requires_a_sample_window():
    client = SunoClient(api_key="k", http_client=FakeHttp())
    with pytest.raises(ValidationError, match="end_seconds is required"):
        client.music_from_sample.create(
            model="suno-v5", audio_url="https://cdn.runapi.ai/sample.mp3", start_seconds=0
        )
