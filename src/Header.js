import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Menu button now shows alert instead of openDrawer */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Alert.alert("Menu button clicked")}
        >
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="map-marker-outline" size={28} color="#E53935" />
        </TouchableOpacity>

        <Text style={styles.title}>Hindu Calendar</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("CalendarScreen")}
        >
          <Icon name="calendar-month-outline" size={26} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share-variant" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight :  10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E53935",
    marginLeft: 5,
  },
  iconButton: {
    padding: 8,
  },
});

export default Header;
