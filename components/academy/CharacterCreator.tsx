import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Avatar, AvatarItem, ExplorerTool, TravelVehicle } from '@/types';

interface CharacterCreatorProps {
  onComplete: (avatar: Avatar) => void;
}

export function CharacterCreator({ onComplete }: CharacterCreatorProps) {
  const [selectedHair, setSelectedHair] = useState<AvatarItem | null>(null);
  const [selectedEyes, setSelectedEyes] = useState<AvatarItem | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<AvatarItem | null>(null);
  const [selectedTools, setSelectedTools] = useState<ExplorerTool[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<TravelVehicle | null>(null);

  const hairOptions: AvatarItem[] = [
    { id: 'hair1', name: 'Spiky', category: 'hair', imageUrl: 'hair1.png', unlocked: true },
    { id: 'hair2', name: 'Curly', category: 'hair', imageUrl: 'hair2.png', unlocked: true },
    { id: 'hair3', name: 'Straight', category: 'hair', imageUrl: 'hair3.png', unlocked: true },
  ];

  const eyesOptions: AvatarItem[] = [
    { id: 'eyes1', name: 'Blue', category: 'eyes', imageUrl: 'eyes1.png', unlocked: true },
    { id: 'eyes2', name: 'Green', category: 'eyes', imageUrl: 'eyes2.png', unlocked: true },
    { id: 'eyes3', name: 'Brown', category: 'eyes', imageUrl: 'eyes3.png', unlocked: true },
  ];

  const outfitOptions: AvatarItem[] = [
    { id: 'outfit1', name: 'Explorer', category: 'outfit', imageUrl: 'outfit1.png', unlocked: true },
    { id: 'outfit2', name: 'Adventurer', category: 'outfit', imageUrl: 'outfit2.png', unlocked: true },
    { id: 'outfit3', name: 'Scientist', category: 'outfit', imageUrl: 'outfit3.png', unlocked: true },
  ];

  const toolOptions: ExplorerTool[] = [
    { id: 'binoculars', name: 'Binoculars', type: 'binoculars', imageUrl: 'binoculars.png', unlocked: true, level: 1 },
    { id: 'compass', name: 'Magic Compass', type: 'compass', imageUrl: 'compass.png', unlocked: true, level: 1 },
    { id: 'notebook', name: 'Explorer Notebook', type: 'notebook', imageUrl: 'notebook.png', unlocked: true, level: 1 },
    { id: 'camera', name: 'Adventure Camera', type: 'camera', imageUrl: 'camera.png', unlocked: true, level: 1 },
  ];

  const vehicleOptions: TravelVehicle[] = [
    { id: 'magic_carpet', name: 'Magic Carpet', type: 'magic_carpet', imageUrl: 'magic_carpet.png', unlocked: true, speed: 100, fuel: 100 },
    { id: 'small_plane', name: 'Small Plane', type: 'small_plane', imageUrl: 'small_plane.png', unlocked: true, speed: 150, fuel: 100 },
    { id: 'rocket', name: 'Rocket', type: 'rocket', imageUrl: 'rocket.png', unlocked: true, speed: 200, fuel: 100 },
    { id: 'hot_air_balloon', name: 'Hot Air Balloon', type: 'hot_air_balloon', imageUrl: 'hot_air_balloon.png', unlocked: true, speed: 80, fuel: 100 },
  ];

  const handleComplete = () => {
    if (selectedHair && selectedEyes && selectedOutfit && selectedVehicle && selectedTools.length > 0) {
      const avatar: Avatar = {
        id: 'avatar1',
        name: 'Explorer',
        hair: selectedHair,
        eyes: selectedEyes,
        outfit: selectedOutfit,
        accessories: [],
        tools: selectedTools,
        vehicle: selectedVehicle,
      };
      onComplete(avatar);
    }
  };

  const canComplete = selectedHair && selectedEyes && selectedOutfit && selectedVehicle && selectedTools.length > 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedText type="title" style={styles.title}>
        Create Your Explorer! 🎨
      </ThemedText>

      {/* Hair Selection */}
      <View style={styles.section}>
        <ThemedText type="subtitle">Choose Your Hair</ThemedText>
        <View style={styles.optionsContainer}>
          {hairOptions.map((hair) => (
            <TouchableOpacity
              key={hair.id}
              style={[
                styles.optionButton,
                selectedHair?.id === hair.id && styles.selectedOption
              ]}
              onPress={() => setSelectedHair(hair)}
            >
              <ThemedText style={styles.optionText}>{hair.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Eyes Selection */}
      <View style={styles.section}>
        <ThemedText type="subtitle">Choose Your Eyes</ThemedText>
        <View style={styles.optionsContainer}>
          {eyesOptions.map((eyes) => (
            <TouchableOpacity
              key={eyes.id}
              style={[
                styles.optionButton,
                selectedEyes?.id === eyes.id && styles.selectedOption
              ]}
              onPress={() => setSelectedEyes(eyes)}
            >
              <ThemedText style={styles.optionText}>{eyes.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Outfit Selection */}
      <View style={styles.section}>
        <ThemedText type="subtitle">Choose Your Outfit</ThemedText>
        <View style={styles.optionsContainer}>
          {outfitOptions.map((outfit) => (
            <TouchableOpacity
              key={outfit.id}
              style={[
                styles.optionButton,
                selectedOutfit?.id === outfit.id && styles.selectedOption
              ]}
              onPress={() => setSelectedOutfit(outfit)}
            >
              <ThemedText style={styles.optionText}>{outfit.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tools Selection */}
      <View style={styles.section}>
        <ThemedText type="subtitle">Choose Your Tools (Select 2)</ThemedText>
        <View style={styles.optionsContainer}>
          {toolOptions.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[
                styles.optionButton,
                selectedTools.find(t => t.id === tool.id) && styles.selectedOption
              ]}
              onPress={() => {
                const isSelected = selectedTools.find(t => t.id === tool.id);
                if (isSelected) {
                  setSelectedTools(selectedTools.filter(t => t.id !== tool.id));
                } else if (selectedTools.length < 2) {
                  setSelectedTools([...selectedTools, tool]);
                }
              }}
            >
              <ThemedText style={styles.optionText}>{tool.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vehicle Selection */}
      <View style={styles.section}>
        <ThemedText type="subtitle">Choose Your Vehicle</ThemedText>
        <View style={styles.optionsContainer}>
          {vehicleOptions.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.optionButton,
                selectedVehicle?.id === vehicle.id && styles.selectedOption
              ]}
              onPress={() => setSelectedVehicle(vehicle)}
            >
              <ThemedText style={styles.optionText}>{vehicle.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, !canComplete && styles.disabledButton]}
        onPress={handleComplete}
        disabled={!canComplete}
      >
        <ThemedText style={styles.completeButtonText}>
          Complete Character
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 