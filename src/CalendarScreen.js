import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// ઉમેરો: સ્વાઇપ કરવા માટે Gesture Recognizer લાઇબ્રેરી import કરો
import GestureRecognizer from 'react-native-swipe-gestures';

import { festivalData } from './data/festivals';
import { getPanchang } from './utils/panchang';

const gujaratiDays = ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'];
const monthNamesGuj = [
  'જાન્યુઆરી',
  'ફેબ્રુઆરી',
  'માર્ચ',
  'એપ્રિલ',
  'મે',
  'જૂન',
  'જુલાઈ',
  'ઓગસ્ટ',
  'સપ્ટેમ્બર',
  'ઓક્ટોબર',
  'નવેમ્બર',
  'ડિસેમ્બર',
];

// Legend component (કોઈ ફેરફાર નથી)
const CalendarKey = () => (
  <View style={styles.legendContainer}>
    <View style={styles.legendItem}>
      <Icon name="circle-slice-8" size={14} color="#4A90E2" />
      <Text style={styles.legendText}>પૂનમ</Text>
    </View>
    <View style={styles.legendItem}>
      <Icon name="circle-outline" size={14} color="#000" />
      <Text style={styles.legendText}>અમાસ</Text>
    </View>
    <View style={styles.legendItem}>
      <Icon name="flower-tulip" size={14} color="#50E3C2" />
      <Text style={styles.legendText}>એકાદશી</Text>
    </View>
    <View style={styles.legendItem}>
      <Icon name="scorpion" size={14} color="#E74C3C" />
      <Text style={styles.legendText}>વિંછુડો</Text>
    </View>
    <View style={styles.legendItem}>
      <Icon name="bank" size={14} color="#F5A623" />
      <Text style={styles.legendText}>બેંક રજા</Text>
    </View>
  </View>
);

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();

  // useMemo લોજિક માં કોઈ ફેરફાર નથી
  const { calendarGrid, headerInfo } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startPanchang = getPanchang(firstDayOfMonth);
    const endPanchang = getPanchang(lastDayOfMonth);
    const startGujaratiMonth = startPanchang.split(' ')[0];
    const endGujaratiMonth = endPanchang.split(' ')[0];
    const headerInfo = {
      title: `${monthNamesGuj[month]} ${year}`,
      subtitle: `${
        startGujaratiMonth === endGujaratiMonth
          ? startGujaratiMonth
          : `${startGujaratiMonth} - ${endGujaratiMonth}`
      } (વિ.સં. ${year + 56}/${year + 57})`,
    };
    const grid = [];
    const eventsList = [];
    let day = 1;
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayIndex = firstDayOfMonth.getDay();
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayIndex) || day > daysInMonth) {
          week.push(null);
        } else {
          const dateObj = new Date(year, month, day);
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
            2,
            '0'
          )}`;
          let events = [];
          if (festivalData[dateString]) {
            events.push(festivalData[dateString]);
          }
          const panchangString = getPanchang(dateObj);
          if (panchangString.includes('એકાદશી'))
            events.push({ name: 'એકાદશી', type: 'Tithi', icon: 'flower-tulip' });
          if (panchangString.includes('પૂનમ'))
            events.push({ name: 'પૂનમ', type: 'Tithi', icon: 'circle-slice-8' });
          if (panchangString.includes('અમાસ'))
            events.push({ name: 'અમાસ', type: 'Tithi', icon: 'circle-outline' });
          if (festivalData[dateString])
            eventsList.push({ day, dateObj, event: festivalData[dateString] });
          week.push({
            day,
            dateObj,
            isSunday: j === 0,
            event: festivalData[dateString] || null,
            panchangString: panchangString,
            events: events,
          });
          day++;
        }
      }
      grid.push(week);
      if (day > daysInMonth) break;
    }
    setMonthEvents(eventsList);
    return { calendarGrid: grid, headerInfo };
  }, [currentDate]);

  const handlePrevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // ઉમેરો: Gesture Recognizer માટે configuration object
  const gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Icon name="chevron-left" size={32} color="#444" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{headerInfo.title}</Text>
          <Text style={styles.headerSubtitle}>{headerInfo.subtitle}</Text>
        </View>
        <TouchableOpacity onPress={handleNextMonth}>
          <Icon name="chevron-right" size={32} color="#444" />
        </TouchableOpacity>
      </View>

      {/* ફેરફાર: GestureRecognizer વડે કેલેન્ડર અને ઇવેન્ટ લિસ્ટને રેપ કરો */}
      <GestureRecognizer
        onSwipeLeft={handleNextMonth} // જમણે થી ડાબે સ્વાઇપ (આગળનો મહિનો)
        onSwipeRight={handlePrevMonth} // ડાબે થી જમણે સ્વાઇપ (પાછળનો મહિનો)
        config={gestureConfig}
        style={{ flex: 1 }} // આ જરૂરી છે જેથી તે જગ્યા રોકે
      >
        <View style={styles.weekRow}>
          {gujaratiDays.map(day => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {calendarGrid.map((week, rowIndex) => (
            <View key={rowIndex} style={styles.calendarRow}>
              {week.map((dayData, colIndex) => {
                const isToday =
                  dayData &&
                  dayData.day === today.getDate() &&
                  dayData.dateObj.getMonth() === today.getMonth() &&
                  dayData.dateObj.getFullYear() === today.getFullYear();
                const isHoliday =
                  dayData && (dayData.isSunday || (dayData.event && dayData.event.bankHoliday));

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.dateCell, isHoliday && styles.holidayCell]}
                    onPress={() => dayData && setSelectedDate(dayData)}
                    disabled={!dayData}
                  >
                    {dayData && (
                      <>
                        <View style={[isToday && styles.todayCircle]}>
                          <Text style={[styles.dateText, isHoliday && { color: '#D32F2F' }]}>
                            {dayData.day}
                          </Text>
                        </View>
                        <Text style={styles.tithiText} numberOfLines={1}>
                          {dayData.panchangString}
                        </Text>
                        {dayData.event && (
                          <Text style={styles.cellEventText} numberOfLines={1}>
                            {dayData.event.name}
                          </Text>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <CalendarKey />

          <View style={styles.eventListContainer}>
            <Text style={styles.eventListTitle}>આ મહિના ના તહેવાર</Text>
            {monthEvents.length > 0 ? (
              monthEvents.map(({ day, dateObj, event }, index) => (
                <Text key={index} style={styles.eventListItem}>
                  {String(day).padStart(2, '0')} - {monthNamesGuj[dateObj.getMonth()]},{' '}
                  {gujaratiDays[dateObj.getDay()]} | {event.name}
                </Text>
              ))
            ) : (
              <Text style={styles.eventListItem}>આ મહિને કોઈ મુખ્ય તહેવાર નથી.</Text>
            )}
          </View>
        </ScrollView>
      </GestureRecognizer>

      {/* Modal માં કોઈ ફેરફાર નથી */}
      {selectedDate && (
        <Modal
          visible={true}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedDate(null)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setSelectedDate(null)}
          >
            <View onStartShouldSetResponder={() => true}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {selectedDate.day} {monthNamesGuj[selectedDate.dateObj.getMonth()]}{' '}
                  {selectedDate.dateObj.getFullYear()}
                </Text>
                <Text style={styles.modalPanchang}>તિથિ: {selectedDate.panchangString}</Text>
                <View style={styles.divider} />
                {selectedDate.events.length > 0 ? (
                  selectedDate.events.map((event, idx) => (
                    <View key={idx} style={styles.eventItem}>
                      <Icon
                        name={event.icon || 'calendar-blank'}
                        size={20}
                        color={event.type === 'Holiday' ? '#e74c3c' : '#3498db'}
                      />
                      <Text style={styles.eventItemText}>{event.name}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.eventItemText}>આ દિવસે કોઈ ખાસ ઇવેન્ટ નથી</Text>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDate(null)}>
                  <Text style={styles.closeButtonText}>બંધ કરો</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

// Styles માં કોઈ ફેરફાર નથી
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  headerSubtitle: { fontSize: 13, color: '#666', textAlign: 'center' },
  weekRow: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    // સુધારો: પહોળાઈ (width) કાઢી નાખો જેથી તે ફ્લેક્સિબલ રહે
  },
  weekDay: {
    flex: 1, // દરેક દિવસને સરખી જગ્યા આપો
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  calendarRow: {
    flexDirection: 'row',
    // સુધારો: પહોળાઈ (width) કાઢી નાખો
  },
  dateCell: {
    flex: 1, // દરેક સેલને સરખી જગ્યા આપો
    aspectRatio: 0, // ઊંચાઈને પહોળાઈ જેટલી જ રાખો (ચોરસ બનાવવા માટે)
    height: undefined, // aspectRatio સાથે કામ કરવા માટે height ને undefined કરો
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f0f0f0',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  holidayCell: { backgroundColor: '#FFF5F5' },
  todayCircle: {
    backgroundColor: '#8fc999ff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  tithiText: { fontSize: 8, color: '#555', marginTop: 4, textAlign: 'center' },
  cellEventText: {
    fontSize: 8,
    color: '#D32F2F',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    marginTop: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  legendItem: { alignItems: 'center', flexDirection: 'row' },
  legendText: { fontSize: 12, marginLeft: 4 },
  eventListContainer: { marginTop: 20, paddingHorizontal: 15 },
  eventListTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  eventListItem: {
    fontSize: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 15,
    width: '85%',
    elevation: 10,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  modalPanchang: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 8 },
  eventItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  eventItemText: { fontSize: 16, marginLeft: 10 },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#d32f2f',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  closeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default CalendarScreen;
