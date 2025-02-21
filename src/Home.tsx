import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Video, {
  OnBufferData,
  OnVideoErrorData,
  VideoRef,
} from 'react-native-video';
import {
  DataType,
  MOCK_DATA,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Theme,
} from './utils/constants';
import VideoPlayer from './common/VideoPlayer';
import {Icons} from './utils/images';
import AnimatedHeading from './common/AnimatedHeading';
import AnimatedExplore from './common/AnimatedExplore';
import AnimatedArrow from './common/AnimatedArrow';

export default function Home(): React.JSX.Element {
  const videoRef = React.useRef<VideoRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScolling, setIsScolling] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [currentIndex]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken<DataType>[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
    [],
  );

  // Scroll Events
  const onScrollBeiginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setIsScolling(true);
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScolling(false);
  };
  const _renderContent = (item: DataType, index: number) => {
    if (item.image) {
      return (
        <View style={styles.imageView}>
          <Image
            source={{uri: item.image}}
            style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          />
        </View>
      );
    }
    if (item.video) {
      return (
        <View>
          <VideoPlayer
            url={item.video}
            shouldStop={Math.abs(currentIndex - index) > 2}
            shouldPlay={!isScolling && item.index === currentIndex}
          />
        </View>
      );
    }
    return <View></View>;
  };

  const _renderFooter = () => {
    return (
      <View style={styles.footerView}>
        <View style={styles.footerButton}>
          <Image source={Icons.heart} style={styles.footerIcon} />
          <Text style={styles.footerText}>Like</Text>
        </View>
        <View style={styles.footerButton}>
          <Image source={Icons.export} style={styles.footerIcon} />
          <Text style={styles.footerText}>Share</Text>
        </View>
      </View>
    );
  };

  const _renderHeader = () => {
    const tintColor =
      MOCK_DATA[currentIndex].theme === 'dark' ? 'white' : 'black';
    return (
      <View style={styles.headerView}>
        <AnimatedArrow horizontal={currentIndex === 0} color={tintColor} />
        <View style={styles.headaButtonView}>
          <View style={styles.headButton}>
            <Image
              source={Icons.volume}
              style={{...styles.arrowTop, tintColor}}
            />
          </View>
          <View style={styles.headButton}>
            <Image
              source={Icons.menu}
              style={{...styles.arrowTop, tintColor}}
            />
          </View>
        </View>
      </View>
    );
  };

  const _renderTextContent = (item: DataType, index: number) => {
    return (
      <View style={styles.textContent}>
        <AnimatedHeading
          heading={item.address.city}
          subHeading={item.title}
          location={item.locationPoints}
          shouldAnimate={index === currentIndex}
          theme={item.theme as Theme}
        />
        <AnimatedExplore isFocused={index === currentIndex} />
      </View>
    );
  };

  const renderItem = ({item, index}: {item: DataType; index: number}) => {
    return (
      <View style={styles.contentView}>
        {_renderContent(item, index)}
        {_renderHeader()}
        {_renderTextContent(item, index)}
        {_renderFooter()}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList
        data={MOCK_DATA.map((val, index) => ({...val, index}))}
        style={styles.listView}
        renderItem={renderItem}
        snapToInterval={SCREEN_HEIGHT}
        pagingEnabled
        bounces={false}
        decelerationRate={0.99}
        disableIntervalMomentum
        onViewableItemsChanged={onViewableItemsChanged}
        onScrollBeginDrag={onScrollBeiginDrag}
        onScrollEndDrag={onScrollEndDrag}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Item Style
  contentView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    // backgroundColor: 'blue',
  },
  listView: {
    marginTop: 0,
  },
  // Header Style
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight,
  },
  arrowTop: {
    width: 25,
    height: 25,
  },
  headaButtonView: {
    flexDirection: 'row',
    gap: 16,
  },
  headButton: {
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  // Text content
  textContent: {
    flex: 1,
    marginTop: 16,
  },
  // Footer
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '40%',
    justifyContent: 'center',
  },
  footerIcon: {
    width: 16,
    height: 16,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  imageView: {
    position: 'absolute',
  },
  // Content
  headingText: {
    marginTop: 16,
  },
});
