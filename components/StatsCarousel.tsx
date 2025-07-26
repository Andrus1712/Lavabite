import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_SPACING = 10;

type CarouselItem = {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
};

type StatsCarouselProps = {
  data: CarouselItem[];
};

export function StatsCarousel({ data }: StatsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  const renderSliderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <ThemedView style={[styles.itemContainer, { backgroundColor }]}>
        <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
          {item.title}
        </ThemedText>
        <ThemedText type="title" style={[styles.itemValue, { color: accentColor }]}>
          {item.value}
        </ThemedText>
        {item.subtitle && (
          <ThemedText style={styles.itemSubtitle}>
            {item.subtitle}
          </ThemedText>
        )}
      </ThemedView>
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + ITEM_SPACING));
    setActiveIndex(index);
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? accentColor : '#ccc' },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderSliderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {renderDotIndicator()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  flatListContent: {
    paddingHorizontal: (width - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: ITEM_SPACING / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  itemValue: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});