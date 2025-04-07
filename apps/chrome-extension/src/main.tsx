import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StyleSheetManager } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith('$')}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>,
)
