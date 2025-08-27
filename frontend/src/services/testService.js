// Test the stats service function
const { fetchGlobalStats } = require('./statsService');

async function testStatsService() {
  try {
    console.log('Testing stats service...');
    const stats = await fetchGlobalStats();
    console.log('Stats service test passed:', stats);
  } catch (error) {
    console.error('Stats service test failed:', error);
  }
}

testStatsService();