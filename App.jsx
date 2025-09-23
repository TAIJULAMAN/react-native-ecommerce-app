/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StartScreen from './src/screens/StartScreen';
import Header from './src/components/Header';
import Navbar from './src/components/Navbar';
import ShopList from './src/screens/ShopList';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import Otp from './src/screens/Otp';
import ResetPassword from './src/screens/ResetPassword';

// Define static products at the module level to keep hook order stable
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1518441902110-2376fc0b37e4?q=80&w=1200&auto=format&fit=crop',
    description:
      'Comfortable over-ear wireless headphones with deep bass and 30h battery life.',
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    price: 129.0,
    image:
      'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=1200&auto=format&fit=crop',
    description:
      'Track fitness, heart rate, and notifications with a sleek, water-resistant design.',
  },
  {
    id: 'p3',
    name: 'Mechanical Keyboard',
    price: 99.5,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    description:
      'Tactile keys, RGB backlight, and durable switches for a premium typing experience.',
  },
  {
    id: 'p4',
    name: '4K Action Camera',
    price: 149.99,
    image:
      'https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=1200&auto=format&fit=crop',
    description:
      'Capture stunning 4K video with stabilization and waterproof housing.',
  },
];

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const products = PRODUCTS;

  // simple navigation and cart state
  const [route, setRoute] = useState('start'); // 'start' | 'signin' | 'signup' | 'forgot' | 'otp' | 'reset' | 'home' | 'shop' | 'details' | 'cart' | 'checkout' | 'payment'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]); // [{ productId, qty }]

  const selectedProduct = useMemo(
    () => products.find(p => p.id === selectedProductId) || null,
    [selectedProductId, products],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, it) => sum + it.qty, 0),
    [cart],
  );
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, it) => {
      const p = products.find(pp => pp.id === it.productId);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  }, [cart, products]);

  const navigateHome = () => setRoute('home');
  const navigateCart = () => setRoute('cart');
  const navigateShop = () => setRoute('shop');
  // auth routes
  const navigateSignIn = () => setRoute('signin');
  const navigateSignUp = () => setRoute('signup');
  const navigateForgot = () => setRoute('forgot');
  const navigateOtp = () => setRoute('otp');
  const navigateReset = () => setRoute('reset');
  const openDetails = productId => {
    setSelectedProductId(productId);
    setRoute('details');
  };

  const addToCart = productId => {
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

  const decrementFromCart = productId => {
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
      <StatusBar
        barStyle={
          route === 'start'
            ? 'light-content'
            : isDarkMode
            ? 'light-content'
            : 'dark-content'
        }
        translucent={route === 'start'}
        backgroundColor={route === 'start' ? 'transparent' : undefined}
      />
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
        onNavigateShop={navigateShop}
        onNavigateCart={navigateCart}
        onNavigateCheckout={navigateCheckout}
        onNavigatePayment={navigatePayment}
        onPaymentSuccess={handlePaymentSuccess}
        onNavigateSignIn={navigateSignIn}
        onNavigateSignUp={navigateSignUp}
        onNavigateForgot={navigateForgot}
        onNavigateOtp={navigateOtp}
        onNavigateReset={navigateReset}
      />
    </SafeAreaProvider>
  );
}

function AppContent({
  isDarkMode,
  products,
  route,
  selectedProduct,
  cart,
  cartCount,
  cartTotal,
  onOpenDetails,
  onAddToCart,
  onDecrementFromCart,
  onNavigateHome,
  onNavigateShop,
  onNavigateCart,
  onNavigateCheckout,
  onNavigatePayment,
  onPaymentSuccess,
  onNavigateSignIn,
  onNavigateSignUp,
  onNavigateForgot,
  onNavigateOtp,
  onNavigateReset,
}) {
  const isAuthRoute = ['signin', 'signup', 'forgot', 'otp', 'reset'].includes(route);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0B0F14' : '#F6F8FB' },
      ]}
    >
      {/* Start Screen */}
      {route === 'start' ? (
        <StartScreen
          imageUri={'https://i.ibb.co/dwMssM6M/unsplash-fou-VDm-GXo-PI.png'}
          onGetStarted={onNavigateSignIn}
        />
      ) : (
        <>
          {/* Header (hidden on auth routes) */}
          {!isAuthRoute && (
            <Header
              isDarkMode={isDarkMode}
              route={route}
              selectedProduct={selectedProduct}
              cartCount={cartCount}
              onNavigateHome={onNavigateHome}
              onNavigateCart={onNavigateCart}
            />
          )}

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Auth screens */}
            {route === 'signin' && (
              <SignIn
                isDarkMode={isDarkMode}
                onSubmit={onNavigateHome}
                onGoSignUp={onNavigateSignUp}
                onGoForgot={onNavigateForgot}
              />
            )}
            {route === 'signup' && (
              <SignUp
                isDarkMode={isDarkMode}
                onSubmit={onNavigateSignIn}
                onGoSignIn={onNavigateSignIn}
              />
            )}
            {route === 'forgot' && (
              <ForgotPassword
                isDarkMode={isDarkMode}
                onSubmit={onNavigateOtp}
                onGoSignIn={onNavigateSignIn}
              />
            )}
            {route === 'otp' && (
              <Otp
                isDarkMode={isDarkMode}
                onSubmit={onNavigateReset}
                onResend={() => {}}
                onBackToSignIn={onNavigateSignIn}
              />
            )}
            {route === 'reset' && (
              <ResetPassword
                isDarkMode={isDarkMode}
                onSubmit={onNavigateSignIn}
                onBackToSignIn={onNavigateSignIn}
              />
            )}

            {/* Shop list */}
            {route === 'shop' && (
              <ShopList
                isDarkMode={isDarkMode}
                products={products}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenDetails}
              />
            )}

            {/* Home */}
            {route === 'home' && (
              <HomeScreen isDarkMode={isDarkMode} onNavigateShop={onNavigateShop} />
            )}

            {/* Details */}
            {route === 'details' && selectedProduct && (
              <DetailsScreen
                isDarkMode={isDarkMode}
                product={selectedProduct}
                onAddToCart={onAddToCart}
              />
            )}

            {/* Cart */}
            {route === 'cart' && (
              <CartScreen
                isDarkMode={isDarkMode}
                cart={cart}
                products={products}
                cartTotal={cartTotal}
                onAddToCart={onAddToCart}
                onDecrementFromCart={onDecrementFromCart}
                onNavigateCheckout={onNavigateCheckout}
              />
            )}

            {/* Checkout */}
            {route === 'checkout' && (
              <CheckoutScreen
                isDarkMode={isDarkMode}
                cartTotal={cartTotal}
                onNavigatePayment={onNavigatePayment}
              />
            )}

            {/* Payment */}
            {route === 'payment' && (
              <PaymentScreen
                isDarkMode={isDarkMode}
                cartTotal={cartTotal}
                onPaymentSuccess={onPaymentSuccess}
              />
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Bottom Navbar (hidden on Start) */}
          {route !== 'start' && !isAuthRoute && (
            <Navbar
              isDarkMode={isDarkMode}
              route={route}
              cartCount={cartCount}
              onNavigateHome={onNavigateHome}
              onNavigateShop={onNavigateShop}
              onNavigateCart={onNavigateCart}
            />
          )}
        </>
      )}
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
    height: 88,
  },
  navbar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default App;
