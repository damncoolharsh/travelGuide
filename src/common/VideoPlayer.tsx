import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Video, {
  OnBufferData,
  OnVideoErrorData,
  VideoRef,
} from 'react-native-video';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/constants';

type Props = {
  url: string;
  shouldPlay: boolean;
  shouldStop: boolean;
  style?: StyleProp<ViewStyle>;
  onVideoBuffer?: (isBuffering: boolean) => void;
};

export default function VideoPlayer({
  url,
  shouldPlay,
  onVideoBuffer,
  shouldStop = true,
  style,
}: Props): React.JSX.Element {
  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      if (shouldPlay) {
        videoRef.current.resume();
      } else {
        videoRef.current.pause();
      }
    }
  }, [shouldPlay]);
  // Video Events
  const onVideoBufferLocal = (event: OnBufferData) => {
    // console.log('onVideoBuffer');
    onVideoBuffer?.(event.isBuffering);
  };

  const onVideoError = (event: OnVideoErrorData) => {
    // console.log('onVideoError');
  };
  return (
    <View>
      <Video
        source={{uri: shouldStop ? undefined : url}}
        ref={videoRef}
        onBuffer={onVideoBufferLocal}
        onError={onVideoError}
        style={[styles.backgroundVideo, style]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
