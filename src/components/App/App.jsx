import React, { useState } from 'react';

import AppContainer from '../AppContainer/AppContainer';
import Module2AppContainer from '../../module-2/components/Module2AppContainer/Module2AppContainer';

import './App.scss';

const App = () => {
  const [module, setModule] = useState(1);

  const onModuleChange = m => setModule(m);

  const AppContent = module === 1 ? AppContainer : Module2AppContainer;

  return (
    <div className="app-main">
      <nav className="app-buttons">
        <button className="btn" onClick={() => onModuleChange(1)}>
          Module 1
        </button>
        <button className="btn" onClick={() => onModuleChange(2)}>
          Module 2
        </button>
      </nav>

      <AppContent />
    </div>
  );
};

export default App;
