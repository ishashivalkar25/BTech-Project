import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Background from "./Background";
const { width, height } = Dimensions.get("window");

function Container(props) {
  return (
        <View style={{justifyContent:'center',alignItems:'center',width:(width)}}>
          <View style={styles.container1}>
            <Text style={{marginRight:20,marginTop:10}}>{props.record.functionName} Amount : {props.record.item.incAmount} </Text>
            {/* <Text style={{marginRight:20,marginTop:10}}>{props.record.functionName} Category : {props.record.item.incCategory} {props.record.item.expCategory} </Text> */}
            <Text style={{marginRight:20,marginTop:10}}>{props.record.functionName} Date :</Text> 
            {/* <Text style={{marginRight:20,marginTop:10}}>{props.record.functionName} Description : {props.record.item.incDescription} {props.record.item.expDescription} </Text> */}

            
          </View>
        </View>
  );
}

export default Container;

const styles = StyleSheet.create({
  container1: {
    width: (width*0.9),
    height: (height*0.2),
    alignSelf: "center",
    borderRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: "black",
    alignItems:'center',
    marginTop:30,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 5,
    backgroundColor: "white",
  },

  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 610,
    width: 360,
    backgroundColor: "#fff",
    marginTop: 5,
  },

  mainContainer: {
    padding: 20,
    flex: 2,
  },
});