import {View, Text, Button} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButtom from "@/components/CustomButtom";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email:"", password:""});


    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">

            <CustomInput
                placeholder={"Enter your email"}
                value={""}
                onChangeText={(text: string) => {}}
                label={"Email"}
                keyboardType={"email-address"}
            />

            <CustomInput
                placeholder={"Enter your password"}
                value={""}
                onChangeText={(text: string) => {}}
                label={"Password"}
                secureTextEntry={true}
            />

            <CustomButtom
                title={"Sign In"}
            />

            <View className={"flex-row justify-center gap-2"}>
                <Text className={"base-regular text-gray-100"}>Don't have an account?</Text>

                <Link href={"/sign-up"} className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}
export default SignIn
