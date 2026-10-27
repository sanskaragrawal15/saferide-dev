'use client'

import { useSyncExternalStore } from 'react'

export type UserRole = 'passenger' | 'driver' | 'fleet_operator' | 'admin'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  emergencyContacts?: Array<{ name: string; phone: string; relation: string }>
}

export interface Trip {
  id: string
  pickup: string
  destination: string
  category: 'prime' | 'fleet' | 'ev'
  fare: number
  distanceKm: number
  durationMin: number
  status: 'requested' | 'accepted' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled'
  driverName?: string
  driverPhone?: string
  driverRating?: number
  vehicleModel?: string
  vehiclePlate?: string
  rooftopSignActive?: boolean
  guardianDeviceId?: string
  createdAt: string
  sosTriggered?: boolean
}

export interface Incident {
  id: string
  tripId: string
  vehiclePlate: string
  driverName: string
  type: 'sos_manual' | 'impact_imu' | 'route_deviation' | 'acoustic_spike'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive'
  timestamp: string
  description: string
  notes?: string
}

export interface Device {
  id: string
  imei: string
  vehiclePlate: string
  firmware: string
  batteryPct: number
  gpsStatus: 'locked' | 'searching' | 'lost'
  bleStatus: 'connected' | 'standby'
  lastSeen: string
  imuStatus: 'normal' | 'anomaly'
}

export interface AppState {
  currentUser: UserProfile
  activeTrip: Trip | null
  trips: Trip[]
  incidents: Incident[]
  devices: Device[]
  driverOnline: boolean
  
  // Actions
  login: (email: string, role: UserRole) => void
  logout: () => void
  setDriverOnline: (online: boolean) => void
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'status'>) => Trip
  updateTripStatus: (tripId: string, status: Trip['status']) => void
  triggerSos: (tripId: string) => void
  updateIncidentStatus: (incidentId: string, status: Incident['status']) => void
  addEmergencyContact: (contact: { name: string; phone: string; relation: string }) => void
}

const defaultUser: UserProfile = {
  id: 'usr-901',
  name: 'Aarav Sharma',
  email: 'aarav@saferide.app',
  phone: '+91 98100 55432',
  role: 'passenger',
  emergencyContacts: [
    { name: 'Pooja Sharma', phone: '+91 98100 11223', relation: 'Spouse' },
    { name: 'Vikram Sharma', phone: '+91 98110 33445', relation: 'Brother' },
  ],
}

