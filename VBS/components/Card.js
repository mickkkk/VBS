import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
    <View style={styles.containerStyle}>
        {props.children}
    </View>
);

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default Card;
