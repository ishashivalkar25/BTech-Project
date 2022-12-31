import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import { auth , db } from '../Firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc , setDoc  } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from "./Background";
import Btn from "./Btn";
import Field from "./Field";
import { darkGreen } from "./Constants";
import { useNavigation } from '@react-navigation/core'


export default function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState(0);
  const [DOB, setDOB] = React.useState(new Date());
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accBalance, setAccBalance] = React.useState(0.0);
  const [text, setText] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [emailValidity, setEmailValidity] = React.useState(true);
  const [passwordValidity, setPasswordValidity] = React.useState(true);
  const [confirmPasswordValidity, setConfirmPasswordValidity] = React.useState(true);
  const [phoneNumberValidity, setPhoneNumberValidity] = React.useState(true);

  const navigation = useNavigation();

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

    if(name === "" || email === "" || phoneNo === 0 || DOB || password === "" || confirmPassword === "" || bankName === "" || accBalance === 0 || passwordValidity || phoneNumberValidity || emailValidity || confirmPasswordValidity)
    {
      alert("Please enter all required fields correctly!");
      return false;
    }
    return true;
  }

  const signUpToAcc = ()=>
  {
    if(validateInputOnSubmit())
    {
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
    //
    <View>
      <Background>
      <ScrollView contentContainerStyle={{paddingBottom: 120}}>
        <View style={{alignItems: 'center', width: 460 }}>
          <Text
              style={{
                color: 'white',
                fontSize: 64,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Register
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Create a new account
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>

            <Field placeholder="First Name" onChangeText={(text)=>setName(text)}/>

            <Field
              placeholder="Email / Username"
              keyboardType={'email-address'}
              onChangeText={(text)=>handleEmailChange(text)}
            />
            {!emailValidity && <Text style={styles.tip}>Invalid email!</Text>}

            <Field placeholder="Contact Number" keyboardType={'numeric'} onChangeText={(text)=>handlePhoneNumberChange(text)}/>
            {!phoneNumberValidity && <Text style={styles.tip}>Please enter valid Phone number!</Text>}

            <Text>Date of Birth :</Text>
            <Button title={text} onPress={() => setShow(true)}></Button>

            <Field placeholder="Password" secureTextEntry={true} onChangeText={(text)=>handlePasswordChange(text)}/>
            {!passwordValidity && <Text style={styles.tip}>Please enter strong password!</Text>}

            <Field placeholder="Confirm Password" secureTextEntry={true} onChangeText={(text)=>handleConfirmPasswordChange(text)}/>
            {!confirmPasswordValidity && <Text style={styles.tip}>It should match with the new password!</Text>}

            <Field placeholder="Bank Name" onChangeText={(text)=>setBankName(text)}/>

            <Field placeholder="Account Balance" keyboardType="decimal-pad" onChangeText={(text)=>setAccBalance(text)} />


            {show && (
              <DateTimePicker
              testID = 'dateTimePicker'
              value = {DOB}
              display="default"
              is24Hour={true}
              onChange={onChange}
            />)}

            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Signup"
              Press={signUpToAcc}
            />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Already have an account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.replace('Login')}>
                <Text
                  style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Background>
     
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
  },
  tip:{
    color:"red", 
    textAlign: 'left', 
    width: '78%', 
    paddingLeft: 10
  }
});
