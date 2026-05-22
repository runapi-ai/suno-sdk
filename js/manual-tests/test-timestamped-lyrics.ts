import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Timestamped Lyrics\n');
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
    console.log('\n🎵 Test 1: Generate music with vocals (for timestamped lyrics)');
    console.log('-'.repeat(50));
    
    const music = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A song about chasing dreams with clear vocals',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Music generated!');
    console.log(`   Task ID: ${music.id}`);
    console.log(`   Audios: ${music.audios?.length || 0}`);
    
    const audio = music.audios?.[0];
    if (!audio?.id) {
      throw new Error('No audio generated');
    }
    
    console.log(`   Audio ID: ${audio.id}`);
    console.log(`   Duration: ${audio.duration}s`);
    console.log(`   Audio URL: ${audio.audio_url}`);

    console.log('\n⏱️  Test 2: Get timestamped lyrics (run method - synchronous)');
    console.log('-'.repeat(50));
    
    const firstResult = await client.getTimestampedLyrics.run({
      task_id: music.id,
      audio_id: audio.id,
    });
    
    console.log('✅ Timestamped lyrics retrieved!');
    console.log(`   Aligned words: ${firstResult.aligned_words?.length || 0}`);
    
    if (firstResult.hoot_cer !== undefined) {
      console.log(`   Alignment accuracy (CER): ${firstResult.hoot_cer.toFixed(4)}`);
    }

    console.log('\n⏳ Test 3: Complete timestamped lyrics workflow');
    console.log('-'.repeat(50));
    
    const runResult = await client.getTimestampedLyrics.run({
      task_id: music.id,
      audio_id: audio.id,
    });
    
    console.log('✅ Timestamped lyrics retrieved!');
    console.log(`   Aligned words: ${runResult.aligned_words?.length || 0}`);
    
    if (runResult.hoot_cer !== undefined) {
      console.log(`   Alignment accuracy (CER): ${runResult.hoot_cer.toFixed(4)}`);
    }
    
    if (runResult.is_streamed !== undefined) {
      console.log(`   Is streamed: ${runResult.is_streamed}`);
    }
    
    if (runResult.waveform_data) {
      console.log(`   Waveform data points: ${runResult.waveform_data.length}`);
    }

    console.log('\n📝 Test 4: Display timestamped lyrics');
    console.log('-'.repeat(50));
    
    if (runResult.aligned_words && runResult.aligned_words.length > 0) {
      console.log(`\n   Timestamped Lyrics (first 20 words):`);
      console.log('   ' + '-'.repeat(48));
      
      runResult.aligned_words.slice(0, 20).forEach((word) => {
        const startTime = word.start_time?.toFixed(2) || '0.00';
        const endTime = word.end_time?.toFixed(2) || '0.00';
        const duration = word.end_time && word.start_time 
          ? (word.end_time - word.start_time).toFixed(2) 
          : '0.00';
        
        console.log(`   [${startTime}s - ${endTime}s] (${duration}s) "${word.word}"`);
      });
      
      if (runResult.aligned_words.length > 20) {
        console.log(`   ... and ${runResult.aligned_words.length - 20} more words`);
      }
      console.log('   ' + '-'.repeat(48));
    }

    console.log('\n📊 Test 5: Analyze timing statistics');
    console.log('-'.repeat(50));
    
    if (runResult.aligned_words && runResult.aligned_words.length > 0) {
      const durations = runResult.aligned_words
        .filter(w => w.start_time !== undefined && w.end_time !== undefined)
        .map(w => (w.end_time! - w.start_time!));
      
      if (durations.length > 0) {
        const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
        const minDuration = Math.min(...durations);
        const maxDuration = Math.max(...durations);
        
        console.log(`   Total words: ${runResult.aligned_words.length}`);
        console.log(`   Average word duration: ${avgDuration.toFixed(3)}s`);
        console.log(`   Shortest word: ${minDuration.toFixed(3)}s`);
        console.log(`   Longest word: ${maxDuration.toFixed(3)}s`);
        
        const firstWord = runResult.aligned_words[0];
        const lastWord = runResult.aligned_words[runResult.aligned_words.length - 1];
        
        if (firstWord.start_time !== undefined && lastWord.end_time !== undefined) {
          const totalDuration = lastWord.end_time - firstWord.start_time;
          console.log(`   Total lyrics duration: ${totalDuration.toFixed(2)}s`);
        }
      }
    }

    console.log('\n🎤 Test 6: Multiple audios from same generation');
    console.log('-'.repeat(50));
    
    if (music.audios && music.audios.length > 1) {
      console.log(`   Testing ${music.audios.length} audios...`);
      
      for (let i = 0; i < Math.min(2, music.audios.length); i++) {
        const testAudio = music.audios[i];
        console.log(`\n   Audio ${i + 1}/${music.audios.length}:`);
        console.log(`   Audio ID: ${testAudio.id}`);
        
        const result = await client.getTimestampedLyrics.run({
          task_id: music.id,
          audio_id: testAudio.id,
        });
        
        console.log(`   ✅ Words aligned: ${result.aligned_words?.length || 0}`);
        
        if (result.aligned_words && result.aligned_words.length > 0) {
          const preview = result.aligned_words.slice(0, 5)
            .map(w => w.word)
            .join(' ');
          console.log(`   Preview: "${preview}..."`);
        }
      }
    } else {
      console.log('   Only one audio generated, skipping multi-audio test');
    }

    console.log('\n📈 Test 7: Waveform data analysis');
    console.log('-'.repeat(50));
    
    if (runResult.waveform_data && runResult.waveform_data.length > 0) {
      const waveform = runResult.waveform_data;
      const maxAmplitude = Math.max(...waveform.map(Math.abs));
      const avgAmplitude = waveform.reduce((a, b) => a + Math.abs(b), 0) / waveform.length;
      
      console.log(`   Waveform data points: ${waveform.length}`);
      console.log(`   Max amplitude: ${maxAmplitude.toFixed(4)}`);
      console.log(`   Average amplitude: ${avgAmplitude.toFixed(4)}`);
      
      console.log(`\n   Waveform preview (first 20 points):`);
      const preview = waveform.slice(0, 20)
        .map(v => v.toFixed(4))
        .join(', ');
      console.log(`   [${preview}]`);
    } else {
      console.log('   No waveform data available');
    }

    console.log('\n🎉 All timestamped lyrics tests passed!\n');
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
