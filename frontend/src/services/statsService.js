// Mock stats service for demonstration
export const fetchGlobalStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    total_waste_quantity_kg: 150000, // 150 tons
    co2_saved_kg: 45000, // 45 tons
    total_users: 2400,
    total_compost_listings: 120,
    total_waste_listings: 850
  };
};