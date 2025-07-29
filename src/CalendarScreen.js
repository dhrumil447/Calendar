import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const gujaratiDays = ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"];

const events = {
  6: { title: "મહોરમ", icon: "moon-waxing-crescent" },
  17: { title: "આંતરરાષ્ટ્રીય દિવસ", icon: "earth" },
  21: { title: "કામિકા એકાદશી", icon: "fruit-pineapple" },
  28: { title: "દક્ષિણ ગજાત્રા", icon: "leaf" },
};

const CalendarScreen = () => {
  const navigation = useNavigation();
  const today = 27; // Example
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>જુલાઈ ૨૦૨૫</Text>
      </View>

      {/* Week Row */}
      <View style={{ flexDirection: "row", backgroundColor: "red" }}>
        {gujaratiDays.map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <ScrollView>
        {Array(5).fill(0).map((_, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {Array(7).fill(0).map((_, colIndex) => {
              const date = rowIndex * 7 + colIndex + 1;
              const isToday = date === today;
              const event = events[date];

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.dateCell,
                    isToday && { backgroundColor: "#d4edda", borderRadius: 10 }
                  ]}
                  onPress={() => setSelectedDate({ date, event })}
                >
                  <Text style={styles.dateText}>{date}</Text>
                  {event && (
                    <>
                      <Icon name={event.icon} size={18} color="red" />
                      <Text style={styles.eventText}>{event.title}</Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Modal for Date Details */}
      <Modal visible={!!selectedDate} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedDate?.date} જુલાઈ ૨૦૨૫
            </Text>
            {selectedDate?.event ? (
              <Text style={{ fontSize: 16 }}>
                ઇવેન્ટ: {selectedDate.event.title}
              </Text>
            ) : (
              <Text style={{ fontSize: 16 }}>આ દિવસે કોઈ ખાસ ઇવેન્ટ નથી</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>બંધ કરો</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  weekDay: {
    flex: 1,
    textAlign: "center",
    padding: 8,
    color: "white",
    fontWeight: "bold"
  },
  dateCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#ddd",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 4
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  eventText: {
    fontSize: 10,
    color: "red",
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 8
  }
});

export default CalendarScreen;
