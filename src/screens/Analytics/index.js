import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import BarGraph from './BarGraph';
import ProgressCircle from './ProgressCircle';
import { useStore } from '../../store/store';
import { AddButton } from '../../components';

const RADIUS = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 12;

const Analytics = () => {
  const tasks = useStore(state => state.todoList) || []
  try {
    const completedTasks = tasks?.filter(task => task.status).length;
    const totalTasks = tasks?.length;
    const percentageCompleted = totalTasks === 0 ? 0 : completedTasks / totalTasks;
    return (
      <View style={styles.container}>

        {/* <BarGraph tasks={tasks} /> */}
        <ProgressCircle
          strokeWidth={STROKE_WIDTH}
          radius={RADIUS}
          percentage={percentageCompleted}
          font={30} // Placeholder for font size
          smallerFont={20} // Placeholder for smaller font size
          targetPercentage={percentageCompleted}
        />

        {/* show lebals for the graph */}
        <Text style={{ fontSize: 18, marginTop: 20, color: 'black' }}>Tasks Completed</Text>
        <Text style={{ fontSize: 18, color: 'black' }}>{`${completedTasks} / ${totalTasks}`}</Text>
        <AddButton />
      </View>
    );

  } catch (error) {
    console.log(error)
  }
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    color: 'red',
    fontSize: 24,
    marginBottom: 20,
  },
});
