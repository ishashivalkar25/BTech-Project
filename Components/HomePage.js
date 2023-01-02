import * as React from 'react'
import {Text,View,Button,StyleSheet,Image, TouchableOpacity, Dimensions} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createMaterialTopTabNavigator();
const BTab = createBottomTabNavigator();
const {height, width} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/core';

function Income(props){
    const navigation = useNavigation();
    const signOutFromAcc = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login");
                console.log("Sign out")
            })
            .catch(error => console.error(error.message));
    }
    return(
        <View >
        <View style={{width:'100%',height:'100%',flexDirection:'column',justifyContent: 'flex-end'}}>
        <View style={{width:'100%', height:100, justifyContent: 'flex-end',alignItems: 'center'}}>
          <View style={{width:'100%',height:70, position:'absolute', bottom:0, backgroundColor:'white', flexDirection:'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
              style={{
                  width:'33%',
                  height:'100%',
                  justifyContent: 'center',
                  alignItems: 'center'
              }}
              >
                
                  
              </TouchableOpacity>
          </View>
  
          <View style={{alignSelf: 'center'}}>
          <View style={{alignSelf: 'center',height: '100%'}}>
                <View style={{backgroundColor:'white',width:68,borderRadius:35}}>
                <View 
                    style={{width:60,
                    height:60,
                    borderRadius:35,
                    backgroundColor:'red',
                    justifyContent:'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop:5,
                    marginBottom:5 
                }}
                onStartShouldSetResponder={()=>{props.navigation.navigate('AddIncome')}}
                >
                <Image source={require('../assets/plus.jpeg')}
                  style={{width:30,height:30}}
                  onPress={() => console.log('image pressed')}
                  />
                </View>
                </View>
          </View>

          </View>
          
      </View>
        </View>
        <View>
            <Text>Home</Text>
            <Button title="Sign Out" onPress={signOutFromAcc}></Button>
        </View>
      </View>
    )
}

function Expense(){
    return(
        <View>
            <Text>Expense page</Text>
        </View>
    )
}

function MyTabs({navigation}) {

    const insets = useSafeAreaInsets();

    return(
        <Tab.Navigator
        initialRouteName="Income"
        tabBarOptions={{
            activeTintColor:'#e91e63',
            labelStyle:{fontSize:12},
            style:{backgroundColor:'white',marginTop:insets.top}
        }}>
            <Tab.Screen 
            name="Income"
            component={Income} 
            />

            <Tab.Screen 
            name="Expense"
            component={Expense} 
            options={{tabBarLabel:'Expense'}}/>

            
        </Tab.Navigator>
    )
}

const Add=({children,onPress})=>{
    <TouchableOpacity 
    style={{
        top:-30,
        justifyContent:'center',
        alignItems: 'center',
        ...styles.shadow
    }}
    onPress={onPress}>
        <View
        style={{
            width: 70,
            height: 70,
            borderRadius:35,
            backgroundColor:'red'   //'#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
}

function BottomTab(){
    return(
        <BTab.Navigator
        tabBarOptions={{
            showLabel:false,
            style: {
                position: 'absolute',
                bottom: 25,
                left:20,
                right:20,
                elevation: 0,
                backgroundColor:'skyblue',
                borderRadius: 15,
                height:90,
                ...styles.shadow
            }
        }}>
            <BTab.Screen name="Add" component={Add}
            options={{
                tabBarIcon: ({focused})=>(
                    <Image
                    source={require('../assets/plus.jpeg')}
                    resizeMode="contain"
                    style={{
                        width:30,
                        height:30,
                        tintColor:'#fff'
                    }}
                    />
                ),
                tabBarButton:(props)=>(
                    <Add {...props} />
                )
            }}
                />
        </BTab.Navigator>
    )
}

export default function HompePage({navigation}){
    return(
        // <NavigationContainer independent={true}>
            <MyTabs navigation={navigation}/>
        // </NavigationContainer>
    )
}

const styles = StyleSheet.create({

    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity:0.25,
        shadowRadius: 3.5,
        elevation:5


    }
})