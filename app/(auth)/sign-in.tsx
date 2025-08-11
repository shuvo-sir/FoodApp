import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router, Slot} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButtom from "@/components/CustomButtom";
import {signIn} from "@/lib/appwrite";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email: "", password: ""});

    const submit = async () => {
        const {email, password} = form;
        if (!email || !password) {
            Alert.alert("Please enter your valid email and password");
            return; // stop execution here
        }

        setIsSubmitting(true);
        try {
            await signIn({email, password});
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
                title= "Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className={"flex-row gap-2 justify-center"}>
                <Text className={"base-bold text-gray-100"}>Don't have an account</Text>
                <Link href="/sign-up" className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
