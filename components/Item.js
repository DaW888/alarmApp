import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch, TouchableNativeFeedback, Animated} from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Colors from "../constants/Colors";
import Database from "../constants/Database";

class Item extends Component {

    state = {
        switch: (this.props.turn === 'true'),
        height: new Animated.Value(0),
        expanded: false,
        dayColor: null
    };

    toValue = 40;

    switch = () => {
        this.setState({switch: !this.state.switch});
    }

    expand = () => {
        console.log('expand');

        if (!this.state.expanded) {
            this.toValue = 60;
        } else {
            this.toValue = 0;
        }

        Animated.spring(this.state.height, {
            toValue: this.toValue,
        }).start();

        this.setState({
            expanded: !this.state.expanded
        })
    }

    del = () => {
        console.log('delete');
        Database.remove(this.props.id);
    }

    dayChangeColor = () => {
        if (!this.state.dayColor)
            this.setState({
                dayColor: Colors.accLight
            })
        else
            this.setState({
                dayColor: null
            })
    }

    days = () => {
        const ar = [
            {day: 'Pon',},
            {day: 'Wt',},
            {day: 'Sr',},
            {day: 'Czw',},
            {day: 'Pt'},
            ];
        return ar.map(({day}) => {
            return <TouchableNativeFeedback
                key={day}
                background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)} onPress={this.dayChangeColor}>
                <Text style={{
                    color: Colors.text,
                    textAlign: 'center',
                    fontSize: 18,
                    borderRadius: 20,
                    width: 40,
                    height: 40,
                    padding: 2,
                    backgroundColor: this.state.dayColor
                }}>{day}</Text>
            </TouchableNativeFeedback>
        })
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.row1}>
                    <Text style={{color: Colors.text, fontSize: 34}}>{this.props.time}</Text>
                    <Switch value={this.state.switch} onChange={this.switch}/>
                </View>
                <View style={styles.row2}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                                             onPress={this.del}>
                        <AntDesign name='delete' size={32} color={Colors.accLight}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={this.expand}>
                        <Ionicons name='ios-arrow-down' size={32} color={Colors.main}/>
                    </TouchableNativeFeedback>
                </View>

                <Animated.View style={{
                    height: this.state.height, backgroundColor: Colors.bc,
                    flex: 1, justifyContent: 'space-evenly', flexDirection: 'row'
                }}>

                    {this.days()}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        borderColor: Colors.main,
        borderBottomWidth: 2,
        backgroundColor: Colors.bc

    },

    row1: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    row3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'

    }


});

export default Item;
