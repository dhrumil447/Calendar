import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import DetailsCard from './DetailsCard'; // Assuming DetailsCard exists
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Data & Themes ---
import { panchangData } from './utils/panchangData';

const themes = {
  dark: {
    background: ['#1A1A1A', '#101010'],
    text: '#E0E0E0',
    secondaryText: 'rgba(255,255,255,0.6)',
    border: 'rgba(255,255,255,0.1)',
    accent: '#E53935', // A slightly brighter red
    cardBackground: 'rgba(255,255,255,0.05)',
  },
  light: {
    background: ['#FFFFFF', '#F7F7F7'],
    text: '#121212',
    secondaryText: 'rgba(0,0,0,0.6)',
    border: 'rgba(0,0,0,0.08)',
    accent: '#C62828',
    cardBackground: 'rgba(0,0,0,0.03)',
  },
};

const getPanchang = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${year}-${month}-${day}`;
  const data = panchangData[key];
  return data ? `${data.maas} ${data.paksha} ${data.tithi}` : 'ડેટા ઉપલબ્ધ નથી';
};

// --- Main Component ---
const DateCard = ({ date = new Date() }) => {
  const [panchang, setPanchang] = useState('...');
  const [isExpanded, setIsExpanded] = useState(false);
  const [themeMode, setThemeMode] = useState(Appearance.getColorScheme() || 'light');

  // Effect for listening to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeMode(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  // Effect for fetching panchang data
  useEffect(() => {
    const details = getPanchang(date);
    setPanchang(details);
  }, [date]);

  const theme = themes[themeMode];

  const day = new Intl.DateTimeFormat('gu-IN', { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('gu-IN', { month: 'long' }).format(date);
  const year = new Intl.DateTimeFormat('gu-IN', { year: 'numeric' }).format(date);
  const weekday = new Intl.DateTimeFormat('gu-IN', { weekday: 'long' }).format(date);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'સુપ્રભાત';
    if (hour < 17) return 'શુભ બપોર';
    return 'શુભ સાંજ';
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <LinearGradient colors={theme.background} style={[styles.card, { borderColor: theme.border }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.greetingText, { color: theme.text }]}>{getGreeting()}</Text>
          <Text style={[styles.subtitleText, { color: theme.secondaryText }]}>આજનું પંચાંગ</Text>
        </View>
      </View>

      <View style={styles.mainDateContainer}>
        <Text style={[styles.dayText, { color: theme.accent }]}>{day}</Text>
        <View style={styles.dateInfoContainer}>
          <Text style={[styles.weekdayText, { color: theme.text }]}>{weekday}</Text>
          <Text style={[styles.monthYearText, { color: theme.secondaryText }]}>
            {month}, {year}
          </Text>
        </View>
      </View>

      <View style={[styles.panchangContainer, { backgroundColor: theme.cardBackground }]}>
        <Ionicons name="star-outline" size={16} color={theme.accent} />
        <Text style={[styles.panchangText, { color: theme.text }]}>{panchang}</Text>
      </View>

      <View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <DetailsCard />
      </View>
    </LinearGradient>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 22,
    marginVertical: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden', // Important for rounded corners with gradient
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  mainDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayText: {
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 72,
  },
  dateInfoContainer: {
    marginLeft: 16,
  },
  weekdayText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '500',
  },
  panchangContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    gap: 10,
  },
  panchangText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  expandText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DateCard;
