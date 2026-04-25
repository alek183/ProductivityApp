import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Vibration } from 'react-native';
import { Audio } from 'expo-av';

const Timer = () => {
  const [minInput, setMinInput] = useState('25');
  const [secInput, setSecInput] = useState('00');
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [sound, setSound] = useState(null);

  async function playSound() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../components/loud_alarm.mp3'),
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
    <View style={styles.container}>
      <Text style={styles.title}>Focus Timer</Text>

      <View style={styles.inputWrapper}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Min:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={minInput}
            onChangeText={handleMinChange}
            onBlur={Keyboard.dismiss}
            maxLength={2}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sec:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={secInput}
            onChangeText={handleSecChange}
            onBlur={Keyboard.dismiss}
            maxLength={2}
          />
        </View>
      </View>

      <View style={styles.timerCircle}>
        <Text style={styles.timeText}>{formatTime(secondsLeft)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            { 
              backgroundColor: sound 
                ? '#FF3B30' 
                : (isActive || (secondsLeft === 0 && isActive)) 
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

        <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    fontSize: 20,
    width: 50,
    textAlign: 'center',
    paddingBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 10,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 120
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
    borderColor: '#eee',
    minWidth: 120,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Timer;