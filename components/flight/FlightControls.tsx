import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlightRoute } from '@/types';

interface FlightControlsProps {
  selectedRoute: FlightRoute | null;
  isFlying: boolean;
  onStartFlight: () => void;
  onPauseFlight: () => void;
  onStopFlight: () => void;
}

export function FlightControls({
  selectedRoute,
  isFlying,
  onStartFlight,
  onPauseFlight,
  onStopFlight,
}: FlightControlsProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.controlsRow}>
        {!isFlying ? (
          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.startButton,
              !selectedRoute && styles.disabledButton
            ]}
            onPress={onStartFlight}
            disabled={!selectedRoute}
          >
            <ThemedText style={styles.controlButtonText}>
              🚀 Start Flight
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.controlButton, styles.pauseButton]}
              onPress={onPauseFlight}
            >
              <ThemedText style={styles.controlButtonText}>
                ⏸️ Pause
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.controlButton, styles.stopButton]}
              onPress={onStopFlight}
            >
              <ThemedText style={styles.controlButtonText}>
                ⏹️ Stop
              </ThemedText>
            </TouchableOpacity>
          </>
        )}
      </View>

      {selectedRoute && (
        <View style={styles.routeInfo}>
          <ThemedText style={styles.routeStatus}>
            {isFlying ? '🛩️ Flying to ' : '📍 Ready to fly to '}
            {selectedRoute.endLocation.name}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  controlButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  pauseButton: {
    backgroundColor: '#ffc107',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeInfo: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    alignItems: 'center',
  },
  routeStatus: {
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
  },
}); 