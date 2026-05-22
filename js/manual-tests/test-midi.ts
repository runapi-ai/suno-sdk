import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno MIDI Extraction\n');
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
    console.log('\n🎵 Step 1: Generate music with instruments');
    console.log('-'.repeat(50));

    const original = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'An energetic rock song with drums, electric bass, and guitar riffs',
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

    console.log('\n🎛️ Step 2: Separate audio stems (split_stem type)');
    console.log('-'.repeat(50));

    // MIDI extraction requires split_stem type separation
    const stemSeparation = await client.separateAudioStems.run({
      task_id: original.id,
      audio_id: firstAudio.id,
      type: 'split_stem',
    });

    console.log('✅ Stem separation completed!');
    console.log(`   Task ID: ${stemSeparation.id}`);
    console.log(`   Status: ${stemSeparation.status}`);

    if (stemSeparation.separated_audios) {
      console.log('   Separated stems:');
      const audio = stemSeparation.separated_audios;
      if (audio.drums_url) console.log(`     Drums: ${audio.drums_url.substring(0, 60)}...`);
      if (audio.bass_url) console.log(`     Bass: ${audio.bass_url.substring(0, 60)}...`);
      if (audio.guitar_url) console.log(`     Guitar: ${audio.guitar_url.substring(0, 60)}...`);
    }

    console.log('\n🎹 Test 1: Create MIDI extraction task (create method)');
    console.log('-'.repeat(50));

    const createResult = await client.generateMidi.create({
      task_id: stemSeparation.id,
    });

    console.log('✅ MIDI extraction task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 2: Check MIDI extraction status (get method)');
    console.log('-'.repeat(50));

    const getResult = await client.generateMidi.get(createResult.id);

    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);

    console.log('\n⏳ Test 3: Complete MIDI extraction workflow (run method)');
    console.log('-'.repeat(50));

    const runResult = await client.generateMidi.run({
      task_id: stemSeparation.id,
    });

    console.log('✅ MIDI extraction completed!');
    console.log(`   Task ID: ${runResult.id}`);
    console.log(`   Status: ${runResult.status}`);

    if (runResult.instruments && runResult.instruments.length > 0) {
      console.log(`   Instruments detected: ${runResult.instruments.length}`);

      for (const instrument of runResult.instruments) {
        console.log(`\n   🎼 ${instrument.name}:`);
        console.log(`      Notes count: ${instrument.notes.length}`);

        // Show first 3 notes as sample
        const sampleNotes = instrument.notes.slice(0, 3);
        for (const note of sampleNotes) {
          console.log(`      - Pitch: ${note.pitch}, Start: ${note.start_time.toFixed(3)}s, End: ${note.end_time.toFixed(3)}s, Velocity: ${note.velocity}`);
        }

        if (instrument.notes.length > 3) {
          console.log(`      ... and ${instrument.notes.length - 3} more notes`);
        }
      }
    } else {
      console.log('   No instruments detected (this may happen for some audio types)');
    }

    console.log('\n🎉 All MIDI extraction tests passed!\n');
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
