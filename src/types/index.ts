export type UserRole = 'provider' | 'receiver' | 'volunteer' | 'admin';
export type AppView = 'home' | 'operations';

export type FoodCategory = 'Cooked Meals' | 'Bakery & Bread' | 'Packaged Food' | 'Fresh Produce' | 'Dairy & Sweets' | 'Hostel Mess Batch';

export type FoodDietary = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Jain Friendly';

export type FoodCondition = 'Hot & Fresh' | 'Chilled / Refrigerated' | 'Ambient / Room Temp' | 'Dry Packaged';

export type DeliveryStatus = 
  | 'AVAILABLE' 
  | 'CLAIMED' 
  | 'VOLUNTEER_ASSIGNED' 
  | 'QUALITY_VERIFIED' 
  | 'IN_TRANSIT' 
  | 'DELIVERED' 
  | 'EXPIRED'
  | 'REJECTED_QUALITY';

export interface GeoCoordinate {
  lat: number;
  lng: number;
  address: string;
  zone: string;
}

export interface FoodDonation {
  id: string;
  title: string;
  category: FoodCategory;
  dietary: FoodDietary;
  condition: FoodCondition;
  quantityKg: number;
  servings: number;
  packaging: string;
  prepTimestamp: string;
  expiryTimestamp: string;
  storageTempCelsius?: number;
  specialInstructions?: string;
  providerId: string;
  providerName: string;
  providerType: 'Restaurant' | 'Hostel Mess' | 'Marriage Hall / Banquet' | 'Bakery' | 'Catering';
  location: GeoCoordinate;
  contactPhone: string;
  status: DeliveryStatus;
  claimedByReceiverId?: string;
  claimedByReceiverName?: string;
  claimedTimestamp?: string;
  assignedVolunteerId?: string;
  assignedVolunteerName?: string;
  assignedVolunteerPhone?: string;
  qualityCheck?: QualityVerification;
  deliveredTimestamp?: string;
  recipientFeedback?: string;
  recipientSignature?: string;
  createdTimestamp: string;
}

export interface QualityVerification {
  inspectedAt: string;
  inspectedByVolunteerName: string;
  passedAll: boolean;
  visualCheck: boolean; // No mold, discoloration, slime
  smellCheck: boolean; // Fresh, normal aroma
  temperatureCheck: boolean; // Safe storage temp (<5°C or >60°C or within dry safety)
  packagingIntegrity: boolean; // Sealed, clean, food-grade containers
  timeWindowValid: boolean; // Within safe consumption window
  measuredTempCelsius: number;
  notes: string;
}

export interface FoodDemandRequest {
  id: string;
  receiverId: string;
  receiverName: string;
  receiverType: 'Shelter' | 'Orphanage' | 'Old Age Home' | 'Community Kitchen' | 'Disaster Relief';
  requiredMeals: number;
  urgency: 'Immediate (within 2h)' | 'Today Evening' | 'Scheduled Tomorrow';
  dietaryPreference: FoodDietary | 'Any';
  location: GeoCoordinate;
  contactPhone: string;
  status: 'OPEN' | 'MATCHED' | 'FULFILLED';
  createdAt: string;
}

export interface VolunteerProfile {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'Bicycle' | 'Electric Two-Wheeler' | 'Motorcycle' | 'Mini Van' | 'Walking';
  currentLocation: GeoCoordinate;
  activeStatus: 'Available' | 'On Delivery' | 'Offline';
  rating: number;
  totalDeliveries: number;
  totalKgSaved: number;
  verificationBadge: boolean;
  joinedDate: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  details: string;
  relatedDonationId?: string;
}

export interface CircularMetrics {
  totalSurplusKg: number;
  totalMealsServed: number;
  co2EmissionsSavedKg: number; // ~2.5 kg CO2e per kg food waste
  waterSavedLiters: number; // ~1000 liters per kg
  landfillDiversionRatePercent: number; // e.g. 94.2%
  economicValueInr: number; // ~₹60 per meal
  activeDonationsCount: number;
  activeVolunteersCount: number;
  activeReceiversCount: number;
}
