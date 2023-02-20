import * as React from "react";
import {
    Text,
    View,
    Button,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets, SafeAreaView} from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth, db, collection, getDocs, doc} from "../Firebase/config";
import MyPieChart from "./MyPieChart.js"

const Tab = createMaterialTopTabNavigator();
const BTab = createBottomTabNavigator();
const { height, width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/core";
import Background from "./Background";
import { TabView, SceneMap } from 'react-native-tab-view';
import DateTimePicker from "@react-native-community/datetimepicker";

const months = [
    {
        key: 1,
        name: "JAN"
    },
    {
        key: 2,
        name: "FEB"
    },
    {
        key: 3,
        name: "MAR"
    },
    {
        key: 4,
        name: "APR"
    },
    {
        key: 5,
        name: "MAY"
    },
    {
        key: 6,
        name: "JUN"
    },
    {
        key: 7,
        name: "JUL"
    },
    {
        key: 8,
        name: "AUG"
    },
    {
        key: 9,
        name: "SEP"
    },
    {
        key: 10,
        name: "OCT"
    },
    {
        key: 11,
        name: "NOV"
    },
    {
        key: 12,
        name: "DEC"
    },
]


function Income(props) {
    const [recordsFilter, setRecordsFilter] = React.useState("Day");

    const [datePicker, setDatePicker] = React.useState(false);

    const [date, setDate] = React.useState(new Date());
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [period, setPeriod] = React.useState("");
    const [totalIncome, setTotalIncome] = React.useState(0.0);
    const [incomeRecords, setIncomeRecords] = React.useState([]);
    const [incomeRecordsDateWise, setIncomeRecordsDateWise] = React.useState([]);
    const [incomeRecordsMonthWise, setIncomeRecordsMonthWise] = React.useState([]);
    const [incomeRecordsYearWise, setIncomeRecordsYearWise] = React.useState([]);
    const [filteredRecords, setFilteredRecords] = React.useState([]);
    const [categoryWiseInc, setCategoryWiseInc] = React.useState([]);


    function onDateSelected(event, value) {
        const tempDate = new Date();
        if (value.getTime() > tempDate.getTime()) {
            alert("Please select valid date!!")
            setDate(tempDate);
        }
        setDate(value);
        setDatePicker(false);
    }

    React.useEffect(() => {
        console.log("\n\nInside Record Filter\n\n", recordsFilter);
        // filterRecordsDateWise();
        if (recordsFilter == "Day") 
        {
            console.log("\n\Date\n\n")
            filterRecordsDateWise();
        }
        else if (recordsFilter == "Month") {
            console.log("\n\nMonth\n\n")
            filterRecordsMonthWise();
        }
        else {

            console.log("\n\YYear\n\n")
            filterRecordsYearWise();
        }
        
    }, [recordsFilter,date, month, year]);

    React.useEffect(() => {
        fetchRecords();
    }, []);

    const getDateFormat = (timestamp) =>{
        const tempDate = new Date(timestamp*1000);
        console.log(tempDate, "Templ Date");
        return tempDate.getDate() + ' / ' + (tempDate.getMonth() + 1) + ' / ' + tempDate.getFullYear();
    }
    const fetchRecords = async() => {
        try {
            // let newData = [];
            // await getDocs(collection(doc(db,"User",auth.currentUser.uid), "Income"))
            // .then((querySnapshot)=>{               
            //     newData = querySnapshot.docs
            //         .map((doc) => ({...doc.data(), key:doc.id }));
            //         setIncomeRecords(newData);  
            // })
            // setIncomeRecords(incomeRecords);
            // // console.log(incomeRecords, "Data\n\n");
            const tempRecords = [];
            const querySnapshot = await getDocs(collection(doc(db,"User",auth.currentUser.uid), "Income"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const record = { 
                    "key":doc.id,
                    "incAmount": data.incAmount, 
                    "incDescription": data.incDescription, 
                    "incCategory": data.incCategory, 
                    "incDate": data.incDate 
                };
                incomeRecords.push(record)
                setIncomeRecords(tempRecords);
            });
            filterRecordsDateWise();
            filterRecordsCategotyWise();
            console.log(incomeRecords, "data");
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const filterRecordsDateWise = () => {
        const tempRecords = [];
        incomeRecords.forEach((incomeRecord) => {
            const recordDate = getDateFormat(incomeRecord.incDate.seconds);
            const desiredDate = date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear();
            if(recordDate==desiredDate)
            {
                tempRecords.push(incomeRecord);
                console.log(incomeRecord, "Datewise");
            }
        })
        setFilteredRecords(tempRecords);
    }
    const filterRecordsMonthWise = () => {
        const tempRecords = [];
        incomeRecords.forEach((incomeRecord) => {
            const recordMonth = new Date(incomeRecord.incDate.seconds*1000).getMonth();
            if(recordMonth==month)
            {
                tempRecords.push(incomeRecord);
                console.log(incomeRecord, "MonthWise");
            }
        })
        setFilteredRecords(tempRecords);
    }
    const filterRecordsYearWise = () => {
        const tempRecords = [];
        incomeRecords.forEach((incomeRecord) => {
            const recordYear = new Date(incomeRecord.incDate.seconds*1000).getMonth();
            if(recordYear==year)
            {
                tempRecords.push(incomeRecord);
                console.log(incomeRecord, "YearWise");
            }
        })
        setFilteredRecords(tempRecords);
    }

    const filterRecordsCategotyWise = () => {
        const categoryWiseAmt = [];
        const category = [];
        incomeRecords.forEach((incomeRecord) => {
            console.log(incomeRecord.incCategory, "Category Income");
            // const recordYear = new Date(incomeRecord.incDate.seconds*1000).getMonth();
            if(!category.includes(incomeRecord.incCategory))
            {
                category.push(incomeRecord.incCategory);
                const data = { "name" : incomeRecord.incCategory , "amount" : incomeRecord.incAmount };
                categoryWiseAmt.push(data);
                // console.log(incomeRecord, "YearWise");
            }
            else
            {
                categoryWiseAmt.forEach((item)=>{
                    if(item.category==incomeRecord.incCategory )
                    {
                        item.amount += incomeRecord.incAmount;
                    }
                })
            }
        })
        setCategoryWiseInc(categoryWiseAmt);
        console.log(category, "Category********************************************************************");
        console.log(categoryWiseAmt, "Category------------------------------**********************************");
    }
    return (
        <>
            <View  style={{ width: "100%" }}>
                <ImageBackground
                    source={require("../assets/background4.jpg")}
                    style={{
                        height: "100%",
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.records_filter}>
                            <TouchableOpacity onPress={() => { setRecordsFilter("Day") }}>
                                <Text>Day</Text>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => { setRecordsFilter("Month") }}>
                                <Text>Month</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setRecordsFilter("Year") }}>
                                <Text>Year</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <Text>Period</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{ backgroundColor: "yellow" }}>
                            {(recordsFilter == "Day") && (<View style={styles.choose_filter_date}>
                                <TouchableOpacity onPress={() => setDatePicker(true)}>
                                    <Text>{date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()}</Text>
                                </TouchableOpacity>
                            </View>)}
                            {(recordsFilter == "Month") && (<View style={styles.choose_filter}>
                                <TouchableOpacity disabled={month == 0 ? true : false} onPress={() => { setMonth(month - 1) }}>
                                    <Image
                                        source={require("../assets/previous.png")}
                                        style={{ width: 15, height: 15 }}
                                        onPress={() => console.log("image pressed")}
                                    />
                                </TouchableOpacity>
                                <Text>{month}</Text>
                                <TouchableOpacity disabled={month == 11 ? true : false} onPress={() => { setMonth(month + 1) }}>
                                    <Image
                                        source={require("../assets/next.png")}
                                        style={{ width: 15, height: 15 }}
                                        onPress={() => console.log("image pressed")}
                                    />
                                </TouchableOpacity>
                            </View>)}
                            {(recordsFilter == "Year") && (<View style={styles.choose_filter}>
                                <TouchableOpacity disabled={year == 1 ? true : false} onPress={() => { setYear(year - 1) }}>
                                    <Image
                                        source={require("../assets/previous.png")}
                                        style={{ width: 15, height: 15 }}
                                        onPress={() => console.log("image pressed")}
                                    />
                                </TouchableOpacity>
                                <TextInput keyboardType="numeric" onChangeText={(text) => {
                                    const tempYear = new Date().getFullYear();
                                    if (Number(text) && Number(text) <= tempYear) {
                                        setYear(Number(text))
                                    }
                                    else {
                                        alert("Enter valid year!!");
                                        setYear(tempYear);
                                        console.log(year)
                                    }
                                }}>{year}</TextInput>

                                <TouchableOpacity disabled={year == (new Date().getFullYear()) ? true : false} onPress={() => { setYear(year + 1) }}>
                                    <Image
                                        source={require("../assets/next.png")}
                                        style={{ width: 15, height: 15 }}
                                        onPress={() => console.log("image pressed")}
                                    />
                                </TouchableOpacity>
                            </View>)}

                            {datePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode={"date"}
                                    is24Hour={true}
                                    onChange={onDateSelected}
                                />
                            )}


                        </View>
                        <View style={styles.total_amt}>
                            {/* <View>
                                <Text style={styles.amt_heading}>Total Amount</Text>
                            </View> */}
                            {/* <View style={styles.amt_circle}>
                                <Text style={styles.amt_circle_text}>{totalIncome}</Text>
                            </View> */}
                            <MyPieChart data={categoryWiseInc}/>
                        </View>

                    </View>

                    <View style={styles.record_container}>

                        {filteredRecords.length > 0 && (<FlatList
                            data={filteredRecords}
                            renderItem={({ item }) =>
                                <View style={styles.record}>
                                    <Text>{getDateFormat(item.incDate.seconds)}</Text>
                                    <Text>{item.incCategory}</Text>
                                    <Text>{item.incAmount}</Text>
                                </View>
                            }
                            enableEmptySections={true}
                        />)}

                    </View>
                    <View
                        style={{
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 20,
                            bottom: 20
                        }}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                backgroundColor: "#006A42",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                            onStartShouldSetResponder={() => {
                                props.navigation.navigate("AddIncome");
                            }}
                        >
                            <Image
                                source={require("../assets/add.png")}
                                style={{ width: 30, height: 30 }}
                                onPress={() => console.log("image pressed")}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
}

