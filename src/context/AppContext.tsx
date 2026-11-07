import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AppView,
  FoodDonation,
  FoodDemandRequest,
  VolunteerProfile,
  AuditLogEntry,
  CircularMetrics,
  QualityVerification,
} from '../types';
import {
  INITIAL_DONATIONS,
  INITIAL_DEMAND_REQUESTS,
  INITIAL_VOLUNTEERS,
  INITIAL_AUDIT_LOGS,
} from '../data/initialData';
import { calculateCircularMetrics } from '../utils/calculations';
import { soundFx } from '../utils/audio';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateToRole: (role: UserRole) => void;
  donations: FoodDonation[];
  demandRequests: FoodDemandRequest[];
  volunteers: VolunteerProfile[];
  auditLogs: AuditLogEntry[];
  metrics: CircularMetrics;
  soundEnabled: boolean;
  toggleSound: () => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  paperModalOpen: boolean;
  setPaperModalOpen: (open: boolean) => void;
  proofModalOpen: boolean;
  setProofModalOpen: (open: boolean) => void;
  selectedDonation: FoodDonation | null;
  setSelectedDonation: (donation: FoodDonation | null) => void;
  
  // Actions
  createDonation: (donation: Omit<FoodDonation, 'id' | 'status' | 'createdTimestamp'>) => string;
  claimDonation: (donationId: string, receiverId: string, receiverName: string) => void;
  acceptVolunteerTask: (donationId: string, volunteerId: string) => void;
  submitQualityCheck: (donationId: string, check: QualityVerification) => void;
  markInTransit: (donationId: string) => void;
  completeDelivery: (donationId: string, feedback?: string, signature?: string) => void;
  createDemandRequest: (req: Omit<FoodDemandRequest, 'id' | 'status' | 'createdAt'>) => void;
  resetAllData: () => void;
  simulateFullLifecycle: () => Promise<void>;
  isSimulating: boolean;
  simulationStep: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DONATIONS: 'zwfm_donations_v1',
  DEMANDS: 'zwfm_demands_v1',
  VOLUNTEERS: 'zwfm_volunteers_v1',
  AUDIT: 'zwfm_audit_v1',
  ROLE: 'zwfm_role_v1',
  SOUND: 'zwfm_sound_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'provider';
  });

  const [donations, setDonations] = useState<FoodDonation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [demandRequests, setDemandRequests] = useState<FoodDemandRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEMANDS);
    return saved ? JSON.parse(saved) : INITIAL_DEMAND_REQUESTS;
  });

  const [volunteers, setVolunteers] = useState<VolunteerProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [paperModalOpen, setPaperModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState('');

  const navigateToRole = (targetRole: UserRole) => {
    setRoleState(targetRole);
    setCurrentView('operations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEMANDS, JSON.stringify(demandRequests));
  }, [demandRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOUND, String(soundEnabled));
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  let auditCounter = 0;
  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    auditCounter += 1;
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `AUD-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${auditCounter}`,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const createDonation = (donationData: Omit<FoodDonation, 'id' | 'status' | 'createdTimestamp'>): string => {
    const newId = `DON-2026-${String(Date.now()).slice(-4)}-${Math.floor(Math.random() * 900 + 100)}`;
    const newDonation: FoodDonation = {
      ...donationData,
      id: newId,
      status: 'AVAILABLE',
      createdTimestamp: new Date().toISOString(),
    };
    setDonations(prev => [newDonation, ...prev]);
    addAuditLog({
      actorRole: 'provider',
      actorName: donationData.providerName,
      action: 'SURPLUS_LISTING_PUBLISHED',
      details: `Registered ${donationData.quantityKg} kg (${donationData.servings} meals) of ${donationData.title}. Safe window active.`,
      relatedDonationId: newId,
    });
    soundFx.playNotification();
    return newId;
  };

  const claimDonation = (donationId: string, receiverId: string, receiverName: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'CLAIMED',
            claimedByReceiverId: receiverId,
            claimedByReceiverName: receiverName,
            claimedTimestamp: new Date().toISOString(),
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'receiver',
      actorName: receiverName,
      action: 'DONATION_CLAIMED',
      details: `Claimed donation ${donationId}. Immediate volunteer dispatch notification broadcasted.`,
      relatedDonationId: donationId,
    });
    soundFx.playNotification();
  };

  const acceptVolunteerTask = (donationId: string, volunteerId: string) => {
    const volunteer = volunteers.find(v => v.id === volunteerId) || volunteers[0];
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'VOLUNTEER_ASSIGNED',
            assignedVolunteerId: volunteer.id,
            assignedVolunteerName: volunteer.name,
            assignedVolunteerPhone: volunteer.phone,
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'volunteer',
      actorName: volunteer.name,
      action: 'VOLUNTEER_TASK_ACCEPTED',
      details: `Accepted pickup dispatch for ${donationId}. Navigating via ${volunteer.vehicleType} for quality inspection.`,
      relatedDonationId: donationId,
    });
    soundFx.playNotification();
  };

  const submitQualityCheck = (donationId: string, check: QualityVerification) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          const newStatus = check.passedAll ? 'QUALITY_VERIFIED' : 'REJECTED_QUALITY';
          return {
            ...d,
            status: newStatus,
            qualityCheck: check,
          };
        }
        return d;
      })
    );
    if (check.passedAll) {
      soundFx.playQualityPass();
      addAuditLog({
        actorRole: 'volunteer',
        actorName: check.inspectedByVolunteerName,
        action: 'QUALITY_VERIFIED_PASSED',
        details: `Food safety checklist passed: Temp ${check.measuredTempCelsius}°C, fresh sensory aroma, hygienic containers. Ready for transit.`,
        relatedDonationId: donationId,
      });
    } else {
      addAuditLog({
        actorRole: 'volunteer',
        actorName: check.inspectedByVolunteerName,
        action: 'QUALITY_VERIFIED_FAILED',
        details: `Food safety check failed! Details: ${check.notes}. Batch rejected to protect public health.`,
        relatedDonationId: donationId,
      });
    }
  };

  const markInTransit = (donationId: string) => {
    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          return {
            ...d,
            status: 'IN_TRANSIT',
          };
        }
        return d;
      })
    );
    addAuditLog({
      actorRole: 'volunteer',
      actorName: 'Assigned Volunteer',
      action: 'TRANSIT_DISPATCHED',
      details: `Surplus food collected from provider. Active GPS transit towards recipient shelter.`,
      relatedDonationId: donationId,
    });
  };

  const completeDelivery = (donationId: string, feedback?: string, signature?: string) => {
    let resolvedItem: FoodDonation | undefined;

    setDonations(prev =>
      prev.map(d => {
        if (d.id === donationId) {
          resolvedItem = d;
          return {
            ...d,
            status: 'DELIVERED',
            deliveredTimestamp: new Date().toISOString(),
            recipientFeedback: feedback || 'Delivered safely and served promptly to beneficiaries.',
            recipientSignature: signature || 'Verified Recipient Representative',
          };
        }
        return d;
      })
    );

    const target = resolvedItem || donations.find(d => d.id === donationId);

    // Update volunteer stats
    if (target?.assignedVolunteerId) {
      setVolunteers(prev =>
        prev.map(v => {
          if (v.id === target.assignedVolunteerId) {
            return {
              ...v,
              totalDeliveries: v.totalDeliveries + 1,
              totalKgSaved: v.totalKgSaved + (target.quantityKg || 0),
            };
          }
          return v;
        })
      );
    }

    addAuditLog({
      actorRole: 'receiver',
      actorName: target?.claimedByReceiverName || 'Receiver Organization',
      action: 'DELIVERY_CONFIRMED',
      details: `Delivery confirmed for ${target?.quantityKg || 50} kg (${target?.servings || 110} meals). Circular loop completed!`,
      relatedDonationId: donationId,
    });

    soundFx.playSuccess();
  };

  const createDemandRequest = (req: Omit<FoodDemandRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: FoodDemandRequest = {
      ...req,
      id: `DEM-2026-${String(demandRequests.length + 1).padStart(3, '0')}`,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };
    setDemandRequests(prev => [newReq, ...prev]);
    addAuditLog({
      actorRole: 'receiver',
      actorName: req.receiverName,
      action: 'DEMAND_REQUEST_POSTED',
      details: `Posted requirement for ${req.requiredMeals} meals. Urgency: ${req.urgency}.`,
    });
    soundFx.playNotification();
  };

  const resetAllData = () => {
    setDonations(INITIAL_DONATIONS);
    setDemandRequests(INITIAL_DEMAND_REQUESTS);
    setVolunteers(INITIAL_VOLUNTEERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.DEMANDS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT);
  };

  // Automated step-by-step lifecycle simulation
  const simulateFullLifecycle = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    try {
      setSimulationStep('Step 1/5: Food Provider registers 50kg fresh surplus meals...');
      setRole('provider');
      await new Promise(r => setTimeout(r, 1200));

      const newId = createDonation({
        title: 'Demo Batch: Fresh Paneer Butter Masala, Jeera Rice & Rotis',
        category: 'Cooked Meals',
        dietary: 'Vegetarian',
        condition: 'Hot & Fresh',
        quantityKg: 50,
        servings: 110,
        packaging: 'Thermal Insulated Aluminum Food Carriers',
        prepTimestamp: new Date().toISOString(),
        expiryTimestamp: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        storageTempCelsius: 63,
        specialInstructions: 'Prepared by Sandip University Guest House Banquet; untouched surplus.',
        providerId: 'prov-sandip-guest',
        providerName: 'Sandip University Guest House Banquet',
        providerType: 'Hostel Mess',
        location: {
          lat: 26.3690,
          lng: 86.0580,
          address: 'Sandip University, Sijoul, Madhubani',
          zone: 'University Educational Zone',
        },
        contactPhone: '+91 94314 00022 (Central Helpline)',
      });

      setSimulationStep('Step 2/5: Matching algorithm finds Receiver shelter claiming food...');
      setRole('receiver');
      await new Promise(r => setTimeout(r, 1400));
      claimDonation(newId, 'rec-asha', 'Registered Child Care Shelter (Ref: R-1)');

      setSimulationStep('Step 3/5: Community Volunteer Dispatcher V-8802 accepts dispatch...');
      setRole('volunteer');
      await new Promise(r => setTimeout(r, 1400));
      acceptVolunteerTask(newId, 'vol-1');

      setSimulationStep('Step 4/5: Volunteer conducts in-person Food Safety Quality Verification Protocol...');
      await new Promise(r => setTimeout(r, 1500));
      submitQualityCheck(newId, {
        inspectedAt: new Date().toISOString(),
        inspectedByVolunteerName: 'Volunteer Dispatcher V-8802',
        passedAll: true,
        visualCheck: true,
        smellCheck: true,
        temperatureCheck: true,
        packagingIntegrity: true,
        timeWindowValid: true,
        measuredTempCelsius: 62,
        notes: 'Freshly prepared, steam rising, temperature safely >60°C. Verified safe by volunteer protocol.',
      });

      setSimulationStep('Step 5/5: In-transit delivery & Handover confirmed at shelter! Circular impact recorded.');
      markInTransit(newId);
      await new Promise(r => setTimeout(r, 1500));
      completeDelivery(
        newId,
        'Successfully served 110 warm dinners to residents and staff at the shelter.',
        'Authorized Shelter Representative (Ref: CR-01)'
      );
      setRole('admin');
      setSimulationStep('Simulation Complete: Closed-loop circular redistribution achieved!');
      await new Promise(r => setTimeout(r, 2000));
    } finally {
      setIsSimulating(false);
      setSimulationStep('');
    }
  };

  const metrics = calculateCircularMetrics(donations);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        navigateToRole,
        donations,
        demandRequests,
        volunteers,
        auditLogs,
        metrics,
        soundEnabled,
        toggleSound,
        demoModalOpen,
        setDemoModalOpen,
        paperModalOpen,
        setPaperModalOpen,
        proofModalOpen,
        setProofModalOpen,
        selectedDonation,
        setSelectedDonation,
        createDonation,
        claimDonation,
        acceptVolunteerTask,
        submitQualityCheck,
        markInTransit,
        completeDelivery,
        createDemandRequest,
        resetAllData,
        simulateFullLifecycle,
        isSimulating,
        simulationStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
