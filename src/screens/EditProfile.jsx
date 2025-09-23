import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function EditProfile({ isDarkMode, onSave }) {
  const inputStyle = {
    color: isDarkMode ? '#E6EEF6' : '#0B1A33',
    borderColor: isDarkMode ? '#243248' : '#D4E1F1',
    backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF',
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#0B0F14' : '#F6F8FB' }]}> 
        <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Edit Profile</Text>
        <View style={styles.group}>
          <TextInput placeholder="Full Name" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, inputStyle]} defaultValue="John Doe" />
          <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, inputStyle]} defaultValue="john.doe@example.com" />
          <TextInput placeholder="Phone" keyboardType="phone-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, inputStyle]} defaultValue="+1 555-123-4567" />
        </View>
        <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onSave}>
          <Text style={styles.ctaText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '900', marginBottom: 12 },
  group: { gap: 10, marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  cta: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  ctaText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.3 },
});
