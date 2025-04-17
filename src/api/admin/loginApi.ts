import { AxiosError } from 'axios'

import privateAPI from '@/api/privateAPI'
import publicAPI from '@/api/publicAPI'
import { TLoginSchema } from '@/constants/schemas/loginSchema'
import { TLoginResponse } from '@/types/admin/login'

async function requestLogin(payload: TLoginSchema): Promise<TLoginResponse> {
  try {
    await publicAPI.post(`/auth/login`, payload, {
      withCredentials: true,
    })

    return { success: true }
  } catch (error) {
    const err = error as AxiosError
    const status = err.response?.status

    switch (status) {
      case 401:
        return { success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' }
      default:
        return { success: false, message: '알 수 없는 오류가 발생했습니다.' }
    }
  }
}

async function requestAuth() {
  const result = await privateAPI.get(`/auth/me`)
  return result.data
}

export async function test1() {
  const result = await privateAPI.get(`/auth/test1`)
  return result.data
}
export async function test2() {
  const result = await privateAPI.get(`/auth/test2`)
  return result.data
}
export async function test3() {
  const result = await privateAPI.get(`/auth/test3`)
  return result.data
}

export { requestLogin, requestAuth }
