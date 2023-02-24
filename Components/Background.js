import React from "react";
import { View, ImageBackground, ScrollView , Dimensions} from "react-native";

import {useSafeAreaInsets} from 'react-native-safe-area-context'; 
const { width, height } = Dimensions.get("window");
const Background = ({children}) => {

  const insets = useSafeAreaInsets();
  return (
    
    <View style={{marginTop:insets.top}}>
      <ImageBackground
        source={require('../assets/background4.jpg')}
        style={{width: width, height: height}}
      >
        {/* <ScrollView contentContainerStyle={{paddingBottom: 50}}> */}
          <View >{children}</View>
        {/* </ScrollView> */}
      </ImageBackground>
    </View>
  );
};

export default Background;
