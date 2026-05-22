import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Custom Mode Music Generation\n');
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
    console.log('\n🎨 Test 1: Custom mode with style and title');
    console.log('-'.repeat(50));
    const result1 = await client.textToMusic.run({
      custom_mode: true,
      instrumental: false,
      prompt: 'Gentle piano melodies flowing like a peaceful river',
      style: 'Classical, Ambient, Meditative',
      title: 'River of Peace',
      model: 'suno-v5',
    });

    console.log('✅ Generation completed successfully!');
    console.log(`   Task ID: ${result1.id}`);
    console.log(`   Audios: ${result1.audios?.length || 0}`);
    if (result1.audios && result1.audios.length > 0) {
      result1.audios.forEach((audio, idx) => {
        console.log(`     [${idx + 1}] ${audio.title || 'Untitled'}`);
        console.log(`         Tags: ${audio.tags?.join(', ') || 'N/A'}`);
        console.log(`         Audio: ${audio.audio_url || 'N/A'}`);
      });
    }

    console.log('\n🎭 Test 2: Custom mode with different models');
    console.log('-'.repeat(50));
    const models: Array<'suno-v5' | 'suno-v4.5-plus' | 'suno-v4.5-all' | 'suno-v4.5' | 'suno-v4' | 'suno-v3.5'> = ['suno-v5', 'suno-v4.5-plus', 'suno-v4.5-all', 'suno-v4'];

    for (const model of models) {
      console.log(`\n   Testing model: ${model}...`);
      const result = await client.textToMusic.run({
        custom_mode: true,
        instrumental: false,
        prompt: 'Energetic rock music with powerful guitar riffs',
        style: 'Rock, Energetic',
        title: `Rock Test ${model}`,
        model,
      });

      console.log(`   ✅ ${model} - Generated ${result.audios?.length || 0} audios`);
    }

    console.log('\n🎸 Test 3: Custom mode with persona_id (optional)');
    console.log('-'.repeat(50));
    console.log('   ⚠️  Skipping persona test - requires pre-existing persona_id');
    console.log('   To test with persona, run test-personas-styles.ts first');

    console.log('\n🎵 Test 4: Custom mode instrumental');
    console.log('-'.repeat(50));
    const instrumentalResult = await client.textToMusic.run({
      custom_mode: true,
      instrumental: true,
      prompt: 'Epic orchestral music with powerful strings and horns',
      style: 'Orchestral, Epic, Cinematic',
      title: 'Epic Journey',
      model: 'suno-v5',
    });

    console.log('✅ Instrumental generation completed!');
    console.log(`   Task ID: ${instrumentalResult.id}`);
    console.log(`   Audios: ${instrumentalResult.audios?.length || 0}`);

    console.log('\n🎉 All custom mode tests passed!\n');
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
