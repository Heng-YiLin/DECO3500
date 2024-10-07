// App.js
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import Home from './src/components/Home'; // Import your main component

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
