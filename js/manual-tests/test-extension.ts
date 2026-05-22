import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Music Extension\n');
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
    console.log('\n🎵 Test 1: Generate original short music');
    console.log('-'.repeat(50));
    const original = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A short uplifting piano intro',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Original music generated!');
    console.log(`   Task ID: ${original.id}`);
    console.log(`   Audios: ${original.audios?.length || 0}`);
    
    const firstAudio = original.audios?.[0];
    if (!firstAudio?.id) {
      throw new Error('No audio ID found in generated music');
    }
    
    if (original.audios && original.audios.length > 0) {
      console.log(`   First audio: ${firstAudio.title || 'Untitled'}`);
      console.log(`   Audio ID: ${firstAudio.id}`);
      console.log(`   Audio: ${firstAudio.audio_url || 'N/A'}`);
    }

    console.log('\n➕ Test 2: Extend music with new prompt');
    console.log('-'.repeat(50));
    const extended = await client.extendMusic.run({
      audio_id: firstAudio.id,
      default_param_flag: false,
      prompt: 'Continue with an energetic chorus and uplifting melody',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Music extension completed!');
    console.log(`   Task ID: ${extended.id}`);
    console.log(`   Audios: ${extended.audios?.length || 0}`);
    if (extended.audios && extended.audios.length > 0) {
      extended.audios.forEach((audio, idx) => {
        console.log(`     [${idx + 1}] ${audio.title || 'Untitled'}`);
        console.log(`         Audio: ${audio.audio_url || 'N/A'}`);
      });
    }

    console.log('\n📤 Test 3: Upload and extend external audio');
    console.log('-'.repeat(50));
    
    const audioUrl = process.env.TEST_AUDIO_URL;
    if (!audioUrl) {
      console.log('   ⚠️  TEST_AUDIO_URL not set, skipping upload extension test');
      console.log('   Set TEST_AUDIO_URL environment variable to test upload functionality');
    } else {
      console.log(`   Using audio URL: ${audioUrl}`);
      
      const audioExtendResult = await client.extendMusic.run({
        upload_url: audioUrl,
        default_param_flag: false,
        instrumental: false,
        prompt: 'Add a powerful outro with crescendo',
        model: 'suno-v4.5-plus',
      });
      
      console.log('✅ Upload extension completed!');
      console.log(`   Task ID: ${audioExtendResult.id}`);
      console.log(`   Audios: ${audioExtendResult.audios?.length || 0}`);
    }

    console.log('\n🔄 Test 4: Chain multiple extensions');
    console.log('-'.repeat(50));
    
    let currentTrackId = firstAudio.id;
    for (let i = 1; i <= 2; i++) {
      console.log(`   Extension ${i}...`);
      const extendedResult = await client.extendMusic.run({
        audio_id: currentTrackId,
        default_param_flag: false,
        prompt: `Add section ${i} with variation`,
        model: 'suno-v4.5-plus',
      });
      console.log(`   ✅ Extension ${i} completed - Task ID: ${extendedResult.id}`);
      
      const newAudio = extendedResult.audios?.[0];
      if (newAudio?.id) {
        currentTrackId = newAudio.id;
      }
    }

    console.log('\n🎉 All extension tests passed!\n');
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
