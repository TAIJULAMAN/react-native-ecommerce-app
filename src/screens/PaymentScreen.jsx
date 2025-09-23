import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PaymentScreen({ isDarkMode, cartTotal, onPaymentSuccess }) {
  return (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Payment</Text>
      <View style={styles.group}>
        <TextInput placeholder="Name on card" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        <TextInput placeholder="Card number" keyboardType="number-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TextInput placeholder="MM/YY" keyboardType="numbers-and-punctuation" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.half, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TextInput placeholder="CVV" keyboardType="number-pad" secureTextEntry placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.half, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.9} style={[styles.cta, { alignSelf: 'stretch', marginTop: 12 }]} onPress={onPaymentSuccess}>
        <Text style={styles.ctaText}>Pay ${cartTotal.toFixed(2)}</Text>
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
  cta: { alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  ctaText: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.2 },
});
