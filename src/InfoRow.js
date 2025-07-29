import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InfoRow = () => {
  const info = [
    { icon: "scorpion", text: "વિચ્છડો - આજે વિચ્છડો નથી." },
    { icon: "alpha-p-box-outline", text: "પંચક - આજે પંચક નથી." },
    { icon: "graph-outline", text: "નક્ષત્ર (મઘા) - સાંજે ૦૪:૨૩ ઉતરશે." },
    { icon: "bank", text: "બેંક - રવિવાર ના કારણે બેંક બંધ." },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>વધારાની માહિતી</Text>
      {info.map((item, index) => (
        <View
          key={index}
          style={[
            styles.infoRow,
            index === info.length - 1 && { marginBottom: 0 }, // Remove margin from last item
          ]}
        >
          <Icon
            name={item.icon}
            size={24}
            color="#E53935"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 15,
    width: 24,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    flex: 1, // Allow text to wrap
  },
});

export default InfoRow;
