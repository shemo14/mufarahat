import React, { Component } from "react";
import {View, Text, Image, Dimensions, Animated} from "react-native";
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
    constructor(props){
        super(props);

        this.state={
            checked: this.props.checkAll ? true : false
        }
    }

    checkedFunc(isChecked , price){
        this.setState({checked:isChecked});

        if(isChecked){
            this.props.pushSelectedChecks(this.props.item.cart_id, price);
        }else{
            this.props.pullSelectedChecks(this.props.item.cart_id, price);
        }

    }


    componentWillReceiveProps(nextProps) {
        console.log('after push', nextProps);
        this.setState({ checked: nextProps.checkAll && this.props.hideCheck ? true : false })
    }

    render() {
        console.log('is checked', this.props.checkAll, this.state.checked )
        return (
            <View style={[ styles.acorrHeader , {borderBottomRightRadius: this.props.expanded ? 0 : 20 }]}>
                <View style={styles.directionRow}>
                    <Image source={require('../../assets/images/orange_circle.png')} style={styles.orangeCircleItem} resizeMode={'contain'} />
                    <Image source={{ uri :this.props.item.image}} style={[styles.scrollImg2 , styles.mh10]} resizeMode={'cover'} />
                    <View>
                        <Text style={[styles.type ,{color:COLORS.boldgray}]}>{this.props.item.name}</Text>
                        <Text style={[styles.type , styles.aSFS ,{color:COLORS.labelBackground}]}>{this.props.item.price}</Text>
                    </View>
                </View>
                <View style={styles.h100}>
                    {this.props.expanded
                        ? <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-up" />
                        : <Icon style={styles.arrowIcon} type={'FontAwesome'} name="angle-down" />}
                    {
                        this.props.hideCheck ? <CheckBox onPress={() => this.checkedFunc(!this.state.checked , this.props.item.price)} checked={this.state.checked}  color={COLORS.labelBackground} style={[styles.quesCheckBox,styles.headerCheck]} /> : <View />
                    }
                </View>
            </View>
        );
    }
}

export default CartHeaderItem;