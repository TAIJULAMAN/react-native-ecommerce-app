/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo, useState } from 'react';
// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Define static products at the module level to keep hook order stable
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1518441902110-2376fc0b37e4?q=80&w=1200&auto=format&fit=crop',
    description: 'Comfortable over-ear wireless headphones with deep bass and 30h battery life.',
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    price: 129.0,
    image: 'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1200&auto=format&fit=crop',
    description: 'Track fitness, heart rate, and notifications with a sleek, water-resistant design.',
  },
  {
    id: 'p3',
    name: 'Mechanical Keyboard',
    price: 99.5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    description: 'Tactile keys, RGB backlight, and durable switches for a premium typing experience.',
  },
  {
    id: 'p4',
    name: '4K Action Camera',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=1200&auto=format&fit=crop',
    description: 'Capture stunning 4K video with stabilization and waterproof housing.',
  },
];

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const products = PRODUCTS;

  // simple navigation and cart state
  const [route, setRoute] = useState('home'); // 'home' | 'details' | 'cart'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]); // [{ productId, qty }]

  const selectedProduct = useMemo(
    () => products.find(p => p.id === selectedProductId) || null,
    [selectedProductId, products]
  );

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, it) => {
      const p = products.find(pp => pp.id === it.productId);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  }, [cart, products]);

  const navigateHome = () => setRoute('home');
  const navigateCart = () => setRoute('cart');
  const openDetails = (productId) => {
    setSelectedProductId(productId);
    setRoute('details');
  };

  const addToCart = (productId) => {
    setCart(prev => {
      const idx = prev.findIndex(it => it.productId === productId);
      if (idx === -1) return [...prev, { productId, qty: 1 }];
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
      return copy;
    });
  };

  const navigateCheckout = () => setRoute('checkout');
  const navigatePayment = () => setRoute('payment');
  const handlePaymentSuccess = () => {
    setCart([]);
    setRoute('home');
  };

  const decrementFromCart = (productId) => {
    setCart(prev => {
      const idx = prev.findIndex(it => it.productId === productId);
      if (idx === -1) return prev;
      const item = prev[idx];
      if (item.qty <= 1) return prev.filter((_, i) => i !== idx);
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty - 1 };
      return copy;
    });
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent
        isDarkMode={isDarkMode}
        products={products}
        route={route}
        selectedProduct={selectedProduct}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenDetails={openDetails}
        onAddToCart={addToCart}
        onDecrementFromCart={decrementFromCart}
        onNavigateHome={navigateHome}
        onNavigateCart={navigateCart}
        onNavigateCheckout={navigateCheckout}
        onNavigatePayment={navigatePayment}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </SafeAreaProvider>
  );
}

