import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

import { HomePageComponent } from './src/pages/home';

const App = () => {
  return (
    <SafeAreaView >
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <HomePageComponent/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;