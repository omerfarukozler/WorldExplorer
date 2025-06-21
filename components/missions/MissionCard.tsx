import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Mission } from '@/types';

interface MissionCardProps {
  mission: Mission;
  onPress: () => void;
}

export function MissionCard({ mission, onPress }: MissionCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landmarks': return '🏛️';
      case 'culture': return '🎭';
      case 'language': return '🗣️';
      case 'nature': return '🌿';
      case 'history': return '📚';
      case 'science': return '🔬';
      default: return '🎯';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#28a745';
      case 'medium': return '#ffc107';
      case 'hard': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        !mission.unlocked && styles.lockedCard
      ]}
      onPress={onPress}
      disabled={!mission.unlocked}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <ThemedText style={styles.categoryIcon}>
            {getCategoryIcon(mission.category)}
          </ThemedText>
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="subtitle" style={styles.title}>
            {mission.title}
          </ThemedText>
          <View style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(mission.difficulty) }
          ]}>
            <ThemedText style={styles.difficultyText}>
              {mission.difficulty}
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedText style={styles.description}>
        {mission.description}
      </ThemedText>

      <View style={styles.footer}>
        <View style={styles.location}>
          <ThemedText style={styles.locationText}>
            📍 {mission.location.name}
          </ThemedText>
        </View>
        <View style={styles.points}>
          <ThemedText style={styles.pointsText}>
            {mission.points} pts
          </ThemedText>
        </View>
      </View>

      {mission.unlocked && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${mission.progress}%` }
              ]} 
            />
          </View>
          <ThemedText style={styles.progressText}>
            {mission.progress}%
          </ThemedText>
        </View>
      )}

      {!mission.unlocked && (
        <View style={styles.lockedOverlay}>
          <ThemedText style={styles.lockedText}>🔒 Locked</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  lockedCard: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  location: {
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: '500',
  },
  points: {
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
  },
  progressText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 