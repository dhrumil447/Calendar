import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Share, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Centralized theme for easier styling and consistency
const theme = {
  colors: {
    primary: '#D32F2F',
    text: '#212121',
    background: '#FFFFFF',
    lightGray: '#f1f1f1',
  },
  spacing: {
    padding: 10,
    iconMargin: 8,
  },
  iconSize: 26,
};

const Header = ({ title = 'Hindu Calender', showBackButton = false }) => {
  const navigation = useNavigation();

  // Function to handle the share action
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome app!',
        // You can add a URL here
        url: 'https://instagram.com',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // Function for the menu/back button
  const handleLeftIconPress = () => {
    if (showBackButton) {
      navigation.goBack();
    } else {
      // Assumes you are using a Drawer Navigator
      navigation.openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftContainer}>
        {/* Menu or Back Button */}
        <Pressable
          style={styles.iconButton}
          onPress={handleLeftIconPress}
          android_ripple={{ color: theme.colors.lightGray, borderless: true }}
        >
          <Icon
            name={showBackButton ? 'arrow-left' : 'menu'}
            size={theme.iconSize}
            color={theme.colors.primary}
          />
        </Pressable>

        {/* Location (Kept as is, can be wired up) */}
        <Pressable
          style={styles.iconButton}
          onPress={() => Alert.alert('Location pressed')}
          android_ripple={{ color: theme.colors.lightGray, borderless: true }}
        >
          <Icon name="map-marker" size={theme.iconSize} color={theme.colors.primary} />
        </Pressable>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightContainer}>
        {/* Calendar */}
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.navigate('CalendarScreen')}
          android_ripple={{ color: theme.colors.lightGray, borderless: true }}
        >
          <Icon name="calendar-month" size={theme.iconSize} color={theme.colors.primary} />
        </Pressable>

        {/* Share */}
        <Pressable
          style={styles.iconButton}
          onPress={handleShare}
          android_ripple={{ color: theme.colors.lightGray, borderless: true }}
        >
          <Icon name="share-variant" size={theme.iconSize} color={theme.colors.primary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.padding,
    height: 60, // A fixed height is often better for headers
    backgroundColor: theme.colors.background,
    // Platform-specific shadow for a modern look
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  leftContainer: {
    flex: 1, // Allow left container to grow
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: theme.spacing.iconMargin,
  },
  iconButton: {
    // Consistent sizing for touch targets
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -4, // Adjust spacing between icons
  },
});

export default Header;
