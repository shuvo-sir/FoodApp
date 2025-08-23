import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButtom from "@/components/CustomButtom";
import {createUser} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: "", email: "", password: ""});

    const submit = async () => {
        // Prevent double submission
        if (isSubmitting) return;

        const {name, email, password} = form;
        if (!name || !email || !password) return  Alert.alert("Please enter your valid email and password");

        setIsSubmitting(true);
        try {
            await createUser({email, password, name});
            router.replace("/(auth)/sign-in");
        } catch (error: any) {
            Alert.alert("Error", error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">

            <CustomInput
                placeholder= "Enter your name"
                value={form.name}
                onChangeText={(text) => setForm((prev) =>({ ...prev, name: text }))}
                label={"Name"}
            />
            <CustomInput
                placeholder= "Enter your email address"
                value={form.email}
                onChangeText={(text) => setForm((prev) =>({ ...prev, email: text }))}
                label={"Email"}
                keyboardType="email-address"
            />

            <CustomInput
                placeholder= "Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) =>({ ...prev, password: text }))}
                label={"Password"}
                secureTextEntry={true}
            />

            <CustomButtom
                title= "Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className={"flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>Already have an account</Text>
                <Link href="/sign-in" className={"base-bold text-primary"}>Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
