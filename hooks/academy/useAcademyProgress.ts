import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface AcademyProgress {
  intro: boolean;
  character: boolean;
  oath: boolean;
  completed: boolean;
}

const ACADEMY_PROGRESS_KEY = 'academy_progress';

export function useAcademyProgress() {
  const [progress, setProgress] = useState<AcademyProgress>({
    intro: false,
    character: false,
    oath: false,
    completed: false,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem(ACADEMY_PROGRESS_KEY);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Error loading academy progress:', error);
    }
  };

  const updateProgress = async (step: string) => {
    try {
      const newProgress = { ...progress };
      
      switch (step) {
        case 'intro':
          newProgress.intro = true;
          break;
        case 'character':
          newProgress.character = true;
          break;
        case 'oath':
          newProgress.oath = true;
          newProgress.completed = true;
          break;
      }

      setProgress(newProgress);
      await AsyncStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error updating academy progress:', error);
    }
  };

  const resetProgress = async () => {
    try {
      const resetProgress = {
        intro: false,
        character: false,
        oath: false,
        completed: false,
      };
      setProgress(resetProgress);
      await AsyncStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify(resetProgress));
    } catch (error) {
      console.error('Error resetting academy progress:', error);
    }
  };

  return {
    progress,
    updateProgress,
    resetProgress,
  };
} 