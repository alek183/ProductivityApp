import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';

const Timer = () => {
  const [minInput, setMinInput] = useState('25');
  const [secInput, setSecInput] = useState('00');
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
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
    updateSeconds(text, secInput);
  };

  const handleSecChange = (text) => {
    setSecInput(text);
    updateSeconds(minInput, text);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTimer = () => {
    setIsActive(false);
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
          style={[styles.button, { backgroundColor: isActive ? '#FF3B30' : '#4CD964' }]}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'Pause' : 'Start'}
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: -90,
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
    marginBottom: -5,
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