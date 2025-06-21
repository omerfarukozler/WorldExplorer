import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { FlightRoute } from '@/types';

interface RouteSelectorProps {
  routes: FlightRoute[];
  selectedRoute: FlightRoute | null;
  onRouteSelect: (route: FlightRoute) => void;
}

export function RouteSelector({ routes, selectedRoute, onRouteSelect }: RouteSelectorProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {routes.map((route) => (
        <TouchableOpacity
          key={route.id}
          style={[
            styles.routeCard,
            selectedRoute?.id === route.id && styles.selectedRouteCard
          ]}
          onPress={() => onRouteSelect(route)}
        >
          <View style={styles.routeHeader}>
            <ThemedText type="subtitle" style={styles.routeName}>
              {route.name}
            </ThemedText>
            <View style={[
              styles.difficultyBadge,
              route.difficulty === 'easy' && styles.difficultyEasy,
              route.difficulty === 'medium' && styles.difficultyMedium,
              route.difficulty === 'hard' && styles.difficultyHard,
            ]}>
              <ThemedText style={styles.difficultyText}>
                {route.difficulty}
              </ThemedText>
            </View>
          </View>

          <ThemedText style={styles.routeDescription}>
            {route.description}
          </ThemedText>

          <View style={styles.routeStats}>
            <View style={styles.stat}>
              <ThemedText style={styles.statValue}>
                {route.distance} km
              </ThemedText>
              <ThemedText style={styles.statLabel}>Distance</ThemedText>
            </View>
            <View style={styles.stat}>
              <ThemedText style={styles.statValue}>
                {route.estimatedDuration} min
              </ThemedText>
              <ThemedText style={styles.statLabel}>Duration</ThemedText>
            </View>
            <View style={styles.stat}>
              <ThemedText style={styles.statValue}>
                {route.waypoints.length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Stops</ThemedText>
            </View>
          </View>

          <View style={styles.routePath}>
            <ThemedText style={styles.pathLabel}>Route:</ThemedText>
            <ThemedText style={styles.pathText}>
              {route.startLocation.name} → {route.endLocation.name}
            </ThemedText>
          </View>

          {!route.unlocked && (
            <View style={styles.lockedOverlay}>
              <ThemedText style={styles.lockedText}>🔒 Locked</ThemedText>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 15,
  },
  routeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    minWidth: 280,
    maxWidth: 320,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRouteCard: {
    borderColor: '#007bff',
    backgroundColor: '#f8f9ff',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeName: {
    flex: 1,
    color: '#2c3e50',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyEasy: {
    backgroundColor: '#d4edda',
  },
  difficultyMedium: {
    backgroundColor: '#fff3cd',
  },
  difficultyHard: {
    backgroundColor: '#f8d7da',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  routeDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 15,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 2,
  },
  routePath: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
  },
  pathLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 5,
  },
  pathText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
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