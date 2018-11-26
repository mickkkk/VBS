import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
//import { Card, CardSection, Input, Button } from './Common';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';
import Button from './Button';
import Spinner from './Spinner';

const background = require('../assets/images/Background_login.png');

class LoginForm extends Component {
    onEmailChange(text) {
        //this.props.emailChanged(text);
        //even voor snellere login, WEGHALEN STRAKS
        this.props.emailChanged('test@test.com');
    }

    onPasswordChange(text) {
        //this.props.passwordChanged(text);
        //even voor snellere login, WEGHALEN STRAKS
        this.props.passwordChanged('password');
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
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
             INLOGGEN
            </Button>
        );   
    }
    
    render() {
        return (
            <ImageBackground
                source={background}
                style={{ width: '100%', height: '100%' }}
            >
                <Card style={styles.card}>
                    <CardSection>
                        <Input
                            placeholder="email@gmail.com"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            placeholder="Wachtwoord"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    {this.renderError()}

                    {this.renderButton()}
                    
                </Card>
            </ImageBackground>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser 
})(LoginForm);
