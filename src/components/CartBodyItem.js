import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, } from "react-native";
import { Icon, } from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import StarRating from 'react-native-star-rating';
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

class CartBodyItem extends Component {
    constructor(props){
        super(props);

        this.state={
            value:this.props.item.quantity,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    increment(){
        if(this.state.value < 5)
            this.setState({value: this.state.value + 1 })
        this.props.cartQuantity(this.props.item.cart_id , this.state.value +1)
    }

    decrement(){
        if (this.state.value > 1)
            this.setState({value: this.state.value - 1})
        this.props.cartQuantity(this.props.item.cart_id , this.state.value -1)
    }


    render() {
        const totalPrice = this.props.item.price;
        return (
            <View style={styles.acorrContent}>
                <View style={styles.directionRowSpace}>
                    <Text style={[styles.type ,{color:COLORS.mediumgray}]}>{this.props.item.category}</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.props.item.rate}
                        fullStarColor={'#f0aa0c'}
                        starSize={20}
                        starStyle={{color: '#f0aa0c', marginLeft: 5}}
                    />
                </View>
                <Text style={[styles.type , styles.mv10 , styles.aSFS ,{color:COLORS.boldgray }]}>{ i18n.t('itemSpecification') }</Text>
                <Text style={[styles.type , styles.aSFS ,{color:COLORS.mediumgray}]}>{this.props.item.desc}</Text>

                <View style={[styles.line ]}/>

                <View style={styles.directionRowSpace}>
                    <View style={styles.directionRowCenter}>
                        <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                            <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                        </TouchableOpacity>
                        <Text style={[styles.countText ]}>{this.state.value}</Text>
                        <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                            <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.directionRowSpace}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate( this.props.user ? 'paymentSteps' : 'login' , {selectedItems: [ this.props.item.cart_id ] , totalPrice })} >
                            <Image source={require('../../assets/images/credit_card.png')} style={[styles.headerMenu , styles.mr20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.deleteCart(this.props.item.cart_id)} >
                            <Image source={require('../../assets/images/dustbin.png')} style={styles.headerMenu} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        );
    }
}


const mapStateToProps = ({ lang , profile  }) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {})(CartBodyItem);