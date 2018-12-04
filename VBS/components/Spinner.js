import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator color={'#fff'} size={size || 'large'} />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }
};

export default Spinner;
