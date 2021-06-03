import { useState, useEffect, useRef } from 'react'
import useRequest from './hooks/useRequest'

import EventTest from './eventtest'

function App() {
  let arrayRef = useRef([])
  const [, forceUpdate] = useState({});

  const [params, setParams] = useState({
    pageNumber: 1,
  })

  const [data] = useRequest(params)

  useEffect(() => {
    if (data.length) {
      arrayRef.current = arrayRef.current.concat(data)
      forceUpdate({})
    }
  }, [data])

  return (
    <div className="App">
      <button onClick={() => { setParams({ ...params, pageNumber: params.pageNumber + 1 }) }}>more</button>
      <ul>
        {
          arrayRef.current &&
          arrayRef.current.map(item => {
            return <li key={item.RequestDemandId}>{item.DemandTitle}</li>
          })
        }
      </ul>
      <EventTest/>
    </div>

  );
}

export default App;
