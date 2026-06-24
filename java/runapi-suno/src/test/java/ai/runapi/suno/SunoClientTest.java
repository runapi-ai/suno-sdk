package ai.runapi.suno;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import ai.runapi.core.RequestOptions;
import ai.runapi.core.errors.ValidationException;
import ai.runapi.core.http.HttpRequest;
import ai.runapi.core.http.HttpResponse;
import ai.runapi.core.http.HttpTransport;
import ai.runapi.core.http.JsonRequestBody;
import ai.runapi.core.json.Json;
import ai.runapi.suno.types.CompletedTextToSoundResponse;
import ai.runapi.suno.types.TextToSoundResponse;
import ai.runapi.suno.types.AddInstrumentalModel;
import ai.runapi.suno.types.AddInstrumentalParams;
import ai.runapi.suno.types.AddInstrumentalResponse;
import ai.runapi.suno.types.AddVocalsModel;
import ai.runapi.suno.types.AddVocalsParams;
import ai.runapi.suno.types.AddVocalsResponse;
import ai.runapi.suno.types.BoostStyleParams;
import ai.runapi.suno.types.BoostStyleResponse;
import ai.runapi.suno.types.CheckVoiceParams;
import ai.runapi.suno.types.CheckVoiceResponse;
import ai.runapi.suno.types.CompletedAddInstrumentalResponse;
import ai.runapi.suno.types.CompletedAddVocalsResponse;
import ai.runapi.suno.types.CompletedConvertAudioResponse;
import ai.runapi.suno.types.CompletedCoverAudioResponse;
import ai.runapi.suno.types.CompletedCreateMashupResponse;
import ai.runapi.suno.types.CompletedExtendMusicResponse;
import ai.runapi.suno.types.CompletedGenerateArtworkResponse;
import ai.runapi.suno.types.CompletedGenerateLyricsResponse;
import ai.runapi.suno.types.CompletedGenerateMidiResponse;
import ai.runapi.suno.types.CompletedGenerateVoiceResponse;
import ai.runapi.suno.types.CompletedRegenerateValidationPhraseResponse;
import ai.runapi.suno.types.CompletedReplaceSectionResponse;
import ai.runapi.suno.types.CompletedSeparateAudioStemsResponse;
import ai.runapi.suno.types.CompletedTextToMusicResponse;
import ai.runapi.suno.types.CompletedTextToSoundResponse;
import ai.runapi.suno.types.CompletedVisualizeMusicResponse;
import ai.runapi.suno.types.CompletedVoiceToValidationPhraseResponse;
import ai.runapi.suno.types.ConvertAudioParams;
import ai.runapi.suno.types.ConvertAudioResponse;
import ai.runapi.suno.types.CoverAudioModel;
import ai.runapi.suno.types.CoverAudioParams;
import ai.runapi.suno.types.CoverAudioResponse;
import ai.runapi.suno.types.CreateMashupModel;
import ai.runapi.suno.types.CreateMashupParams;
import ai.runapi.suno.types.CreateMashupResponse;
import ai.runapi.suno.types.ExtendMusicModel;
import ai.runapi.suno.types.ExtendMusicParams;
import ai.runapi.suno.types.ExtendMusicResponse;
import ai.runapi.suno.types.GenerateArtworkParams;
import ai.runapi.suno.types.GenerateArtworkResponse;
import ai.runapi.suno.types.GenerateLyricsParams;
import ai.runapi.suno.types.GenerateLyricsResponse;
import ai.runapi.suno.types.GenerateMidiParams;
import ai.runapi.suno.types.GenerateMidiResponse;
import ai.runapi.suno.types.GeneratePersonaParams;
import ai.runapi.suno.types.GeneratePersonaResponse;
import ai.runapi.suno.types.GenerateVoiceParams;
import ai.runapi.suno.types.GenerateVoiceResponse;
import ai.runapi.suno.types.GetTimestampedLyricsParams;
import ai.runapi.suno.types.GetTimestampedLyricsResponse;
import ai.runapi.suno.types.RegenerateValidationPhraseParams;
import ai.runapi.suno.types.RegenerateValidationPhraseResponse;
import ai.runapi.suno.types.ReplaceSectionParams;
import ai.runapi.suno.types.ReplaceSectionResponse;
import ai.runapi.suno.types.SeparateAudioStemsParams;
import ai.runapi.suno.types.SeparateAudioStemsResponse;
import ai.runapi.suno.types.TextToMusicModel;
import ai.runapi.suno.types.TextToMusicParams;
import ai.runapi.suno.types.TextToMusicResponse;
import ai.runapi.suno.types.TextToSoundModel;
import ai.runapi.suno.types.TextToSoundParams;
import ai.runapi.suno.types.TextToSoundResponse;
import ai.runapi.suno.types.VisualizeMusicParams;
import ai.runapi.suno.types.VisualizeMusicResponse;
import ai.runapi.suno.types.VoiceToValidationPhraseParams;
import ai.runapi.suno.types.VoiceToValidationPhraseResponse;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.ByteArrayOutputStream;
import java.time.Duration;
import java.util.Collections;
import org.junit.jupiter.api.Test;

