import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ExplorerOathProps {
  onComplete: () => void;
}

export function ExplorerOath({ onComplete }: ExplorerOathProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const oathSteps = [
    {
      text: "I promise to explore the world with curiosity and wonder! 🌍",
      animation: "curiosity"
    },
    {
      text: "I will learn about different cultures and respect all people! 🤝",
      animation: "respect"
    },
    {
      text: "I will protect our beautiful planet and its amazing creatures! 🌱",
      animation: "protection"
    },
    {
      text: "I will share my discoveries with friends and family! 📚",
      animation: "sharing"
    },
    {
      text: "I am ready to become a World Explorer! ✨",
      animation: "ready"
    }
  ];

  const handleNextStep = () => {
    if (currentStep < oathSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 500);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const currentOath = oathSteps[currentStep];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        The Explorer's Oath 🏛️
      </ThemedText>

      <View style={styles.oathContainer}>
        <LottieView
          source={require('@/assets/animations/oath-ceremony.json')}
          autoPlay
          loop
          style={styles.ceremonyAnimation}
        />

        <View style={styles.oathTextContainer}>
          <ThemedText style={styles.oathText}>
            {currentOath.text}
          </ThemedText>
        </View>

        <View style={styles.progressContainer}>
          {oathSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, isAnimating && styles.animatingButton]}
          onPress={handleNextStep}
          disabled={isAnimating}
        >
          <ThemedText style={styles.nextButtonText}>
            {currentStep < oathSteps.length - 1 ? 'I Promise!' : 'Complete Oath!'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.instruction}>
        {currentStep < oathSteps.length - 1 
          ? 'Tap "I Promise!" to continue the oath'
          : 'Tap "Complete Oath!" to finish'
        }
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#2c3e50',
  },
  oathContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ceremonyAnimation: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  oathTextContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  oathText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
    color: '#2c3e50',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e9ecef',
    marginHorizontal: 5,
  },
  progressDotActive: {
    backgroundColor: '#28a745',
  },
  nextButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  animatingButton: {
    backgroundColor: '#6c757d',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instruction: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
}); 