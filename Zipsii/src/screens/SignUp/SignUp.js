import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
// import CheckBox from '@react-native-community/checkbox'; // Import Checkbox
import styles from './styles';
import { colors, alignment } from '../../utils';
import TextField from '../../ui/Textfield/Textfield';
import MainBtn from '../../ui/Buttons/MainBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, gql } from '@apollo/client';
import { TextDefault, FlashMessage } from '../../components';
import UserContext from '../../context/User';
import { createUser } from '../../apollo/server';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import getEnvVars from '../../../environment';
import * as Google from 'expo-auth-session/providers/google';
import { TextInput } from 'react-native-gesture-handler';
// import CheckBox from '@react-native-community/checkbox';


const { IOS_CLIENT_ID_GOOGLE, ANDROID_CLIENT_ID_GOOGLE } = getEnvVars();

const CREATEUSER = gql`
  ${createUser}
`;

function SignUp(props) {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [agree, setAgree] = useState(false); // Agree checkbox state
  const [loading, setLoading] = useState(false);
  const [enableApple, setEnableApple] = useState(false);

  const { setTokenAsync } = useContext(UserContext);

  const [mutate] = useMutation(CREATEUSER, { onCompleted, onError });

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.OS === 'ios' ? IOS_CLIENT_ID_GOOGLE : ANDROID_CLIENT_ID_GOOGLE,
  });

  useEffect(() => {
    checkIfSupportsAppleAuthentication();
  }, []);

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      if (id_token) {
        setLoading(true);
        mutate({
          variables: {
            idToken: id_token,
            type: 'google',
          },
        });
      }
    }
  }, [googleResponse]);

  function validateCredentials() {
    let result = true;

    setEmailError(null);
    setPasswordError(null);
    setPhoneError(null);
    setNameError(null);

    const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Provide a valid email address');
      result = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      result = false;
    }
    // const phoneRegex = /^\d{11,15}$/;
    // if (!phoneRegex.test(phone)) {
    //   setPhoneError('Provide a valid phone number');
    //   result = false;
    // }
    const nameRegex = /([a-zA-Z]{3,30}\s*)+/;
    if (!nameRegex.test(fullname)) {
      setNameError('Full name is required');
      result = false;
    }
    // if (!agree) {
    //   FlashMessage({
    //     message: 'You must agree to the terms and conditions.',
    //     type: 'warning',
    //     position: 'top',
    //   });
    //   result = false;
    // }

    return result;
  }

  async function onCompleted(data) {
    try {
      setTokenAsync(data.createUser.token);
      navigation.navigate('MainLanding');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function onError(error) {
    try {
      FlashMessage({ message: error.message, type: 'warning', position: 'top' });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function mutateLogin(user) {
    setLoading(true);
    let notificationToken = null;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') {
      notificationToken = await Notifications.getExpoPushTokenAsync();
    }
    mutate({ variables: { ...user, notificationToken: notificationToken.data } });
  }

  async function checkIfSupportsAppleAuthentication() {
    setEnableApple(await AppleAuthentication.isAvailableAsync());
  }

  return (
    <SafeAreaView style={[styles.flex, styles.safeAreaStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={styles.header}>
                <TextDefault textColor={colors.fontMainColor} H2 style={alignment.PLsmall}>
                  {'Create Account'}
                </TextDefault>
                <TextDefault style={styles.subHeading}>
                  Fill your information below or register with your social account
                </TextDefault>
              </View>
              <View style={styles.mainMid}>
              <TextDefault style={styles.label}>Name</TextDefault>
                <TextInput
                  style={styles.input}
                  error={!!nameError}
                  placeholder="Name"
                  onChange={event => {
                    setFullname(event.nativeEvent.text.trim());
                  }}
                />
                {!!nameError && (
                  <TextDefault textColor={colors.errorColor} small>
                    {nameError}
                  </TextDefault>
                )}
                <TextDefault style={styles.label}>Email</TextDefault>
                <TextInput
                style={styles.input}
                  error={!!emailError}
                  placeholder="Email"
                  onChange={event => {
                    setEmail(event.nativeEvent.text.trim());
                  }}
                />
                {!!emailError && (
                  <TextDefault textColor={colors.errorColor} small>
                    {emailError}
                  </TextDefault>
                )}
                <TextDefault style={styles.label}>password</TextDefault>
                <TextInput
                style={styles.input}
                  error={!!passwordError}
                  placeholder="Password"
                  password={true}
                  onChange={event => {
                    setPassword(event.nativeEvent.text.trim());
                  }}
                />
                {!!passwordError && (
                  <TextDefault textColor={colors.errorColor} small>
                    {passwordError}
                  </TextDefault>
                )}

                {/* Agree Checkbox */}
                <View style={styles.checkboxContainer}>
                  {/* <CheckBox
                    value={agree}
                    onValueChange={setAgree}
                    style={styles.checkbox}
                    tintColors={{ true: '#01AC66', false: '#ddd' }}
                  /> */}
                  {/* <TextDefault>
                    Agree with{' '}
                    <TextDefault
                      style={styles.ftTextUnderline}
                      onPress={() => navigation.navigate('Terms')}>
                      Terms & Conditions
                    </TextDefault>
                  </TextDefault> */}
                </View>

                <MainBtn
                  loading={loading}
                  onPress={async() => {
                    if (validateCredentials()) {
                      const user = {
                        phone: phone.trim(),
                        email: email.toLowerCase().trim(),
                        password: password,
                        name: fullname,
                        picture: '',
                      };
                      mutateLogin(user);
                    }
                  }}
                  text="Sign up"
                  style={styles.signUpButton}
                />
              </View>

              <TextDefault textColor= {colors.fontThirdColor} style={styles.orText}>Or sign up with</TextDefault>

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

              <View style={styles.mixedLine}>
                <TextDefault textColor={colors.fontSecondColor}>
                  {'Already have an account? '}
                  <TextDefault
                    style={styles.ftTextUnderline}
                    onPress={() => navigation.navigate('SignIn')}>
                    {'Sign in'}
                  </TextDefault>
                </TextDefault>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUp;
