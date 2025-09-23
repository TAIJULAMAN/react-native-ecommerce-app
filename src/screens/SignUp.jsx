import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function SignUp({ isDarkMode, onSubmit, onGoSignIn }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#0B0F14' : '#F6F8FB' }]}> 
        <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Create Account</Text>
        <View style={styles.group}>
          <TextInput placeholder="Full Name" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TextInput placeholder="Password" secureTextEntry placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onSubmit}>
            <Text style={styles.ctaText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}>
          <Text style={{ color: isDarkMode ? '#9FB3C8' : '#6B7A90' }}>Already have an account?</Text>
          <TouchableOpacity onPress={onGoSignIn}>
            <Text style={[styles.link, { marginLeft: 6, color: isDarkMode ? '#9AC6FF' : '#2563EB' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 12, textAlign: 'center' },
  group: { gap: 10 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  link: { fontWeight: '800' },
  cta: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  ctaText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.3 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 14 },
});
