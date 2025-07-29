import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Header from './Header';
import DateCard from './DateCard';
import DetailsCard from './DetailsCard';
import InfoRow from './InfoRow';

const CalendarHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DateCard />
         <DetailsCard />
         <InfoRow />
        {/* <ChoghadiyaCard />
        <ExpandableSection />
        <MonthTabs />
         <FooterIcons />  */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // A softer, more neutral background
  },
  scrollViewContent: {
    padding: 16,
  },
});

export default CalendarHome;
