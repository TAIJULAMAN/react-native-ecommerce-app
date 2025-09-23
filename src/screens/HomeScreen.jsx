import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import Carousel from '../components/Carousel';

export default function HomeScreen({ isDarkMode, products = [], onOpenDetails, onAddToCart, onNavigateShop }) {
  const bgCard = { backgroundColor: isDarkMode ? '#0E1726' : '#FFFFFF', borderColor: isDarkMode ? '#1B2537' : '#E6EEF6' };
  const textTitle = { color: isDarkMode ? '#F0F7FF' : '#0B1A33' };
  const textMuted = { color: isDarkMode ? '#9FB3C8' : '#6B7A90' };

  const featured = products.slice(0, 2);
  const trending = products.slice(0, 4);
  const slides = [
    {
      title: '50-40% OFF',
      subtitle: 'Now in (product)\nAll colours',
      image: 'https://images.unsplash.com/photo-1548611716-0b68de6bd6ef?q=80&w=800&auto=format&fit=crop',
      bg: '#FDE6EC',
      fg: '#0B1A33',
    },
    {
      title: 'Hot Summer Sale',
      subtitle: 'Limited time offer',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=800&auto=format&fit=crop',
      bg: '#FFF3D6',
      fg: '#0B1A33',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh styles just in',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      bg: '#E6F4FF',
      fg: '#0B1A33',
    },
  ];

  return (
    <View style={{ gap: 14 }}>
      {/* Search bar */}
      <View
        style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#111823' : '#FFFFFF', borderColor: isDarkMode ? '#1F2A3A' : '#E7EDF5' }]}
      >
        <Text style={[styles.searchIcon, { color: isDarkMode ? '#7C8FA6' : '#8AA0B6' }]}>🔎</Text>
        <TextInput
          placeholder="Search any products..."
          placeholderTextColor={isDarkMode ? '#6D8098' : '#9BB0C6'}
          style={[styles.searchInput, { color: isDarkMode ? '#E6EEF6' : '#0B1A33' }]}
        />
        <Text style={{ fontSize: 16 }}>⚙️</Text>
      </View>

      {/* Stories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={{ alignItems: 'center' }}>
            <Image source={{ uri: `https://i.pravatar.cc/100?img=${i + 1}` }} style={styles.storyAvatar} />
            <Text style={[styles.storyLabel, textMuted]}>Shop {i + 1}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Slider */}
      <Carousel
        items={slides}
        height={190}
        containerStyle={{ marginBottom: 6 }}
        dotColor={isDarkMode ? '#2B3443' : '#E5E7EB'}
        activeDotColor={'#F24E61'}
        renderItem={(s) => (
          <View style={[styles.slideCard, { backgroundColor: s.bg }]}> 
            <View style={styles.slideLeft}>
              <View style={styles.pillWrap}><Text style={styles.pillText}>All Featured</Text></View>
              <Text style={[styles.bannerTitle, { color: s.fg }]}>{s.title}</Text>
              <Text style={[styles.bannerSub, { color: 'rgba(0,0,0,0.55)' }]}>{s.subtitle}</Text>
              <TouchableOpacity activeOpacity={0.9} style={styles.bannerCtaStrong} onPress={onNavigateShop}>
                <Text style={styles.bannerCtaStrongText}>Shop Now  →</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: s.image }} style={styles.slideImg} />
            <View style={styles.slideOverlay} />
          </View>
        )}
      />

      {/* Deal of the Day */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, textTitle]}>Deal of the Day</Text>
          <TouchableOpacity><Text style={[styles.sectionLink, { color: '#2563EB' }]}>View All</Text></TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {featured.map(p => (
            <TouchableOpacity key={p.id} activeOpacity={0.85} style={[styles.gridCard, bgCard]} onPress={() => onOpenDetails && onOpenDetails(p.id)}>
              <Image source={{ uri: p.image }} style={styles.gridImage} />
              <Text style={[styles.gridName, textTitle]} numberOfLines={2}>{p.name}</Text>
              <Text style={[styles.gridPrice, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.smallBtn} onPress={() => onAddToCart && onAddToCart(p.id)}>
                <Text style={styles.smallBtnText}>Add</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Special Offers */}
      <View style={[styles.card, bgCard]}> 
        <Text style={[styles.cardTitle, textTitle]}>Special Offers ✨</Text>
        <View style={styles.chipsRow}>
          {['Free Delivery', 'Flash Sale', 'Coupon 10%', 'Mega Deals'].map((c, idx) => (
            <View key={idx} style={[styles.chip, { backgroundColor: isDarkMode ? '#111823' : '#F1F5FA', borderColor: isDarkMode ? '#1F2A3A' : '#E7EDF5' }]}>
              <Text style={[styles.chipText, textMuted]}>{c}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Trending Products */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, textTitle]}>Trending Products</Text>
          <TouchableOpacity><Text style={[styles.sectionLink, { color: '#2563EB' }]}>View All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {trending.map(p => (
            <TouchableOpacity key={p.id} activeOpacity={0.85} style={[styles.hCard, bgCard]} onPress={() => onOpenDetails && onOpenDetails(p.id)}>
              <Image source={{ uri: p.image }} style={styles.hCardImage} />
              <View style={{ padding: 10 }}>
                <Text style={[styles.hCardName, textTitle]} numberOfLines={1}>{p.name}</Text>
                <Text style={[styles.hCardPrice, { color: isDarkMode ? '#9FB3C8' : '#335577' }]}>${p.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sponsored */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={[styles.sectionTitle, textTitle]}>Sponsored</Text>
      </View>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1596904197519-2b3e53720c25?q=80&w=1400&auto=format&fit=crop' }} style={styles.sponsored} />

      {/* New Arrivals */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, textTitle]}>New Arrivals</Text>
          <TouchableOpacity><Text style={[styles.sectionLink, { color: '#2563EB' }]}>View All</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 14, borderWidth: 1, marginHorizontal: 20, gap: 8 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  storyAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#CCD6E5' },
  storyLabel: { fontSize: 11, marginTop: 6 },
  banner: { marginHorizontal: 20, borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bannerOver: { fontSize: 12, marginBottom: 2 },
  bannerTitle: { fontSize: 22, fontWeight: '900' },
  bannerSub: { fontSize: 13, marginTop: 2 },
  bannerCta: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  bannerCtaText: { color: '#fff', fontWeight: '800' },
  bannerImg: { width: 96, height: 96, borderRadius: 12, backgroundColor: '#CCD6E5' },
  slideCard: { marginHorizontal: 20, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, height: 180, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 8 }, shadowRadius: 16, elevation: 6 },
  slideLeft: { flex: 1 },
  slideImg: { width: 130, height: 130, borderRadius: 16, backgroundColor: '#CCD6E5' },
  slideOverlay: { position: 'absolute', right: -30, bottom: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.25)' },
  pillWrap: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 999, marginBottom: 6 },
  pillText: { fontSize: 11, fontWeight: '800', color: '#0B1A33' },
  bannerCtaStrong: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#F24E61', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  bannerCtaStrongText: { color: '#fff', fontWeight: '900', letterSpacing: 0.3 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '900' },
  sectionLink: { fontSize: 12, fontWeight: '800' },
  grid: { flexDirection: 'row', gap: 12 },
  gridCard: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 10 },
  gridImage: { width: '100%', height: 100, borderRadius: 10, backgroundColor: '#CCD6E5', marginBottom: 8 },
  gridName: { fontSize: 14, fontWeight: '800' },
  gridPrice: { fontSize: 13, marginTop: 4 },
  smallBtn: { marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#2563EB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  smallBtnText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  card: { borderWidth: 1, borderRadius: 16, padding: 14, marginHorizontal: 20 },
  cardTitle: { fontSize: 16, fontWeight: '900', marginBottom: 8 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, borderWidth: 1 },
  chipText: { fontSize: 12, fontWeight: '700' },
  hCard: { width: 160, borderWidth: 1, borderRadius: 14, overflow: 'hidden' },
  hCardImage: { width: '100%', height: 120, backgroundColor: '#CCD6E5' },
  hCardName: { fontSize: 14, fontWeight: '800' },
  hCardPrice: { fontSize: 13, marginTop: 2 },
  sponsored: { marginHorizontal: 20, height: 140, borderRadius: 16, backgroundColor: '#CCD6E5' },
});
