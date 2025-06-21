import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlightControls } from '@/components/flight/FlightControls';
import { FlightMap } from '@/components/flight/FlightMap';
import { RouteSelector } from '@/components/flight/RouteSelector';
import { FlightRoute, Location } from '@/types';
import { useFlightStore } from '@/utils/storage/flightStore';
import { useUserStore } from '@/utils/storage/userStore';

const { width, height } = Dimensions.get('window');

export default function FlightScreen() {
  const [selectedRoute, setSelectedRoute] = useState<FlightRoute | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const { routes, currentRoute, updateCurrentRoute } = useFlightStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (currentRoute) {
      setSelectedRoute(currentRoute);
      setCurrentLocation(currentRoute.startLocation);
    }
  }, [currentRoute]);

  const handleRouteSelect = (route: FlightRoute) => {
    setSelectedRoute(route);
    updateCurrentRoute(route);
  };

  const handleStartFlight = () => {
    if (selectedRoute) {
      setIsFlying(true);
      // For now, just simulate flight completion
      setTimeout(() => {
        console.log('Flight completed to:', selectedRoute.endLocation.name);
        setIsFlying(false);
      }, 5000);
    }
  };

  const handleWaypointReach = (waypoint: any) => {
    // Handle reaching a waypoint
    setCurrentLocation(waypoint.location);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Flight Control Center ✈️
        </ThemedText>
        {user?.avatar?.vehicle && (
          <View style={styles.vehicleInfo}>
            <ThemedText style={styles.vehicleText}>
              Vehicle: {user.avatar.vehicle.name}
            </ThemedText>
            <View style={styles.fuelBar}>
              <View 
                style={[
                  styles.fuelLevel, 
                  { width: `${user.avatar.vehicle.fuel}%` }
                ]} 
              />
            </View>
          </View>
        )}
      </View>

      {/* Flight Map */}
      <View style={styles.mapContainer}>
        <FlightMap
          selectedRoute={selectedRoute}
          currentLocation={currentLocation}
          isFlying={isFlying}
          onWaypointReach={handleWaypointReach}
        />
      </View>

      {/* Route Information */}
      {selectedRoute && (
        <View style={styles.routeInfo}>
          <ThemedText type="subtitle" style={styles.routeTitle}>
            {selectedRoute.name}
          </ThemedText>
          <ThemedText style={styles.routeDescription}>
            {selectedRoute.description}
          </ThemedText>
          <View style={styles.routeStats}>
            <View style={styles.stat}>
              <ThemedText style={styles.statLabel}>Distance</ThemedText>
              <ThemedText style={styles.statValue}>
                {selectedRoute.distance} km
              </ThemedText>
            </View>
            <View style={styles.stat}>
              <ThemedText style={styles.statLabel}>Duration</ThemedText>
              <ThemedText style={styles.statValue}>
                {selectedRoute.estimatedDuration} min
              </ThemedText>
            </View>
            <View style={styles.stat}>
              <ThemedText style={styles.statLabel}>Difficulty</ThemedText>
              <ThemedText style={styles.statValue}>
                {selectedRoute.difficulty}
              </ThemedText>
            </View>
          </View>
        </View>
      )}

      {/* Route Selector */}
      <ScrollView 
        horizontal 
        style={styles.routeSelector}
        showsHorizontalScrollIndicator={false}
      >
        <RouteSelector
          routes={routes}
          selectedRoute={selectedRoute}
          onRouteSelect={handleRouteSelect}
        />
      </ScrollView>

      {/* Flight Controls */}
      <FlightControls
        selectedRoute={selectedRoute}
        isFlying={isFlying}
        onStartFlight={handleStartFlight}
        onPauseFlight={() => setIsFlying(false)}
        onStopFlight={() => {
          setIsFlying(false);
          setCurrentLocation(selectedRoute?.startLocation || null);
        }}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.actionButtonText}>Missions</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.actionButtonText}>Passport</ThemedText>
        </TouchableOpacity>
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
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  vehicleText: {
    fontSize: 14,
    color: '#6c757d',
  },
  fuelBar: {
    width: 100,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fuelLevel: {
    height: '100%',
    backgroundColor: '#28a745',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routeInfo: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  routeTitle: {
    marginBottom: 10,
    color: '#2c3e50',
  },
  routeDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
    lineHeight: 20,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  routeSelector: {
    maxHeight: 120,
    paddingHorizontal: 20,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 