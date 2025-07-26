import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;
const ITEM_SPACING = 15;

type CarouselItem = {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: string;
};

type StatsCarouselProps = {
  data: CarouselItem[];
};

export function StatsCarousel({ data }: StatsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const backgroundColor = useThemeColor({ light: '#ffffff', dark: '#1c1c1e' }, 'background');
  const accentColor = useThemeColor({ light: '#2e78b7', dark: '#4e98d7' }, 'tint');

  const getItemIcon = (title: string) => {
    if (title.includes('Vehículos lavados')) return 'car-outline';
    if (title.includes('Monto')) return 'cash-outline';
    if (title.includes('en curso')) return 'time-outline';
    if (title.includes('Clientes')) return 'people-outline';
    return 'stats-chart-outline';
  };

  const getItemColor = (title: string) => {
    if (title.includes('Vehículos lavados')) return ['#4CAF50', '#66BB6A'];
    if (title.includes('Monto')) return ['#2196F3', '#42A5F5'];
    if (title.includes('en curso')) return ['#FF9800', '#FFB74D'];
    if (title.includes('Clientes')) return ['#9C27B0', '#BA68C8'];
    return [accentColor, '#4e98d7'];
  };

  const renderSliderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    const isActive = index === activeIndex;
    const colors = getItemColor(item.title);
    
    return (
      <View style={[styles.itemContainer, isActive && styles.activeItem]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={getItemIcon(item.title) as any} 
              size={28} 
              color="white" 
            />
          </View>
          
          <View style={styles.contentContainer}>
            <ThemedText style={styles.itemTitle}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.itemValue}>
              {item.value}
            </ThemedText>
            {item.subtitle && (
              <View style={styles.subtitleContainer}>
                <Ionicons name="trending-up" size={14} color="rgba(255,255,255,0.8)" />
                <ThemedText style={styles.itemSubtitle}>
                  {item.subtitle}
                </ThemedText>
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
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
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
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
    marginHorizontal: ITEM_SPACING / 2,
    transform: [{ scale: 0.95 }],
  },
  activeItem: {
    transform: [{ scale: 1 }],
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minHeight: 160,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    opacity: 0.9,
  },
  itemValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    fontWeight: '500',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#2e78b7',
    transform: [{ scale: 1.2 }],
  },
  inactiveDot: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
});