import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Appearance,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Panchang Data import
import { panchangData } from "./utils/panchangData";

// Themes
// Themes
const themes = {
  dark: {
    background: ["#1c1e24", "#101216"],
    text: "#fff",
    secondaryText: "rgba(255,255,255,0.6)",
    border: "rgba(255,255,255,0.08)",
    accent: "#C62828", // RED
  },
  light: {
    background: ["#f8f8f8", "#eaeaea"],
    text: "#000",
    secondaryText: "rgba(0,0,0,0.6)",
    border: "rgba(0,0,0,0.08)",
    accent: "#C62828", // RED
  },
};


const getPanchang = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const key = `${year}-${month}-${day}`;
  const data = panchangData[key];
  return data ? `${data.maas} ${data.paksha} ${data.tithi}` : "ડેટા ઉપલબ્ધ નથી";
};

const DateCard = ({ date = new Date(), onPress }) => {
  const [panchang, setPanchang] = useState("...");
  const systemTheme = Appearance.getColorScheme(); // auto detect
  const [themeMode, setThemeMode] = useState(systemTheme || "light"); // manual toggle

  useEffect(() => {
    const details = getPanchang(date);
    setPanchang(details);
  }, [date]);

  const theme = themes[themeMode];

  const day = new Intl.DateTimeFormat("gu-IN", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("gu-IN", { month: "long" }).format(date);
  const year = new Intl.DateTimeFormat("gu-IN", { year: "numeric" }).format(date);
  const weekday = new Intl.DateTimeFormat("gu-IN", { weekday: "long" }).format(date);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "સુપ્રભાત";
    if (hour < 17) return "શુભ બપોર";
    return "શુભ સાંજ";
  };

  return (
    <View>
      {/* Theme Switch */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
        <Text style={{ color: theme.text, marginRight: 10 }}>Dark Mode</Text>
        <Switch
          value={themeMode === "dark"}
          onValueChange={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
        />
      </View>

      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={theme.background}
          style={[styles.card, { borderColor: theme.border }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerRow}>
            <Ionicons name="calendar-outline" size={20} color={theme.accent} />
            <Text style={[styles.headerText, { color: theme.text }]}>આજનું પંચાંગ</Text>
          </View>

          <View style={styles.dateRow}>
            <Text style={[styles.dateNumber, { color: theme.text }]}>{day}</Text>
            <View style={styles.rightText}>
              <Text style={[styles.monthYearText, { color: theme.text }]}>
                {`${month}, ${year}`}
              </Text>
              <Text style={[styles.dayText, { color: theme.secondaryText }]}>{weekday}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.bottomRow}>
            <View style={styles.infoBlock}>
              <MaterialCommunityIcons name="star-four-points" size={18} color={theme.accent} />
              <Text style={[styles.infoText, { color: theme.text }]}>{panchang}</Text>
            </View>
            <Text style={[styles.greeting, { color: theme.accent }]}>{getGreeting()}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateNumber: {
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },
  rightText: {
    alignItems: "flex-end",
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "600",
  },
  dayText: {
    fontSize: 16,
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
  },
  greeting: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default DateCard;
