import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Buffer } from "buffer";

// Ensure Buffer is globally available
global.Buffer = global.Buffer || Buffer;

// Twilio credentials (replace with your own)
const ACCOUNT_SID = "ACde7e235ee22878fb0d0510d19a99d57f"; // Replace with your Twilio Account SID
const AUTH_TOKEN = "6266af55daf6af3746b6390306734ac6";   // Replace with your Twilio Auth Token
const TWILIO_PHONE_NUMBER = "+919894579863"; // Replace with your Twilio phone number

function Login() {
    const [step, setStep] = useState(1);
    const [mobileNumber, setMobileNumber] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");

    const generateOtp = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    };

    const sendOtp = async (otp) => {
        const message = `Your OTP for login is: ${otp}`;
        const formattedNumber = `+91${mobileNumber.trim()}`;

        if (!formattedNumber) {
            showMessage({ message: "Mobile number is empty or invalid", type: "danger" });
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            showMessage({ message: "Invalid Mobile Number Format", type: "danger" });
            return;
        }

        console.log("Sending OTP to:", formattedNumber);

        try {
            const response = await fetch(
                `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Basic " + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64"),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        From: TWILIO_PHONE_NUMBER,
                        To: formattedNumber,
                        Body: message,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("OTP sent successfully:", data);
                showMessage({ message: "OTP Sent Successfully", type: "success" });
                setGeneratedOtp(otp);
            } else {
                console.error("Twilio error:", data);
                showMessage({ message: `Failed to send OTP: ${data.message}`, type: "danger" });
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            showMessage({ message: "Error sending OTP. Please try again.", type: "danger" });
        }
    };

    const handleMobileSubmit = () => {
        const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9
        if (phoneRegex.test(mobileNumber)) {
            const otp = generateOtp();
            sendOtp(otp);
            setStep(2);
        } else {
            showMessage({ message: "Invalid Mobile Number", type: "danger" });
        }
    };

    const handleOtpSubmit = () => {
        if (enteredOtp === generatedOtp) {
            showMessage({ message: "Login Successfully", type: "success" });
        } else {
            showMessage({ message: "Invalid OTP", type: "danger" });
        }
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <>
                    <Text style={styles.title}>Enter Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your mobile number"
                        keyboardType="numeric"
                        maxLength={10}
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleMobileSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
            {step === 2 && (
                <>
                    <Text style={styles.title}>Enter OTP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the OTP"
                        keyboardType="numeric"
                        maxLength={4}
                        value={enteredOtp}
                        onChangeText={setEnteredOtp}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                </>
            )}
            <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        width: "100%",
        backgroundColor: "#2080b9",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Login;
