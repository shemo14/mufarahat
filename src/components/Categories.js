import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ImageBackground,
    Animated,
    I18nManager, Platform
} from "react-native";
import {Container, Content, Icon, Header,Right, Left, Button} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';



const height = Dimensions.get('window').height;
const IS_IPHONE_X = height === 812 || height === 896;

const categories=[
    {id:1 , name:'غريبة', image:require('../../assets/images/pic_one.png')},
    {id:2 , name:'شرقية', image:require('../../assets/images/pic_two.png')},
    {id:3 , name:'شامية', image:require('../../assets/images/pic_three.png')},
    {id:4 , name:'غريبة', image:require('../../assets/images/pic_one.png')},
    {id:5 , name:'شرقية', image:require('../../assets/images/pic_two.png')},
    {id:6 , name:'شامية', image:require('../../assets/images/pic_three.png')},
    {id:7 , name:'غريبة', image:require('../../assets/images/pic_one.png')},
    {id:8 , name:'شرقية', image:require('../../assets/images/pic_two.png')},
    {id:9 , name:'شامية', image:require('../../assets/images/pic_three.png')},
]


class Categories extends Component {
    constructor(props){
        super(props);

        this.state={
            categories,
            status: null,
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }



    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={[styles.scrollParent , styles.touchProduct]}>
                <Animatable.View animation="zoomIn" duration={1000}>
                    <Image source={item.image} style={[styles.scrollImg , styles.w100]} resizeMode={'cover'} />
                    <View style={styles.scrollText}>
                        <Text style={[styles.type]}>{item.name}</Text>
                    </View>
                </Animatable.View>
            </TouchableOpacity>
        );
    }


    setAnimate(availabel){
        if (availabel === 0){
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 1,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }

        console.log(availabel);
    }

    headerScrollingAnimation(e){
        if (e.nativeEvent.contentOffset.y > 30){
            console.log(e.nativeEvent.contentOffset.y);
            this.setAnimate(0)
        } else{
            this.setAnimate(1)
        }
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });


        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{i18n.t('categories')}</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={  I18nManager.isRTL ? require('../../assets/images/bg_blue_big.png') : require('../../assets/images/bg_blue_big2.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={Platform.OS === 'ios' ? styles.mt90 : styles.mT70}>
                            <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.state.categories}
                                    renderItem={({item}) => this.renderItems(item)}
                                    numColumns={2}
                                    keyExtractor={this._keyExtractor}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>

        );
    }
}

export default Categories;