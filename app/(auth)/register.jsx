import { Keyboard, StyleSheet,Text } from 'react-native'
import {Link} from 'expo-router'
import {Colors} from '../../Constants/Colors'

import ThemedView from '../../Components/ThemedView'
import ThemedText from '../../Components/ThemedText'
import Spacer from '../../Components/Spacer'
import ThemedButton from '../../Components/ThemedButton'
import ThemedTextInput from '../../Components/ThemedTextInput'

import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-web'
import { useUser } from '../../Hooks/useUser'



const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

  const {register} = useUser()

    const handleSubmit = async () => {
      setError(null)

      try{
        await register(email, password)
      }catch(error){
        setError(error.message)
      }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <ThemedView style={styles.container}>
        <Spacer/>
        <ThemedText title={true} style={styles.title}>
            Create your account
        </ThemedText>
        
        <ThemedTextInput
          style={{width: '80%', marginBottom: 20}}
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={ setEmail}
          value={email}
        />
        <ThemedTextInput
          style={{width: '80%', marginBottom: 20}}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={ setPassword}
          value={password}
        />
          <ThemedButton onPress={handleSubmit}>
            <Text style={{color: '#f2f2f2'}}>Register</Text>
        </ThemedButton>

        <Spacer/>
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={100}/>
        <Link href='/login'>
            <ThemedText style={{textAlign:'center'}}>
               Sign up
            </ThemedText>
        </Link>
    </ThemedView>
  </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
   error: {
      color: Colors.warning,
      padding: 10,
      backgroundColor: '#f5c1c8',
      borderColor: Colors.warning,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 10,

  }
})