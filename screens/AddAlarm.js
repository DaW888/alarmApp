import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import Colors from "../constants/Colors";
import CircleBt from "../components/CircleBt";
import Database from "../constants/Database";

class AddAlarm extends Component {
    state = {}

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    static navigationOptions = {
        title: "Add Alarm",
        headerStyle: {
            backgroundColor: Colors.accDark,
        },
        headerTitleStyle: {
            color: Colors.main
        },
        headerTintColor: Colors.main
    }

    addAlarm = () => {
        Database.add('00:00', 'false', 'null');
        this.props.navigation.navigate('Alarms');
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.buttons}>
                    <CircleBt type="plus" size={60} bcColor={Colors.main} circleClick={this.addAlarm}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.bc
    },

    buttons: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});

export default AddAlarm;
