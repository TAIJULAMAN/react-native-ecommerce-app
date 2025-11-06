import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar({ isDarkMode, route, cartCount, onNavigateHome, onNavigateShop, onNavigateCart, onNavigateProfile }) {
  return (
    <View style={[styles.navbar, { backgroundColor: isDarkMode ? '#0E1726F2' : '#FFFFFFF2', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      <TouchableOpacity activeOpacity={0.85} style={styles.navItem} onPress={onNavigateHome}>
        <Ionicons name={route === 'home' ? 'home' : 'home-outline'} size={20} color={route === 'home' ? '#2563EB' : (isDarkMode ? '#9FB3C8' : '#6B7A90')} />
        <Text style={[styles.navLabel, { color: route === 'home' ? '#2563EB' : (isDarkMode ? '#CFE0F5' : '#102A43') }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} style={styles.navItem} onPress={onNavigateShop}>
        <Ionicons name={route === 'shop' ? 'bag' : 'bag-outline'} size={20} color={route === 'shop' ? '#2563EB' : (isDarkMode ? '#9FB3C8' : '#6B7A90')} />
        <Text style={[styles.navLabel, { color: route === 'shop' ? '#2563EB' : (isDarkMode ? '#CFE0F5' : '#102A43') }]}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} style={styles.navItem} onPress={onNavigateCart}>
        <View style={{ position: 'relative', alignItems: 'center' }}>
          <Ionicons name={route === 'cart' ? 'cart' : 'cart-outline'} size={20} color={route === 'cart' ? '#2563EB' : (isDarkMode ? '#9FB3C8' : '#6B7A90')} />
          {cartCount > 0 && (
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navLabel, { color: route === 'cart' ? '#2563EB' : (isDarkMode ? '#CFE0F5' : '#102A43') }]}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} style={styles.navItem} onPress={onNavigateProfile}>
        <Ionicons name={route === 'profile' ? 'person' : 'person-outline'} size={20} color={route === 'profile' ? '#2563EB' : (isDarkMode ? '#9FB3C8' : '#6B7A90')} />
        <Text style={[styles.navLabel, { color: route === 'profile' ? '#2563EB' : (isDarkMode ? '#CFE0F5' : '#102A43') }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});
