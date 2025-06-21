import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { User } from '@/types';

interface CertificateModalProps {
  visible: boolean;
  onClose: () => void;
  user: User;
}

export function CertificateModal({ visible, onClose, user }: CertificateModalProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ThemedView style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.certificateContainer}>
            {/* Certificate Header */}
            <View style={styles.certificateHeader}>
              <LottieView
                source={require('@/assets/animations/certificate-celebration.json')}
                autoPlay
                loop={false}
                style={styles.celebrationAnimation}
              />
              <ThemedText type="title" style={styles.certificateTitle}>
                🏆 Explorer Certificate 🏆
              </ThemedText>
            </View>

            {/* Certificate Content */}
            <View style={styles.certificateContent}>
              <ThemedText style={styles.certificateText}>
                This is to certify that
              </ThemedText>
              
              <ThemedText type="title" style={styles.explorerName}>
                {user.name || 'Young Explorer'}
              </ThemedText>
              
              <ThemedText style={styles.certificateText}>
                has successfully completed the Explorer Academy and is hereby granted the title of
              </ThemedText>
              
              <ThemedText type="title" style={styles.titleGranted}>
                World Explorer
              </ThemedText>
              
              <ThemedText style={styles.certificateText}>
                With the power to explore, discover, and learn about our amazing world.
              </ThemedText>
            </View>

            {/* Explorer Details */}
            <View style={styles.explorerDetails}>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Vehicle:</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {user.avatar?.vehicle?.name || 'Magic Carpet'}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Tools:</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {user.avatar?.tools?.map(tool => tool.name).join(', ') || 'Binoculars, Compass'}
                </ThemedText>
              </View>
              
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Date:</ThemedText>
                <ThemedText style={styles.detailValue}>{currentDate}</ThemedText>
              </View>
            </View>

            {/* Certificate Footer */}
            <View style={styles.certificateFooter}>
              <View style={styles.signatureLine} />
              <ThemedText style={styles.signatureText}>
                Explorer Academy Director
              </ThemedText>
              
              <View style={styles.stampContainer}>
                <View style={styles.stamp}>
                  <ThemedText style={styles.stampText}>OFFICIAL</ThemedText>
                </View>
              </View>
            </View>

            {/* Special Message */}
            <View style={styles.specialMessage}>
              <ThemedText style={styles.messageText}>
                "The world is your classroom, and every journey is a lesson waiting to be learned. 
                Go forth and discover the wonders that await you!"
              </ThemedText>
            </View>
          </View>
        </ScrollView>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <ThemedText style={styles.closeButtonText}>
            Start My Adventure! 🚀
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  certificateContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  celebrationAnimation: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  certificateTitle: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: 24,
  },
  certificateContent: {
    alignItems: 'center',
    marginBottom: 30,
  },
  certificateText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#2c3e50',
  },
  explorerName: {
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center',
  },
  titleGranted: {
    color: '#28a745',
    marginBottom: 15,
    textAlign: 'center',
  },
  explorerDetails: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  detailValue: {
    color: '#007bff',
    fontWeight: '500',
  },
  certificateFooter: {
    alignItems: 'center',
    marginBottom: 30,
  },
  signatureLine: {
    width: 150,
    height: 2,
    backgroundColor: '#2c3e50',
    marginBottom: 10,
  },
  signatureText: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  stampContainer: {
    marginTop: 20,
  },
  stamp: {
    backgroundColor: '#dc3545',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#c82333',
  },
  stampText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialMessage: {
    backgroundColor: '#e3f2fd',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  messageText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#1976d2',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#28a745',
    margin: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 