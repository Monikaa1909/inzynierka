import { useAxios } from '@vueuse/integrations/useAxios'

export const login = async(username, password) => {
  // TODO: Polaczyc z backendem
  const token = `${username} | ${password}`

  // const { data } = useAxios('/api/login', {
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
  //
  // if (data.error) {
  //   return null
  // }
  //
  // const { token } = data
  // TODO: Dodac useJWT

  return token
}
