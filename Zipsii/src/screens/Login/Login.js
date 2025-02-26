import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
  
    console.log('Sending request with email:', email, 'and password:', password); // Debug log
  
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // POST body
      });
  
      console.log('Response status:', response.status); // Check the status code
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Check the data returned from the backend
  
        if (!data.error) {
          Alert.alert('Success', 'Logged in successfully');
          const { accessToken, user } = data;
  
          // Store the accessToken (JWT token) and expiration time (1 day)
          const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('user', JSON.stringify(user)); // Optionally store the user info
          await AsyncStorage.setItem('expirationTime', expirationTime.toString());
  
          if (accessToken) {
            navigation.navigate('Login'); // Navigate to MainLanding page after successful login
          }
        } else {
          Alert.alert('Error', data.message || 'Login failed');
        }
      } else {
        Alert.alert('Error', 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Network or fetch error:', error); // Log error
      Alert.alert('Error', 'Login failed due to a network error');
    } finally {
      setLoading(false);
    }
  };

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
          value={email}
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
      <TouchableOpacity style={styles.socialButton}>
        <Image
          style={styles.googleLogo}
          source={require('../../assets/icons/google.png')}
        />
        <Text style={styles.googleButtonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Facebook Login Button */}
      <TouchableOpacity style={styles.socialButton}>
        <Feather name="facebook" size={22} color="#fff" />
        <Text style={styles.socialButtonText}>Login with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
  signupText: {
    color: '#007bff',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignInScreen;
