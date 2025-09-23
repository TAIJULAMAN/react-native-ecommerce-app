import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Profile({ isDarkMode, onSignOut, onEditProfile, onOrders, onAddresses }) {
  const textMuted = { color: isDarkMode ? '#9FB3C8' : '#6B7A90' };
  const textTitle = { color: isDarkMode ? '#F0F7FF' : '#0B1A33' };
  const cardStyle = {
    backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF',
    borderColor: isDarkMode ? '#1B2537' : '#E6EEF6',
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.card, cardStyle]}>
        <View style={styles.headerRow}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/120?img=12' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, textTitle]}>John Doe</Text>
            <Text style={[styles.email, textMuted]}>john.doe@example.com</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, cardStyle]}>
        <TouchableOpacity activeOpacity={0.85} style={styles.row} onPress={onEditProfile}>
          <Text style={[styles.rowText, textTitle]}>Edit Profile</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={styles.row} onPress={onOrders}>
          <Text style={[styles.rowText, textTitle]}>Orders</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={styles.row} onPress={onAddresses}>
          <Text style={[styles.rowText, textTitle]}>Addresses</Text>
          <Text style={styles.chev}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.signOut} onPress={onSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12, backgroundColor: '#CCD6E5' },
  name: { fontSize: 20, fontWeight: '900' },
  email: { fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  rowText: { fontSize: 16, fontWeight: '700' },
  chev: { fontSize: 18, color: '#8AA0B6' },
  signOut: { backgroundColor: '#EF4444', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  signOutText: { color: '#fff', fontWeight: '900', letterSpacing: 0.3 },
});
