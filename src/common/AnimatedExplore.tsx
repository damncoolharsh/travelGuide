import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Icons} from '../utils/images';
import {SCREEN_HEIGHT} from '../utils/constants';
import {CircularText} from './CircularText';
import Svg, {
  G,
  Circle,
  TextPath,
  TSpan,
  Text as SvgText,
} from 'react-native-svg';

type Props = {
  isFocused: boolean;
};

export default function AnimatedExplore({isFocused}: Props) {
  const rotateRef = useRef(new Animated.Value(0)).current;
  const arrowRef = useRef(new Animated.Value(0)).current;

  const circleScaleValue = useRef(new Animated.Value(0)).current;
  const circleOpacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotating();

    return () => {
      circleScaleValue.stopAnimation();
      rotateRef.stopAnimation();
      circleOpacityValue.stopAnimation();
      arrowRef.stopAnimation();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      startCircleAnimation();
    }
  }, [isFocused]);

  const startRotating = () => {
    Animated.loop(
      Animated.timing(rotateRef, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const startCircleAnimation = () => {
    Animated.parallel([
      Animated.timing(circleScaleValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(circleOpacityValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(arrowRef, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotation = rotateRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const scale = circleScaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], // Expand to 3 times original size
  });

  const opacity = circleOpacityValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const arrowMove = arrowRef.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 0],
  });

  return (
    <View style={styles.main}>
      <Animated.View
        style={[styles.rotatedView, {transform: [{rotate: rotation}]}]}>
        <Svg viewBox={'0 0 300 300'}>
          <G id="circle">
            <Circle
              r={74}
              x={150}
              y={150}
              fill="none"
              stroke="#fff"
              strokeWidth={0}
              transform="rotate(-145)"
            />
          </G>
          <SvgText fill="#fff" fontSize="20">
            <TextPath href="#circle">
              <TSpan dx="0" dy={-20}>
                EXPLORE. EXPLORE. EXPLORE. EXPLORE.EXPLORE.
              </TSpan>
            </TextPath>
          </SvgText>
        </Svg>
      </Animated.View>
      <View style={styles.button}>
        <Animated.View
          style={[styles.iconStyle, {transform: [{translateX: arrowMove}]}]}>
          <Image source={Icons.rightArrow} style={styles.iconStyle} />
        </Animated.View>
      </View>
      <Animated.View style={[styles.circle, {opacity, transform: [{scale}]}]} />
      {/* <CircularText text="EXPLORE" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  iconStyle: {
    width: 34,
    height: 34,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 50,
    marginBottom: 22,
  },
  rotatedView: {
    position: 'absolute',
    width: 140,
    height: 140,
    bottom: 64,
  },
  circle: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    width: 130,
    height: 130,
    marginBottom: 70,
  },
});
