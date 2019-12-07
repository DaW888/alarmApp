import {createStackNavigator, createAppContainer} from "react-navigation";
import Main from "./screens/Main";
import Alarms from "./screens/Alarms";
import AddAlarm from "./screens/AddAlarm";

const Root = createStackNavigator({
    Main: {screen: Main},
    Alarms: {screen: Alarms},
    AddAlarm: {screen: AddAlarm}
});

const App = createAppContainer(Root);

export default App;
