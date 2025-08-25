import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

// 1. અલગ ફાઈલમાંથી પંચાંગ ડેટાને ઈમ્પોર્ટ કરો
// ખાતરી કરો કે 'panchangData.js' ફાઈલ આ ફાઈલની સાથે જ પ્રોજેક્ટમાં હાજર છે.
import { panchangData } from './utils/panchangData';


/**
 * આ ફંક્શન static ડેટામાંથી પંચાંગની વિગતો મેળવે છે.
 * @param {Date} date - જે તારીખ માટે પંચાંગ જોઈએ છે તે.
 * @returns {string} - ફોર્મેટ કરેલી પંચાંગ સ્ટ્રિંગ.
 */
const getPanchang = (date) => {
  // તારીખને "YYYY-MM-DD" ફોર્મેટમાં ફેરવો
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${year}-${month}-${day}`;

  // ડેટા ઓબ્જેક્ટમાંથી માહિતી શોધો
  const data = panchangData[key];

  if (data) {
    // જો ડેટા મળે, તો તેને ફોર્મેટ કરીને બતાવો
    return `${data.maas} ${data.paksha} ${data.tithi}`;
  } else {
    // જો તે તારીખનો ડેટા ન મળે, તો ભૂલ બતાવો
    return "ડેટા ઉપલબ્ધ નથી";
  }
};


/**
 * આજની તારીખ અને પંચાંગ દર્શાવતો એક સુંદર કાર્ડ કમ્પોનન્ટ.
 */
const DateCard = ({ date = new Date(), onPress }) => {
  const [panchang, setPanchang] = useState('...');

  useEffect(() => {
    // જ્યારે પણ તારીખ બદલાય ત્યારે પંચાંગ અપડેટ કરો.
    const details = getPanchang(date);
    setPanchang(details);
  }, [date]);

  // તારીખ અને વાર ગુજરાતીમાં મેળવો
  const day = new Intl.DateTimeFormat('gu-IN', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('gu-IN', { month: 'long' }).format(date);
  const year = new Intl.DateTimeFormat('gu-IN', { year: 'numeric' }).format(date);
  const weekday = new Intl.DateTimeFormat('gu-IN', { weekday: 'long' }).format(date);

  // સમય પ્રમાણે શુભેચ્છા
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "સુપ્રભાત";
    if (hour < 17) return "શુભ બપોર";
    return "શુભ સાંજ";
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#FF8A65', '#D32F2F']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.topRow}>
          <Text style={styles.dateText}>{day}</Text>
          <View style={styles.rightText}>
            <Text style={styles.monthYearText}>{`${month}, ${year}`}</Text>
            <Text style={styles.dayText}>{weekday}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.infoText}>{panchang}</Text>
          <Text style={styles.infoText}>{getGreeting()}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateText: {
    color: "#fff",
    fontSize: 56,
    fontWeight: "700",
    marginTop: -8,
  },
  rightText: {
    alignItems: "flex-end",
  },
  monthYearText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  dayText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DateCard;