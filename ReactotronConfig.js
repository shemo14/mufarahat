import Reactotron from 'reactotron-react-native';import { reactotronRedux } from 'reactotron-redux';const reactotron = Reactotron.configure({ name: 'mofrehat', host : '192.168.8.137', port: 9090 })	.use(reactotronRedux()).useReactNative()	.connect();export default reactotron