function Expense(props) {
    return (
        <>
            <View style={{ width: "100%" }}>
                <ImageBackground
                    source={require("../assets/background4.jpg")}
                    style={{
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 40,
                        }}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                                backgroundColor: "#006A42",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                            onStartShouldSetResponder={() => {
                                props.navigation.navigate("AddExpense");
                            }}
                        >
                            <Image
                                source={require("../assets/add.png")}
                                style={{ width: 30, height: 30 }}
                                onPress={() => console.log("image pressed")}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
}

function MyTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "white",
                    color: "green",
                    marginTop: insets.top,
                },
                height:100
            }}
        >
            <Tab.Screen name="Income" component={Income} />

            <Tab.Screen
                name="Expense"
                component={Expense}
                options={{ tabBarLabel: "Expense" }}
            />
        </Tab.Navigator>
    );
}

// const Add = ({ children, onPress }) => {
//   <TouchableOpacity
//     style={{
//       top: -30,
//       justifyContent: "center",
//       alignItems: "center",
//       ...styles.shadow,
//     }}
//     onPress={onPress}
//   >
//     <View
//       style={{
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: "red", //'#e32f45'
//       }}
//     >
//       {children}
//     </View>
//   </TouchableOpacity>;
// };

// function BottomTab() {
//   return (
//     <BTab.Navigator
//       tabBarOptions={{
//         showLabel: false,
//         style: {
//           position: "absolute",
//           bottom: 25,
//           left: 20,
//           right: 20,
//           elevation: 0,
//           backgroundColor: "skyblue",
//           borderRadius: 15,
//           height: 90,
//           ...styles.shadow,
//         },
//       }}
//     >
//       <BTab.Screen
//         name="Add"
//         component={Add}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={require("../assets/plus.jpeg")}
//               resizeMode="contain"
//               style={{
//                 width: 30,
//                 height: 30,
//                 tintColor: "#fff",
//               }}
//             />
//           ),
//           tabBarButton: (props) => <Add {...props} />,
//         }}
//       />
//     </BTab.Navigator>
//   );
// }

