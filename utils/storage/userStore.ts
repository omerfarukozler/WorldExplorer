import { Avatar, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  updateUser: (user: Partial<User>) => void;
  updateAvatar: (avatar: Avatar) => void;
  resetUser: () => void;
}

export const defaultUser: User = {
  id: '1',
  name: 'Young Explorer',
  avatar: {
    id: 'avatar1',
    name: 'Explorer',
    hair: {
      id: 'hair1',
      name: 'Spiky',
      category: 'hair',
      imageUrl: 'hair1.png',
      unlocked: true,
    },
    eyes: {
      id: 'eyes1',
      name: 'Blue',
      category: 'eyes',
      imageUrl: 'eyes1.png',
      unlocked: true,
    },
    outfit: {
      id: 'outfit1',
      name: 'Explorer',
      category: 'outfit',
      imageUrl: 'outfit1.png',
      unlocked: true,
    },
    accessories: [],
    tools: [
      {
        id: 'binoculars',
        name: 'Binoculars',
        type: 'binoculars',
        imageUrl: 'binoculars.png',
        unlocked: true,
        level: 1,
      },
      {
        id: 'compass',
        name: 'Magic Compass',
        type: 'compass',
        imageUrl: 'compass.png',
        unlocked: true,
        level: 1,
      },
    ],
    vehicle: {
      id: 'magic_carpet',
      name: 'Magic Carpet',
      type: 'magic_carpet',
      imageUrl: 'magic_carpet.png',
      unlocked: true,
      speed: 100,
      fuel: 100,
    },
  },
  level: 1,
  experience: 0,
  passport: {
    id: 'passport1',
    stamps: [],
    totalCountries: 0,
    totalLandmarks: 0,
    totalLanguages: 0,
  },
  achievements: [],
  settings: {
    audio: {
      masterVolume: 0.8,
      musicVolume: 0.7,
      sfxVolume: 0.9,
      voiceVolume: 0.8,
      enabled: true,
    },
    visual: {
      quality: 'medium',
      brightness: 0.5,
      contrast: 0.5,
      colorBlindMode: false,
      reducedMotion: false,
    },
    accessibility: {
      fontSize: 'medium',
      highContrast: false,
      screenReader: false,
      subtitles: true,
      simplifiedUI: false,
    },
    parental: {
      timeLimit: 60,
      contentFilter: 'moderate',
      progressReports: true,
      purchaseRestrictions: true,
      eyeCareReminders: true,
      postureReminders: true,
    },
    ar: {
      quality: 'medium',
      tracking: true,
      occlusion: true,
      lighting: true,
      safetyMode: true,
    },
  },
  createdAt: new Date(),
  lastActive: new Date(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null as User | null,
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        const updatedUser = currentUser 
          ? { ...currentUser, ...userData, lastActive: new Date() }
          : { ...defaultUser, ...userData, lastActive: new Date() };
        
        set({ user: updatedUser });
      },
      updateAvatar: (avatar: Avatar) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              avatar,
              lastActive: new Date(),
            },
          });
        }
      },
      resetUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 