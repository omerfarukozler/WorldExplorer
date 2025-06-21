import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AcademyHeader } from '@/components/academy/AcademyHeader';
import { CertificateModal } from '@/components/academy/CertificateModal';
import { CharacterCreator } from '@/components/academy/CharacterCreator';
import { ExplorerOath } from '@/components/academy/ExplorerOath';
import { useAcademyProgress } from '@/hooks/academy/useAcademyProgress';
import { defaultUser, useUserStore } from '@/utils/storage/userStore';

export default function AcademyScreen() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'character' | 'oath' | 'certificate'>('intro');
  const [showCertificate, setShowCertificate] = useState(false);
  const { progress, updateProgress } = useAcademyProgress();
  const { user, updateUser } = useUserStore();

  useEffect(() => {
    if (progress.completed) {
      setCurrentStep('certificate');
    }
  }, [progress.completed]);

  const handleStepComplete = (step: string) => {
    updateProgress(step);
    
    switch (step) {
      case 'intro':
        setCurrentStep('character');
        break;
      case 'character':
        setCurrentStep('oath');
        break;
      case 'oath':
        setCurrentStep('certificate');
        setShowCertificate(true);
        break;
    }
  };

  const handleCertificateClose = () => {
    setShowCertificate(false);
    router.push('/');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <ThemedView style={styles.introContainer}>
            <LottieView
              source={require('@/assets/animations/explorer-academy.json')}
              autoPlay
              loop
              style={styles.introAnimation}
            />
            <ThemedText type="title" style={styles.introTitle}>
              Welcome to Explorer Academy! 🎓
            </ThemedText>
            <ThemedText style={styles.introDescription}>
              Ready to become a world explorer? Let's create your character and start your amazing journey!
            </ThemedText>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleStepComplete('intro')}
            >
              <ThemedText style={styles.startButtonText}>Start Adventure!</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );

      case 'character':
        return (
          <CharacterCreator
            onComplete={(avatar) => {
              updateUser({ ...user, avatar });
              handleStepComplete('character');
            }}
          />
        );

      case 'oath':
        return (
          <ExplorerOath
            onComplete={() => handleStepComplete('oath')}
          />
        );

      case 'certificate':
        return (
          <ThemedView style={styles.completionContainer}>
            <ThemedText type="title">Academy Complete! 🎉</ThemedText>
            <ThemedText style={styles.completionText}>
              You're now ready to explore the world! Tap to view your certificate.
            </ThemedText>
            <TouchableOpacity
              style={styles.certificateButton}
              onPress={() => setShowCertificate(true)}
            >
              <ThemedText style={styles.certificateButtonText}>View Certificate</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <AcademyHeader currentStep={currentStep} progress={progress} />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentStep()}
      </ScrollView>

      <CertificateModal
        visible={showCertificate}
        onClose={handleCertificateClose}
        user={user || defaultUser}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  introAnimation: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  introTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  introDescription: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completionText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  certificateButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  certificateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 