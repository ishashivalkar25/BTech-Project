import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen, green } from "./Constants";

const Index = (props) => {
    
    return (
        <Background>
            <View style={{marginTop:40}}></View>
            <View style={{ marginHorizontal: 50, marginVertical: 50 }}>
                <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
                Money Income &{" "}
                </Text>
                <Text
                style={{
                    color: "white",
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 40,
                }}
                >
                Expense Tracker
                </Text>
                {/* <Lottie animationData={animation1} /> */}
            </View>
            
            <View
                style={{
                backgroundColor: "white",
                // marginTop: "700",
                height: 400,
                width: 420,
                borderTopLeftRadius: 140,
                borderTopEndRadius: 140,
                paddingTop: 100,
                }}
            >
                <View
                    style={{
                        backgroundColor: "lightgrey",
                        alignItems: "center",
                        // marginTop: "700",
                        height: 400,
                        width: 420,
                        borderTopLeftRadius: 140,
                        borderTopEndRadius: 140,
                        paddingTop: 100,
                    }}
                    >
                    <View
                        style={{
                        backgroundColor: "grey",
                        alignItems: "center",
                        // marginTop: "700",
                        height: 400,
                        width: 420,
                        borderTopLeftRadius: 140,
                        borderTopEndRadius: 140,
                        paddingTop: 100,
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            > 
                            <Btn
                                bgColor={green}
                                textColor="white"
                                btnLabel="Login"
                                Press={() => props.navigation.navigate("Login")}
                            />
                            <Btn
                                bgColor="white"
                                textColor={darkGreen}
                                btnLabel="Signup"
                                Press={() => props.navigation.navigate("Sign Up")}
                            />
                        </View>
                    </View>
                </View>
            </View>  
            
        </Background>
    )
}

export default Index;

const styles = StyleSheet.create({})
