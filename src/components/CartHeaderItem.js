import React, { Component } from "react";
import {View, Text, Image, Dimensions} from "react-native";
import {
    Icon,
    CheckBox
} from 'native-base'
import styles from '../../assets/styles'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;


class CartHeaderItem extends Component {


    render() {


        return (
            <View style={[ styles.acorrHeader , {borderBottomRightRadius: this.props.expanded ? 0 : 20 }]}>
                <View style={styles.directionRow}>
                    <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircleItem} resizeMode={'contain'} />
                    <Image source={this.props.item.image} style={[styles.scrollImg2 , styles.mh10]} resizeMode={'contain'} />
                    <View>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>{this.props.item.title}</Text>
                        <Text style={[styles.type ,{color:COLORS.labelBackground}]}>{this.props.item.price}</Text>
                    </View>
                </View>
                <View style={styles.h100}>
                    {this.props.expanded
                        ? <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-up" />
                        : <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-down" />}
                    {
                        this.props.hideCheck ? <CheckBox checked={true}  color={COLORS.labelBackground} style={[styles.quesCheckBox,styles.headerCheck]} /> : <View />
                    }
                </View>
            </View>
        );
    }
}

export default CartHeaderItem;