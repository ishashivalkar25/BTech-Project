import React from 'react'
import { View, Text, Linking, FlatList, } from 'react-native'
import { darkGreen } from "./Constants";
import Btn from "./Btn";

export default function AddExpense() {

    const addExpenseByScanningBills = () => {
     
    }

    const redirectToPaymentApps = () => {
        
    }
    
    const addExpenseManually = () => {
        
    }
    return (
        <View>
            <FlatList
                data={[{ 1: { key: 'row1' } }, { 2: { key: 'row2' } }, { 3: { key: 'row3' } }, { 4: { key: 'row4' } }, { 5: { key: 'row5' } }]}
                renderItem={({ item, index }) =>
                        <View style={{backgroundColor:"pink"}}>
                            <Text>{item.key}</Text>
                        </View>}
                enableEmptySections={true}
                keyExtractor={(item, index) => index}
                style={{ borderColor: 'red', borderWidth: 1 , flex: 1 ,  width: "100%", height: 30} }
            />
        </View>
    )
}
