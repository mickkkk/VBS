import React from 'react';
import {Text, View, Modal, TouchableOpacity } from 'react-native';
import CardSection from './CardSection';
import Button from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <View style={styles.cardSection}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </View>
                <View style={styles.cardSectionButtons}>
                    <TouchableOpacity onPress={onAccept} style={styles.buttonStyle1}>
                        <Text style={styles.textStyleBtn}> 
                        JA 
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDecline} style={styles.buttonStyle2}>
                        <Text style={styles.textStyleBtn}> 
                        NEE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(100, 100, 100, 0.7)',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        //textAlign: 'center',
    },
    cardSection: {
        //borderBottomWidth: 1,
        paddingTop: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //borderColor: '#fff',
        position: 'relative',
        maxWidth: 269
    },
    buttonStyle1: {
        flex: 1,
        backgroundColor: '#F64404',
        borderRadius: 5,
        maxHeight: 35,
        marginTop: 38,
        marginRight: 5,
        maxWidth: 300,
    },
    buttonStyle2: {
        flex: 1,
        backgroundColor: '#F64404',
        borderRadius: 5,
        maxHeight: 35,
        marginTop: 38,
        marginLeft: 5,
        maxWidth: 300,
    },
    textStyleBtn: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 13
    },
    cardSectionButtons: {
        //borderBottomWidth: 1,
        paddingTop: 10,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        flexDirection: 'row',
        //borderColor: '#fff',
        position: 'relative',
        maxWidth: 269
    },

    textStyle: {
        //backgroundColor: 'green',
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    cardSectionStyle: {
        //justifyContent: 'center',
        //flexDirection: 'column'
    },
    btn: {
        width: 10
    }
};

export default Confirm;
