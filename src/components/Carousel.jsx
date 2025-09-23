import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Carousel({
  items = [],
  renderItem,
  height = 160,
  autoPlay = true,
  autoPlayInterval = 3500,
  containerStyle,
  dotColor = '#D1D5DB',
  activeDotColor = '#2563EB',
}) {
  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const total = items.length;
  const contentWidth = useMemo(() => SCREEN_WIDTH, []);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(() => {
      const next = (index + 1) % total;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: next * contentWidth, animated: true });
      }
      setIndex(next);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [index, total, autoPlay, autoPlayInterval, contentWidth]);

  const onMomentumEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / contentWidth);
    setIndex(newIndex);
  };

  return (
    <View style={[{ height }, containerStyle]}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'stretch' }}
      >
        {items.map((it, i) => {
          const inputRange = [
            (i - 1) * contentWidth,
            i * contentWidth,
            (i + 1) * contentWidth,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: 'clamp',
          });
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [6, 0, 6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={i} style={{ width: contentWidth, height, transform: [{ scale }, { translateY }] }}>
              {renderItem ? renderItem(it, i) : null}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      {total > 1 && (
        <View style={styles.dotsWrap}>
          {items.map((_, i) => {
            const inputRange = [
              (i - 1) * contentWidth,
              i * contentWidth,
              (i + 1) * contentWidth,
            ];
            const width = scrollX.interpolate({
              inputRange,
              outputRange: [8, 18, 8],
              extrapolate: 'clamp',
            });
            const bg = scrollX.interpolate({
              inputRange,
              outputRange: [dotColor, activeDotColor, dotColor],
            });
            return (
              <Animated.View key={i} style={[styles.dot, { width, backgroundColor: bg }]} />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dotsWrap: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.9,
  },
});
