import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Skia, Canvas, Path, Paint } from '@shopify/react-native-skia';

const ProgressCircle = ({ strokeWidth, radius, percentage, font, smallerFont, targetPercentage }) => {
  const innerRadius = radius - (strokeWidth / 2);
  const circumference = 2 * Math.PI * innerRadius;
  const progress = circumference * percentage;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  return (
    <View style={styles.container}>
      <Canvas style={{ width: radius * 2, height: radius * 2 }}>
        <Path
          path={path}
          color="#ddd"
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        />
        <Path
          path={path}
          color="orange"
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentage}
        />
      </Canvas>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: font }]}>{`${Math.round(targetPercentage * 100)}%`}</Text>
      </View>
    </View>
  );
};

export default ProgressCircle;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
});
