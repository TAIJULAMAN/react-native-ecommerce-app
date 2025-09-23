import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ isDarkMode, route, selectedProduct, cartCount, onNavigateHome, onNavigateCart }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {route !== 'home' && (
          <TouchableOpacity
            onPress={onNavigateHome}
            activeOpacity={0.8}
            style={[styles.backBtn, { borderColor: isDarkMode ? '#253041' : '#D4E1F1', backgroundColor: isDarkMode ? '#121A24' : '#FFFFFF' }]}
          >
            <Text style={{ fontSize: 16 }}>←</Text>
          </TouchableOpacity>
        )}
        <View>
          <Text style={[styles.greeting, { color: isDarkMode ? '#9FB3C8' : '#6B7A90' }]}>
            {route === 'home' ? 'Welcome back,' : route === 'shop' ? 'Browse' : route === 'details' ? 'Product' : route === 'cart' ? 'Your' : route === 'checkout' ? 'Review' : 'Complete'}
          </Text>
          <Text style={[styles.title, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}>
            {route === 'home' && 'Home'}
            {route === 'shop' && 'Shop'}
            {route === 'details' && (selectedProduct?.name || 'Details')}
            {route === 'cart' && 'Cart'}
            {route === 'checkout' && 'Checkout'}
            {route === 'payment' && 'Payment'}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onNavigateCart} activeOpacity={0.8} style={[styles.cartBtn, { backgroundColor: isDarkMode ? '#1A2330' : '#E6EEF6', borderColor: isDarkMode ? '#253041' : '#D4E1F1' }]}>
        <Text style={{ fontSize: 18 }}>🛒</Text>
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  title: {
    marginTop: 2,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
});
