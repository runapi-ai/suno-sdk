# Suno SDK Manual Testing Guide

This directory contains manual test scripts for validating the `@runapi.ai/suno` SDK with real API calls.

## 📋 Prerequisites

### 1. Start Rails Server

Make sure your Rails server is running:

```bash
# From project root
bin/dev

# Or using overmind
overmind start
```

The server should be available at `http://localhost:3000`.

### 2. Get API Token

You need a valid API token with sufficient credits:

**Option A: Using Rails Console**
```bash
bin/rails console
```

Then in the console:
```ruby
# Get the first API token
ApiToken.first.token

# Or create a new one for testing
user = User.first
token = user.api_tokens.create(name: "SDK Test Token")
token.token  # Copy this
```

**Option B: Using Database**
```bash
bin/rails dbconsole
```

```sql
SELECT token FROM api_tokens LIMIT 1;
```

### 3. Configure Environment Variables

**Create .env file:**
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your API token
nano .env
```

**.env file should contain:**
```env
RUNAPI_API_KEY=your_api_key_here
RUNAPI_BASE_URL=http://localhost:3000
TEST_AUDIO_URL=https://example.com/your-test-audio.mp3
```

---

## 🧪 Available Tests

### Test 1: Simple Mode Generation
**File:** `test-generation-simple.ts`

**What it tests:**
- ✅ `create()` method - Create task without waiting
- ✅ `get()` method - Query task status
- ✅ `run()` method - Complete workflow (create + poll until completion)
- ✅ Simple mode music generation
- ✅ Instrumental generation

**Run:**
```bash
cd sdk/js
pnpm --filter @runapi.ai/suno test:simple
```

---

### Test 2: Custom Mode Generation
**File:** `test-generation-custom.ts`

**What it tests:**
- ✅ Custom mode with style and title
- ✅ Different models (V5, V4_5PLUS, V4_5ALL, V4)
- ✅ Custom mode with persona
- ✅ Custom mode instrumental

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:custom
```

---

### Test 3: Music Covers
**File:** `test-covers.ts`

**What it tests:**
- ✅ Create cover of existing generation
- ✅ Upload and cover external audio
- ✅ Upload cover with custom mode
- ✅ Different cover styles

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:covers
```

**Note:** Requires TEST_AUDIO_URL for upload tests.

---

### Test 4: Music Extension
**File:** `test-extension.ts`

**What it tests:**
- ✅ Extend generated music
- ✅ Upload and extend external audio
- ✅ Chain multiple extensions
- ✅ Extension with different prompts

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:extension
```

---

### Test 5: Add Instrumental
**File:** `test-instrumentals.ts`

**What it tests:**
- ✅ Add instrumental to vocals
- ✅ Use negative tags to control style
- ✅ Different models comparison (V4_5PLUS, V5 only)

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:instrumentals
```

**Note:** Requires TEST_AUDIO_URL (vocal-only audio recommended).

---

### Test 6: Add Vocals
**File:** `test-vocals.ts`

**What it tests:**
- ✅ Add AI-generated vocals to instrumental
- ✅ Different vocal styles
- ✅ Different models comparison (V4_5PLUS, V5 only)

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:vocals
```

**Note:** Requires TEST_AUDIO_URL (instrumental audio recommended).

---

### Test 7: Vocal Removal
**File:** `test-vocal-removal.ts`

**What it tests:**
- ✅ Separate vocals from instrumentals
- ✅ Split audio into multiple stems (split_stem type)
- ✅ create/get/run methods

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:vocal-removal
```

---

### Test 8: MIDI Extraction
**File:** `test-midi.ts`

**What it tests:**
- ✅ Extract MIDI data from audio
- ✅ Detect instruments (Drums, Bass, Guitar, etc.)
- ✅ Get note pitch, timing, and velocity
- ✅ create/get/run methods

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:midi
```

**Note:** Requires stem separation (split_stem) as prerequisite.

---

### Test 9: WAV Conversion
**File:** `test-conversions.ts`

**What it tests:**
- ✅ Convert generated music to WAV format
- ✅ create/get/run methods
- ✅ Batch conversion of multiple audios

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:conversions
```

---

### Test 10: Music Videos
**File:** `test-music-videos.ts`

**What it tests:**
- ✅ Generate music video from music
- ✅ Different video prompts
- ✅ create/get/run methods

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:music-videos
```

---

### Test 11: Lyrics Generation
**File:** `test-lyrics.ts`

**What it tests:**
- ✅ Generate lyrics from prompt
- ✅ Generate music with custom lyrics
- ✅ Get timestamped lyrics
- ✅ Different lyric styles

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:lyrics
```

---

### Test 12: Personas & Styles
**File:** `test-personas-styles.ts`

**What it tests:**
- ✅ Create/get/list personas
- ✅ Create/get/list styles
- ✅ Use persona in music generation
- ✅ Use custom style in music generation

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:personas-styles
```

---

### Test 13: Error Handling
**File:** `test-error-handling.ts`

**What it tests:**
- ✅ Missing API key detection
- ✅ Invalid API key (AuthenticationError)
- ✅ Validation errors (missing fields)
- ✅ Not found errors (invalid task ID)
- ✅ Error information preservation

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:errors
```

---

### Test 14: Run All Tests
**File:** `test-all.ts`

Runs all tests sequentially and provides a summary report.

**Run:**
```bash
pnpm --filter @runapi.ai/suno test:all

