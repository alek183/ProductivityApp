import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Tasks = ({ navigation, tasks, deleteTask, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.header, { color: theme.text }]}>My Schedule</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskCard, { backgroundColor: theme.card }]}>
            <View style={styles.textContainer}>
              <Text style={[styles.taskTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.taskDate, { color: theme.primary }]}>{item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.subText }]}>No tasks yet!</Text>
        }
      />
      
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.primary, shadowColor: theme.primary }]} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50 
  },
  header: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    marginTop: 60 
  },
  taskCard: { 
    flexDirection: 'row', 
    padding: 16, 
    marginVertical: 8, 
    marginHorizontal: 20, 
    borderRadius: 15, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4 
  },
  textContainer: { 
    flex: 1 
  },
  taskTitle: { 
    fontSize: 18, 
    fontWeight: '600' 
  },
  taskDate: { 
    fontSize: 14, 
    marginTop: 4 
  },
  deleteButton: { 
    color: '#FF3B30', 
    fontSize: 22, 
    fontWeight: 'bold', 
    padding: 5 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    fontSize: 16 
  },
  fab: { 
    position: 'absolute', 
    bottom: 40, 
    right: 30, 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  fabText: { 
    color: '#fff', 
    fontSize: 35, 
    fontWeight: '300', 
    bottom: 2 
  },
});

export default Tasks;