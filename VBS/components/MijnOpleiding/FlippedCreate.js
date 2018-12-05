import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { flippedUpdate, flippedCreate } from '../../actions';

import Card from '../Card';
import CardSection from '../CardSection';
import Input from '../Input';
import Button from '../Button';


class FlippedCreate extends Component {
    onButtonPress() {
        console.log(this.props, 'log van props in flippedcreataa');
        const { titel, auteur, beschrijving, uid } = this.props;

        this.props.flippedCreate({ titel, auteur, beschrijving, uid });
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Titel"
                            style={styles.inputStyle}
                            placeholder="Titel van artikel"
                            placeholderTextColor="#707070"
                            value={this.props.titel}
                            onChangeText={value => this.props.flippedUpdate({ prop: 'titel', value })}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Auteur"
                            placeholder="Auteur"
                            style={styles.inputStyle}
                            placeholderTextColor="#707070"
                            value={this.props.auteur}
                            onChangeText={value => this.props.flippedUpdate({ prop: 'auteur', value })}
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Beschrijving"
                            placeholder="Beschrijving"
                            style={styles.inputStyle}
                            placeholderTextColor="#707070"
                            value={this.props.beschrijving}
                            onChangeText={value => this.props.flippedUpdate({ prop: 'beschrijving', value })}
                        />
                    </View>
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Toevoegen
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
    },
    containerStyle: {
        borderBottomWidth: 1,
        paddingTop: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#707070',
        position: 'relative',
        maxWidth: 269
    },
    inputStyle: {
        color: 'black',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 21,
        flex: 2,
    },
});

const mapStateToProps = (state) => {
    const { titel, auteur, beschrijving } = state.flipped;

    return { titel, auteur, beschrijving };
};

export default connect(mapStateToProps, { flippedUpdate, flippedCreate })(FlippedCreate);
