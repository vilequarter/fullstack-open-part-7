import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const response = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    response.then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    console.log(countries)
    if(countries.length > 0){
      const country = countries.find(c => c.name.common.toLowerCase() === name.toLowerCase())
      console.log(country)
      if(country){
        setCountry({
          data: country,
          found: true
        })
      } else setCountry({found: false})
    }
  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <div>{country.data.flag}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(name)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App