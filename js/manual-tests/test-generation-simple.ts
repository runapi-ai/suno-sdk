import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Simple Mode Music Generation\n');
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
    console.log('\n📤 Test 1: Creating music generation task (create method)');
    console.log('-'.repeat(50));
    const createResult = await client.textToMusic.create({
      custom_mode: false,
      instrumental: false,
      prompt: 'A chill lo-fi beat with soft piano melodies and ambient sounds',
      model: 'V4_5PLUS',
    });
    
    console.log('✅ Task created successfully!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 2: Checking task status (get method)');
    console.log('-'.repeat(50));
    const getResult = await client.textToMusic.get(createResult.id);
    
    console.log('✅ Status retrieved successfully!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);
    console.log(`   Generation Stage: ${getResult.generation_stage || 'N/A'}`);
    
    if (getResult.audios && getResult.audios.length > 0) {
      console.log(`   Audios: ${getResult.audios.length}`);
      getResult.audios.forEach((audio, idx) => {
        console.log(`     [${idx + 1}] ${audio.title || 'Untitled'}`);
        if (audio.audio_url) {
          console.log(`         Audio: ${audio.audio_url}`);
        }
      });
    }

    console.log('\n⏳ Test 3: Running complete workflow (run method)');
    console.log('-'.repeat(50));
    console.log('   This will create a new task and wait for completion...');
    
    const runResult = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'Upbeat electronic dance music with energetic beats',
      model: 'V4_5PLUS',
    });
    
    console.log('✅ Generation completed successfully!');
    console.log(`   Task ID: ${runResult.id}`);
    console.log(`   Status: ${runResult.status}`);
    console.log(`   Generation Stage: ${runResult.generation_stage || 'N/A'}`);
    
    if (runResult.audios && runResult.audios.length > 0) {
      console.log(`   Generated Audios:`);
      runResult.audios.forEach((audio, idx) => {
        console.log(`     [${idx + 1}] ${audio.title || 'Untitled'}`);
        console.log(`         Audio: ${audio.audio_url || 'N/A'}`);
        if (audio.prompt) {
          console.log(`         Prompt: ${audio.prompt.substring(0, 100)}...`);
        }
      });
    }

    console.log('\n🎵 Test 4: Instrumental generation');
    console.log('-'.repeat(50));
    const instrumentalResult = await client.textToMusic.run({
      custom_mode: false,
      instrumental: true,
      prompt: 'Relaxing ambient music with nature sounds',
      model: 'V4_5PLUS',
    });
    
    console.log('✅ Instrumental generation completed!');
    console.log(`   Task ID: ${instrumentalResult.id}`);
    console.log(`   Audios: ${instrumentalResult.audios?.length || 0}`);

    console.log('\n🎉 All tests passed!\n');
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
