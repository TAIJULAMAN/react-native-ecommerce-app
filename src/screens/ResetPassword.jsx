import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ResetPassword({ isDarkMode, onSubmit, onBackToSignIn }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#0B0F14' : '#F6F8FB' }]}> 
        <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Reset Password</Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#9FB3C8' : '#6B7A90' }]}>Enter your new password</Text>
        <View style={styles.group}>
          <TextInput placeholder="New Password" secureTextEntry placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TextInput placeholder="Confirm Password" secureTextEntry placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
          <TouchableOpacity activeOpacity={0.9} style={styles.cta} onPress={onSubmit}>
            <Text style={styles.ctaText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onBackToSignIn} style={{ alignSelf: 'center' }}>
            <Text style={[styles.link, { color: isDarkMode ? '#9AC6FF' : '#2563EB' }]}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 6, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 12 },
  group: { gap: 10 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  link: { fontWeight: '800', marginTop: 8 },
  cta: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  ctaText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.3 },
});
