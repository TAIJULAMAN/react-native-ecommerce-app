import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CheckoutScreen({ isDarkMode, cartTotal, onNavigatePayment }) {
  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Shipping Address</Text>
      <View style={styles.group}>
        <TextInput placeholder="Full Name" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        <TextInput placeholder="Phone" keyboardType="phone-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        <TextInput placeholder="Address Line" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TextInput placeholder="City" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.half, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TextInput placeholder="ZIP" keyboardType="number-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.half, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        </View>
      </View>
      <View style={[styles.footer, { marginTop: 12 }]}>
        <Text style={[styles.totalLabel, { color: isDarkMode ? '#CFE0F5' : '#102A43' }]}>Order Total</Text>
        <Text style={[styles.totalValue, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>${cartTotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.9} style={[styles.cta, { alignSelf: 'stretch', marginTop: 12 }]} onPress={onNavigatePayment}>
        <Text style={styles.ctaText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 14, marginHorizontal: 20 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 6 },
  group: { gap: 10, marginTop: 8 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  half: { flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E6EEF6' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 20, fontWeight: '900' },
  cta: { alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  ctaText: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.2 },
});
