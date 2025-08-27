// Test script to verify the global stats functionality
import api from './api';
import { fetchGlobalStats } from './statsService';

// Test the fetchGlobalStats function
async function testGlobalStats() {
  try {
    console.log('Testing global stats fetch...');
    const stats = await fetchGlobalStats();
    console.log('Global stats:', stats);
    
    // Convert kg to tons for display
    const wasteTons = (stats.total_waste_quantity_kg / 1000).toFixed(1);
    const co2Tons = (stats.co2_saved_kg / 1000).toFixed(1);
    
    console.log('Formatted stats:');
    console.log(`Waste diverted: ${wasteTons}+ tons`);
    console.log(`CO2 saved: ${co2Tons}+ tons`);
    console.log(`Active users: ${stats.total_users}+`);
    console.log(`Partner composters: ${stats.total_compost_listings}+`);
    
    return stats;
  } catch (error) {
    console.error('Error testing global stats:', error);
    throw error;
  }
}

// Run the test
testGlobalStats();