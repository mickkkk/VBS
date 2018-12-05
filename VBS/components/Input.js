import React from 'react';
import { View, TextInput } from 'react-native';

const Input = ({ 
    value, 
    onChangeText,
    secureTextEntry, 
    placeholder, 
    placeholderTextColor, 
    style }) => {
    const { inputStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={style || inputStyle}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor || 'rgba(255,255,255,0.5)'}
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
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export default Input;