class SunoClientTest {
  @Test
  void builderCreatesClientAndUniversalResources() {
    SunoClient client = SunoClient.builder().apiKey("sk-test").build();

    assertNotNull(client.textToSound());
    assertNotNull(client.files());
    assertNotNull(client.account());
  }

  @Test
  void openValueClassesSerializeAsScalarStrings() throws Exception {
    String json = Json.mapper().writeValueAsString(new TextToSoundModel("suno-v5"));

    assertEquals("\"suno-v5\"", json);
    assertEquals(new TextToSoundModel("suno-v5"), Json.mapper().readValue(json, TextToSoundModel.class));
  }

  @Test
  void createSendsExpectedRequestShape() throws Exception {
    CapturingTransport transport = new CapturingTransport("{\"id\":\"task_123\",\"status\":\"processing\"}");
    SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

    client.textToSound().create(
        TextToSoundParams.builder()
            .prompt("A small red cube on a plain white table, studio product photo")
            .model(TextToSoundModel.SUNO_V5)
            .build()
    );

    assertEquals("POST", transport.request.getMethod().name());
    assertEquals("/api/v1/suno/text_to_sound", transport.request.getPath());
    JsonNode body = bodyJson(transport.request);
    assertNotNull(body);
  }

  @Test
  void getDecodesTaskResponseAndExtraFields() {
    CapturingTransport transport = new CapturingTransport("{\"id\":\"task_456\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}],\"custom\":\"kept\"}");
    SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

    TextToSoundResponse response = client.textToSound().get("task_456");

    assertEquals("GET", transport.request.getMethod().name());
    assertEquals("/api/v1/suno/text_to_sound/task_456", transport.request.getPath());
    assertEquals("completed", response.getStatus().value());
    assertNotNull(response.getAudios());
    assertEquals("kept", response.extraFields().get("custom").asText());
  }

  @Test
  void runPollsUntilCompletedAndKeepsExtraFields() {
    SequenceTransport transport = new SequenceTransport(
        "{\"id\":\"task_789\",\"status\":\"processing\"}",
        "{\"id\":\"task_789\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}],\"custom\":\"kept\"}");
    SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

    CompletedTextToSoundResponse response = client.textToSound().run(
        TextToSoundParams.builder()
            .prompt("A small red cube on a plain white table, studio product photo")
            .model(TextToSoundModel.SUNO_V5)
            .build(),
        RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());

    assertEquals("completed", response.getStatus().value());
    assertNotNull(response.getAudios());
    assertEquals("kept", response.extraFields().get("custom").asText());
    assertEquals(2, transport.calls);
  }

