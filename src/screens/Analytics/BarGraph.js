import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const BarGraph = ({ tasks }) => {
  const now = new Date();
  const last10Days = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const taskCountByDay = last10Days.map(date =>
    tasks.filter(task => task.time.startsWith(date) && task.status).length
  );

  const data = {
    labels: last10Days.map(date => date.split('-').slice(1).join('/')), // Show MM/DD
    datasets: [
      {
        data: taskCountByDay,
      },
    ],
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 20 }}>Tasks Completed in the Last 10 Days</Text>
      <BarChart
        data={data}
        width={width - 30}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default BarGraph;
