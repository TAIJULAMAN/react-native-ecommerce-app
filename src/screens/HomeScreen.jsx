import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ isDarkMode, onNavigateShop }) {
  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Welcome</Text>
      <Text style={[styles.desc, { color: isDarkMode ? '#9AB3C9' : '#6B7A90' }]}>
        Discover curated tech essentials tailored for your workflow. Browse our latest products and deals.
      </Text>
      <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onNavigateShop}>
        <Text style={styles.ctaText}>Go to Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 14, marginHorizontal: 20 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 6 },
  desc: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  cta: { alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  ctaText: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.2 },
});
