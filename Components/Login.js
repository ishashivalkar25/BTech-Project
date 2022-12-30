import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { auth } from '../Firebase/config'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import DialogInput from 'react-native-dialog-input';

export default function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dialogBoxVisibility, setDialogBoxVisibility] = React.useState(false);
  const [userNameValidity, setUserNameValidity] = React.useState(false);

  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home");
      }
      setUserName("");
      setPassword("");
    });
    return unsubscribe;
  }, []);

  const logInToAcc = ()=>{
    console.log("Logged In Successfully!!!", auth);
    signInWithEmailAndPassword(auth, userName, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("user email :", user.email)
      })
      .catch(error => alert(error.message));
  }

  //validate email i.e username
  const handleUserNameChange = (userNameInput) => {

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userNameInput) === true){
      setUserName(userNameInput);
      setUserNameValidity(true);
    }
    else{
      setUserNameValidity(false);
      setUserName("");
    }
  }
  

  const redirectToSignUp = () => {
    navigation.replace("Sign Up");
  }

  const forgotPassword = () => {
    setDialogBoxVisibility(true);
  }

  const passwordResetEmail = (emailInput) => {
    console.log("Email : ", emailInput);
    setDialogBoxVisibility(false);
    
    sendPasswordResetEmail(auth, emailInput)
      .then(function() {
        alert("Password reset link is sent successfully!");
      })
      .catch(function(error) {
        alert("Please enter valid email address!");
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <Text>Log In</Text>
      <View>
        <Text>User Name :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handleUserNameChange(text)} placeholder="Enter Your Name" keyboardType="email-address"></TextInput>
        {!userNameValidity && <Text>Invalid username or email!</Text>}
        <Text>Password :</Text>
        <TextInput style={styles.input} onChangeText={(text)=>setPassword(text)} placeholder="Enter Your Password" secureTextEntry></TextInput>

        <Button style={styles.button1} title="Log In" color="blue" onPress={logInToAcc}></Button>
        <DialogInput isDialogVisible={dialogBoxVisibility}
            title={"Password Recovery"}
            message={"Enter registered email address :"}
            hintInput ={"abc@gmail.com"}
            submitInput={ (inputText) => {passwordResetEmail(inputText)} }
            closeDialog={ () => {setDialogBoxVisibility(false)}}>
        </DialogInput>
        <Text style={styles.link} onPress={forgotPassword}>Forgot Password</Text>
        <Button title="Sign Up" color="blue" onPress={redirectToSignUp}></Button>
      </View>
    </KeyboardAvoidingView>
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
    marginTop:10,
    marginBottom :10,
    width:300,
    padding: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine : 'underline',
    marginBottom : 20,
    marginTop : 20,
  }
});
