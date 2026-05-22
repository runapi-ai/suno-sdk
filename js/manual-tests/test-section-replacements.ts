import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Section Replacement\n');
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
    console.log('\n🎵 Test 1: Generate original music (for section replacement)');
    console.log('-'.repeat(50));
    
    const original = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A relaxing piano melody with soft ambient sounds',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Original music generated!');
    console.log(`   Task ID: ${original.id}`);
    console.log(`   Audios: ${original.audios?.length || 0}`);
    
    const originalAudio = original.audios?.[0];
    if (!originalAudio?.id) {
      throw new Error('No audio generated');
    }
    
    console.log(`   Audio ID: ${originalAudio.id}`);
    console.log(`   Duration: ${originalAudio.duration}s`);
    console.log(`   Audio URL: ${originalAudio.audio_url}`);

    console.log('\n✂️  Test 2: Replace section (create method)');
    console.log('-'.repeat(50));
    
    const createResult = await client.replaceSection.create({
      task_id: original.id,
      audio_id: originalAudio.id,
      prompt: 'A powerful piano crescendo with dramatic strings',
      tags: 'Classical, Dramatic, Epic',
      title: 'Piano Drama',
      infill_start_time: 5.0,
      infill_end_time: 15.0,
    });
    
    console.log('✅ Section replacement task created!');
    console.log(`   Task ID: ${createResult.id}`);

    console.log('\n🔍 Test 3: Check replacement status (get method)');
    console.log('-'.repeat(50));
    
    const getResult = await client.replaceSection.get(createResult.id);
    
    console.log('✅ Status retrieved!');
    console.log(`   Task ID: ${getResult.id}`);
    console.log(`   Status: ${getResult.status}`);
    
    if (getResult.track) {
      console.log(`   Track ID: ${getResult.track.id}`);
      console.log(`   Audio URL: ${getResult.track.audio_url}`);
    }

    console.log('\n⏳ Test 4: Complete section replacement workflow (run method)');
    console.log('-'.repeat(50));
    
    const runResult = await client.replaceSection.run({
      task_id: original.id,
      audio_id: originalAudio.id,
      prompt: 'A gentle guitar melody replacing this section',
      tags: 'Acoustic, Gentle, Peaceful',
      title: 'Guitar Interlude',
      infill_start_time: 20.0,
      infill_end_time: 30.0,
    });
    
    console.log('✅ Section replacement completed!');
    console.log(`   Task ID: ${runResult.id}`);
    console.log(`   Status: ${runResult.status}`);
    
    if (runResult.track) {
      console.log(`\n   Replaced Track:`);
      console.log('   ' + '-'.repeat(48));
      console.log(`   ID: ${runResult.track.id}`);
      console.log(`   Audio URL: ${runResult.track.audio_url}`);
      console.log(`   Duration: ${runResult.track.duration}s`);
      if (runResult.track.title) {
        console.log(`   Title: ${runResult.track.title}`);
      }
      console.log('   ' + '-'.repeat(48));
    }

    console.log('\n🎨 Test 5: Section replacement with optional parameters');
    console.log('-'.repeat(50));
    
    const advancedResult = await client.replaceSection.run({
      task_id: original.id,
      audio_id: originalAudio.id,
      prompt: 'An upbeat electronic beat',
      tags: 'Electronic, Energetic',
      title: 'Electronic Drop',
      infill_start_time: 35.0,
      infill_end_time: 45.0,
      negative_tags: 'Slow, Boring',
      full_lyrics: '[Electronic section]\nDrop the beat\nFeel the energy',
    });
    
    console.log('✅ Advanced section replacement completed!');
    console.log(`   Task ID: ${advancedResult.id}`);
    console.log(`   Status: ${advancedResult.status}`);
    
    if (advancedResult.track) {
      console.log(`   Track URL: ${advancedResult.track.audio_url}`);
    }

    console.log('\n📊 Test 6: Multiple section replacements on same track');
    console.log('-'.repeat(50));
    
    const sections = [
      {
        start: 10.0,
        end: 20.0,
        prompt: 'Jazz piano improvisation',
        tags: 'Jazz, Improvisation',
        title: 'Jazz Section',
      },
      {
        start: 40.0,
        end: 50.0,
        prompt: 'Classical orchestra finale',
        tags: 'Classical, Orchestra, Epic',
        title: 'Orchestra Finale',
      },
    ];
    
    for (const section of sections) {
      console.log(`\n   Replacing ${section.start}s - ${section.end}s: ${section.prompt}`);
      
      const result = await client.replaceSection.run({
        task_id: original.id,
        audio_id: originalAudio.id,
        prompt: section.prompt,
        tags: section.tags,
        title: section.title,
        infill_start_time: section.start,
        infill_end_time: section.end,
      });
      
      console.log(`   ✅ Completed: ${result.track?.audio_url}`);
    }

    console.log('\n🎉 All section replacement tests passed!\n');
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
