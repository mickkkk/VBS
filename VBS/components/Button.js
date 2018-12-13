import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}> 
                {children} 
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        backgroundColor: '#F64404',
        borderRadius: 5,
        maxHeight: 35,
        marginTop: 38,
        width: 269,
        
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 13
    }
};

export default Button;