function AppContent({ isDarkMode, products, route, selectedProduct, cart, cartCount, cartTotal, onOpenDetails, onAddToCart, onDecrementFromCart, onNavigateHome, onNavigateCart, onNavigateCheckout, onNavigatePayment, onPaymentSuccess }) {
  // const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#0B0F14' : '#F6F8FB' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            {route !== 'home' && (
              <TouchableOpacity onPress={onNavigateHome} activeOpacity={0.8} style={[styles.backBtn, { borderColor: isDarkMode ? '#253041' : '#D4E1F1', backgroundColor: isDarkMode ? '#121A24' : '#FFFFFF' }]}>
                <Text style={{ fontSize: 16 }}>←</Text>
              </TouchableOpacity>
            )}
            <View>
              <Text style={[styles.greeting, { color: isDarkMode ? '#9FB3C8' : '#6B7A90' }]}>
                {route === 'home' ? 'Welcome back,' : route === 'details' ? 'Product' : route === 'cart' ? 'Your' : route === 'checkout' ? 'Review' : 'Complete'}
              </Text>
              <Text style={[styles.name, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}>
                {route === 'home' && 'Aman'}
                {route === 'details' && (selectedProduct?.name || 'Details')}
                {route === 'cart' && 'Cart'}
                {route === 'checkout' && 'Checkout'}
                {route === 'payment' && 'Payment'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onNavigateCart} activeOpacity={0.8} style={[styles.cartBtn, { backgroundColor: isDarkMode ? '#1A2330' : '#E6EEF6', borderColor: isDarkMode ? '#253041' : '#D4E1F1' }]}>
            <Text style={{ fontSize: 18 }}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search (Home only) */}
        {route === 'home' && (
        <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#111823' : '#FFFFFF', borderColor: isDarkMode ? '#1F2A3A' : '#E7EDF5' }]}> 
          <Text style={[styles.searchIcon, { color: isDarkMode ? '#7C8FA6' : '#8AA0B6' }]}>🔎</Text>
          <TextInput
            placeholder="Search anything..."
            placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'}
            style={[styles.searchInput, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}
          />
        </View>
        )}

        {/* Product list (Home) */}
        {route === 'home' && (
          <>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#DDE8F4' : '#0B1A33' }]}>Popular Products</Text>
            <View>
              {products.map((p) => (
                <View key={p.id} style={[styles.productCard, { backgroundColor: isDarkMode ? '#0F1520' : '#FFFFFF', borderColor: isDarkMode ? '#1E293B' : '#E8EEF6' }]}>
                  <Image source={{ uri: p.image }} style={styles.productImage} resizeMode="cover" />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.productName, { color: isDarkMode ? '#E6EEF6' : '#102A43' }]}>{p.name}</Text>
                    <Text style={[styles.productPrice, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)}</Text>
                    <View style={styles.productActions}>
                      <TouchableOpacity activeOpacity={0.85} style={[styles.smallBtn, { backgroundColor: isDarkMode ? '#213149' : '#2563EB' }]} onPress={() => onAddToCart(p.id)}>
                        <Text style={styles.smallBtnText}>Add to Cart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.85} style={[styles.smallBtnGhost, { borderColor: isDarkMode ? '#2A3A52' : '#B9CBE0' }]} onPress={() => onOpenDetails(p.id)}>
                        <Text style={[styles.smallBtnGhostText, { color: isDarkMode ? '#CFE0F5' : '#1F5B82' }]}>Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Details view */}
        {route === 'details' && selectedProduct && (
          <View style={[styles.detailsCard, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
            <Image source={{ uri: selectedProduct.image }} style={styles.detailsImage} resizeMode="cover" />
            <Text style={[styles.detailsName, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>{selectedProduct.name}</Text>
            <Text style={[styles.detailsPrice, { color: isDarkMode ? '#9AB3C9' : '#184766' }]}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={[styles.detailsDesc, { color: isDarkMode ? '#9AB3C9' : '#6B7A90' }]}>{selectedProduct.description}</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.featureCta} onPress={() => onAddToCart(selectedProduct.id)}>
              <Text style={styles.featureCtaText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Cart view */}
        {route === 'cart' && (
          <View style={[styles.cartContainer, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
            {cart.length === 0 ? (
              <Text style={[styles.cartEmpty, { color: isDarkMode ? '#9AB3C9' : '#6B7A90' }]}>Your cart is empty</Text>
            ) : (
              cart.map((it) => {
                const p = products.find(pp => pp.id === it.productId);
                if (!p) return null;
                return (
                  <View key={it.productId} style={styles.cartRow}>
                    <Image source={{ uri: p.image }} style={styles.cartRowImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cartRowName, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}>{p.name}</Text>
                      <Text style={[styles.cartRowMeta, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)} · Qty: {it.qty}</Text>
                    </View>
                    <View style={styles.cartRowActions}>
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
                <View style={styles.cartFooter}>
                  <Text style={[styles.cartTotalLabel, { color: isDarkMode ? '#CFE0F5' : '#102A43' }]}>Total</Text>
                  <Text style={[styles.cartTotalValue, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>${cartTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={[styles.featureCta, { alignSelf: 'stretch', marginTop: 10 }]} onPress={onNavigateCheckout}>
                  <Text style={styles.featureCtaText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* Checkout view */}
        {route === 'checkout' && (
          <View style={[styles.detailsCard, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
            <Text style={[styles.detailsName, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Shipping Address</Text>
            <View style={styles.formGroup}>
              <TextInput placeholder="Full Name" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
              <TextInput placeholder="Phone" keyboardType="phone-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
              <TextInput placeholder="Address Line" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput placeholder="City" style={[styles.inputHalf, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} />
                <TextInput placeholder="ZIP" keyboardType="number-pad" style={[styles.inputHalf, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} />
              </View>
            </View>
            <View style={[styles.cartFooter, { marginTop: 12 }]}>
              <Text style={[styles.cartTotalLabel, { color: isDarkMode ? '#CFE0F5' : '#102A43' }]}>Order Total</Text>
              <Text style={[styles.cartTotalValue, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>${cartTotal.toFixed(2)}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={[styles.featureCta, { alignSelf: 'stretch', marginTop: 12 }]} onPress={onNavigatePayment}>
              <Text style={styles.featureCtaText}>Continue to Payment</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Payment view */}
        {route === 'payment' && (
          <View style={[styles.detailsCard, { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' }]}> 
            <Text style={[styles.detailsName, { color: isDarkMode ? '#F0F7FF' : '#0B1A33' }]}>Payment</Text>
            <View style={styles.formGroup}>
              <TextInput placeholder="Name on card" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
              <TextInput placeholder="Card number" keyboardType="number-pad" placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} style={[styles.input, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput placeholder="MM/YY" keyboardType="numbers-and-punctuation" style={[styles.inputHalf, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} />
                <TextInput placeholder="CVV" keyboardType="number-pad" secureTextEntry style={[styles.inputHalf, { color: isDarkMode ? '#E6EEF6' : '#0B1A33', borderColor: isDarkMode ? '#243248' : '#D4E1F1', backgroundColor: isDarkMode ? '#0F1623' : '#FFFFFF' }]} placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'} />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={[styles.featureCta, { alignSelf: 'stretch', marginTop: 12 }]} onPress={onPaymentSuccess}>
              <Text style={styles.featureCtaText}>Pay ${cartTotal.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  name: {
    marginTop: 2,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 18,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 6,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  productCard: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },
  productImage: {
    width: 84,
    height: 84,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#CCD6E5',
  },
  productName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  smallBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  smallBtnGhost: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  smallBtnGhostText: {
    fontWeight: '800',
  },
  detailsCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  formGroup: {
    gap: 10,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  detailsImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: '#CCD6E5',
  },
  detailsName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  detailsPrice: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailsDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  featureCta: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  featureCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cartContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
  },
  cartEmpty: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  cartRowImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#CCD6E5',
  },
  cartRowName: {
    fontSize: 16,
    fontWeight: '800',
  },
  cartRowMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  cartRowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  qtyBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '900',
  },
  cartFooter: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E6EEF6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  cartTotalValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  bottomSpacer: {
    height: 24,
  },
});

export default App;
