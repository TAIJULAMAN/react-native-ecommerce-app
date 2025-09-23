import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ShopList({ isDarkMode, products, onAddToCart, onOpenDetails }) {
  return (
    <>
      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#111823' : '#FFFFFF', borderColor: isDarkMode ? '#1F2A3A' : '#E7EDF5' }]}> 
        <Text style={[styles.searchIcon, { color: isDarkMode ? '#7C8FA6' : '#8AA0B6' }]}>🔎</Text>
        <TextInput
          placeholder="Search anything..."
          placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'}
          style={[styles.searchInput, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#DDE8F4' : '#0B1A33' }]}>Popular Products</Text>
      <View>
        {products.map(p => (
          <View key={p.id} style={[styles.productCard, { backgroundColor: isDarkMode ? '#0F1520' : '#FFFFFF', borderColor: isDarkMode ? '#1E293B' : '#E8EEF6' }]}> 
            <Image source={{ uri: p.image }} style={styles.productImage} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.productName, { color: isDarkMode ? '#E6EEF6' : '#102A43' }]}>{p.name}</Text>
              <Text style={[styles.productPrice, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)}</Text>
              <View style={styles.productActions}>
                <TouchableOpacity activeOpacity={0.85} style={[styles.smallBtn, { backgroundColor: isDarkMode ? '#213149' : '#2563EB' }]} onPress={() => onAddToCart(p.id)}>
                  <Text style={styles.smallBtnText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.85} style={[styles.smallBtnGhost, { borderColor: isDarkMode ? '#2A3A52' : '#B9CBE0' }]} onPress={() => onOpenDetails(p.id)}>
                  <Text style={[styles.smallBtnGhostText, { color: isDarkMode ? '#CFE0F5' : '#1F5B82' }]}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, marginBottom: 18 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  sectionTitle: { marginTop: 6, marginBottom: 12, fontSize: 18, fontWeight: '700', letterSpacing: 0.2 },
  productCard: { flexDirection: 'row', gap: 12, borderWidth: 1, borderRadius: 16, padding: 12, marginBottom: 14 },
  productImage: { width: 84, height: 84, borderRadius: 12, marginRight: 12, backgroundColor: '#CCD6E5' },
  productName: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  productPrice: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  productActions: { flexDirection: 'row', gap: 8 },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  smallBtnText: { color: '#fff', fontWeight: '800' },
  smallBtnGhost: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  smallBtnGhostText: { fontWeight: '800' },
});
