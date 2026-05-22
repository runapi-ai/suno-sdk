import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Add Instrumental\n');
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
      console.error('   Please provide a URL to an audio file (vocals only recommended)');
      process.exit(1);
    }

    console.log('\n🎤 Test 1: Add instrumental to vocals');
    console.log('-'.repeat(50));
    console.log(`   Audio URL: ${audioUrl}`);
    
    const result = await client.addInstrumental.run({
      upload_url: audioUrl,
      title: 'My Song with Instrumentals',
      tags: 'Pop, Upbeat, Energetic',
      negative_tags: 'Heavy Metal, Aggressive',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Instrumental addition completed!');
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

    console.log('\n🎸 Test 2: Add instrumental with negative tags');
    console.log('-'.repeat(50));
    
    const result2 = await client.addInstrumental.run({
      upload_url: audioUrl,
      title: 'Gentle Acoustic Version',
      tags: 'Acoustic, Soft, Gentle',
      negative_tags: 'Heavy Metal, Aggressive, Electronic',
      model: 'suno-v5',
    });
    
    console.log('✅ Instrumental with negative tags completed!');
    console.log(`   Task ID: ${result2.id}`);
    console.log(`   Audios: ${result2.audios?.length || 0}`);

    console.log('\n🎹 Test 3: Different models comparison');
    console.log('-'.repeat(50));
    
    const models: Array<'suno-v5' | 'suno-v4.5-plus' | 'suno-v4'> = ['suno-v5', 'suno-v4.5-plus'];
    
    for (const model of models) {
      console.log(`   Testing model: ${model}...`);
      const result = await client.addInstrumental.run({
        upload_url: audioUrl,
        title: `Test ${model}`,
        tags: 'Rock, Energetic',
        negative_tags: 'Classical, Slow',
        model,
      });
      
      console.log(`   ✅ ${model} - Generated ${result.audios?.length || 0} audios`);
    }

    console.log('\n🎉 All instrumental tests passed!\n');
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
