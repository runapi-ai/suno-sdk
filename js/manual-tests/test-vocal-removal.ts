import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Vocal Removal & MIDI Export\n');
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
    console.log('\n🎵 Test 1: Generate music with vocals first');
    console.log('-'.repeat(50));
    
    const original = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A melodic pop song with clear vocals and instrumental backing',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Original music generated!');
    console.log(`   Task ID: ${original.id}`);
    console.log(`   Audios: ${original.audios?.length || 0}`);
    
    if (!original.audios || original.audios.length === 0) {
      throw new Error('No audios generated');
    }
    
    const firstAudio = original.audios[0];
    console.log(`   First audio: ${firstAudio.title || 'Untitled'}`);
    console.log(`   Audio ID: ${firstAudio.id}`);

    console.log('\n🎤 Test 2: Separate vocals from instrumentals (create method)');
    console.log('-'.repeat(50));
    
    const createResult = await client.separateAudioStems.create({
      task_id: original.id,
      audio_id: firstAudio.id,
      type: 'separate_vocal',
    });
    
    console.log('✅ Vocal removal task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 3: Check vocal removal status (get method)');
    console.log('-'.repeat(50));
    
    const getResult = await client.separateAudioStems.get(createResult.id);
    
    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);

    console.log('\n⏳ Test 4: Complete vocal removal workflow (run method)');
    console.log('-'.repeat(50));
    
    const runResult = await client.separateAudioStems.run({
      task_id: original.id,
      audio_id: firstAudio.id,
      type: 'separate_vocal',
    });
    
    console.log('✅ Vocal removal completed!');
    console.log(`   Task ID: ${runResult.id}`);
    console.log(`   Status: ${runResult.status}`);
    
    if (runResult.separated_audios) {
      console.log('   Separated Audio:');
      console.log(`     Vocals: ${runResult.separated_audios.vocal_url || 'N/A'}`);
      console.log(`     Instrumental: ${runResult.separated_audios.instrumental_url || 'N/A'}`);
    }

    console.log('\n🎉 All vocal removal tests passed!\n');
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
