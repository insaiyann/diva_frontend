import React from 'react';
import IdentitiesContextProvider from './context/IdentitiesContext';
import DetailsForm from './components/DetailsForm';
const App =()=>{
  return (
    <div className="App">
      <IdentitiesContextProvider>
        <DetailsForm />
      </IdentitiesContextProvider>
    </div>
  );
}

export default App;