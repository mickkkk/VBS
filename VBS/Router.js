import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Schedule from './components/Rooster/Schedule';
import Chat from './components/Berichten/Chat';
import BerichtenScreen from './screens/BerichtenScreen';
import MijnOpleidingScreen from './screens/MijnOpleidingScreen';
import ModuleDetail from './components/MijnOpleiding/ModuleDetail'

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar >
                <Stack key="auth" hideNavBar>
                    <Scene key="login" component={LoginForm} title="login" />
                </Stack>
                <Stack key="main" tabs >
                    <Scene key="rooster" component={Schedule} title="Rooster" />
                    <Stack key="berichten" title="Berichten">
                        <Scene 
                            key="berichtenScreen" 
                            component={BerichtenScreen} 
                            title="Berichten"
                        />
                        <Scene key="chat" component={Chat} title="Klas N21" />
                    </Stack>
                    <Stack key="mijnOpleiding">
                        <Scene 
                            //rightTitle="Filter"
                            //onRight={() => { console.log('right title tapped') }}
                            key="modules" 
                            component={MijnOpleidingScreen}
                            title="Mijn Opleiding"
                        />
                        <Scene key="moduleDetail" component={ModuleDetail} title="Detail" />
                    </Stack>
                    
                    <Scene key="account" component={Schedule} title="Account" />
                </Stack>
            </Stack>
        </Router>
    );
};
export default RouterComponent;
