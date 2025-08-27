import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SunCalc from 'suncalc';
import LinearGradient from 'react-native-linear-gradient';

// Helper functions (કોઈ ફેરફાર નથી)
const formatTime = dateObj => {
  if (!dateObj || isNaN(dateObj.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('gu-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj);
};
const getMoonPhaseGujarati = phase => {
  if (phase === 0) return 'અમાસ';
  if (phase > 0 && phase < 0.25) return 'શુક્લ પક્ષ';
  if (phase === 0.25) return 'પ્રથમ ચતુર્થાંશ';
  if (phase > 0.25 && phase < 0.5) return 'વેક્સિંગ ગિબ્બોસ';
  if (phase === 0.5) return 'પૂનમ';
  if (phase > 0.5 && phase < 0.75) return 'વેનિંગ ગિબ્બોસ';
  if (phase === 0.75) return 'અંતિમ ચતુર્થાંશ';
  return 'કૃષ્ણ પક્ષ';
};

// નવો ફેરફાર: દિવસના સમય મુજબ ગ્રેડિયન્ટ કલર્સ મેળવવા માટે ફંક્શન
const getGradientColors = sunPercent => {
  if (sunPercent < 10) return ['#4c669f', '#3b5998']; // Dawn
  if (sunPercent < 40) return ['#74b9ff', '#0984e3']; // Morning
  if (sunPercent < 60) return ['#00cec9', '#81ecec']; // Noon
  if (sunPercent < 90) return ['#fdcb6e', '#fab1a0']; // Evening
  return ['#e17055', '#d63031']; // Sunset
};

export default function SunTimesCard({ date = new Date() }) {
  const [times, setTimes] = useState(null);
  const [sunAnim] = useState(new Animated.Value(0));

  const latitude = 23.0225;
  const longitude = 72.5714;

  useEffect(() => {
    const now = new Date();
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
    const moonIllumination = SunCalc.getMoonIllumination(date);

    const daylightDuration = sunTimes.sunset.getTime() - sunTimes.sunrise.getTime();
    const timeSinceSunrise = now.getTime() - sunTimes.sunrise.getTime();
    let sunPercent = (timeSinceSunrise / daylightDuration) * 100;

    if (now < sunTimes.sunrise) sunPercent = 0;
    if (now > sunTimes.sunset) sunPercent = 100;

    setTimes({
      // નવો ફેરફાર: વધુ સમયની માહિતી ઉમેરો
      sunrise: sunTimes.sunrise,
      solarNoon: sunTimes.solarNoon,
      sunset: sunTimes.sunset,
      goldenHourStart: sunTimes.goldenHour,
      goldenHourEnd: sunTimes.goldenHourEnd,
      blueHourStart: sunTimes.blueHour,
      blueHourEnd: sunTimes.blueHourEnd,
      moonrise: moonTimes.rise,
      moonset: moonTimes.set,
      moonPhase: getMoonPhaseGujarati(moonIllumination.phase),
      sunPercent,
    });

    Animated.timing(sunAnim, {
      toValue: sunPercent,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [date]);

  if (!times) {
    return (
      <LinearGradient
        colors={['#fdfbfb', '#ebedee']}
        style={[styles.card, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color="#e67e22" />
        <Text style={styles.loadingText}>સમયની ગણતરી ચાલુ છે...</Text>
      </LinearGradient>
    );
  }

  // નવો ફેરફાર: ડાયનેમિક ગ્રેડિયન્ટ
  const gradientColors = getGradientColors(times.sunPercent);

  // સૂર્યના આઇકનની સ્થિતિ માટે Interpolation
  const sunX = sunAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['50%', '95%'], // કિનારીઓથી થોડું અંદર
  });

  return (
    <LinearGradient colors={gradientColors} style={styles.card}>
      {/* --- SUN PATH SECTION --- */}
      <View style={styles.sunPathContainer}>
        <View style={styles.sunPathTrack} />
        <Animated.View style={[styles.sunIconWrapper, { left: sunX }]}>
          <Icon name="white-balance-sunny" size={28} color="#FFD700" />
        </Animated.View>
        <View style={styles.sunTimeNode}>
          <Text style={styles.sunTimeText}>{formatTime(times.sunrise)}</Text>
          <Text style={styles.sunTimeLabel}>સૂર્યોદય</Text>
        </View>
        <View style={[styles.sunTimeNode, { alignItems: 'center' }]}>
          <Text style={styles.sunTimeText}>{formatTime(times.solarNoon)}</Text>
          <Text style={styles.sunTimeLabel}>મધ્યાહન</Text>
        </View>
        <View style={[styles.sunTimeNode, { alignItems: 'flex-end' }]}>
          <Text style={styles.sunTimeText}>{formatTime(times.sunset)}</Text>
          <Text style={styles.sunTimeLabel}>સૂર્યાસ્ત</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* --- MOON SECTION --- */}
      <View style={styles.moonSection}>
        <View style={styles.moonItem}>
          <Icon name="moon-waxing-crescent" size={26} color="#E0E0E0" />
          <Text style={styles.moonLabel}>ચંદ્રોદય</Text>
          <Text style={styles.moonTime}>{formatTime(times.moonrise)}</Text>
        </View>
        <View style={styles.moonItem}>
          <Icon name="theme-light-dark" size={26} color="#E0E0E0" />
          <Text style={styles.moonLabel}>ચંદ્ર કળા</Text>
          <Text style={styles.moonTime}>{times.moonPhase}</Text>
        </View>
        <View style={styles.moonItem}>
          <Icon name="moon-waning-crescent" size={26} color="#E0E0E0" />
          <Text style={styles.moonLabel}>ચંદ્રાસ્ત</Text>
          <Text style={styles.moonTime}>{formatTime(times.moonset)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// નવો ફેરફાર: સંપૂર્ણપણે નવી અને આધુનિક સ્ટાઈલ્સ
const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 22,
    marginVertical: 14,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  sunPathContainer: {
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    position: 'relative',
  },
  sunPathTrack: {
    position: 'absolute',
    bottom: 50,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  sunIconWrapper: {
    position: 'absolute',
    bottom: 36,
    transform: [{ translateX: -14 }], // Icon ને સેન્ટરમાં રાખવા માટે
  },
  sunTimeNode: {
    flex: 1,
  },
  sunTimeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sunTimeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 18,
  },
  moonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moonItem: {
    alignItems: 'center',
    width: '33%',
  },
  moonLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 6,
  },
  moonTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#444',
  },
});
