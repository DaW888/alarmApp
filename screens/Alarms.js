import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import CircleBt from "../components/CircleBt";
import Colors from "../constants/Colors";
import Items from "../components/Items";
import Item from "../components/Item";
import Database from "../constants/Database";

class Alarms extends Component {
    state = {
        items: null
    }

    componentDidMount() {
        this.focus = this.props.navigation.addListener('didFocus', () => {
            this.getItems();
        })
    }

    componentWillUnmount() {
        this.focus.remove();
    }

    getItems = () => {
        Database.getAll().then((all) => {
            const allParsed = JSON.parse(all);
            console.log(allParsed.rows._array);

            const items = allParsed.rows._array.map(({id, time, turn, days}) => {
                console.log(id, time, turn, days);
                return {id, time, turn, days}
            });
            this.setState({
                items
            })

        });
    }

    removeItem = () => {
        this.getItems();
    }

    renderItems = () => {
        if (this.state.items)
            return this.state.items.map(({id, time, turn, days}) => {
                return <Item key={id} id={id} time={time} turn={turn} days={days} remove={this.removeItem}/>
            });
        else return null;
    }


    static navigationOptions = {
        title: "Alarms",
        headerStyle: {
            backgroundColor: Colors.accDark,
        },
        headerTitleStyle: {
            color: Colors.main
        },
        headerTintColor: Colors.main
    }

    addAlarm = () => {
        console.log('add');
        this.props.navigation.navigate('AddAlarm');
    }


    render() {
        return (
            <View style={styles.cont}>
                <ScrollView style={styles.scroll}>
                    {this.renderItems()}
                </ScrollView>
                <View style={styles.buttons}>
                    <CircleBt type="plus" size={60} bcColor={Colors.accLight} circleClick={this.addAlarm}/>
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

    scroll: {
        flex: 20,
        backgroundColor: Colors.bc
    },

    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Alarms;
