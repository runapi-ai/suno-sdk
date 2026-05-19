import { SunoClient } from '../src';

function firstLyric(
  lyrics: Array<{ title?: string; text: string }> | undefined
) {
  if (!lyrics) return undefined;
  return lyrics[0];
}

async function main() {
  console.log('🧪 Testing Suno Lyrics Generation\n');
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
    console.log('\n📝 Test 1: Generate lyrics (create method)');
    console.log('-'.repeat(50));
    
    const createResult = await client.generateLyrics.create({
      prompt: 'A love song about summer nights under the stars',
    });
    
    console.log('✅ Lyrics generation task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 2: Check lyrics status (get method)');
    console.log('-'.repeat(50));
    
    const getResult = await client.generateLyrics.get(createResult.id);
    
    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);
    
    const getLyric = firstLyric(getResult.lyrics);
    if (getLyric) {
      console.log(`   Lyrics preview:`);
      const text = getLyric.text || '';
      const preview = text.substring(0, 200);
      console.log(`   ${preview}${text.length > 200 ? '...' : ''}`);
    }

    console.log('\n⏳ Test 3: Complete lyrics generation workflow (run method)');
    console.log('-'.repeat(50));
    
    const runResult = await client.generateLyrics.run({
      prompt: 'An upbeat song about chasing dreams and never giving up',
    });
    
    console.log('✅ Lyrics generation completed!');
    console.log(`   Task ID: ${runResult.id}`);
    console.log(`   Status: ${runResult.status}`);
    
    const runLyric = firstLyric(runResult.lyrics);
    if (runLyric) {
      console.log(`\n   Generated Lyrics:`);
      console.log('   ' + '-'.repeat(48));
      if (runLyric.title) {
        console.log(`   Title: ${runLyric.title}`);
      }
      const text = runLyric.text || '';
      console.log(text.split('\n').map(line => `   ${line}`).join('\n'));
      console.log('   ' + '-'.repeat(48));
    }

    console.log('\n🎵 Test 4: Generate music with custom lyrics');
    console.log('-'.repeat(50));
    
    const music = await client.textToMusic.run({
      custom_mode: true,
      instrumental: false,
      prompt: runLyric?.text || 'Default lyrics',
      style: 'Rock, Motivational',
      title: 'Chase Your Dreams',
      model: 'V5',
    });
    
    console.log('✅ Music with custom lyrics generated!');
    console.log(`   Task ID: ${music.id}`);
    console.log(`   Audios: ${music.audios?.length || 0}`);
    
    const musicAudioId = music.audios?.[0]?.id;
    if (!musicAudioId) {
      throw new Error('No audio ID found in generated music');
    }

    console.log('\\n⏱️  Test 5: Get timestamped lyrics from generated music');
    console.log('-'.repeat(50));
    
    const timestampedResult = await client.getTimestampedLyrics.run({
      task_id: music.id,
      audio_id: musicAudioId,
    });
    
    console.log('✅ Timestamped lyrics retrieved!');
    console.log(`   Words aligned: ${timestampedResult.aligned_words?.length || 0}`);
    if (timestampedResult.hoot_cer !== undefined) {
      console.log(`   Alignment accuracy: ${(timestampedResult.hoot_cer * 100).toFixed(2)}%`);
    }
    
    if (timestampedResult.aligned_words && timestampedResult.aligned_words.length > 0) {
      console.log(`\\n   Timestamped Lyrics (first 10 words):`);
      console.log('   ' + '-'.repeat(48));
      timestampedResult.aligned_words.slice(0, 10).forEach((word) => {
        const startTime = word.start_time?.toFixed(2) || '0.00';
        const endTime = word.end_time?.toFixed(2) || '0.00';
        console.log(`   [${startTime}s - ${endTime}s] ${word.word}`);
      });
      if (timestampedResult.aligned_words.length > 10) {
        console.log(`   ... and ${timestampedResult.aligned_words.length - 10} more words`);
      }
      console.log('   ' + '-'.repeat(48));
    }

    console.log('\n📖 Test 6: Different lyric prompts');
    console.log('-'.repeat(50));
    
    const prompts = [
      'A melancholic ballad about lost love',
      'A fun party song about good times with friends',
    ];
    
    for (const prompt of prompts) {
      console.log(`\n   Prompt: ${prompt}`);
      const result = await client.generateLyrics.run({ prompt });
      const lyric = firstLyric(result.lyrics);
      if (lyric) {
        const text = lyric.text || '';
        const preview = text.substring(0, 100);
        console.log(`   Preview: ${preview}...`);
      }
    }

    console.log('\n🎉 All lyrics tests passed!\n');
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
