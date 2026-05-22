import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Add Vocals\n');
  console.log('='.repeat(50));

  const apiKey = process.env.RUNAPI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: RUNAPI_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new SunoClient({
    apiKey,
    baseUrl: process.env.RUNAPI_BASE_URL || 'http://localhost:3000',
  });

  try {
    const audioUrl = process.env.TEST_AUDIO_URL;
    if (!audioUrl) {
      console.error('❌ Error: TEST_AUDIO_URL environment variable is required');
      console.error('   Please provide a URL to an instrumental audio file');
      process.exit(1);
    }

    console.log('\n🎤 Test 1: Add vocals to instrumental');
    console.log('-'.repeat(50));
    console.log(`   Audio URL: ${audioUrl}`);

    const result = await client.addVocals.run({
      upload_url: audioUrl,
      prompt: 'Soft romantic lyrics about summer nights and starlight',
      title: 'Summer Nights',
      style: 'Pop, Romantic',
      negative_tags: 'Screaming, Heavy Metal, Aggressive',
      model: 'suno-v4.5-plus',
    });

    console.log('✅ Vocals addition completed!');
    console.log(`   Task ID: ${result.id}`);
    console.log(`   Status: ${result.status}`);

    if (result.audios && result.audios.length > 0) {
      console.log(`   Generated Audios:`);
      result.audios.forEach((audio, idx) => {
        console.log(`     [${idx + 1}] ${audio.title || 'Untitled'}`);
        console.log(`         Audio: ${audio.audio_url || 'N/A'}`);
        console.log(`         Tags: ${audio.tags?.join(', ') || 'N/A'}`);
      });
    }

    console.log('\n🎵 Test 2: Add vocals with different style');
    console.log('-'.repeat(50));

    const result2 = await client.addVocals.run({
      upload_url: audioUrl,
      prompt: 'Energetic lyrics about dancing and having fun',
      title: 'Dance Party',
      style: 'EDM, Dance, Electronic',
      negative_tags: 'Slow, Ballad, Classical',
      model: 'suno-v5',
    });

    console.log('✅ Vocals with EDM style completed!');
    console.log(`   Task ID: ${result2.id}`);
    console.log(`   Audios: ${result2.audios?.length || 0}`);

    console.log('\n🎹 Test 3: Different models comparison');
    console.log('-'.repeat(50));

    const models: Array<'suno-v5' | 'suno-v4.5-plus'> = ['suno-v5', 'suno-v4.5-plus'];

    for (const model of models) {
      console.log(`   Testing model: ${model}...`);
      const result = await client.addVocals.run({
        upload_url: audioUrl,
        prompt: 'Uplifting lyrics about hope and dreams',
        title: `Test ${model}`,
        style: 'Pop, Uplifting',
        negative_tags: 'Dark, Heavy',
        model,
      });

      console.log(`   ✅ ${model} - Generated ${result.audios?.length || 0} audios`);
    }

    console.log('\n🎉 All vocals tests passed!\n');
  } catch (error) {
    console.error('\n❌ Test failed!');
    console.error('='.repeat(50));

    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
    }

    process.exit(1);
  }
}

main();
