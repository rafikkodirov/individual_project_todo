import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Loading02Icon: React.FC<SvgProps> = (props) => {
  // Animated value to track the rotation
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Start the animation with an infinite loop
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000, // 3 seconds for a full rotation
        useNativeDriver: true, // Use the native driver for better performance
      })
    ).start();
  }, [rotateValue]);

  // Interpolate the animated value to degrees
  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 degrees to 360 degrees
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 1C12.5523 1 13 1.44772 13 2V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V2C11 1.4477 11.4477 1 12 1ZM4.21447 4.29283C4.60499 3.90231 5.23815 3.90231 5.62868 4.29283L8.45711 7.12126C8.84763 7.51179 8.84763 8.14495 8.45711 8.53548C8.06658 8.926 7.43342 8.926 7.04289 8.53548L4.21447 5.70705C3.82394 5.31652 3.82394 4.68336 4.21447 4.29283ZM19.7855 4.29283C20.1761 4.68336 20.1761 5.31652 19.7855 5.70705L16.9571 8.53548C16.5666 8.926 15.9334 8.926 15.5429 8.53548C15.1524 8.14495 15.1524 7.51179 15.5429 7.12126L18.3713 4.29284C18.7618 3.90231 19.395 3.90231 19.7855 4.29283ZM1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12C7 12.5523 6.5523 13 6 13H2C1.44772 13 1 12.5523 1 12ZM17 12C17 11.4477 17.4477 11 18 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H18C17.4477 13 17 12.5523 17 12ZM8.45711 15.5429C8.84763 15.9334 8.84763 16.5666 8.45711 16.9571L5.62868 19.7855C5.23815 20.1761 4.60499 20.1761 4.21447 19.7855C3.82394 19.395 3.82394 18.7618 4.21447 18.3713L7.04289 15.5429C7.43342 15.1524 8.06658 15.1524 8.45711 15.5429ZM15.5429 15.5429C15.9334 15.1524 16.5666 15.1524 16.9571 15.5429L19.7855 18.3713C20.1761 18.7618 20.1761 19.395 19.7855 19.7855C19.395 20.1761 18.7618 20.1761 18.3713 19.7855L15.5429 16.9571C15.1524 16.5666 15.1524 15.9334 15.5429 15.5429ZM12 17C12.5523 17 13 17.4477 13 18V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V18C11 17.4477 11.4477 17 12 17Z"
        />
      </Svg>
    </Animated.View>
  );
};
