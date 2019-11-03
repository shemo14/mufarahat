import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, FlatList, Platform, Dimensions, ImageBackground, Animated,ScrollView} from "react-native";
import {Container, Content, Icon, Header, List, Right, Left, Button, Item, Input, CheckBox} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as Animatable from 'react-native-animatable';
import {getSetFav, profile} from "../actions";
import {connect} from "react-redux";



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;



class Question extends Component {
    constructor(props){
        super(props);

        this.state={
            type: 3
        }
    }

    pushQuestions(type){
        this.setState({ type });
        this.props.pushQuestions({ id: this.props.data.id, answer: type })
    }

    render() {

        return (
            <View>
                <Text style={[styles.ques , styles.mb10]}>{ this.props.data.question }</Text>
                <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>
                    <TouchableOpacity onPress={() => this.pushQuestions( 3)} style={[ styles.directionRow , styles.mt10 ]}>
                        <CheckBox onPress={() => this.pushQuestions( 3)} checked={this.state.type === 3 ? true : false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                        <Text style={[styles.check]}>{ i18n.t('excellent') } </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pushQuestions( 2)} style={[ styles.directionRow , styles.mt10 ]}>
                        <CheckBox onPress={() => this.pushQuestions( 2)} checked={this.state.type === 2 ? true : false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                        <Text style={[styles.check]}>{ i18n.t('good') } </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pushQuestions( 1)} style={[ styles.directionRow , styles.mt10 ]}>
                        <CheckBox onPress={() => this.pushQuestions( 1)} checked={this.state.type === 1 ? true : false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                        <Text style={[styles.check]}>{ i18n.t('acceptable') } </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pushQuestions( 0)} style={[ styles.directionRow , styles.mt10 ]}>
                        <CheckBox onPress={() => this.pushQuestions( 0)} checked={this.state.type === 0 ? true : false} color={COLORS.labelBackground} style={styles.quesCheckBox} />
                        <Text style={[styles.check]}>{ i18n.t('poor') } </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.line ]}/>
            </View>
        );
    }
}

const mapStateToProps = ({ lang ,  setFav , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps, { })(Question);