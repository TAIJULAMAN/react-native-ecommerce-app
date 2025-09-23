import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function StartScreen({ imageUri, onGetStarted }) {
  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Image source={{ uri: imageUri }} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.overlayBottom} />

      <View style={styles.content}>
        <Text style={styles.title}>You want{''}Authentic, here you go!</Text>
        <Text style={styles.subtitle}>Find it here, buy it now!</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onGetStarted}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  overlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },
  cta: {
    alignSelf: 'stretch',
    backgroundColor: '#F24E61',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
