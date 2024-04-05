import React, {useState, useEffect} from 'react'
import axios from 'axios';

function AddItem() {

const [data, setData] = useState([])

useEffect(() => {
    axios.get('')
    .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
})
  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default AddItem
