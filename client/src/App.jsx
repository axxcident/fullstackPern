import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const [success, setSuccess] = useState(false)

  useEffect( () => {
    axios.get('http://localhost:8800/persons')
    .then(response => {
      setData(response.data)
    })
    .catch((err) => {
      console.log('något gick fel')
      console.log(err)
    })
  }, [])
  // instead of [] så skriver man data?

  // Post data
  const [formData, setFormData] = useState({
    FirstName: '',
    FirstLast: '',
    Address: '',
    City: '',
  })

  const handleChange = (event) => {
    setFormData({
      ...formData, [event.target.name] : event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/persons/submit-form', formData)
    .then(() => {
      console.log('success')
      setSuccess(true)
    })
    .catch((err) => {
      console.log('något gick fel')
      console.log(err)
    })

  }

  return (
    <>
      <h1>Formular dar du kan registrera Humans</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            FirstName:
            <input type="text" name='FirstName' onChange={handleChange} />
          </label>
          <br />
          <label>
            LastName:
            <input type="text" name='LastName' onChange={handleChange} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" name='Address' onChange={handleChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" name='City' onChange={handleChange} />
          </label>
          <br />
          <button type='submit'>skicka in</button>
          {success && <p>Form is submitted</p>}
        </form>
        {data.map(item => (
          <div key={item.id}>
            <p>{item.firstname} {item.lastname}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
