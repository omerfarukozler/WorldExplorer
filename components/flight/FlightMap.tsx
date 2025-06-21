import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlightRoute, Location } from '@/types';

const { width, height } = Dimensions.get('window');

interface FlightMapProps {
  selectedRoute: FlightRoute | null;
  currentLocation: Location | null;
  isFlying: boolean;
  onWaypointReach: (waypoint: any) => void;
}

export function FlightMap({ 
  selectedRoute, 
  currentLocation, 
  isFlying, 
  onWaypointReach 
}: FlightMapProps) {
  const planeAnimation = useRef(new Animated.Value(0)).current;
  const mapScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFlying && selectedRoute) {
      // Start plane animation along the route
      Animated.timing(planeAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start(() => {
        // Flight completed
        onWaypointReach(selectedRoute.waypoints[0]);
      });
    } else {
      planeAnimation.setValue(0);
    }
  }, [isFlying, selectedRoute]);

  useEffect(() => {
    if (selectedRoute) {
      // Zoom in on selected route
      Animated.spring(mapScale, {
        toValue: 1.2,
        useNativeDriver: true,
      }).start();
    } else {
      mapScale.setValue(1);
    }
  }, [selectedRoute]);

  const renderWorldMap = () => {
    return (
      <View style={styles.worldMap}>
        <LottieView
          source={require('@/assets/animations/world-map.json')}
          autoPlay
          loop
          style={styles.mapAnimation}
        />
        
        {/* Route Path */}
        {selectedRoute && (
          <View style={styles.routePath}>
            <View style={styles.pathLine} />
            {selectedRoute.waypoints.map((waypoint, index) => (
              <View
                key={waypoint.id}
                style={[
                  styles.waypoint,
                  { left: `${20 + (index * 15)}%`, top: `${30 + (index * 10)}%` }
                ]}
              >
                <View style={styles.waypointDot} />
                <ThemedText style={styles.waypointLabel}>
                  {waypoint.location.name}
                </ThemedText>
              </View>
            ))}
          </View>
        )}

        {/* Flying Plane */}
        {isFlying && (
          <Animated.View
            style={[
              styles.plane,
              {
                transform: [
                  {
                    translateX: planeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, width - 100],
                    }),
                  },
                  {
                    translateY: planeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, height / 2 - 50],
                    }),
                  },
                  { scale: mapScale },
                ],
              },
            ]}
          >
            <LottieView
              source={require('@/assets/animations/flying-plane.json')}
              autoPlay
              loop
              style={styles.planeAnimation}
            />
          </Animated.View>
        )}

        {/* Current Location Indicator */}
        {currentLocation && (
          <View style={styles.currentLocation}>
            <View style={styles.locationDot} />
            <ThemedText style={styles.locationLabel}>
              {currentLocation.name}
            </ThemedText>
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {renderWorldMap()}
      
      {/* Map Controls Overlay */}
      <View style={styles.mapControls}>
        <View style={styles.zoomControls}>
          <View style={styles.zoomButton}>
            <ThemedText style={styles.zoomButtonText}>+</ThemedText>
          </View>
          <View style={styles.zoomButton}>
            <ThemedText style={styles.zoomButtonText}>-</ThemedText>
          </View>
        </View>
      </View>

      {/* Route Info Overlay */}
      {selectedRoute && (
        <View style={styles.routeOverlay}>
          <ThemedText style={styles.routeName}>
            {selectedRoute.name}
          </ThemedText>
          <ThemedText style={styles.routeProgress}>
            {isFlying ? 'Flying...' : 'Ready to fly'}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  worldMap: {
    flex: 1,
    position: 'relative',
  },
  mapAnimation: {
    width: '100%',
    height: '100%',
  },
  routePath: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pathLine: {
    position: 'absolute',
    top: '35%',
    left: '25%',
    width: '50%',
    height: 2,
    backgroundColor: '#007bff',
    borderRadius: 1,
  },
  waypoint: {
    position: 'absolute',
    alignItems: 'center',
  },
  waypointDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: 'white',
  },
  waypointLabel: {
    fontSize: 10,
    color: '#2c3e50',
    marginTop: 5,
    textAlign: 'center',
  },
  plane: {
    position: 'absolute',
    zIndex: 10,
  },
  planeAnimation: {
    width: 40,
    height: 40,
  },
  currentLocation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
  },
  locationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#dc3545',
    borderWidth: 3,
    borderColor: 'white',
  },
  locationLabel: {
    fontSize: 12,
    color: '#2c3e50',
    marginTop: 5,
    fontWeight: 'bold',
  },
  mapControls: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  zoomControls: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  zoomButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  zoomButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  routeOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  routeProgress: {
    fontSize: 12,
    color: '#6c757d',
  },
}); 