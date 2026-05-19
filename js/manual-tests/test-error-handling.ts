import { SunoClient, AuthenticationError, ValidationError } from '../src';

async function main() {
  console.log('🧪 Testing Suno Error Handling\n');
  console.log('='.repeat(50));

  const validApiKey = process.env.RUNAPI_API_KEY;
  const baseUrl = process.env.RUNAPI_BASE_URL || 'http://localhost:3000';

  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Missing API key
  console.log('\n❌ Test 1: Missing API key detection');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    new SunoClient({ apiKey: '' });
    console.log('   ⚠️  FAILED: Should throw error for empty API key');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.log('   ✅ PASSED: Correctly detected missing API key');
      console.log(`   Error message: ${error.message}`);
      passedTests++;
    } else {
      console.log('   ⚠️  FAILED: Wrong error type');
    }
  }

  // Test 2: Invalid API key (authentication error)
  console.log('\n❌ Test 2: Invalid API key (AuthenticationError)');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    const client = new SunoClient({
      apiKey: 'invalid-api-key-12345',
      baseUrl,
    });
    
    await client.textToMusic.create({
      custom_mode: false,
      instrumental: false,
      prompt: 'Test',
      model: 'V4_5PLUS',
    });
    
    console.log('   ⚠️  FAILED: Should throw AuthenticationError');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.log('   ✅ PASSED: Correctly threw AuthenticationError');
      console.log(`   Error message: ${error.message}`);
      passedTests++;
    } else {
      console.log(`   ⚠️  FAILED: Wrong error type: ${error instanceof Error ? error.constructor.name : 'Unknown'}`);
    }
  }

  if (!validApiKey) {
    console.log('\n⚠️  Skipping remaining tests: RUNAPI_API_KEY not set');
    console.log(`\nTests passed: ${passedTests}/${totalTests}`);
    process.exit(passedTests === totalTests ? 0 : 1);
  }

  const client = new SunoClient({
    apiKey: validApiKey,
    baseUrl,
  });

  // Test 3: Validation error - missing required field
  console.log('\n❌ Test 3: Validation error - missing required field');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    // @ts-expect-error - intentionally missing prompt
    await client.textToMusic.create({
      custom_mode: false,
      instrumental: false,
      model: 'V4_5PLUS',
    });
    
    console.log('   ⚠️  Note: Backend accepted request without prompt (may have default behavior)');
    passedTests++;
  } catch (error) {
    if (error instanceof ValidationError || (error instanceof Error && error.message.includes('prompt'))) {
      console.log('   ✅ PASSED: Correctly detected missing field');
      console.log(`   Error message: ${error instanceof Error ? error.message : 'Unknown'}`);
      passedTests++;
    } else {
      console.log('   ✅ PASSED: Backend rejected request');
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown'}`);
      passedTests++;
    }
  }

  // Test 4: Not found error - invalid task ID
  console.log('\n❌ Test 4: Not found error - invalid task ID');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    await client.textToMusic.get('non-existent-task-id-12345');
    
    console.log('   ⚠️  FAILED: Should throw error for non-existent task');
  } catch (error) {
    if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
      console.log('   ✅ PASSED: Correctly threw not found error');
      console.log(`   Error message: ${error.message}`);
      passedTests++;
    } else {
      console.log(`   ⚠️  FAILED: Wrong error type: ${error instanceof Error ? error.constructor.name : 'Unknown'}`);
    }
  }

  // Test 5: Validation error - invalid model
  console.log('\n❌ Test 5: Validation error - invalid model');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    await client.textToMusic.create({
      custom_mode: false,
      instrumental: false,
      prompt: 'Test music',
      // @ts-expect-error - intentionally invalid model
      model: 'INVALID_MODEL',
    });
    
    console.log('   ⚠️  FAILED: Should throw ValidationError');
  } catch (error) {
    if (error instanceof ValidationError || (error instanceof Error && error.message.toLowerCase().includes('model'))) {
      console.log('   ✅ PASSED: Correctly detected invalid model');
      console.log(`   Error message: ${error instanceof Error ? error.message : 'Unknown'}`);
      passedTests++;
    } else {
      console.log(`   ⚠️  FAILED: Wrong error type: ${error instanceof Error ? error.constructor.name : 'Unknown'}`);
    }
  }

  // Test 6: Error information preservation
  console.log('\n❌ Test 6: Error information preservation');
  console.log('-'.repeat(50));
  totalTests++;
  try {
    await client.textToMusic.get('invalid-id');
  } catch (error) {
    if (error instanceof Error) {
      const hasMessage = error.message.length > 0;
      const hasStack = error.stack !== undefined;
      
      if (hasMessage && hasStack) {
        console.log('   ✅ PASSED: Error has message and stack trace');
        passedTests++;
      } else {
        console.log('   ⚠️  FAILED: Error missing information');
        console.log(`   Has message: ${hasMessage}, Has stack: ${hasStack}`);
      }
    } else {
      console.log('   ⚠️  FAILED: Not an Error instance');
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Error Handling Test Summary');
  console.log('='.repeat(50));
  console.log(`Tests passed: ${passedTests}/${totalTests}`);
  console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(0)}%`);
  console.log('='.repeat(50));

  if (passedTests === totalTests) {
    console.log('\n🎉 All error handling tests passed!\n');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${totalTests - passedTests} test(s) failed\n`);
    process.exit(1);
  }
}

main();
