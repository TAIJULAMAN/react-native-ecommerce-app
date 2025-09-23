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
  showDots = true,
  dotSize = 8,
  dotActiveWidth = 18,
  dotBottomOffset = 8,
  dotTopMargin = 0,
  dotsOutside = false,
  pauseOnTouch = true,
  onIndexChange,
}) {
  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const total = items.length;
  const contentWidth = useMemo(() => SCREEN_WIDTH, []);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    // start / restart autoplay
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (index + 1) % total;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: next * contentWidth, animated: true });
      }
      setIndex(next);
    }, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, total, autoPlay, autoPlayInterval, contentWidth]);

  const onMomentumEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / contentWidth);
    setIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };

  const handleBeginDrag = () => {
    if (pauseOnTouch && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEndDrag = () => {
    if (pauseOnTouch && autoPlay && total > 1 && !timerRef.current) {
      // Slight delay before resuming
      timerRef.current = setInterval(() => {
        const next = (index + 1) % total;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ x: next * contentWidth, animated: true });
        }
        setIndex(next);
      }, autoPlayInterval);
    }
  };

  const goTo = (i) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ x: i * contentWidth, animated: true });
    setIndex(i);
    if (onIndexChange) onIndexChange(i);
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
        onScrollBeginDrag={handleBeginDrag}
        onScrollEndDrag={handleEndDrag}
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
      {showDots && total > 1 && (
        dotsOutside ? (
          <View style={[styles.dotsRow, { marginTop: dotTopMargin }] }>
            {items.map((_, i) => {
              const inputRange = [
                (i - 1) * contentWidth,
                i * contentWidth,
                (i + 1) * contentWidth,
              ];
              const scaleX = scrollX.interpolate({
                inputRange,
                outputRange: [dotSize / dotActiveWidth, 1, dotSize / dotActiveWidth],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
              });
              return (
                <Dot
                  key={i}
                  size={dotSize}
                  activeWidth={dotActiveWidth}
                  inactiveColor={dotColor}
                  activeColor={activeDotColor}
                  scaleX={scaleX}
                  opacity={opacity}
                  onPress={() => goTo(i)}
                />
              );
            })}
          </View>
        ) : (
          <View style={[styles.dotsWrap, { bottom: dotBottomOffset, marginTop: dotTopMargin }] }>
            {items.map((_, i) => {
              const inputRange = [
                (i - 1) * contentWidth,
                i * contentWidth,
                (i + 1) * contentWidth,
              ];
              const scaleX = scrollX.interpolate({
                inputRange,
                outputRange: [dotSize / dotActiveWidth, 1, dotSize / dotActiveWidth],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
              });
              return (
                <Dot
                  key={i}
                  size={dotSize}
                  activeWidth={dotActiveWidth}
                  inactiveColor={dotColor}
                  activeColor={activeDotColor}
                  scaleX={scaleX}
                  opacity={opacity}
                  onPress={() => goTo(i)}
                />
              );
            })}
          </View>
        )
      )}
    </View>
  );
}

const Dot = ({ size, activeWidth, inactiveColor, activeColor, scaleX, opacity, onPress }) => (
  <View style={[styles.dotOuter, { width: activeWidth }]}> 
    <View style={[styles.dotBase, { height: size, borderRadius: size / 2, backgroundColor: inactiveColor, width: '100%' }]} />
    <Animated.View
      onTouchEnd={onPress}
      style={[
        styles.dotFill,
        {
          height: size,
          borderRadius: size / 2,
          backgroundColor: activeColor,
          opacity,
          transform: [{ scaleX }],
          width: '100%'
        },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  dotsWrap: {
    position: 'absolute',
    left: 0,
    marginTop: 16,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dotOuter: { height: 8, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dotBase: { position: 'absolute', left: 0, right: 0 },
  dotFill: { position: 'absolute', left: 0, right: 0 },
});
