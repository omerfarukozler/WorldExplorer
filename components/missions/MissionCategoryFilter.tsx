import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { MissionCategory } from '@/types';

interface MissionCategoryFilterProps {
  categories: MissionCategory[];
  selectedCategory: MissionCategory | 'all';
  onCategorySelect: (category: MissionCategory | 'all') => void;
}

export function MissionCategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: MissionCategoryFilterProps) {
  const getCategoryIcon = (category: MissionCategory) => {
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

  const getCategoryLabel = (category: MissionCategory) => {
    switch (category) {
      case 'landmarks': return 'Landmarks';
      case 'culture': return 'Culture';
      case 'language': return 'Language';
      case 'nature': return 'Nature';
      case 'history': return 'History';
      case 'science': return 'Science';
      default: return 'All';
    }
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedCategory === 'all' && styles.selectedFilter
        ]}
        onPress={() => onCategorySelect('all')}
      >
        <ThemedText style={styles.filterIcon}>🎯</ThemedText>
        <ThemedText style={[
          styles.filterText,
          selectedCategory === 'all' && styles.selectedFilterText
        ]}>
          All
        </ThemedText>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.filterButton,
            selectedCategory === category && styles.selectedFilter
          ]}
          onPress={() => onCategorySelect(category)}
        >
          <ThemedText style={styles.filterIcon}>
            {getCategoryIcon(category)}
          </ThemedText>
          <ThemedText style={[
            styles.filterText,
            selectedCategory === category && styles.selectedFilterText
          ]}>
            {getCategoryLabel(category)}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFilter: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  filterIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6c757d',
  },
  selectedFilterText: {
    color: 'white',
  },
}); 