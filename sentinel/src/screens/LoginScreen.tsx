import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';

export const LoginScreen = () => {
  const [email, setEmail] = React.useState('cdr_singh@sentinel.in');
  const [password, setPassword] = React.useState('testpassword123');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Login Failed', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SENTINELCHAIN</Text>
      <Text style={styles.subtitle}>Command Authentication</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'VERIFYING...' : 'LOGIN'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fdf9ee' },
  title: { fontSize: 32, fontWeight: '900', color: '#34562e', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#5a5f65', marginBottom: 32, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 },
  input: { borderWidth: 1, borderColor: '#c2c8bc', padding: 16, marginBottom: 16, borderRadius: 8, backgroundColor: '#ffffff' },
  button: { backgroundColor: '#34562e', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: 'bold', letterSpacing: 1 },
});
