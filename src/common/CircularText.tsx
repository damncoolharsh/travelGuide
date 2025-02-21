import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {
  G,
  Circle,
  TextPath,
  TSpan,
  Text as SvgText,
} from 'react-native-svg';

type Props = {
  text: string;
  size?: number;
};
export const CircularText: React.FC<Props> = ({text, size = 130}) => {
  return (
    <View style={[styles.circle, {width: size, height: size}]}>
      <Svg viewBox={'0 0 300 300'}>
        <G id="circle">
          <Circle
            r={74}
            x={150}
            y={176}
            fill="none"
            stroke="#fff"
            strokeWidth={14}
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
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
