import { Mission } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MissionState {
  missions: Mission[];
  updateMissionProgress: (missionId: string, progress: number) => void;
  completeMission: (missionId: string) => void;
  unlockMission: (missionId: string) => void;
}

// Sample missions data
const sampleMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'Eiffel Tower Discovery',
    description: 'Learn about the iconic Eiffel Tower in Paris',
    type: 'geographic_discovery',
    category: 'landmarks',
    location: {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      continent: 'Europe',
      coordinates: { latitude: 48.8566, longitude: 2.3522 },
      type: 'landmark',
      imageUrl: 'eiffel-tower.jpg',
      description: 'The iconic symbol of Paris',
      timezone: 'Europe/Paris',
    },
    difficulty: 'easy',
    points: 100,
    unlocked: true,
    completed: false,
    progress: 0,
    requirements: [],
    rewards: [
      { type: 'experience', value: 'xp', amount: 100 },
      { type: 'badge', value: 'paris_explorer', amount: 1 },
    ],
  },
  {
    id: 'mission2',
    title: 'Japanese Greetings',
    description: 'Learn basic Japanese greetings',
    type: 'language_learning',
    category: 'language',
    location: {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      continent: 'Asia',
      coordinates: { latitude: 35.6762, longitude: 139.6503 },
      type: 'city',
      imageUrl: 'tokyo.jpg',
      description: 'The bustling capital of Japan',
      timezone: 'Asia/Tokyo',
    },
    difficulty: 'medium',
    points: 150,
    unlocked: true,
    completed: false,
    progress: 0,
    requirements: [],
    rewards: [
      { type: 'experience', value: 'xp', amount: 150 },
      { type: 'badge', value: 'language_learner', amount: 1 },
    ],
  },
];

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      missions: sampleMissions,
      updateMissionProgress: (missionId: string, progress: number) => {
        const missions = get().missions.map(mission =>
          mission.id === missionId ? { ...mission, progress } : mission
        );
        set({ missions });
      },
      completeMission: (missionId: string) => {
        const missions = get().missions.map(mission =>
          mission.id === missionId ? { ...mission, completed: true, progress: 100 } : mission
        );
        set({ missions });
      },
      unlockMission: (missionId: string) => {
        const missions = get().missions.map(mission =>
          mission.id === missionId ? { ...mission, unlocked: true } : mission
        );
        set({ missions });
      },
    }),
    {
      name: 'mission-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 