import React from 'react';
import { View, TextInput } from 'react-native';

const Input = ({ value, onChangeText, secureTextEntry, placeholder }) => {
    const { inputStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'red'}
                placeholder={placeholder}
                //placeholderStyle={{ color: 'red' }}
                
            />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#fff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 21,
        flex: 2,
        placeholderTextColor: '#fff'
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default Input;
