

import { useState } from 'react'
import Weather from './components/weather.jsx';


const App = () => {
  // Default City of Milwaukee
  const [city, setCity] = useState("Milwaukee");

  return (
    <div className='app'>
      <Weather city={city} setCity={setCity} />
    </div>
  )
}

export default App