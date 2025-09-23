import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function DetailsScreen({ isDarkMode, product, onAddToCart }) {
  if (!product) return null;
  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <Text style={[styles.name, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>{product.name}</Text>
      <Text style={[styles.price, { color: isDarkMode ? '#9AB3C9' : '#184766' }]}>${product.price.toFixed(2)}</Text>
      <Text style={[styles.desc, { color: isDarkMode ? '#9AB3C9' : '#6B7A90' }]}>{product.description}</Text>
      <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={() => onAddToCart(product.id)}>
        <Text style={styles.ctaText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 14, marginHorizontal: 20 },
  image: { width: '100%', height: 220, borderRadius: 14, marginBottom: 12, backgroundColor: '#CCD6E5' },
  name: { fontSize: 22, fontWeight: '900', marginBottom: 6 },
  price: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  desc: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  cta: { alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  ctaText: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.2 },
});
