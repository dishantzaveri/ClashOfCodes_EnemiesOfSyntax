import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View,Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background2'
import Logo from '../components/Logo2'
import Header from '../components/Header2'
import Button from '../components/Button2'
import TextInput from '../components/TextInput2'
import BackButton from '../components/BackButton2'
import { theme } from '../assets/core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import TouchId from 'react-native-touch-id';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        color='white'
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <Button mode="contained" 
      onPress={onLoginPressed}
      >
        Login
      </Button>
      <Button mode="contained" 
       onPress={() =>
        TouchId.authenticate('Place your fingerprint!', {
          title: 'Authentication',
        })
          .then(() => {
            Alert.alert('Authentication Successful!');
            console.log('Done');
            navigation.navigate('Dashboard');
          })
          .catch(() => {
            Alert.alert('Fingerprint Did not match');
          })
      }>
        Fingerprint
      </Button>
      <View style={styles.row}>
        <Text style={{color:'white'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    color: 'white'
  },
  forgot: {
    fontSize: 13,
    color: 'white'
  },
  link: {
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    backgroundColor: '#0065ff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width:40,
  },
})
