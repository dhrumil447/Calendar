import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DateCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.dateText}>૨૭</Text>
        <View>
          <Text style={styles.monthYearText}>જુલાઈ, ૨૦૨૫</Text>
          <Text style={styles.dayText}>રવિવાર</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.infoText}>શ્રાવણ સુદ ત્રીજ</Text>
        <Text style={styles.infoText}>સિંહ (મ,ટ)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E53935", // A more modern, vibrant red
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    color: "white",
    fontSize: 52,
    fontWeight: "bold",
  },
  monthYearText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "right",
  },
  dayText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    textAlign: "right",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  infoText: {
    color: "white",
    fontSize: 16,
  },
});

export default DateCard;
