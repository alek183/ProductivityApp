import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const buttonSize = (width - 60) / 2;

const Home = ({ navigation, theme }) => { 
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.headerTitle, { color: theme.text }]}>Home</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.card }]} 
          onPress={() => navigation.navigate('Tasks')}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 214, 10, 0.15)' }]}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={32} color="#FFD60A" />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>My Schedule</Text>
          <Text style={[styles.cardDesc, { color: theme.subText }]}>View your tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.card }]} 
          onPress={() => navigation.navigate('AddTask')}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(52, 199, 89, 0.15)' }]}>
            <MaterialCommunityIcons name="plus-circle-outline" size={32} color="#34C759" />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Add New</Text>
          <Text style={[styles.cardDesc, { color: theme.subText }]}>Create a task</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.card }]} 
          onPress={() => navigation.navigate('Timer')}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 59, 48, 0.15)' }]}>
            <MaterialCommunityIcons name="timer-outline" size={32} color="#FF3B30" />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Focus Timer</Text>
          <Text style={[styles.cardDesc, { color: theme.subText }]}>Stay concentrated</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridCard, { backgroundColor: theme.card }]} 
          onPress={() => navigation.navigate('Settings')}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(142, 142, 147, 0.15)' }]}>
            <MaterialCommunityIcons name="cog-outline" size={32} color="#8E8E93" />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Settings</Text>
          <Text style={[styles.cardDesc, { color: theme.subText }]}>App preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 140 
  },
  headerTitle: { 
    fontSize: 36, 
    textAlign: 'center', 
    marginBottom: 50, 
    fontFamily: 'Roboto-Bold' 
  },
  buttonGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 20 
  },
  gridCard: { 
    width: buttonSize, 
    height: buttonSize, 
    borderRadius: 24, 
    padding: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 6, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 5 
  },
  iconBox: { 
    width: 65, 
    height: 65, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  cardTitle: { 
    fontSize: 17, 
    textAlign: 'center', 
    fontFamily: 'Roboto-Bold' 
  },
  cardDesc: { 
    fontSize: 12, 
    textAlign: 'center', 
    marginTop: 4, 
    fontFamily: 'Roboto-Regular' 
  }
});

export default Home;