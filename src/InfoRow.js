import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// માહિતી ગ્રીડ માટેનો નાનો હેલ્પર કમ્પોનન્ટ
const InfoItem = ({ icon, title, value, color = '#c0392b' }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={28} color={color} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const TarikhiyuHome = () => {
  const dailyData = {
    vichhudo: 'આજે વિંછુડો નથી',
    panchak: 'આજે પંચક નથી',
    nakshatra: 'વિશાખા (આવતીકાલે ઉતરશે)',
    bank: 'આજે બેંક ચાલુ રહેશે',
    choghadiyaDate: '૨ ઓગસ્ટ, ૨૦૨૫ (શનિવાર)',
    festival: 'આજના દિવસમાં કોઈ તહેવાર કે રજા નથી',
  };

  return (
    <View style={styles.container}>
      {/* ઉપરની માહિતીની ગ્રીડ */}
      <View style={styles.infoGrid}>
        <InfoItem icon="scorpion" title="વિંછુડો" value={dailyData.vichhudo} color="#e74c3c" />
        <InfoItem icon="alpha-p-box-outline" title="પંચક" value={dailyData.panchak} color="#2980b9" />
        <InfoItem icon="star-circle-outline" title="નક્ષત્ર" value={dailyData.nakshatra} color="#8e44ad" />
        <InfoItem icon="bank-outline" title="બેંક" value={dailyData.bank} color="#27ae60" />
      </View>

      {/* ચોઘડિયા માટેનું બટન */}
      <TouchableOpacity style={styles.choghadiyaButton} activeOpacity={0.7}>
        <Text style={styles.choghadiyaDateText}>{dailyData.choghadiyaDate}</Text>
        <Text style={styles.choghadiyaLinkText}>ના દિવસના ચોઘડિયા જોવા અહીં ક્લિક કરો.</Text>
      </TouchableOpacity>

      {/* તહેવારની માહિતી */}
      <Text style={styles.festivalText}>{dailyData.festival}</Text>

      {/* શ્રીમદ્ ભગવદ્ ગીતા સેક્શન */}
      <View style={styles.gitaContainer}>
        <Icon name="book-open-page-variant-outline" size={20} color="#e67e22" />
        <Text style={styles.gitaText}>શ્રીમદ્ ભગવદ્ ગીતા</Text>
        <Icon name="chevron-right" size={22} color="#e67e22" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // થોડો ઓફ-વ્હાઇટ બેકગ્રાઉન્ડ
    padding: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoItem: {
    width: '48%', // ગ્રીડમાં બે આઇટમ માટે
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#34495e',
  },
  infoValue: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
  choghadiyaButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e74c3c',
    elevation: 2,
    shadowColor: '#e74c3c',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  choghadiyaDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  choghadiyaLinkText: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },
  festivalText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#34495e',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    elevation: 1,
  },
  gitaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginTop: 20,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#e67e22',
  },
  gitaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e67e22',
  },
});

export default TarikhiyuHome;