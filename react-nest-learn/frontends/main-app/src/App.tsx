import { WuLoader, WuPrimaryNavbar } from '@npm-questionpro/wick-ui-lib'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { AppRoutes } from './AppRoutes'
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

const useUserApi = ():UseQueryResult<IServerResponse<IUser>,Error> => {
  return useQuery({queryKey:['user'],queryFn:fetchUser})
}
export function App() {
  const {data,error,isLoading}=useUserApi()
  return (
    <>
      <p>helm</p>
      {error && (
        <p style={{color: 'red'}}>Error Occurred : {error.message}</p>
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
      {isLoading && <WuLoader title='Loading'/>}
      {data && <h1>{`User Name: ${data?.data.name}`}</h1>}
      <AppRoutes/>
    </>
  )
}
