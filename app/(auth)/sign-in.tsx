import {View, Text, Button} from 'react-native'
import React from 'react'
import {Link, router, Slot} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButtom from "@/components/CustomButtom";

const SignIn = () => {
    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder= "Enter your email address"
                value={""}
                onChangeText={(text) => {}}
                label={"Email"}
                keyboardType="email-address"
            />

            <CustomInput
                placeholder= "Enter your password"
                value={""}
                onChangeText={(text) => {}}
                label={"Password"}
                secureTextEntry={true}
            />

            <CustomButtom
                title= "Sign In"
            />
            <View className={"flex-row gap-2 justify-center"}>
                <Text className={"base-bold text-gray-100"}>Don't have an account</Text>
                <Link href="/sign-up" className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
