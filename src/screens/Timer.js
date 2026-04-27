import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Vibration } from 'react-native';
import { Audio } from 'expo-av';

const Timer = ({ theme }) => {
  const [minInput, setMinInput] = useState('05');
  const [secInput, setSecInput] = useState('00');
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [sound, setSound] = useState(null);

  async function playSound() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../components/alarm.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      
      setSound(newSound);
      setIsActive(false); 
      Vibration.vibrate([500, 500, 500], true);
    } catch (error) {
      console.log("Error with sound:", error);
      setIsActive(false);
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    Vibration.cancel();
    updateSeconds(minInput, secInput);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      clearInterval(interval);
      playSound();
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const updateSeconds = (m, s) => {
    const total = (parseInt(m) || 0) * 60 + (parseInt(s) || 0);
    setSecondsLeft(total);
  };

  const handleMinChange = (text) => {
    setMinInput(text);
    if (!isActive && !sound) updateSeconds(text, secInput);
  };

  const handleSecChange = (text) => {
    setSecInput(text);
    if (!isActive && !sound) updateSeconds(minInput, text);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    if (sound) {
      stopSound();
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    stopSound();
    updateSeconds(minInput, secInput);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Focus Timer</Text>

      <View style={styles.inputWrapper}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.subText }]}>Min:</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderBottomColor: theme.primary }]}
            keyboardType="number-pad"
            value={minInput}
            onChangeText={handleMinChange}
            onBlur={Keyboard.dismiss}
            maxLength={2}
            placeholderTextColor={theme.subText}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.subText }]}>Sec:</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderBottomColor: theme.primary }]}
            keyboardType="number-pad"
            value={secInput}
            onChangeText={handleSecChange}
            onBlur={Keyboard.dismiss}
            maxLength={2}
            placeholderTextColor={theme.subText}
          />
        </View>
      </View>

      <View style={[styles.timerCircle, { 
        borderColor: isActive ? '#FF9500' : theme.primary,
        backgroundColor: theme.card 
      }]}>
        <Text style={[styles.timeText, { color: theme.text }]}>{formatTime(secondsLeft)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            { 
              backgroundColor: sound 
                ? '#FF3B30' 
                : (isActive) 
                  ? '#FF9500' 
                  : '#4CD964' 
            }
          ]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>
            {sound ? 'Stop' : (isActive ? 'Pause' : 'Start')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.resetButton, { borderColor: theme.border }]} 
          onPress={resetTimer}
        >
          <Text style={[styles.resetButtonText, { color: theme.subText }]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
  },
  inputGroup: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    fontSize: 20,
    width: 50,
    textAlign: 'center',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    // Sjena za krug
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 60
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Timer;