import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

type Props = {
  heading: string;
  subHeading: string;
  location: string;
  shouldAnimate: boolean;
  theme?: 'dark' | 'light';
};

export default function AnimatedHeading({
  heading,
  subHeading,
  location,
  shouldAnimate,
  theme,
}: Props): React.JSX.Element {
  // Animation For City
  const fadeAnimCity = useRef(new Animated.Value(0)).current;
  const moveAnimCity = useRef(new Animated.Value(0)).current;

  // Animation For Title
  const fadeAnimTitle = useRef(new Animated.Value(0)).current;
  const moveAnimTitle = useRef(new Animated.Value(0)).current;

  // Animation For Location
  const words = location.split(' ');
  const animValues = words.map(() => new Animated.Value(0));
  const animatedWords = words.map((word, index) => ({
    word,
    opacity: animValues[index],
    translateY: animValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }),
  }));

  useEffect(() => {
    return () => {
      fadeAnimCity.stopAnimation();
      moveAnimCity.stopAnimation();
      fadeAnimTitle.stopAnimation();
      moveAnimTitle.stopAnimation();
    };
  });

  useEffect(() => {
    if (shouldAnimate) {
      startAnimating();
    }
  }, [shouldAnimate]);

  function startAnimating() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnimCity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimCity, {
          toValue: -20,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnimTitle, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimTitle, {
          toValue: -20,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        100,
        animatedWords.map((_, i) =>
          Animated.timing(animValues[i], {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }

  return (
    <View style={styles.main}>
      <Animated.Text
        style={[
          styles.headingStyle,
          {
            color: theme === 'dark' ? 'white' : 'black',
            opacity: fadeAnimCity,
            transform: [{translateY: moveAnimCity}],
          },
        ]}>
        {heading}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subHeadingStyle,
          {
            color: theme === 'dark' ? 'white' : 'black',
            opacity: fadeAnimTitle,
            transform: [{translateY: moveAnimTitle}],
          },
        ]}>
        {subHeading}
      </Animated.Text>
      <View style={{flexDirection: 'row'}}>
        {animatedWords.map((word, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.locationText,
              {
                color: theme === 'dark' ? 'white' : 'black',
                opacity: word.opacity,
                // transform: [{translateY: word.translateY}],
              },
            ]}>
            {word.word}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    gap: 8,
    marginTop: 30,
  },
  headingStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  subHeadingStyle: {
    fontSize: 32,
    maxWidth: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  locationPoints: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationText: {
    fontSize: 12,
  },
});
