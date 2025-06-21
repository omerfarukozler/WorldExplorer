import { FlightRoute, Waypoint } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FlightState {
  routes: FlightRoute[];
  currentRoute: FlightRoute | null;
  currentWaypoint: Waypoint | null;
  updateCurrentRoute: (route: FlightRoute) => void;
  updateCurrentWaypoint: (waypoint: Waypoint) => void;
  unlockRoute: (routeId: string) => void;
  completeRoute: (routeId: string) => void;
}

// Sample flight routes data
const sampleRoutes: FlightRoute[] = [
  {
    id: 'route1',
    name: 'European Adventure',
    description: 'Explore the beautiful cities of Europe',
    startLocation: {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      continent: 'Europe',
      coordinates: { latitude: 48.8566, longitude: 2.3522 },
      type: 'city',
      imageUrl: 'paris.jpg',
      description: 'The City of Light',
      population: 2161000,
      timezone: 'Europe/Paris',
    },
    endLocation: {
      id: 'rome',
      name: 'Rome',
      country: 'Italy',
      continent: 'Europe',
      coordinates: { latitude: 41.9028, longitude: 12.4964 },
      type: 'city',
      imageUrl: 'rome.jpg',
      description: 'The Eternal City',
      population: 2873000,
      timezone: 'Europe/Rome',
    },
    waypoints: [
      {
        id: 'waypoint1',
        location: {
          id: 'london',
          name: 'London',
          country: 'United Kingdom',
          continent: 'Europe',
          coordinates: { latitude: 51.5074, longitude: -0.1278 },
          type: 'city',
          imageUrl: 'london.jpg',
          description: 'The British capital',
          population: 8982000,
          timezone: 'Europe/London',
        },
        order: 1,
        missions: [],
        unlocked: true,
        completed: false,
      },
    ],
    distance: 1500,
    estimatedDuration: 120,
    difficulty: 'easy',
    unlocked: true,
    completed: false,
  },
  {
    id: 'route2',
    name: 'Asian Discovery',
    description: 'Journey through ancient Asian cultures',
    startLocation: {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      continent: 'Asia',
      coordinates: { latitude: 35.6762, longitude: 139.6503 },
      type: 'city',
      imageUrl: 'tokyo.jpg',
      description: 'The bustling capital of Japan',
      population: 13960000,
      timezone: 'Asia/Tokyo',
    },
    endLocation: {
      id: 'beijing',
      name: 'Beijing',
      country: 'China',
      continent: 'Asia',
      coordinates: { latitude: 39.9042, longitude: 116.4074 },
      type: 'city',
      imageUrl: 'beijing.jpg',
      description: 'The ancient capital of China',
      population: 21540000,
      timezone: 'Asia/Shanghai',
    },
    waypoints: [
      {
        id: 'waypoint2',
        location: {
          id: 'seoul',
          name: 'Seoul',
          country: 'South Korea',
          continent: 'Asia',
          coordinates: { latitude: 37.5665, longitude: 126.9780 },
          type: 'city',
          imageUrl: 'seoul.jpg',
          description: 'The dynamic capital of South Korea',
          population: 9733509,
          timezone: 'Asia/Seoul',
        },
        order: 1,
        missions: [],
        unlocked: true,
        completed: false,
      },
    ],
    distance: 2000,
    estimatedDuration: 180,
    difficulty: 'medium',
    unlocked: false,
    completed: false,
  },
  {
    id: 'route3',
    name: 'American Journey',
    description: 'Cross the vast American continent',
    startLocation: {
      id: 'newyork',
      name: 'New York',
      country: 'United States',
      continent: 'North America',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
      type: 'city',
      imageUrl: 'newyork.jpg',
      description: 'The Big Apple',
      population: 8336817,
      timezone: 'America/New_York',
    },
    endLocation: {
      id: 'losangeles',
      name: 'Los Angeles',
      country: 'United States',
      continent: 'North America',
      coordinates: { latitude: 34.0522, longitude: -118.2437 },
      type: 'city',
      imageUrl: 'losangeles.jpg',
      description: 'The City of Angels',
      population: 3979576,
      timezone: 'America/Los_Angeles',
    },
    waypoints: [
      {
        id: 'waypoint3',
        location: {
          id: 'chicago',
          name: 'Chicago',
          country: 'United States',
          continent: 'North America',
          coordinates: { latitude: 41.8781, longitude: -87.6298 },
          type: 'city',
          imageUrl: 'chicago.jpg',
          description: 'The Windy City',
          population: 2693976,
          timezone: 'America/Chicago',
        },
        order: 1,
        missions: [],
        unlocked: true,
        completed: false,
      },
    ],
    distance: 2800,
    estimatedDuration: 240,
    difficulty: 'hard',
    unlocked: false,
    completed: false,
  },
];

export const useFlightStore = create<FlightState>()(
  persist(
    (set, get) => ({
      routes: sampleRoutes,
      currentRoute: null,
      currentWaypoint: null,
      updateCurrentRoute: (route: FlightRoute) => {
        set({ currentRoute: route });
      },
      updateCurrentWaypoint: (waypoint: Waypoint) => {
        set({ currentWaypoint: waypoint });
      },
      unlockRoute: (routeId: string) => {
        const routes = get().routes.map(route => 
          route.id === routeId ? { ...route, unlocked: true } : route
        );
        set({ routes });
      },
      completeRoute: (routeId: string) => {
        const routes = get().routes.map(route => 
          route.id === routeId ? { ...route, completed: true } : route
        );
        set({ routes });
      },
    }),
    {
      name: 'flight-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 