  @Test
  void runRejectsCompletedResponseMissingResultField() {
    SequenceTransport transport = new SequenceTransport(
        "{\"id\":\"task_missing\",\"status\":\"processing\"}",
        "{\"id\":\"task_missing\",\"status\":\"completed\"}");
    SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

    assertThrows(
        ValidationException.class,
        () -> client.textToSound().run(
                TextToSoundParams.builder()
                    .prompt("A small red cube on a plain white table, studio product photo")
                    .model(TextToSoundModel.SUNO_V5)
                    .build(),
            RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
  }

    @Test
    void coversAddinstrumentalResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_add_instrumental\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.addInstrumental().create(
              AddInstrumentalParams.builder()
                  .model(AddInstrumentalModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_add_instrumental_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.addInstrumental().create(
              AddInstrumentalParams.builder()
                  .model(AddInstrumentalModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_add_instrumental\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.addInstrumental().get("task_add_instrumental"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_add_instrumental_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.addInstrumental().get("task_add_instrumental_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_add_instrumental_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_add_instrumental_run\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedAddInstrumentalResponse runResponse = runClient.addInstrumental().run(
              AddInstrumentalParams.builder()
                  .model(AddInstrumentalModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_add_instrumental_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_add_instrumental_run_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.addInstrumental().run(
              AddInstrumentalParams.builder()
                  .model(AddInstrumentalModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversAddvocalsResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_add_vocals\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.addVocals().create(
              AddVocalsParams.builder()
                  .model(AddVocalsModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .lyrics("sample")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_add_vocals_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.addVocals().create(
              AddVocalsParams.builder()
                  .model(AddVocalsModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .lyrics("sample")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_add_vocals\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.addVocals().get("task_add_vocals"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_add_vocals_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.addVocals().get("task_add_vocals_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_add_vocals_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_add_vocals_run\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedAddVocalsResponse runResponse = runClient.addVocals().run(
              AddVocalsParams.builder()
                  .model(AddVocalsModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .lyrics("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_add_vocals_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_add_vocals_run_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.addVocals().run(
              AddVocalsParams.builder()
                  .model(AddVocalsModel.SUNO_V4_5_PLUS)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .lyrics("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversBooststyleResourceMethods() {
      CapturingTransport transport = new CapturingTransport("{\"id\":\"sync_boost_style\",\"style\":\"sample\"}");
      SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

      BoostStyleResponse response = client.boostStyle().run(
              BoostStyleParams.builder()
                  .build()
      );
      assertNotNull(response);

      CapturingTransport transportWithOptions = new CapturingTransport("{\"id\":\"sync_boost_style_options\",\"style\":\"sample\"}");
      SunoClient clientWithOptions = SunoClient.builder().apiKey("sk-test").transport(transportWithOptions).build();
      assertNotNull(clientWithOptions.boostStyle().run(
              BoostStyleParams.builder()
                  .build(),
          RequestOptions.none()));
    }

    @Test
    void coversCheckvoiceResourceMethods() {
      CapturingTransport transport = new CapturingTransport("{\"id\":\"sync_check_voice\",\"is_available\":true}");
      SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

      CheckVoiceResponse response = client.checkVoice().run(
              CheckVoiceParams.builder()
                  .taskId("sample")
                  .build()
      );
      assertNotNull(response);

      CapturingTransport transportWithOptions = new CapturingTransport("{\"id\":\"sync_check_voice_options\",\"is_available\":true}");
      SunoClient clientWithOptions = SunoClient.builder().apiKey("sk-test").transport(transportWithOptions).build();
      assertNotNull(clientWithOptions.checkVoice().run(
              CheckVoiceParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.none()));
    }

    @Test
    void coversConvertaudioResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_convert_audio\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.convertAudio().create(
              ConvertAudioParams.builder()
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_convert_audio_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.convertAudio().create(
              ConvertAudioParams.builder()
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_convert_audio\",\"status\":\"completed\",\"wav_url\":\"sample\"}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.convertAudio().get("task_convert_audio"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_convert_audio_options\",\"status\":\"completed\",\"wav_url\":\"sample\"}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.convertAudio().get("task_convert_audio_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_convert_audio_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_convert_audio_run\",\"status\":\"completed\",\"wav_url\":\"sample\"}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedConvertAudioResponse runResponse = runClient.convertAudio().run(
              ConvertAudioParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_convert_audio_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_convert_audio_run_options\",\"status\":\"completed\",\"wav_url\":\"sample\"}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.convertAudio().run(
              ConvertAudioParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversCoveraudioResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_cover_audio\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.coverAudio().create(
              CoverAudioParams.builder()
                  .model(CoverAudioModel.SUNO_V4)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_cover_audio_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.coverAudio().create(
              CoverAudioParams.builder()
                  .model(CoverAudioModel.SUNO_V4)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_cover_audio\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.coverAudio().get("task_cover_audio"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_cover_audio_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.coverAudio().get("task_cover_audio_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_cover_audio_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_cover_audio_run\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedCoverAudioResponse runResponse = runClient.coverAudio().run(
              CoverAudioParams.builder()
                  .model(CoverAudioModel.SUNO_V4)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_cover_audio_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_cover_audio_run_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.coverAudio().run(
              CoverAudioParams.builder()
                  .model(CoverAudioModel.SUNO_V4)
                  .uploadUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversCreatemashupResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_create_mashup\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.createMashup().create(
              CreateMashupParams.builder()
                  .model(CreateMashupModel.SUNO_V4)
                  .uploadUrlList(java.util.Arrays.asList("https://cdn.runapi.ai/public/samples/image.jpg"))
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_create_mashup_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.createMashup().create(
              CreateMashupParams.builder()
                  .model(CreateMashupModel.SUNO_V4)
                  .uploadUrlList(java.util.Arrays.asList("https://cdn.runapi.ai/public/samples/image.jpg"))
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_create_mashup\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.createMashup().get("task_create_mashup"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_create_mashup_options\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.createMashup().get("task_create_mashup_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_create_mashup_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_create_mashup_run\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedCreateMashupResponse runResponse = runClient.createMashup().run(
              CreateMashupParams.builder()
                  .model(CreateMashupModel.SUNO_V4)
                  .uploadUrlList(java.util.Arrays.asList("https://cdn.runapi.ai/public/samples/image.jpg"))
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_create_mashup_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_create_mashup_run_options\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.createMashup().run(
              CreateMashupParams.builder()
                  .model(CreateMashupModel.SUNO_V4)
                  .uploadUrlList(java.util.Arrays.asList("https://cdn.runapi.ai/public/samples/image.jpg"))
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversExtendmusicResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_extend_music\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.extendMusic().create(
              ExtendMusicParams.builder()
                  .model(ExtendMusicModel.SUNO_V4)
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_extend_music_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.extendMusic().create(
              ExtendMusicParams.builder()
                  .model(ExtendMusicModel.SUNO_V4)
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_extend_music\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.extendMusic().get("task_extend_music"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_extend_music_options\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.extendMusic().get("task_extend_music_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_extend_music_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_extend_music_run\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedExtendMusicResponse runResponse = runClient.extendMusic().run(
              ExtendMusicParams.builder()
                  .model(ExtendMusicModel.SUNO_V4)
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_extend_music_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_extend_music_run_options\",\"status\":\"completed\",\"videos\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.extendMusic().run(
              ExtendMusicParams.builder()
                  .model(ExtendMusicModel.SUNO_V4)
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversGenerateartworkResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_generate_artwork\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.generateArtwork().create(
              GenerateArtworkParams.builder()
                  .taskId("sample")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_artwork_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.generateArtwork().create(
              GenerateArtworkParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_generate_artwork\",\"status\":\"completed\",\"covers\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.generateArtwork().get("task_generate_artwork"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_artwork_options\",\"status\":\"completed\",\"covers\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.generateArtwork().get("task_generate_artwork_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_generate_artwork_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_artwork_run\",\"status\":\"completed\",\"covers\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedGenerateArtworkResponse runResponse = runClient.generateArtwork().run(
              GenerateArtworkParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_generate_artwork_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_artwork_run_options\",\"status\":\"completed\",\"covers\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.generateArtwork().run(
              GenerateArtworkParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversGeneratelyricsResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_generate_lyrics\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.generateLyrics().create(
              GenerateLyricsParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_lyrics_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.generateLyrics().create(
              GenerateLyricsParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_generate_lyrics\",\"status\":\"completed\",\"lyrics\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.generateLyrics().get("task_generate_lyrics"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_lyrics_options\",\"status\":\"completed\",\"lyrics\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.generateLyrics().get("task_generate_lyrics_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_generate_lyrics_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_lyrics_run\",\"status\":\"completed\",\"lyrics\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedGenerateLyricsResponse runResponse = runClient.generateLyrics().run(
              GenerateLyricsParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_generate_lyrics_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_lyrics_run_options\",\"status\":\"completed\",\"lyrics\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.generateLyrics().run(
              GenerateLyricsParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversGeneratemidiResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_generate_midi\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.generateMidi().create(
              GenerateMidiParams.builder()
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_midi_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.generateMidi().create(
              GenerateMidiParams.builder()
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_generate_midi\",\"status\":\"completed\",\"instruments\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.generateMidi().get("task_generate_midi"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_midi_options\",\"status\":\"completed\",\"instruments\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.generateMidi().get("task_generate_midi_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_generate_midi_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_midi_run\",\"status\":\"completed\",\"instruments\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedGenerateMidiResponse runResponse = runClient.generateMidi().run(
              GenerateMidiParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_generate_midi_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_midi_run_options\",\"status\":\"completed\",\"instruments\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.generateMidi().run(
              GenerateMidiParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversGeneratepersonaResourceMethods() {
      CapturingTransport transport = new CapturingTransport("{\"id\":\"sync_generate_persona\",\"persona\":{\"value\":\"sample\"}}");
      SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

      GeneratePersonaResponse response = client.generatePersona().run(
              GeneratePersonaParams.builder()
                  .build()
      );
      assertNotNull(response);

      CapturingTransport transportWithOptions = new CapturingTransport("{\"id\":\"sync_generate_persona_options\",\"persona\":{\"value\":\"sample\"}}");
      SunoClient clientWithOptions = SunoClient.builder().apiKey("sk-test").transport(transportWithOptions).build();
      assertNotNull(clientWithOptions.generatePersona().run(
              GeneratePersonaParams.builder()
                  .build(),
          RequestOptions.none()));
    }

    @Test
    void coversGeneratevoiceResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_generate_voice\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.generateVoice().create(
              GenerateVoiceParams.builder()
                  .taskId("sample")
                  .verifyUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_voice_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.generateVoice().create(
              GenerateVoiceParams.builder()
                  .taskId("sample")
                  .verifyUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_generate_voice\",\"status\":\"completed\",\"voice_id\":\"sample\"}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.generateVoice().get("task_generate_voice"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_generate_voice_options\",\"status\":\"completed\",\"voice_id\":\"sample\"}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.generateVoice().get("task_generate_voice_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_generate_voice_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_voice_run\",\"status\":\"completed\",\"voice_id\":\"sample\"}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedGenerateVoiceResponse runResponse = runClient.generateVoice().run(
              GenerateVoiceParams.builder()
                  .taskId("sample")
                  .verifyUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_generate_voice_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_generate_voice_run_options\",\"status\":\"completed\",\"voice_id\":\"sample\"}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.generateVoice().run(
              GenerateVoiceParams.builder()
                  .taskId("sample")
                  .verifyUrl("https://cdn.runapi.ai/public/samples/image.jpg")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversGettimestampedlyricsResourceMethods() {
      CapturingTransport transport = new CapturingTransport("{\"id\":\"sync_get_timestamped_lyrics\",\"aligned_words\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient client = SunoClient.builder().apiKey("sk-test").transport(transport).build();

      GetTimestampedLyricsResponse response = client.getTimestampedLyrics().run(
              GetTimestampedLyricsParams.builder()
                  .build()
      );
      assertNotNull(response);

      CapturingTransport transportWithOptions = new CapturingTransport("{\"id\":\"sync_get_timestamped_lyrics_options\",\"aligned_words\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient clientWithOptions = SunoClient.builder().apiKey("sk-test").transport(transportWithOptions).build();
      assertNotNull(clientWithOptions.getTimestampedLyrics().run(
              GetTimestampedLyricsParams.builder()
                  .build(),
          RequestOptions.none()));
    }

    @Test
    void coversRegeneratevalidationphraseResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_regenerate_validation_phrase\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.regenerateValidationPhrase().create(
              RegenerateValidationPhraseParams.builder()
                  .taskId("sample")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_regenerate_validation_phrase_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.regenerateValidationPhrase().create(
              RegenerateValidationPhraseParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_regenerate_validation_phrase\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.regenerateValidationPhrase().get("task_regenerate_validation_phrase"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_regenerate_validation_phrase_options\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.regenerateValidationPhrase().get("task_regenerate_validation_phrase_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_regenerate_validation_phrase_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_regenerate_validation_phrase_run\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedRegenerateValidationPhraseResponse runResponse = runClient.regenerateValidationPhrase().run(
              RegenerateValidationPhraseParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_regenerate_validation_phrase_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_regenerate_validation_phrase_run_options\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.regenerateValidationPhrase().run(
              RegenerateValidationPhraseParams.builder()
                  .taskId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversReplacesectionResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_replace_section\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.replaceSection().create(
              ReplaceSectionParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_replace_section_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.replaceSection().create(
              ReplaceSectionParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_replace_section\",\"status\":\"completed\",\"track\":{\"url\":\"https://file.runapi.ai/generated\"}}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.replaceSection().get("task_replace_section"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_replace_section_options\",\"status\":\"completed\",\"track\":{\"url\":\"https://file.runapi.ai/generated\"}}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.replaceSection().get("task_replace_section_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_replace_section_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_replace_section_run\",\"status\":\"completed\",\"track\":{\"url\":\"https://file.runapi.ai/generated\"}}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedReplaceSectionResponse runResponse = runClient.replaceSection().run(
              ReplaceSectionParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_replace_section_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_replace_section_run_options\",\"status\":\"completed\",\"track\":{\"url\":\"https://file.runapi.ai/generated\"}}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.replaceSection().run(
              ReplaceSectionParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversSeparateaudiostemsResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_separate_audio_stems\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.separateAudioStems().create(
              SeparateAudioStemsParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_separate_audio_stems_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.separateAudioStems().create(
              SeparateAudioStemsParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_separate_audio_stems\",\"status\":\"completed\",\"separated_audios\":{\"value\":\"sample\"}}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.separateAudioStems().get("task_separate_audio_stems"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_separate_audio_stems_options\",\"status\":\"completed\",\"separated_audios\":{\"value\":\"sample\"}}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.separateAudioStems().get("task_separate_audio_stems_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_separate_audio_stems_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_separate_audio_stems_run\",\"status\":\"completed\",\"separated_audios\":{\"value\":\"sample\"}}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedSeparateAudioStemsResponse runResponse = runClient.separateAudioStems().run(
              SeparateAudioStemsParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_separate_audio_stems_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_separate_audio_stems_run_options\",\"status\":\"completed\",\"separated_audios\":{\"value\":\"sample\"}}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.separateAudioStems().run(
              SeparateAudioStemsParams.builder()
                  .taskId("sample")
                  .audioId("sample")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversTexttomusicResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_text_to_music\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.textToMusic().create(
              TextToMusicParams.builder()
                  .model(TextToMusicModel.SUNO_V4)
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_text_to_music_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.textToMusic().create(
              TextToMusicParams.builder()
                  .model(TextToMusicModel.SUNO_V4)
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_text_to_music\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.textToMusic().get("task_text_to_music"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_text_to_music_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.textToMusic().get("task_text_to_music_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_text_to_music_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_text_to_music_run\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedTextToMusicResponse runResponse = runClient.textToMusic().run(
              TextToMusicParams.builder()
                  .model(TextToMusicModel.SUNO_V4)
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_text_to_music_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_text_to_music_run_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.textToMusic().run(
              TextToMusicParams.builder()
                  .model(TextToMusicModel.SUNO_V4)
                  .vocalMode("auto_lyrics")
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversTexttosoundResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_text_to_sound\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.textToSound().create(
              TextToSoundParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .model(TextToSoundModel.SUNO_V5)
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_text_to_sound_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.textToSound().create(
              TextToSoundParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .model(TextToSoundModel.SUNO_V5)
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_text_to_sound\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.textToSound().get("task_text_to_sound"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_text_to_sound_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.textToSound().get("task_text_to_sound_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_text_to_sound_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_text_to_sound_run\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedTextToSoundResponse runResponse = runClient.textToSound().run(
              TextToSoundParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .model(TextToSoundModel.SUNO_V5)
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_text_to_sound_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_text_to_sound_run_options\",\"status\":\"completed\",\"audios\":[{\"url\":\"https://file.runapi.ai/generated\"}]}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.textToSound().run(
              TextToSoundParams.builder()
                  .prompt("A small red cube on a plain white table, studio product photo")
                  .model(TextToSoundModel.SUNO_V5)
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversVisualizemusicResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_visualize_music\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.visualizeMusic().create(
              VisualizeMusicParams.builder()
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_visualize_music_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.visualizeMusic().create(
              VisualizeMusicParams.builder()
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_visualize_music\",\"status\":\"completed\",\"video_url\":\"sample\"}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.visualizeMusic().get("task_visualize_music"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_visualize_music_options\",\"status\":\"completed\",\"video_url\":\"sample\"}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.visualizeMusic().get("task_visualize_music_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_visualize_music_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_visualize_music_run\",\"status\":\"completed\",\"video_url\":\"sample\"}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedVisualizeMusicResponse runResponse = runClient.visualizeMusic().run(
              VisualizeMusicParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_visualize_music_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_visualize_music_run_options\",\"status\":\"completed\",\"video_url\":\"sample\"}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.visualizeMusic().run(
              VisualizeMusicParams.builder()
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

    @Test
    void coversVoicetovalidationphraseResourceMethods() {
      CapturingTransport createTransport = new CapturingTransport("{\"id\":\"task_voice_to_validation_phrase\",\"status\":\"processing\"}");
      SunoClient createClient = SunoClient.builder().apiKey("sk-test").transport(createTransport).build();
      assertNotNull(createClient.voiceToValidationPhrase().create(
              VoiceToValidationPhraseParams.builder()
                  .vocalStartSeconds(1)
                  .vocalEndSeconds(1)
                  .build()
      ));

      CapturingTransport createWithOptionsTransport = new CapturingTransport("{\"id\":\"task_voice_to_validation_phrase_options\",\"status\":\"processing\"}");
      SunoClient createWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(createWithOptionsTransport).build();
      assertNotNull(createWithOptionsClient.voiceToValidationPhrase().create(
              VoiceToValidationPhraseParams.builder()
                  .vocalStartSeconds(1)
                  .vocalEndSeconds(1)
                  .build(),
          RequestOptions.none()));

      CapturingTransport getTransport = new CapturingTransport("{\"id\":\"task_voice_to_validation_phrase\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient getClient = SunoClient.builder().apiKey("sk-test").transport(getTransport).build();
      assertNotNull(getClient.voiceToValidationPhrase().get("task_voice_to_validation_phrase"));

      CapturingTransport getWithOptionsTransport = new CapturingTransport("{\"id\":\"task_voice_to_validation_phrase_options\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient getWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(getWithOptionsTransport).build();
      assertNotNull(getWithOptionsClient.voiceToValidationPhrase().get("task_voice_to_validation_phrase_options", RequestOptions.none()));

      SequenceTransport runTransport = new SequenceTransport(
          "{\"id\":\"task_voice_to_validation_phrase_run\",\"status\":\"processing\"}",
          "{\"id\":\"task_voice_to_validation_phrase_run\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient runClient = SunoClient.builder().apiKey("sk-test").transport(runTransport).build();
      CompletedVoiceToValidationPhraseResponse runResponse = runClient.voiceToValidationPhrase().run(
              VoiceToValidationPhraseParams.builder()
                  .vocalStartSeconds(1)
                  .vocalEndSeconds(1)
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build());
      assertNotNull(runResponse);

      SequenceTransport runWithOptionsTransport = new SequenceTransport(
          "{\"id\":\"task_voice_to_validation_phrase_run_options\",\"status\":\"processing\"}",
          "{\"id\":\"task_voice_to_validation_phrase_run_options\",\"status\":\"completed\",\"validation_phrase\":\"sample\"}");
      SunoClient runWithOptionsClient = SunoClient.builder().apiKey("sk-test").transport(runWithOptionsTransport).build();
      assertNotNull(runWithOptionsClient.voiceToValidationPhrase().run(
              VoiceToValidationPhraseParams.builder()
                  .vocalStartSeconds(1)
                  .vocalEndSeconds(1)
                  .build(),
          RequestOptions.builder().pollingInterval(Duration.ofMillis(1)).pollingMaxWait(Duration.ofSeconds(1)).build()));
    }

  private static JsonNode bodyJson(HttpRequest request) throws Exception {
    JsonRequestBody body = (JsonRequestBody) request.getBody();
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    body.writeTo(out);
    return Json.mapper().readTree(out.toByteArray());
  }

  private static final class CapturingTransport implements HttpTransport {
    private final String body;
    private HttpRequest request;

    private CapturingTransport(String body) {
      this.body = body;
    }

    public HttpResponse send(HttpRequest request) {
      this.request = request;
      return new HttpResponse(200, body, Collections.<String, java.util.List<String>>emptyMap());
    }

    public void close() {}
  }

  private static final class SequenceTransport implements HttpTransport {
    private final String[] responses;
    private int calls;

    private SequenceTransport(String... responses) {
      this.responses = responses;
    }

    public HttpResponse send(HttpRequest request) {
      String response = responses[Math.min(calls, responses.length - 1)];
      calls++;
      return new HttpResponse(200, response, Collections.<String, java.util.List<String>>emptyMap());
    }

    public void close() {}
  }
}
