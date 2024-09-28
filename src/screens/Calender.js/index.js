import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AddButton } from '../../components';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store/store';

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const tasks = useStore(state => state.todoList);
  const { navigate } = useNavigation();

  const onDayPress = (day) => {
    const selectedTasks = tasks.filter(task => moment(task.reminder).isSame(day.dateString, 'day'));
    setSelectedDate(day.dateString);
    navigate('ViewDetails', { tasks: selectedTasks, selectedDate: day.dateString });
  };

  const markedDates = tasks.reduce((acc, task) => {
    if (task.reminder) {
      const formattedDate = moment(task.reminder).format('YYYY-MM-DD');
      acc[formattedDate] = { marked: true, dotColor: 'red', selectedColor: 'red' };
      if (formattedDate === selectedDate) {
        acc[formattedDate].selected = true;
        acc[formattedDate].selectedColor = 'blue';
      }
    }
    return acc;
  }, {});

  useEffect(() => {
    if (selectedDate) {
      const selectedTasks = tasks.filter(task => moment(task.reminder).isSame(selectedDate, 'day'));
      navigate('ViewDetails', { tasks: selectedTasks, selectedDate });
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Calendar
        minDate={moment(new Date()).format('YYYY-MM-DD')}
        onDayPress={onDayPress}
        monthFormat={'yyyy MMM'}
        onMonthChange={(month) => { console.log('month changed', month) }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          arrowColor: 'black',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          todayTextColor: 'red',
          selectedDayBackgroundColor: 'blue',
          selectedDotColor: 'blue',
          selectedDayTextColor: 'white',
        }}
      />
      <AddButton />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
