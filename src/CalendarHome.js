import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import Header from './Header';
import DateCard from './DateCard';
import DetailsCard from './DetailsCard';
import InfoRow from './InfoRow';

const CalendarHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent
      />
      <Header navigation={navigation} />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <DateCard />
        {/* <DetailsCard /> */}
        {/* <InfoRow /> */}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  scrollView: {
    backgroundColor: '#ffffffff',
  },
  scrollViewContent: {
    padding: 16,
  },
};

export default CalendarHome;
