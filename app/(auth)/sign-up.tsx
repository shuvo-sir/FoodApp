import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router, Slot} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButtom from "@/components/CustomButtom";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: "", email: "", password: ""});

    const submit = async () => {
        if (!form.name ||!form.email || !form.password) {
            Alert.alert("Please enter your valid email and password");
            return; // stop execution here
        }

        setIsSubmitting(true);
        try {
            // call the appwrite sign in function

            Alert.alert("Success", "User signed up successfully");
            router.replace("/");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder= "Enter your Name"
                value={form.name}
                onChangeText={(text) => setForm(prev => ({...prev, name: text}))}
                label={"Full name"}
            />

            <CustomInput
                placeholder= "Enter your email address"
                value={form.email}
                onChangeText={(text) => setForm(prev => ({...prev, email: text}))}
                label={"Email"}
                keyboardType="email-address"
            />

            <CustomInput
                placeholder= "Enter your password"
                value={form.password}
                onChangeText={(text) => setForm(prev => ({...prev, password: text}))}
                label={"Password"}
                secureTextEntry={true}
            />

            <CustomButtom
                title= "Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className={"flex-row gap-2 justify-center"}>
                <Text className={"base-bold text-gray-100"}>Already have an account?</Text>
                <Link href="/sign-in" className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignUp
