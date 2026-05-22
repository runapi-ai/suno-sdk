import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Music Video Generation\n');
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
    console.log('\n🎵 Test 1: Generate music first');
    console.log('-'.repeat(50));
    
    const music = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A beautiful melody for music video',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Music generated!');
    console.log(`   Task ID: ${music.id}`);
    console.log(`   Audios: ${music.audios?.length || 0}`);

    const audioId = music.audios?.[0]?.id;
    if (!audioId) {
      throw new Error('No audio ID found in generated audios');
    }

    console.log('\n🎬 Test 2: Generate music video (create method)');
    console.log('-'.repeat(50));
    
    const createResult = await client.visualizeMusic.create({
      task_id: music.id,
      audio_id: audioId,
      prompt: 'A serene landscape with flowing water and mountains at sunset',
    });
    
    console.log('✅ Music video task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 3: Check video generation status (get method)');
    console.log('-'.repeat(50));
    
    const getResult = await client.visualizeMusic.get(createResult.id);
    
    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);
    
    if (getResult.video_url) {
      console.log(`   Video URL: ${getResult.video_url}`);
    }

    console.log('\n⏳ Test 4: Complete video generation workflow (run method) with second audio');
    console.log('-'.repeat(50));
    console.log('   This will create a music video and wait for completion...');
    
    const secondAudioId = music.audios?.[1]?.id;
    if (!secondAudioId) {
      console.log('   ⚠️  Only one audio generated, skipping run method test');
    } else {
      const runResult = await client.visualizeMusic.run({
        task_id: music.id,
        audio_id: secondAudioId,
        prompt: 'Abstract colorful patterns flowing in sync with the music',
      });
      
      console.log('✅ Music video generation completed!');
      console.log(`   Task ID: ${runResult.id}`);
      console.log(`   Status: ${runResult.status}`);
      console.log(`   Video URL: ${runResult.video_url || 'N/A'}`);
    }

    console.log('\n🎉 All music video tests passed!\n');
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
