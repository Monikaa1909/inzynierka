import { useAxios } from '@vueuse/integrations/useAxios'

export const login = async(type, username, password) => {
  const { data, isFinished } = useAxios(`/api/${type}/login`, {
    method: 'post',
    data: {
      username,
      password,
    },
  })

  await until(isFinished).toBe(true)

  const { token = null } = data.value
  return token
}
