import { WuPrimaryNavbar } from '@npm-questionpro/wick-ui-lib'
import { useState } from 'react'
import { API_BASE_URL } from './constants/appConstants'
import type { IServerResponse } from './types/IServerResponse'
import type { IUser } from './types/IUser'

const fetchUser = async (): Promise<IServerResponse<IUser>> => {
  return fetch(`${API_BASE_URL}user`, {
    method: 'GET',
    headers: {

      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json() as Promise<IServerResponse<IUser>>
  })
}

export function App() {
  const [userData, setUserData] = useState<IUser>()
  const [errorMessage, setErrorMessage] = useState<string>()
  fetchUser()
    .then(response => {
      if (response.data) {
        setUserData(response.data)
      } else {
        setErrorMessage('Error in fetching User Data' + response.message)
        // throw Error("Error in fetching user Data Response Object:"+response)
      }
    })
    .catch(e => {
      setErrorMessage(e)
    })
  return (
    <>
      <p>helm</p>
      {errorMessage && (
        <p style={{color: 'red'}}>Error Occurred : {errorMessage}</p>
      )}
      <WuPrimaryNavbar
        Links={[
          <a key="home" href="#" className="active">
            Home
          </a>,
          <a key="about" href="#">
            About
          </a>,
          <a key="services" href="#">
            Services
          </a>,
          <a key="contact" href="#">
            Contact
          </a>,
        ]}
      />
      {userData && <h1>{`User Name: ${userData?.name}`}</h1>}
    </>
  )
}
