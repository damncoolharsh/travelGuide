import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Icons} from '../utils/images';

type Props = {
  horizontal: boolean;
  color: string;
};

export default function AnimatedArrow({horizontal, color}: Props) {
  const arrowRef = useRef(new Animated.Value(0)).current;
  const arrowRotate = arrowRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  useEffect(() => {
    return () => {
      arrowRef.stopAnimation();
    };
  }, []);

  useEffect(() => {
    toggleArrow(horizontal);
  }, [horizontal]);

  const toggleArrow = (isHorizontal: boolean) => {
    Animated.timing(arrowRef, {
      toValue: isHorizontal ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View style={{transform: [{rotate: arrowRotate}]}}>
      <Image
        source={Icons.arrow}
        style={{...styles.arrowTop, tintColor: color}}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  arrowTop: {
    width: 25,
    height: 25,
  },
});
