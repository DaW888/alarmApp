import React, {Component} from 'react';
import {View, Text, StyleSheet, BackHandler, TouchableOpacity, Vibration, Dimensions} from 'react-native';
import Colors from "../constants/Colors";
import CircleBt from "../components/CircleBt";
import Database from "../constants/Database";

class AddAlarm extends Component {
    state = {
        hour: 0,
        minute: 0,
        h: true
    };

    // NIEPOTRZEBNE
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    // }
    //
    // componentWillMount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    // }

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
        const time = `${this.state.hour.toString().padStart(2, '0')}:${this.state.minute.toString().padStart(2, '0')}`;
        Database.add(time, 'false', 'null');
        this.props.navigation.navigate('Alarms');
    }

    clickItem = (number, hour) => {
        console.log(number);
        if (hour) {
            this.setState({
                hour: number
            })
        } else {
            this.setState({
                minute: number
            })
        }

    }

    getClock = () => {
        const arEls = [];

        if(this.state.h) {
            for (let i = 1; i <= 12; i++) {
                arEls.push(<TouchableOpacity style={{position: "absolute",
                    left: Dimensions.get('window').width/2 - 20 + 120 * Math.cos(Math.PI/12 * i*2 - Math.PI/2),
                    top: Dimensions.get('window').height/2 - 350 + 120 * Math.sin(Math.PI/12 * i*2 - Math.PI/2),
                    backgroundColor: Colors.accDark,
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                    key={i} onPress={() => this.clickItem(i, true)}>
                    <Text style={{color: Colors.text, fontSize: 22, textAlign: 'center'}}>{i}</Text></TouchableOpacity>
                );
            }

            for (let i = 1; i <= 12; i++) {
                arEls.push(<TouchableOpacity style={{position: "absolute",
                        left: Dimensions.get('window').width/2 - 18 + 70 * Math.cos(Math.PI/12 * i*2 - Math.PI/2),
                        top: Dimensions.get('window').height/2 - 345 + 70 * Math.sin(Math.PI/12 * i*2 - Math.PI/2),
                        backgroundColor: Colors.accLight,
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}
                                             key={i + 12} onPress={() => this.clickItem((i + 12) % 24, true)}>
                        <Text style={{color: Colors.text, fontSize: 20, textAlign: 'center'}}>{(i + 12) % 24}</Text></TouchableOpacity>
                );
            }
        } else {
            for (let i = 0; i < 60; i += 5) {
                arEls.push(<TouchableOpacity style={{position: "absolute",
                    left: Dimensions.get('window').width/2 - 20 + 120 * Math.cos(Math.PI/12 * i/5*2 - Math.PI/2),
                    top: Dimensions.get('window').height/2 - 350 + 120 * Math.sin(Math.PI/12 * i/5*2 - Math.PI/2),
                    backgroundColor: Colors.accDark,
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                    key={i} onPress={() => this.clickItem(i, false)}>
                    <Text style={{color: Colors.text, fontSize: 22}}>{i}</Text></TouchableOpacity>);
            }
        }

        return arEls;
    }

    pressHour = () => {
        Vibration.vibrate([0, 50, 20, 50]);
        this.setState({
            h: true
        })

    }
    pressMinute = () => {
        Vibration.vibrate([0, 50]);
        this.setState({
            h: false
        })
    }


    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.time}>
                    <TouchableOpacity onPress={this.pressHour}><Text style={styles.textStyle}>{this.state.hour.toString().padStart(2, '0')}</Text></TouchableOpacity>
                    <Text style={styles.textStyle}>:</Text>
                    <TouchableOpacity onPress={this.pressMinute}><Text style={styles.textStyle}>{this.state.minute.toString().padStart(2, '0')}</Text></TouchableOpacity>

                </View>
                <View style={styles.clock}>
                    {this.getClock()}
                </View>
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

    time: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textStyle: {
        color: Colors.text,
        fontSize: 50,
        margin: 5,
    }
});

export default AddAlarm;
