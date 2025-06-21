import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserStore } from '@/utils/storage/userStore';

export default function ProfileScreen() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading profile...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Explorer Profile 🛂
        </ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar and Basic Info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="title" style={styles.userName}>
            {user.name}
          </ThemedText>
          <ThemedText style={styles.userLevel}>
            Level {user.level} Explorer
          </ThemedText>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <ThemedText style={styles.progressLabel}>Experience</ThemedText>
            <ThemedText style={styles.progressValue}>
              {user.experience} / {user.level * 1000} XP
            </ThemedText>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(user.experience / (user.level * 1000)) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Passport Stats */}
        <View style={styles.statsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Passport Stats 📊
          </ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {user.passport.totalCountries}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Countries</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {user.passport.totalLandmarks}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Landmarks</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statValue}>
                {user.passport.totalLanguages}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Languages</ThemedText>
            </View>
          </View>
        </View>

        {/* Recent Stamps */}
        <View style={styles.stampsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recent Stamps 🏷️
          </ThemedText>
          {user.passport.stamps.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {user.passport.stamps.slice(0, 5).map((stamp, index) => (
                <View key={stamp.id} style={styles.stampCard}>
                  <View style={styles.stampIcon}>
                    <ThemedText style={styles.stampEmoji}>🏛️</ThemedText>
                  </View>
                  <ThemedText style={styles.stampLocation}>
                    {stamp.location.name}
                  </ThemedText>
                  <ThemedText style={styles.stampDate}>
                    {stamp.date.toLocaleDateString()}
                  </ThemedText>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyStamps}>
              <ThemedText style={styles.emptyText}>
                No stamps yet. Start exploring to collect them!
              </ThemedText>
            </View>
          )}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Achievements 🏆
          </ThemedText>
          <View style={styles.achievementsGrid}>
            {user.achievements.slice(0, 6).map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <ThemedText style={styles.achievementEmoji}>
                    {achievement.icon}
                  </ThemedText>
                </View>
                <ThemedText style={styles.achievementTitle}>
                  {achievement.title}
                </ThemedText>
              </View>
            ))}
          </View>
          {user.achievements.length === 0 && (
            <View style={styles.emptyAchievements}>
              <ThemedText style={styles.emptyText}>
                Complete missions to earn achievements!
              </ThemedText>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <ThemedText style={styles.actionButtonText}>
              🎓 Return to Academy
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <ThemedText style={styles.actionButtonText}>
              ✈️ Start New Flight
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    color: '#2c3e50',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    marginBottom: 5,
    color: '#2c3e50',
  },
  userLevel: {
    fontSize: 16,
    color: '#6c757d',
  },
  progressSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 15,
    color: '#2c3e50',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
  },
  stampsSection: {
    marginBottom: 20,
  },
  stampCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  stampIcon: {
    marginBottom: 8,
  },
  stampEmoji: {
    fontSize: 24,
  },
  stampLocation: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  stampDate: {
    fontSize: 10,
    color: '#6c757d',
    marginTop: 2,
  },
  emptyStamps: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  achievementsSection: {
    marginBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  achievementCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  achievementIcon: {
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  emptyAchievements: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  actionsSection: {
    gap: 15,
    marginBottom: 30,
  },
  actionButton: {
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