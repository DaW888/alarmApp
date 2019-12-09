import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableNativeFeedback, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Database from '../constants/Database';

class Item extends Component {
    state = {
        switch: this.props.turn === 'true',
        height: new Animated.Value(0),
        expanded: false,
        arDays: [
            { day: 'Pon', color: 'transparent' },
            { day: 'Wt', color: 'transparent' },
            { day: 'Sr', color: 'transparent' },
            { day: 'Czw', color: 'transparent' },
            { day: 'Pt', color: 'transparent' },
            { day: 'Sob', color: 'transparent' },
            { day: 'Nie', color: 'transparent' },
        ],
        stringDay: [],
    };

    toValue = 40;

    switch = () => {
        this.setState({ switch: !this.state.switch });
    };

    expand = () => {
        console.log('expand');

        if (!this.state.expanded) {
            this.toValue = 60;
        } else {
            if (this.state.stringDay.length > 0) {
                this.toValue = 30;
            } else this.toValue = 0;
        }

        Animated.spring(this.state.height, {
            toValue: this.toValue,
        }).start();

        this.setState({
            expanded: !this.state.expanded,
        });
    };

    del = () => {
        console.log('delete');
        Database.remove(this.props.id);
        this.props.remove(this.props.id);
    };

    dayChangeColor = (day, color) => {
        // console.log(day, color);
        // console.log(this.state.arDays);
        let ind;
        this.state.arDays.find((el, id) => {
            if (el.day == day) {
                ind = id;
            }
        });

        const days = [...this.state.arDays];
        console.log(days[ind].color);
        if (days[ind].color == 'transparent') {
            days[ind].color = Colors.main;
            this.setState({
                stringDay: [...this.state.stringDay, day],
            });
        } else {
            days[ind].color = 'transparent';
            const stringDay = this.state.stringDay;
            const ix = stringDay.indexOf(day);
            stringDay.splice(ix, 1);
            this.setState({
                stringDay,
            });
        }
        this.setState({
            arDays: days,
        });
    };

    days = () => {
        return this.state.arDays.map(({ day, color }) => {
            return (
                <TouchableNativeFeedback
                    key={day}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                    onPress={() => this.dayChangeColor(day, color)}
                >
                    <Text
                        style={{
                            color: Colors.text,
                            textAlign: 'center',
                            fontSize: 18,
                            borderRadius: 20,
                            width: 50,
                            height: 40,
                            padding: 2,
                            backgroundColor: color,
                        }}
                    >
                        {day}
                    </Text>
                </TouchableNativeFeedback>
            );
        });
    };

    stringDays = () => {
        return <Text style={styles.textStyle}>{this.state.stringDay.join(', ')}</Text>;
    };

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.row1}>
                    <Text style={{ color: Colors.text, fontSize: 34 }}>{this.props.time}</Text>
                    <Switch value={this.state.switch} onChange={this.switch} />
                </View>
                <View style={styles.row2}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={this.del}
                    >
                        <AntDesign name="delete" size={32} color={Colors.accLight} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={this.expand}
                    >
                        <Ionicons name="ios-arrow-down" size={32} color={Colors.main} />
                    </TouchableNativeFeedback>
                </View>

                <Animated.View
                    style={{
                        height: this.state.height,
                        backgroundColor: Colors.bc,
                        flex: 1,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                    }}
                >
                    {this.state.expanded ? this.days() : this.stringDays()}
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
        backgroundColor: Colors.bc,
    },

    row1: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    row3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        color: Colors.text,
        textAlign: 'center',
        fontSize: 16,
        padding: 2,
    },
});

export default Item;
