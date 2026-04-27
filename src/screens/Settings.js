import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = ({ theme, toggleTheme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.header, { color: theme.text }]}>Settings</Text>
      
      <View style={[styles.row, { borderBottomColor: theme.border }]}>
        <View style={styles.optionInfo}>
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.primary} />
          <Text style={[styles.text, { color: theme.text }]}>Dark Mode</Text>
        </View>
        <Switch 
          value={theme.isDarkMode} 
          onValueChange={toggleTheme} 
          trackColor={{ false: "#767577", true: theme.primary }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  header: { 
    fontSize: 32, 
    marginBottom: 40, 
    fontFamily: 'Roboto-Bold' 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1 
  },
  optionInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15 
  },
  text: { 
    fontSize: 18, 
    fontFamily: 'Roboto-Regular' 
  }
});

export default Settings;