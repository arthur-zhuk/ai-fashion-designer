import React, { useRef, useEffect } from "react";
import { Animated, Pressable, ImageStyle, View } from "react-native";

interface AnimatedImageProps {
  source: { uri: string };
  style: ImageStyle;
  onPress: () => void;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  source,
  style,
  onPress,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();
  }, [scaleValue]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[style, { overflow: "hidden" }]}>
        <Animated.Image
          source={source}
          style={[
            {
              width: "100%",
              height: "100%",
              transform: [{ scale: scaleValue }],
            },
          ]}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
};

export default AnimatedImage;
