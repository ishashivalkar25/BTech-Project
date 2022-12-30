import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import { auth , db } from '../Firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc , setDoc  } from "firebase/firestore"; 
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [DOB, setDOB] = React.useState(new Date());
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accBalance, setAccBalance] = React.useState(0.0);
  const [text, setText] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [emailValidity, setEmailValidity] = React.useState(false);
  const [passwordValidity, setPasswordValidity] = React.useState(false);
  const [confirmPasswordValidity, setConfirmPasswordValidity] = React.useState(false);
  const [phoneNumberValidity, setPhoneNumberValidity] = React.useState(false);

  const handleEmailChange = (emailInput) => {

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(emailInput) === true){
      setEmailValidity(true);
      setEmail(emailInput);
    }
    else{
      setEmailValidity(false);
    }
  }

  const handlePhoneNumberChange = (phoneNumberInput) => {

    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(phoneNumberInput) === true){
      setPhoneNumberValidity(true);
      setPhoneNo(phoneNumberInput);
    }
    else{
      setPhoneNumberValidity(false);
    }

  }
  
  const handlePasswordChange = (passwordInput) => {
    const reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    if (reg.test(passwordInput) === true){
      setPasswordValidity(true);
      setPassword(passwordInput);
    }
    else{
      setPasswordValidity(false);
    }
  }

  const handleConfirmPasswordChange = (confirmPasswordInput) => {

      if(confirmPasswordInput === password)
      {
        setConfirmPasswordValidity(true);
      }
      else{
        setConfirmPasswordValidity(false);
      }
  }

  const validateInputOnSubmit = () => {
    
  }

  const signUpToAcc = ()=>{

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Sign In Successfully!!!", user.uid);
    
        try {
          setDoc(doc(db, "User", user.uid), {
            name: name,
            email: email,
            phoneNo: phoneNo,
            DOB:DOB,
            password:password,
            bankName: bankName,
            accBalance: accBalance
          });
          console.log("User Added Successfully to database!!! ");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch(error => {
        // signUpSuccess = false;
        console.error("Sign In Unsuccesfull!!!", error);
      });
  }

  const onChange = (event, selectedDate) => {
    console.log("Inside");
    setShow(false);
    console.log(selectedDate);
    console.log(DOB);
    const currentDate = selectedDate || DOB;
    setDOB(currentDate);
    console.log(DOB, "new");
    const tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/'+ tempDate.getMonth() + '/' +tempDate.getFullYear(); 
    setText(fDate);
    console.log(fDate, "Date");
    
  }


  return (
    <View style={styles.container}> 
      {/* <Text>Sign Up</Text> */}
      <ScrollView>
        <Text>Name :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>setName(text)} placeholder="Enter Your Name"></TextInput>
        <Text>Email ID :</Text>
        <TextInput autoCapitalize="none" style={styles.input} onChangeText={(text)=>handleEmailChange(text)} placeholder="Enter Email" keyboardType = "email-address"></TextInput>
        {!emailValidity && <Text>Invalid email!</Text>}
        <Text>Phone Number :</Text>
        <TextInput keyboardType = 'numeric' style={styles.input} onChangeText={(text)=>handlePhoneNumberChange(text)} placeholder="Enter Phone Number"></TextInput>
        {!phoneNumberValidity && <Text>Please enter valid Phone number!</Text>}
        <Text>Date of Birth :</Text>
        <Button title={text} onPress={() => setShow(true)}></Button>
        <Text>Password :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handlePasswordChange(text)} placeholder="Enter Password" secureTextEntry></TextInput>
        {!passwordValidity && <Text>Please enter strong password!</Text>}
        <Text>Confirm Password :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handleConfirmPasswordChange(text)} placeholder="Please re-enter Password"></TextInput>
        {!confirmPasswordValidity && <Text>It should match with the new password!</Text>}
        <Text>Bank Name :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>setBankName(text)} placeholder="Enter Bank Name"></TextInput>
        <Text>Account Balance :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>setAccBalance(text)} placeholder="Enter Account Balance" keyboardType="decimal-pad"></TextInput>

        <Button title="Sign Up" color="blue" onPress={signUpToAcc}></Button>
      </ScrollView>
      {show && (
        <DateTimePicker
        testID = 'dateTimePicker'
        value = {DOB}
        display="default"
        is24Hour={true}
        onChange={onChange}
      />)}
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
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginTop:5,
    marginBottom :5,
    width:300,
    padding: 10,
  }
});