export default function HompePage(props) {
    const navigation = useNavigation();
    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.header_right}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Visualisation");}}>
                        <Image
                            source={require("../assets/visualization.png")}
                            style={{ width: 25, height: 25, alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOutFromAcc}>
                        <Image
                            source={require("../assets/log-out.png")}
                            style={{ width: 25, height: 25, alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [props.navigation]);

    const signOutFromAcc = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login");
                console.log("Sign out");
            })
            .catch((error) => alert("Cannot signout from the application!!"));
    };
    return (
        // <NavigationContainer independent={true}>
        <View style={{ flex: 1, flexDirection: "column" }}>
            <MyTabs navigation={props.navigation} />
            {/* <Background></Background> */}
        </View>
        // </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header_right:{
        flexDirection: 'row',
        justifyContent: "space-between",
        width:75,
    },
    container: {
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 20,
        height: "40%",
    },
    records_filter: {
        flexDirection: 'row',
        justifyContent: "space-around",
        textAlign: "center",
        height: "15%",
        padding: 5,
    },
    choose_filter: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    choose_filter_date: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    total_amt: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
    },
    amt_circle: {
        width: 150,
        height: 150,
    
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: 'skyblue',
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        elevation: 10,

    },
    amt_circle_text: {
        color: "green",
        fontWeight: "bold",
        fontSize: 20
    },
    amt_heading: {
        color: "green",
        fontWeight: "bold",
        fontSize: 23,
        width: 100,
        textAlign: "center"
    },
    record_container:{
        marginLeft: 10,
        marginRight: 10,
        padding: 0,
        borderRadius: 20,
    },
    record:{
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: 'white',
        height:75,
        borderRadius:15,
        alignItems: "center",
        marginBottom:10,
    }
});
