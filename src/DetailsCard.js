import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SunCalc from 'suncalc';

// Helper function to format date objects into Gujarati time string
const formatTime = (dateObj) => {
  if (!dateObj || isNaN(dateObj.getTime())) {
    return "આજે નથી"; // Handles cases where moonrise/moonset doesn't occur
  }
  return new Intl.DateTimeFormat('gu-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Using 24-hour format which is common for this data
  }).format(dateObj);
};

// Component now accepts props for reusability
export default function SunTimesCard({ date = new Date() }) {
  const [times, setTimes] = useState(null);

  // Location for Ahmedabad, Gujarat
  const latitude = 23.0225;
  const longitude = 72.5714;

  useEffect(() => {
    const calculateTimes = () => {
      try {
        // Get sun times
        const sunTimes = SunCalc.getTimes(date, latitude, longitude);
        
        // Get moon times
        const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);

        return [
          {
            icon: "weather-sunset-up",
            label: "સૂર્યોદય",
            time: formatTime(sunTimes.sunrise),
            color: "#f39c12",
          },
          {
            icon: "weather-sunset-down",
            label: "સૂર્યાસ્ત",
            time: formatTime(sunTimes.sunset),
            color: "#e67e22",
          },
          {
            icon: "moon-waxing-crescent",
            label: "ચંદ્રોદય",
            time: formatTime(moonTimes.rise),
            color: "#3498db",
          },
          {
            icon: "moon-waning-crescent",
            label: "ચંદ્રાસ્ત",
            time: formatTime(moonTimes.set),
            color: "#8e44ad",
          },
        ];
      } catch (error) {
        console.error('Error calculating times:', error);
        return null;
      }
    };

    const formattedTimes = calculateTimes();
    if (formattedTimes) {
      setTimes(formattedTimes);
    }
  }, [date]); // Recalculate if the date prop changes

  // Show a loading indicator while calculating
  if (!times) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="small" color="#e67e22" />
        <Text style={styles.loadingText}>સમયની ગણતરી ચાલુ છે...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {times.map((item, i) => (
        <View key={i} style={styles.timeItem}>
          <Icon name={item.icon} size={30} color={item.color} />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginVertical: 8,
  },
  timeItem: {
    alignItems: "center",
    width: '24%', // Ensure items are spaced out evenly
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginTop: 6,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 2,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, // Give it some height while loading
  },
  loadingText: {
    marginTop: 8,
  }
});