# Or using the shortcut
pnpm --filter @runapi.ai/suno test:manual
```

**Expected output:**
```
🧪 Running Suno SDK Test Suite
============================================================

[1/11] Simple Mode Generation...
✅ PASSED (15.3s)

[2/11] Custom Mode Generation...
✅ PASSED (42.1s)

[3/11] Music Covers...
✅ PASSED (25.7s)

...

============================================================
📊 Test Summary
============================================================
✅ [1/11] Simple Mode Generation (15.3s)
✅ [2/11] Custom Mode Generation (42.1s)
...

============================================================
Total Tests: 11
Passed: 11
Failed: 0
Success Rate: 100%
Total Duration: 120.5s
============================================================

🎉 All tests passed!
```

---

## 📊 Test Coverage

- ✅ Music generation (simple mode)
- ✅ Music generation (custom mode)
- ✅ Music covers (upload & transform)
- ✅ Music extension
- ✅ Add instrumental to vocals
- ✅ Vocal removal & MIDI export
- ✅ WAV conversion
- ✅ Music video generation
- ✅ Lyrics generation
- ✅ Timestamped lyrics
- ✅ Persona management
- ✅ Style management
- ✅ Error handling
- ✅ All models (V5, V4_5PLUS, V4_5ALL, V4_5, V4, V3_5)
- ✅ create() method (async task creation)
- ✅ get() method (status polling)
- ✅ run() method (complete workflow)

---

## 🐛 Troubleshooting

### "API key is required" Error
```bash
# Check if .env file exists
ls -la manual-tests/.env

# Verify API key is set
cat manual-tests/.env | grep RUNAPI_API_KEY
```

### "Connection refused" Error
```bash
# Check if Rails server is running
curl http://localhost:3000/api/v1/me

# If not running, start it:
bin/dev
```

### "Insufficient credits" Error
```bash
# Check your credits in Rails console
bin/rails console

# Then in console:
User.first.account.credits
```

### "TEST_AUDIO_URL required" Error
Some tests require an external audio file. Either:
1. Set TEST_AUDIO_URL in .env
2. Skip those specific tests
3. Use a sample audio URL

### Tests taking too long
- Music generation takes 20-60 seconds per audio
- Video generation takes 40-90 seconds
- Use V4_5PLUS for faster results (V5 is slower but higher quality)

---

## 💡 Tips for Effective Testing

1. **Start with simple tests** - Run `test:simple` first to verify basic functionality
2. **Check credits before running all tests** - Full test suite can consume significant credits
3. **Use TEST_AUDIO_URL wisely** - Find a royalty-free sample audio for testing
4. **Monitor backend logs** - `tail -f log/development.log` while testing
5. **Verify generated content** - Click the result URLs to check quality
6. **Run tests individually** - Debug specific features without running the full suite

---

## 🎯 Quick Start

**Minimal setup to run tests:**

```bash
# 1. Start Rails server (in one terminal)
bin/dev

# 2. Configure .env file (in another terminal)
cd sdk/js/packages/suno/manual-tests
cp .env.example .env

# 3. Get API token and add to .env
echo "RUNAPI_API_KEY=$(bin/rails runner 'puts ApiToken.first.token')" >> .env

# 4. Run simple test (quick verification)
cd ../../  # Back to sdk/js
pnpm --filter @runapi.ai/suno test:simple

# 5. Run all tests (full verification)
pnpm --filter @runapi.ai/suno test:all
```

---

## 📝 Test Commands Summary

```bash
# Individual tests
pnpm --filter @runapi.ai/suno test:simple           # Simple mode generation
pnpm --filter @runapi.ai/suno test:custom           # Custom mode generation
pnpm --filter @runapi.ai/suno test:covers           # Music covers
pnpm --filter @runapi.ai/suno test:extension        # Music extension
pnpm --filter @runapi.ai/suno test:instrumentals    # Add instrumental
pnpm --filter @runapi.ai/suno test:vocal-removal    # Vocal separation
pnpm --filter @runapi.ai/suno test:midi              # MIDI extraction
pnpm --filter @runapi.ai/suno test:conversions      # WAV conversion
pnpm --filter @runapi.ai/suno test:music-videos     # Music videos
pnpm --filter @runapi.ai/suno test:lyrics           # Lyrics generation
pnpm --filter @runapi.ai/suno test:personas-styles  # Personas & styles
pnpm --filter @runapi.ai/suno test:errors           # Error handling

# Run all tests
pnpm --filter @runapi.ai/suno test:all              # Full test suite
pnpm --filter @runapi.ai/suno test:manual           # Alias for test:all
```

---

## 🚀 Next Steps

Once all tests pass:

1. ✅ SDK implementation is validated
2. ✅ Ready for integration into `@runapi.ai/suno` package
3. ✅ Can be published to npm
4. ✅ Ready for production use

For any issues or questions, please check:
- Backend logs: `log/development.log`
- Bruno API tests: `bruno/suno/`
- API documentation: `sdk/js/packages/suno/README.md`
