import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SAMPLE = [
  { id: 'a1', label: 'Home', line1: '221B Baker Street', city: 'London', zip: 'NW1 6XE' },
  { id: 'a2', label: 'Office', line1: '1 Infinite Loop', city: 'Cupertino', zip: '95014' },
];

export default function Addresses({ isDarkMode }) {
  const cardStyle = {
    backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF',
    borderColor: isDarkMode ? '#1B2537' : '#E6EEF6',
  };
  const textTitle = { color: isDarkMode ? '#F0F7FF' : '#0B1A33' };
  const textMuted = { color: isDarkMode ? '#9FB3C8' : '#6B7A90' };

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, textTitle]}>Addresses</Text>
      {SAMPLE.map(a => (
        <View key={a.id} style={[styles.card, cardStyle]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={[styles.label, textTitle]}>{a.label}</Text>
            <Text style={[styles.edit, { color: isDarkMode ? '#9AC6FF' : '#2563EB' }]}>Edit</Text>
          </View>
          <Text style={[styles.line, textMuted]}>{a.line1}</Text>
          <Text style={[styles.line, textMuted]}>
            {a.city} {a.zip}
          </Text>
        </View>
      ))}

      {/* <TouchableOpacity style={styles.addBtn} onPress={onAddNew}>
        <Text style={styles.addText}>Add New Address</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 8 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  card: { borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 10 },
  label: { fontSize: 16, fontWeight: '800' },
  line: { fontSize: 13 },
  edit: { fontSize: 12, fontWeight: '800' },
  addBtn: { alignSelf: 'center', marginTop: 8, backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  addText: { color: '#fff', fontWeight: '800' },
});
