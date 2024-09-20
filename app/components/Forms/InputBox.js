import { View, TextInput } from 'react-native'
import React from 'react'

const InputBox = ({ placeholder, value, setValue, secureTextEntry = false, keyboardType = 'default', autoComplete = 'off', autoCorrect = true, maxLength }) => {
    return (
        <View className="justify-center items-center">
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                maxLength={maxLength}
                className="w-10/12 bg-white h-10 rounded-lg border pl-1 border-gray-300 mb-1"
            />
        </View>
    )
}

export default InputBox
