import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Music Covers\n');
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
    console.log('\n🎵 Test 1: Generate original music first');
    console.log('-'.repeat(50));
    const original = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A simple pop song with catchy melody',
      model: 'V4_5PLUS',
    });
    
    console.log('✅ Original music generated!');
    console.log(`   Task ID: ${original.id}`);
    console.log(`   Audios: ${original.audios?.length || 0}`);

    console.log('\n🎭 Test 2: Create cover images for generated music');
    console.log('-'.repeat(50));
    const coverResult = await client.generateArtwork.run({
      task_id: original.id,
    });
    
    console.log('✅ Cover image generation completed!');
    console.log(`   Task ID: ${coverResult.id}`);
    console.log(`   Covers: ${coverResult.covers?.length || 0}`);
    if (coverResult.covers && coverResult.covers.length > 0) {
      coverResult.covers.forEach((cover, idx) => {
        console.log(`     [${idx + 1}] ${cover.url || 'N/A'}`);
      });
    }

    console.log('\n📤 Test 3: Upload and cover external audio');
    console.log('-'.repeat(50));
    
    const audioUrl = process.env.TEST_AUDIO_URL;
    if (!audioUrl) {
      console.log('   ⚠️  TEST_AUDIO_URL not set, skipping upload test');
      console.log('   Set TEST_AUDIO_URL environment variable to test upload functionality');
    } else {
      console.log(`   Using audio URL: ${audioUrl}`);
      
      const coverResult = await client.coverAudio.run({
        upload_url: audioUrl,
        custom_mode: false,
        instrumental: false,
        prompt: 'Transform into a jazz version with smooth saxophone',
        model: 'V4_5PLUS',
      });
      
      console.log('✅ Upload and cover completed!');
      console.log(`   Task ID: ${coverResult.id}`);
      console.log(`   Audios: ${coverResult.audios?.length || 0}`);
    }

    console.log('\n🎸 Test 4: Upload and cover with custom mode');
    console.log('-'.repeat(50));
    
    if (!audioUrl) {
      console.log('   ⚠️  TEST_AUDIO_URL not set, skipping custom upload cover test');
    } else {
      const customCoverResult = await client.coverAudio.run({
        upload_url: audioUrl,
        custom_mode: true,
        instrumental: false,
        prompt: 'Heavy guitar riffs with powerful drums',
        style: 'Heavy Metal, Aggressive, Dark',
        title: 'Metal Transformation',
        model: 'V5',
      });
      
      console.log('✅ Custom upload cover completed!');
      console.log(`   Task ID: ${customCoverResult.id}`);
      console.log(`   Audios: ${customCoverResult.audios?.length || 0}`);
    }

    console.log('\n🎉 All cover tests passed!\n');
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
