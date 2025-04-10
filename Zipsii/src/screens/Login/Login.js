import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../components/Auth/AuthContext'; // Adjust the path as needed
import * as Google from 'expo-auth-session/providers/google';
import { colors } from '../../utils/colors';
import { base_url } from '../../utils/base_url';

const SignInScreen = () => {
  const [userNameOrEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigation = useNavigation();
  const { user, login } = useAuth(); // Assuming useAuth provides the current user and login function

  // Google login state and function
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',  // Replace with your Google OAuth Client ID
  });

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        // If user is already logged in, navigate to MainLanding
        navigation.navigate('MainLanding');
      }
    };

    checkUser();
  }, [navigation]);

  const handleLogin = async () => {
    if (!userNameOrEmail || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${base_url}/user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userNameOrEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.error) {
          Alert.alert('Success', 'Logged in successfully');
          const { token, userDetails } = data;
          // Store the accessToken and user info
          await AsyncStorage.setItem('accessToken', token);
          await AsyncStorage.setItem('user', JSON.stringify(userDetails));

          // Use the login function from AuthContext to set the user
          login(userDetails);
          
          navigation.navigate('MainLanding');
        } else {
          Alert.alert('Error', data.message || 'Login failed');
        }
      } else {
        Alert.alert('Error', 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      Alert.alert('Error', 'Login failed due to a network error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        const { id_token } = result.params;

        // Now you can send the id_token to your backend API for authentication
        setLoading(true);
        const response = await fetch(`${base_url}/user/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ googleToken: id_token }), // Send the Google token
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.error) {
            Alert.alert('Success', 'Logged in successfully');
            const { token, userDetails } = data;
            // Store the accessToken and user info
            await AsyncStorage.setItem('accessToken', token);
            await AsyncStorage.setItem('user', JSON.stringify(userDetails));

            // Use the login function from AuthContext to set the user
            login(userDetails);
            
            navigation.navigate('MainLanding');
          } else {
            Alert.alert('Error', data.message || 'Google login failed');
          }
        } else {
          Alert.alert('Error', 'Google login failed, please try again.');
        }
      } else {
        Alert.alert('Error', 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Error', 'Google login failed due to a network error');
    } finally {
      setLoading(false);
    }
  };
  console.log(user)
  if (user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3662AA" />
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <View style={styles.icon}>
            <Feather name="mail" size={22} color="#7C808D" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={setEmail}
            value={userNameOrEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.icon}>
            <Feather name="lock" size={22} color="#7C808D" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordIsVisible}
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.passwordVisibleButton}
            onPress={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            <Feather name={passwordIsVisible ? 'eye' : 'eye-off'} size={20} color="#7C808D" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin} disabled={loading}>
          <Image
            style={styles.googleLogo}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  icon: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    fontSize: 16,
  },
  passwordVisibleButton: {
    position: 'absolute',
    right: 0,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordButtonText: {
    color: '#3662AA',
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3662AA',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  orLine: {
    height: 1,
    backgroundColor: '#eee',
    flex: 1,
  },
  orText: {
    color: '#7C808D',
    marginRight: 10,
    marginLeft: 10,
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: '#3b5998',  // For Facebook
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  googleLogo: {
    width: 20.03,
    height: 20.44,
    position: 'absolute',
    left: 14,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: 25,
  },
  signupText: {
    color: '#007bff',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
