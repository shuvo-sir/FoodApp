import {View, Text, TextInput} from 'react-native'
import React from 'react'
import {CustomInputProps} from "@/type";

const CustomInput = ({
    placeholder = "Enter Text",
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = "default",
} : CustomInputProps) => {
    return (
        <View className={"w-full"}>
            <Text className={"label"}>{label}</Text>

            <TextInput
                autoCapitalize={"none"}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    )
}
export default CustomInput
