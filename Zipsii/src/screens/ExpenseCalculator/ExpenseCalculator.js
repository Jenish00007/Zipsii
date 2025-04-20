import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../utils';

const ExpenseCalculator = ({ navigation }) => {
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [members, setMembers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (!numberOfMembers || !totalAmount) {
      Alert.alert('Error', 'Please enter both number of members and total amount');
      return;
    }

    const num = parseInt(numberOfMembers);
    const amount = parseFloat(totalAmount);

    if (num <= 0 || isNaN(amount)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    const splitAmount = (amount / num).toFixed(2);
    const newMembers = Array(num).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Member ${index + 1}`,
      amount: splitAmount,
      paid: false,
    }));

    setMembers(newMembers);
    setShowResults(true);
  };

  const togglePaidStatus = (memberId) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, paid: !member.paid }
        : member
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.fontMainColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expense Calculator</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Number of Members</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numberOfMembers}
            onChangeText={setNumberOfMembers}
            placeholder="Enter number of members"
          />

          <Text style={styles.label}>Total Amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={totalAmount}
            onChangeText={setTotalAmount}
            placeholder="Enter total amount"
          />

          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={handleCalculate}
          >
            <Text style={styles.calculateButtonText}>Calculate Split</Text>
          </TouchableOpacity>
        </View>

        {/* Results Section */}
        {showResults && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Split Details</Text>
            {members.map(member => (
              <TouchableOpacity 
                key={member.id}
                style={[
                  styles.memberCard,
                  member.paid && styles.memberCardPaid
                ]}
                onPress={() => togglePaidStatus(member.id)}
              >
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>₹{member.amount}</Text>
                  <Text style={styles.paidStatus}>
                    {member.paid ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseCalculator;