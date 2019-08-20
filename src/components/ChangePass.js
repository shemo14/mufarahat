import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, Linking, AsyncStorage, I18nManager, KeyboardAvoidingView , Platform} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast, Header, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";


class ChangePass extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPass:'',
            reNewPass:'',
            isSubmitted: false,
        }
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#B7264B" />
            )
        }

        return (
            <Button onPress={() => this.onNextPressed()} style={styles.loginBtn}>
                <Text style={styles.btnTxt}>{ i18n.t('next') }</Text>
            </Button>
        );
    }

    onNextPressed() {
        this.props.navigation.navigate("login" );
    }
    render() {
        return (

            <Container style={styles.container}>

                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                        <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon  , {height:45 , width:45}]} />
                    </TouchableOpacity>
                    <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                        <View style={styles.imageBackgroundStyle}>
                            <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                            <View style={styles.loginFormContainerStyle}>
                                <Form style={{ width: '100%' , paddingHorizontal:25}}>
                                    <Text style={styles.authTitle}>{ i18n.t('recoverPass') }</Text>
                                    <Text style={styles.authDesc}>{ i18n.t('changePassText') }</Text>

                                    <View style={[ styles.itemView ]}>
                                        <Item floatingLabel style={styles.loginItem} bordered>
                                            <Label style={[styles.label]}>{ i18n.t('newPass') }</Label>
                                            <Input autoCapitalize='none' onChangeText={(newPass) => this.setState({newPass})} secureTextEntry style={styles.input}  />
                                        </Item>

                                    </View>

                                    <View style={[ styles.itemView , styles.inputMarginTop ]}>
                                        <Item floatingLabel style={styles.loginItem} bordered>
                                            <Label style={[styles.label]}>{ i18n.t('verifyNewPass') }</Label>
                                            <Input autoCapitalize='none' onChangeText={(reNewPass) => this.setState({reNewPass})} secureTextEntry style={styles.input}  />
                                        </Item>

                                    </View>

                                    <View style={[styles.loginBtnContainer , {marginTop:45} ]}>
                                        { this.renderSubmit() }
                                    </View>

                                </Form>


                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

export default ChangePass;