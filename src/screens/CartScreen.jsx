import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartScreen({ isDarkMode, cart, products, cartTotal, onAddToCart, onDecrementFromCart, onNavigateCheckout }) {
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
      {cart.length === 0 ? (
        <Text style={[styles.empty, { color: isDarkMode ? '#9AB3C9' : '#6B7A90' }]}>Your cart is empty</Text>
      ) : (
        cart.map(it => {
          const p = products.find(pp => pp.id === it.productId);
          if (!p) return null;
          return (
            <View key={it.productId} style={styles.row}>
              <Image source={{ uri: p.image }} style={styles.rowImage} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowName, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}>{p.name}</Text>
                <Text style={[styles.rowMeta, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)} · Qty: {it.qty}</Text>
              </View>
              <View style={styles.rowActions}>
                <TouchableOpacity onPress={() => onDecrementFromCart(p.id)} style={[styles.qtyBtn, { borderColor: isDarkMode ? '#2A3A52' : '#B9CBE0' }]}>
                  <Text style={[styles.qtyBtnText, { color: isDarkMode ? '#CFE0F5' : '#1F5B82' }]}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onAddToCart(p.id)} style={[styles.qtyBtn, { borderColor: isDarkMode ? '#2A3A52' : '#B9CBE0' }]}>
                  <Text style={[styles.qtyBtnText, { color: isDarkMode ? '#CFE0F5' : '#1F5B82' }]}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
      {cart.length > 0 && (
        <>
          <View style={styles.footer}> 
            <Text style={[styles.totalLabel, { color: isDarkMode ? '#CFE0F5' : '#102A43' }]}>Total</Text>
            <Text style={[styles.totalValue, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>${cartTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.9} style={[styles.cta, { alignSelf: 'stretch', marginTop: 10 }]} onPress={onNavigateCheckout}>
            <Text style={styles.ctaText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 16, padding: 10, marginHorizontal: 20 },
  empty: { textAlign: 'center', paddingVertical: 20 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 12, borderWidth: 1, borderColor: 'transparent', marginBottom: 8, backgroundColor: 'transparent' },
  rowImage: { width: 56, height: 56, borderRadius: 10, marginRight: 12, backgroundColor: '#CCD6E5' },
  rowName: { fontSize: 16, fontWeight: '800' },
  rowMeta: { fontSize: 13, marginTop: 2 },
  rowActions: { flexDirection: 'row', gap: 8 },
  qtyBtn: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  qtyBtnText: { fontSize: 16, fontWeight: '900' },
  footer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E6EEF6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 20, fontWeight: '900' },
  cta: { alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  ctaText: { color: '#FFFFFF', fontWeight: '700', letterSpacing: 0.2 },
});
