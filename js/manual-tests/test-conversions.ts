import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno WAV Conversion\n');
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
      prompt: 'A short melody for WAV conversion testing',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Original music generated!');
    console.log(`   Task ID: ${original.id}`);
    console.log(`   Audios: ${original.audios?.length || 0}`);
    
    if (original.audios && original.audios.length > 0) {
      console.log(`   Original format: ${original.audios[0].audio_url || 'N/A'}`);
    }

    console.log('\n📤 Test 2: Convert to WAV (create method)');
    console.log('-'.repeat(50));
    
    const audioId = original.audios?.[0]?.id;
    if (!audioId) {
      throw new Error('No audio ID found in generated audios');
    }
    
    const createResult = await client.convertAudio.create({
      task_id: original.id,
      audio_id: audioId,
    });
    
    console.log('✅ WAV conversion task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 3: Check conversion status (get method)');
    console.log('-'.repeat(50));
    
    const getResult = await client.convertAudio.get(createResult.id);
    
    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);
    
    if (getResult.wav_url) {
      console.log(`   WAV URL: ${getResult.wav_url}`);
    }

    console.log('\n⏳ Test 4: Complete conversion workflow (run method) with second audio');
    console.log('-'.repeat(50));
    
    const secondAudioId = original.audios?.[1]?.id;
    if (!secondAudioId) {
      console.log('   ⚠️  Only one audio generated, skipping run method test');
    } else {
      const runResult = await client.convertAudio.run({
        task_id: original.id,
        audio_id: secondAudioId,
      });
      
      console.log('✅ WAV conversion completed!');
      console.log(`   Task ID: ${runResult.id}`);
      console.log(`   Status: ${runResult.status}`);
      console.log(`   WAV URL: ${runResult.wav_url || 'N/A'}`);
    }

    console.log('\n🔄 Test 5: Convert audio from new generation');
    console.log('-'.repeat(50));
    
    // Generate another music
    const music2 = await client.textToMusic.run({
      custom_mode: false,
      instrumental: true,
      prompt: 'Another melody for batch conversion test',
      model: 'suno-v4.5-plus',
    });
    
    console.log(`   Music 2 generated: ${music2.id}`);
    
    const audioId2 = music2.audios?.[0]?.id;
    if (!audioId2) {
      throw new Error('No audio ID found in music2 audios');
    }
    
    // Convert to WAV
    const wav2 = await client.convertAudio.run({
      task_id: music2.id,
      audio_id: audioId2,
    });
    
    console.log(`   ✅ Music 2 converted to WAV: ${wav2.wav_url || 'N/A'}`);

    console.log('\n🎉 All WAV conversion tests passed!\n');
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
