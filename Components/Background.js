import React from "react";
import { View, ImageBackground } from "react-native";

import {useSafeAreaInsets} from 'react-native-safe-area-context'; 

const Background = ({children }) => {

  const insets = useSafeAreaInsets();
  return (
    <View style={{marginTop:insets.top}}>
      <ImageBackground
        source={require('../assets/background4.jpg')}
        style={{ height: "100%"}}
      />
      <View style={{ position: "absolute" }}>{children}</View>
    </View>
  );
};

export default Background;
