import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MissionCard } from '@/components/missions/MissionCard';
import { MissionCategoryFilter } from '@/components/missions/MissionCategoryFilter';
import { Mission, MissionCategory } from '@/types';
import { useMissionStore } from '@/utils/storage/missionStore';

export default function MissionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory | 'all'>('all');
  const { missions, updateMissionProgress } = useMissionStore();

  const filteredMissions = selectedCategory === 'all' 
    ? missions 
    : missions.filter((mission: Mission) => mission.category === selectedCategory);

  const handleMissionPress = (mission: Mission) => {
    if (mission.unlocked) {
      // For now, just log the mission since modal routes aren't set up yet
      console.log('Mission pressed:', mission.id);
    }
  };

  const categories: MissionCategory[] = ['landmarks', 'culture', 'language', 'nature', 'history', 'science'];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Missions & Mini-Games 🎮
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Complete missions to earn rewards and learn about the world!
        </ThemedText>
      </View>

      {/* Category Filter */}
      <MissionCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Missions Grid */}
      <ScrollView 
        style={styles.missionsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.missionsGrid}>
          {filteredMissions.map((mission: Mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onPress={() => handleMissionPress(mission)}
            />
          ))}
        </View>

        {filteredMissions.length === 0 && (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>
              No missions available in this category yet.
            </ThemedText>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => setSelectedCategory('all')}
            >
              <ThemedText style={styles.exploreButtonText}>
                Explore All Missions
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>
            {missions.filter((m: Mission) => m.completed).length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Completed</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>
            {missions.filter((m: Mission) => m.unlocked && !m.completed).length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Available</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>
            {missions.filter((m: Mission) => !m.unlocked).length}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Locked</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  missionsContainer: {
    flex: 1,
    padding: 20,
  },
  missionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
  },
}); 