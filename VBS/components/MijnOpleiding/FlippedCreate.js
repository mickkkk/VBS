import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { flippedUpdate, flippedCreate } from '../../actions';

import Input from '../Input';
import Button from '../Button';

import Spinner from '../Spinner';


class FlippedCreate extends Component {
    onButtonPress() {
        const { inhoud, titel, auteur, beschrijving, uid } = this.props;
        const reacties = [{ naam: 'Mick', reactie: 'Heel duidelijk artikel, vanuit eigen perspectief' }];

        this.props.flippedCreate({ inhoud, titel, auteur, beschrijving, reacties, uid });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Toevoegen
            </Button>
        );   
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewStyle}>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Titel"
                            style={styles.inputStyle}
                            placeholder="Titel van artikel"
                            placeholderTextColor="#707070"
                            value={this.props.titel}
                            onChangeText={
                                value => this.props.flippedUpdate({ prop: 'titel', value })
                            }
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Auteur"
                            placeholder="Auteur"
                            style={styles.inputStyle}
                            placeholderTextColor="#707070"
                            value={this.props.auteur}
                            onChangeText={
                                value => this.props.flippedUpdate({ prop: 'auteur', value })
                            }
                        />
                    </View>
                    <View style={styles.containerStyle}>
                        <Input
                            label="Beschrijving"
                            placeholder="Beschrijving"
                            style={styles.inputStyle}
                            placeholderTextColor="#707070"
                            value={this.props.beschrijving}
                            onChangeText={
                                value => this.props.flippedUpdate({ prop: 'beschrijving', value })
                            }
                        />
                    </View>

                    <View style={styles.containerStyle}>
                        <Input
                            label="Inhoud"
                            placeholder="Inhoud"
                            style={styles.inputStyle}
                            placeholderTextColor="#707070"
                            value={this.props.inhoud}
                            onChangeText={
                                value => this.props.flippedUpdate({ prop: 'inhoud', value })
                            }
                        />
                    </View>
                    {this.renderError()}

                    {this.renderButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //marginTop: -250,
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
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inputStyle: {
        color: 'black',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 21,
        flex: 2,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
});

const mapStateToProps = ({ flipped }) => {
    const { loading, error, inhoud, titel, auteur, beschrijving } = flipped;

    return { error, loading, inhoud, titel, auteur, beschrijving };
};

export default connect(mapStateToProps, { flippedUpdate, flippedCreate })(FlippedCreate);
