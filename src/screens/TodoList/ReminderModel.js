import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useStore } from '../../store/store';
import { todo } from '../../services';

const ReminderModal = ({ showReminderModal, onCloseReminderModal, todoid }) => {
  const todoList = useStore(state => state.todoList);
  const refresh = useStore(state=>state.refresh);
  const setTodoList = useStore(state => state.setTodoList);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleSave = () => {
    const datePart = moment(date).format('YYYY-MM-DD');
    const timePart = moment(time).format('HH:mm:ss');
    const combinedDateTime = moment(`${datePart}T${timePart}.000Z`).toISOString();
    // const  = todoList.map(todo =>
    //   todo.id === id ? { ...todo, reminder: combinedDateTime } : todo
    // );
    todo.update({todoid,reminder:combinedDateTime});
    setTodoList(!refresh)
    onCloseReminderModal();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  return (
    <Modal visible={showReminderModal} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Date and Time</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={() => setShowDate(true)} style={styles.modeToggleButton}>
              <Text style={styles.modeToggleText}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTime(true)} style={styles.modeToggleButton}>
              <Text style={styles.modeToggleText}>Time</Text>
            </TouchableOpacity>
          </View>
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
              is24Hour={true}
            />
          )}
          <Text style={styles.dateText}>{moment(date).format('YYYY-MM-DD')}</Text>
          <Text style={styles.timeText}>{moment(time).format('HH:mm:A')}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCloseReminderModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modeToggleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modeToggleText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    color: 'black',
    marginVertical: 10,
  },
  timeText: {
    color: 'black',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
