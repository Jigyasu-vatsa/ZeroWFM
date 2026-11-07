import { FoodDonation, CircularMetrics } from '../types';

export const CO2_KG_PER_FOOD_KG = 2.5; // FAO & UNEP standard emission factor
export const WATER_LITERS_PER_FOOD_KG = 1050; // Embedded water footprint
export const AVERAGE_KG_PER_MEAL = 0.42; // Standard cooked meal portion
export const INR_SAVING_PER_MEAL = 55; // Semi-urban nutritional value baseline

export const BASELINE_VERIFIED = {
  meals: 500,
  co2SavedKg: 535,
  waterSavedLiters: 224700,
  diversionRatePercent: 100,
};

export function calculateCircularMetrics(donations: FoodDonation[]): CircularMetrics {
  // Compute newly completed donations beyond initial seed
  const newlyDelivered = donations.filter(
    d => d.status === 'DELIVERED' && !d.id.includes('HIST')
  );

  const additionalKg = newlyDelivered.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const additionalMeals = newlyDelivered.reduce((acc, curr) => acc + curr.servings, 0);

  const totalMeals = BASELINE_VERIFIED.meals + additionalMeals;
  const totalCo2 = Math.round((BASELINE_VERIFIED.co2SavedKg + additionalKg * CO2_KG_PER_FOOD_KG) * 10) / 10;
  const totalWater = Math.round(BASELINE_VERIFIED.waterSavedLiters + additionalKg * WATER_LITERS_PER_FOOD_KG);

  const activeDonations = donations.filter(
    d => d.status === 'AVAILABLE' || d.status === 'CLAIMED' || d.status === 'VOLUNTEER_ASSIGNED' || d.status === 'IN_TRANSIT'
  ).length;

  return {
    totalSurplusKg: Math.round(214 + additionalKg),
    totalMealsServed: totalMeals,
    co2EmissionsSavedKg: totalCo2,
    waterSavedLiters: totalWater,
    landfillDiversionRatePercent: 100,
    economicValueInr: Math.round(totalMeals * INR_SAVING_PER_MEAL),
    activeDonationsCount: activeDonations,
    activeVolunteersCount: 14,
    activeReceiversCount: 8,
  };
}

export function formatTimeRemaining(expiryIso: string): { text: string; isUrgent: boolean; isExpired: boolean } {
  const diffMs = new Date(expiryIso).getTime() - Date.now();
  if (diffMs <= 0) {
    return { text: 'Expired', isUrgent: true, isExpired: true };
  }
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours < 2) {
    return { text: `${hours}h ${mins}m left (Urgent!)`, isUrgent: true, isExpired: false };
  }
  return { text: `${hours}h ${mins}m safe window`, isUrgent: false, isExpired: false };
}

// Haversine formula to calculate distance between coordinates in km
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