const initialTrips: Trip[] = [
  {
    id: 'TRIP-7092',
    pickup: 'Aerocity Hospitality District, New Delhi',
    destination: 'Cyber City Tower 10, DLF Phase 2, Gurugram',
    category: 'fleet',
    fare: 340,
    distanceKm: 14.2,
    durationMin: 22,
    status: 'in_progress',
    driverName: 'Rajesh Singh',
    driverPhone: '+91 98765 43210',
    driverRating: 4.96,
    vehicleModel: 'Maruti Dzire Tour (Black)',
    vehiclePlate: 'DL 01 AB 4829',
    rooftopSignActive: true,
    guardianDeviceId: 'SPARROW-04-A9',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TRIP-6410',
    pickup: 'Connaught Place Block A, New Delhi',
    destination: 'Noida Sector 62 IT Park',
    category: 'prime',
    fare: 480,
    distanceKm: 21.5,
    durationMin: 38,
    status: 'completed',
    driverName: 'Amit Verma',
    driverPhone: '+91 98123 45678',
    driverRating: 4.88,
    vehicleModel: 'Honda City (Obsidian Black)',
    vehiclePlate: 'DL 03 CA 9081',
    rooftopSignActive: true,
    guardianDeviceId: 'SPARROW-04-C2',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

const initialIncidents: Incident[] = [
  {
    id: 'INC-882',
    tripId: 'TRIP-7092',
    vehiclePlate: 'DL 01 AB 4829',
    driverName: 'Rajesh Singh',
    type: 'route_deviation',
    severity: 'medium',
    status: 'open',
    timestamp: '10 mins ago',
    description: 'Vehicle diverted 450m from designated NH-48 corridor into service lane.',
  },
  {
    id: 'INC-881',
    tripId: 'TRIP-6410',
    vehiclePlate: 'DL 03 CA 9081',
    driverName: 'Amit Verma',
    type: 'acoustic_spike',
    severity: 'low',
    status: 'resolved',
    timestamp: 'Yesterday, 10:14 PM',
    description: 'Acoustic sensor registered 92dB brief spike near toll plaza. Verified normal horns.',
    notes: 'Reviewed by Operator Meera. Verified non-critical ambient traffic noise.',
  },
]

const initialDevices: Device[] = [
  {
    id: 'SPARROW-04-A9',
    imei: '862049041289110',
    vehiclePlate: 'DL 01 AB 4829',
    firmware: 'v0.4_ble_guardian',
    batteryPct: 98,
    gpsStatus: 'locked',
    bleStatus: 'connected',
    lastSeen: '1 sec ago',
    imuStatus: 'normal',
  },
  {
    id: 'SPARROW-04-C2',
    imei: '862049041289452',
    vehiclePlate: 'DL 03 CA 9081',
    firmware: 'v0.4_ble_guardian',
    batteryPct: 91,
    gpsStatus: 'locked',
    bleStatus: 'standby',
    lastSeen: '15 mins ago',
    imuStatus: 'normal',
  },
  {
    id: 'SPARROW-04-E7',
    imei: '862049041289781',
    vehiclePlate: 'HR 26 CV 3310',
    firmware: 'v0.4_ble_guardian',
    batteryPct: 84,
    gpsStatus: 'locked',
    bleStatus: 'connected',
    lastSeen: '2 secs ago',
    imuStatus: 'normal',
  },
]

let currentState: AppState

function initializeState(): AppState {
  return {
    currentUser: defaultUser,
    activeTrip: initialTrips[0],
    trips: initialTrips,
    incidents: initialIncidents,
    devices: initialDevices,
    driverOnline: true,

    login: (email, role) => {
      currentState = {
        ...currentState,
        currentUser: {
          ...currentState.currentUser,
          email,
          role,
          name: role === 'driver' ? 'Rajesh Singh (Driver)' : role === 'fleet_operator' ? 'Kavita Roy (Fleet Lead)' : 'Aarav Sharma',
        },
      }
      notify()
    },

    logout: () => {
      currentState = { ...currentState, currentUser: defaultUser }
      notify()
    },

    setDriverOnline: (online) => {
      currentState = { ...currentState, driverOnline: online }
      notify()
    },

    createTrip: (tripData) => {
      const newTrip: Trip = {
        ...tripData,
        id: `TRIP-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'accepted',
        driverName: 'Rajesh Singh',
        driverPhone: '+91 98765 43210',
        driverRating: 4.96,
        vehicleModel: 'Maruti Dzire Tour (Black)',
        vehiclePlate: 'DL 01 AB 4829',
        rooftopSignActive: true,
        guardianDeviceId: 'SPARROW-04-A9',
      }
      currentState = {
        ...currentState,
        activeTrip: newTrip,
        trips: [newTrip, ...currentState.trips],
      }
      notify()
      return newTrip
    },

    updateTripStatus: (tripId, status) => {
      currentState = {
        ...currentState,
        trips: currentState.trips.map((t) => (t.id === tripId ? { ...t, status } : t)),
        activeTrip: currentState.activeTrip?.id === tripId ? { ...currentState.activeTrip, status } : currentState.activeTrip,
      }
      notify()
    },

    triggerSos: (tripId) => {
      const trip = currentState.trips.find((t) => t.id === tripId)
      const newIncident: Incident = {
        id: `INC-${Math.floor(800 + Math.random() * 200)}`,
        tripId,
        vehiclePlate: trip?.vehiclePlate || 'DL 01 AB 4829',
        driverName: trip?.driverName || 'Rajesh Singh',
        type: 'sos_manual',
        severity: 'critical',
        status: 'open',
        timestamp: 'Just now',
        description: 'PASSENGER EMERGENCY SOS TRIGGERED via mobile app. Immediate dispatch required.',
      }
      currentState = {
        ...currentState,
        incidents: [newIncident, ...currentState.incidents],
        activeTrip: currentState.activeTrip ? { ...currentState.activeTrip, sosTriggered: true } : null,
      }
      notify()
    },

    updateIncidentStatus: (incidentId, status) => {
      currentState = {
        ...currentState,
        incidents: currentState.incidents.map((inc) => (inc.id === incidentId ? { ...inc, status } : inc)),
      }
      notify()
    },

    addEmergencyContact: (contact) => {
      currentState = {
        ...currentState,
        currentUser: {
          ...currentState.currentUser,
          emergencyContacts: [...(currentState.currentUser.emergencyContacts || []), contact],
        },
      }
      notify()
    },
  }
}

currentState = initializeState()

const listeners = new Set<() => void>()
function notify() {
  listeners.forEach((listener) => listener())
}

export function useAppStore(): AppState
export function useAppStore<T>(selector: (state: AppState) => T): T
export function useAppStore<T>(selector?: (state: AppState) => T): T | AppState {
  const getSnapshot = () => (selector ? selector(currentState) : currentState)
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot,
    getSnapshot
  )
}
