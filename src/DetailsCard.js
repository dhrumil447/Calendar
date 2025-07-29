import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const DetailsCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.detailItem}>
          <Icon name="sunrise" size={28} color="#f39c12" />
          <Text style={styles.detailText}>સવારે ૦૬:૦૮</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailItem}>
          <Icon name="sunset" size={28} color="#e67e22" />
          <Text style={styles.detailText}>સાંજે ૦૭:૨૪</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailItem}>
          <Icon name="moon" size={28} color="#8e44ad" />
          <Text style={styles.detailText}>સાંજે ૦૮:૨૨</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
  },
  detailText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  separator: {
    width: 1,
    height: "60%",
    backgroundColor: "#E0E0E0",
  },
});

export default DetailsCard;
