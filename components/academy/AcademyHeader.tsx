import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface AcademyProgress {
  intro: boolean;
  character: boolean;
  oath: boolean;
  completed: boolean;
}

interface AcademyHeaderProps {
  currentStep: 'intro' | 'character' | 'oath' | 'certificate';
  progress: AcademyProgress;
}

export function AcademyHeader({ currentStep, progress }: AcademyHeaderProps) {
  const steps = [
    { key: 'intro', label: 'Welcome', completed: progress.intro },
    { key: 'character', label: 'Character', completed: progress.character },
    { key: 'oath', label: 'Oath', completed: progress.oath },
    { key: 'certificate', label: 'Certificate', completed: progress.completed },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Explorer Academy
      </ThemedText>
      
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.key} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              step.completed && styles.stepCompleted,
              currentStep === step.key && styles.stepCurrent
            ]}>
              {step.completed ? (
                <ThemedText style={styles.stepCheck}>✓</ThemedText>
              ) : (
                <ThemedText style={styles.stepNumber}>{index + 1}</ThemedText>
              )}
            </View>
            <ThemedText style={styles.stepLabel}>{step.label}</ThemedText>
            
            {index < steps.length - 1 && (
              <View style={[
                styles.stepLine,
                step.completed && styles.stepLineCompleted
              ]} />
            )}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCompleted: {
    backgroundColor: '#28a745',
  },
  stepCurrent: {
    backgroundColor: '#007bff',
  },
  stepCheck: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepNumber: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6c757d',
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 40,
    height: 2,
    backgroundColor: '#e9ecef',
  },
  stepLineCompleted: {
    backgroundColor: '#28a745',
  },
}); 