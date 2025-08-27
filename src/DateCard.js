import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Appearance } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // 🔹 આઇકન માટે import કરો
import { useNavigation } from '@react-navigation/native';

import DetailsCard from './DetailsCard';
import { panchangData } from './utils/panchangData';

// 🔹 મહિનાના નામ અને આઇકન સાથેનો નવો ડેટા સોર્સ
const monthData = [
  { name: 'જાન્યુઆરી', icon: 'kite' },
  { name: 'ફેબ્રુઆરી', icon: 'om' },
  { name: 'માર્ચ', icon: 'format-paint' },
  { name: 'એપ્રિલ', icon: 'bow-arrow' },
  { name: 'મે', icon: 'meditation' },
  { name: 'જૂન', icon: 'flag-triangle' }, // સુધારો: 'chariot' ને બદલે રથયાત્રા માટે 'flag-triangle'
  { name: 'જુલાઈ', icon: 'account-star' },
  { name: 'ઓગસ્ટ', icon: 'human-male-female' }, // સુધારો: 'rakhi' ને બદલે રક્ષાબંધન માટે 'human-male-female'
  { name: 'સપ્ટેમ્બર', icon: 'elephant' }, // સુધારો: 'ganesha' ને બદલે ગણેશ ચતુર્થી માટે 'elephant'
  { name: 'ઓક્ટોબર', icon: 'lamps' },
  { name: 'નવેમ્બર', icon: 'lamp' },
  { name: 'ડિસેમ્બર', icon: 'pine-tree' },
];

const themes = {
  dark: {
    background: ['#1A1A1A', '#101010'],
    text: '#E0E0E0',
    secondaryText: 'rgba(255,255,255,0.6)',
    border: 'rgba(255,255,255,0.1)',
    accent: '#E53935',
    cardBackground: 'rgba(255,255,255,0.05)',
    monthInactiveBg: 'rgba(255,255,255,0.08)',
    monthInactiveText: 'rgba(255,255,255,0.7)',
  },
  light: {
    background: ['#FFFFFF', '#F7F7F7'],
    text: '#121212',
    secondaryText: 'rgba(0,0,0,0.6)',
    border: 'rgba(0,0,0,0.08)',
    accent: '#C62828',
    cardBackground: 'rgba(0,0,0,0.03)',
    monthInactiveBg: 'rgba(0,0,0,0.05)',
    monthInactiveText: '#333',
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

const DateCard = ({ date = new Date() }) => {
  const [panchang, setPanchang] = useState('...');
  const [themeMode, setThemeMode] = useState(Appearance.getColorScheme() || 'light');
  const navigation = useNavigation();
  const monthListRef = useRef(null);
  const currentMonthIndex = date.getMonth();

  useEffect(() => {
    const details = getPanchang(date);
    setPanchang(details);
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeMode(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, [date]);

  useEffect(() => {
    if (monthListRef.current) {
      setTimeout(() => {
        monthListRef.current.scrollToIndex({
          index: currentMonthIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 200);
    }
  }, [currentMonthIndex]);

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

  const handleMonthPress = monthIndex => {
    const selectedDate = new Date(date.getFullYear(), monthIndex, 1);
    navigation.navigate('CalendarScreen', { selectedDate });
  };

  return (
    <LinearGradient colors={theme.background} style={[styles.card, { borderColor: theme.border }]}>
      <View style={styles.topRow}>
        <Text style={[styles.greetingText, { color: theme.text }]}>{getGreeting()}</Text>
      </View>

      <View style={styles.mainDateContainer}>
        <Text style={[styles.dayText, { color: theme.accent }]}>{day}</Text>
        <View style={styles.dateInfoContainer}>
          <Text style={[styles.monthYearText, { color: theme.secondaryText }]}>
            {month}, {year}
          </Text>
          <Text style={[styles.weekdayText, { color: theme.text }]}>{weekday}</Text>
        </View>
      </View>

      {/* 🔹 Horizontal Month List માં ફેરફાર */}
      <FlatList
        ref={monthListRef}
        data={monthData} // 🔹 ડેટા સોર્સ બદલ્યો
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name} // 🔹 keyExtractor અપડેટ કર્યું
        contentContainerStyle={styles.monthList}
        getItemLayout={(data, index) => ({ length: 90, offset: 90 * index, index })}
        renderItem={({ item, index }) => {
          const isActive = index === currentMonthIndex;
          return (
            <TouchableOpacity
              style={[
                styles.monthItem,
                { backgroundColor: isActive ? theme.accent : theme.monthInactiveBg },
                isActive && styles.activeMonthItem, // 🔹 સક્રિય આઇટમ માટે શેડો
              ]}
              onPress={() => handleMonthPress(index)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={isActive ? '#FFFFFF' : theme.secondaryText}
              />
              <Text
                style={[
                  styles.monthText,
                  { color: isActive ? '#FFFFFF' : theme.monthInactiveText },
                  isActive && styles.activeMonthText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

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

// 🔹 Styles માં ફેરફાર
const styles = StyleSheet.create({
  card: { borderRadius: 24, padding: 22, marginVertical: 10, borderWidth: 1, elevation: 8 },
  topRow: { marginBottom: 20 },
  greetingText: { fontSize: 20, fontWeight: 'bold' },
  mainDateContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dayText: { fontSize: 50, fontWeight: '900', lineHeight: 60 },
  dateInfoContainer: { marginLeft: 16 },
  weekdayText: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  monthYearText: { fontSize: 16, fontWeight: '500' },
  monthList: { marginBottom: 14, paddingHorizontal: 10, height: 80 }, // 🔹 ઊંચાઈ આપી
  monthItem: {
    width: 80, // 🔹 પહોળાઈ આપી
    marginRight: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 4,
  },
  activeMonthItem: {
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  monthText: {
    fontSize: 13,
    textAlign: 'center',
  },
  activeMonthText: {
    fontWeight: 'bold',
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
  panchangText: { fontSize: 16, fontWeight: '600' },
  divider: { height: 1, marginVertical: 20 },
});

export default DateCard;
