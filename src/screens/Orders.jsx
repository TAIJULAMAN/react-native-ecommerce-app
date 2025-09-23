import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const SAMPLE = [
  { id: 'o1001', date: '2025-08-18', total: 129.99, status: 'Delivered' },
  { id: 'o1002', date: '2025-08-25', total: 59.49, status: 'Shipped' },
  { id: 'o1003', date: '2025-09-03', total: 249.0, status: 'Processing' },
];

export default function Orders({ isDarkMode, onBack }) {
  const cardStyle = {
    backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF',
    borderColor: isDarkMode ? '#1B2537' : '#E6EEF6',
  };

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>My Orders</Text>
      <FlatList
        data={SAMPLE}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, cardStyle]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.orderId, { color: isDarkMode ? '#CFE0F5' : '#102A43' }]}>#{item.id}</Text>
              <Text style={[styles.status, { color: isDarkMode ? '#9FB3C8' : '#6B7A90' }]}>{item.status}</Text>
            </View>
            <Text style={[styles.meta, { color: isDarkMode ? '#9FB3C8' : '#6B7A90' }]}>Date: {item.date}</Text>
            <Text style={[styles.total, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
      {onBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 8 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  card: { borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: '800' },
  status: { fontSize: 12, fontWeight: '700' },
  meta: { fontSize: 13, marginTop: 6 },
  total: { fontSize: 16, fontWeight: '900', marginTop: 6 },
  backBtn: { alignSelf: 'center', marginTop: 8, backgroundColor: '#2563EB', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  backText: { color: '#fff', fontWeight: '800' },
});
