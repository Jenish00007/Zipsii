import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'
import styles from './styles'
import { login } from '../../apollo/server'
import { TextDefault } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useMutation, gql } from '@apollo/client'
import UserContext from '../../context/User'
import MainBtn from '../../ui/Buttons/MainBtn'
import ForgotPassword from './ForgotPassword/ForgotPassword'

import getEnvVars from '../../../environment'
import * as Google from 'expo-auth-session/providers/google'
import { colors } from '../../utils'

const {
  IOS_CLIENT_ID_GOOGLE,
  ANDROID_CLIENT_ID_GOOGLE,
  Expo_CLIENT_ID_GOOGLE
} = getEnvVars()

const LOGIN = gql`
  ${login}
`

function SignIn() {
  const navigation = useNavigation()
  const { setTokenAsync } = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false) // For modal visibility
  const [loading, setLoading] = useState(false)
  const [enableApple, setEnableApple] = useState(false)

  const [mutate] = useMutation(LOGIN, {
    onCompleted: async data => {
      try {
        await setTokenAsync(data.login.token)
        navigation.navigate('MainLanding')
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    onError: error => {
      console.error(error.message)
      setLoading(false)
    }
  })

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.OS === 'ios' ? IOS_CLIENT_ID_GOOGLE : ANDROID_CLIENT_ID_GOOGLE
  })

  useEffect(() => {
    checkIfSupportsAppleAuthentication()
  }, [])

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params
      if (id_token) {
        setLoading(true)
        mutate({
          variables: {
            idToken: id_token,
            type: 'google'
          }
        })
      }
    }
  }, [googleResponse])

  function showModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  async function checkIfSupportsAppleAuthentication() {
    setEnableApple(await AppleAuthentication.isAvailableAsync())
  }

  function validateCredentials() {
    let valid = true
    setEmailError(null)
    setPasswordError(null)

    if (!email) {
      setEmailError('Email is required')
      valid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email format')
        valid = false
      }
    }

    if (!password) {
      setPasswordError('Password is required')
      valid = false
    }

    return valid
  }

  async function handleSignIn() {
    if (validateCredentials()) {
      setLoading(true)
      mutate({ variables: { email, password, type: 'default' } })
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <TextDefault style={styles.heading} H3>
              Sign In
            </TextDefault>
            <TextDefault style={styles.subHeading}>
              Hi! Welcome back, you've been missed
            </TextDefault>
          </View>
          <View style={styles.formContainer}>
            <TextDefault style={styles.label}>Email</TextDefault>
            <TextInput
              style={[styles.input, emailError ? styles.errorInput : null]}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text.trim())}
            />
            {emailError && (
              <TextDefault style={styles.errorText}>{emailError}</TextDefault>
            )}
            <TextDefault style={styles.label}>Password</TextDefault>
            <TextInput
              style={[styles.input, passwordError ? styles.errorInput : null]}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text.trim())}
            />
            {passwordError && (
              <TextDefault style={styles.errorText}>{passwordError}</TextDefault>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showModal()}
              style={styles.forgotPasswordLink}>
              <TextDefault textColor={colors.greenColor} style={styles.forgotPasswordText}>
                
                Forgot Password?
              </TextDefault>
            </TouchableOpacity>
            <MainBtn
              loading={loading}
              onPress={handleSignIn}
              text="Sign In"
            />
            <TextDefault style={styles.orText}>Or sign in with</TextDefault>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => googlePromptAsync()}>
              <Image
                source={require('../../assets/icons/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            {enableApple && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                style={styles.appleButton}
                onPress={() => console.log('Apple Sign-In')}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}>
            <TextDefault textColor={colors.fontMainColor} >
              Don’t have an account?{' '}
              <TextDefault textColor={colors.greenColor} style={styles.signUpAction}>Sign Up</TextDefault>
            </TextDefault>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Forgot Password Modal */}
      {modalVisible && (
        <ForgotPassword
          modalVisible={modalVisible}
          hideModal={hideModal}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  )
}

export default SignIn
