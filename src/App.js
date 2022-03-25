import React from 'react';
import IdentitiesContextProvider from './context/IdentitiesContext';
import DetailsForm from './components/DetailsForm';
import CompleteMerkleTree from './components/MerkleTree';
const App =()=>{
  return (
    <div className="App">
      <IdentitiesContextProvider>
        <DetailsForm />
        <CompleteMerkleTree/>
      </IdentitiesContextProvider>
    </div>
  );
}

export default App;