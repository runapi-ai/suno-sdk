import { SunoClient } from '../src';

async function main() {
  console.log('🧪 Testing Suno Personas & Styles Management\n');
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
    console.log('\n🎵 Test 0: Generate music first (needed for persona creation)');
    console.log('-'.repeat(50));
    
    const music = await client.textToMusic.run({
      custom_mode: false,
      instrumental: false,
      prompt: 'A warm acoustic song with male vocals',
      model: 'suno-v4.5-plus',
    });
    
    console.log('✅ Music generated!');
    console.log(`   Task ID: ${music.id}`);
    console.log(`   Audios: ${music.audios?.length || 0}`);
    
    const audioId = music.audios?.[0]?.id;
    if (!audioId) {
      throw new Error('No audio ID found in generated audios');
    }
    
    console.log('\n👤 Test 1: Create a new persona from generated audio');
    console.log('-'.repeat(50));
    
    const personaResponse = await client.generatePersona.run({
      task_id: music.id,
      audio_id: audioId,
      name: 'Warm Male Voice',
      description: 'A warm, friendly male voice perfect for acoustic songs',
    });
    const persona = personaResponse.persona;
    
    console.log('✅ Persona created!');
    console.log(`   Persona ID: ${persona.id}`);
    console.log(`   Name: ${persona.name}`);
    console.log(`   Description: ${persona.description || 'N/A'}`);

    console.log('\n🎵 Test 2: Use persona in music generation');
    console.log('-'.repeat(50));
    
    const musicWithPersona = await client.textToMusic.run({
      custom_mode: true,
      instrumental: false,
      prompt: 'A heartfelt acoustic song about coming home',
      style: 'Acoustic, Folk, Emotional',
      title: 'Coming Home',
      model: 'suno-v5',
      persona_id: persona.id,
    });
    
    console.log('✅ Music generated with persona!');
    console.log(`   Task ID: ${musicWithPersona.id}`);
    console.log(`   Audios: ${musicWithPersona.audios?.length || 0}`);

    console.log('\n🎨 Test 3: Generate a style description');
    console.log('-'.repeat(50));
    
    const styleResponse = await client.boostStyle.run({
      name: 'Epic Cinematic',
      description: 'Epic orchestral music with powerful crescendos and dramatic builds',
    });
    const generatedStyle = styleResponse.style;
    
    console.log('✅ Style generated!');
    console.log(`   Generated style: ${generatedStyle}`);

    console.log('\n🎵 Test 4: Use generated style in music generation');
    console.log('-'.repeat(50));
    
    const musicWithStyle = await client.textToMusic.run({
      custom_mode: true,
      instrumental: true,
      prompt: 'A dramatic orchestral piece for an epic movie scene',
      style: generatedStyle,
      title: 'Epic Battle',
      model: 'suno-v5',
    });
    
    console.log('✅ Music generated with custom style!');
    console.log(`   Task ID: ${musicWithStyle.id}`);
    console.log(`   Audios: ${musicWithStyle.audios?.length || 0}`);

    console.log('\n🎉 All personas & styles tests passed!\n');
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
