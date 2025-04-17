import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
  config: AxiosRequestConfig
}[] = []

function processQueue(error: AxiosError | null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) reject(error)
    else resolve(config)
  })
  failedQueue = []
}

const privateAPI: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

privateAPI.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // 이미 retry한 요청이면 에러 바로 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // retry 중복 방지
    originalRequest._retry = true

    if (isRefreshing) {
      // refresh가 진행 중이면 queue에 요청 보류
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(privateAPI(originalRequest)),
          reject,
          config: originalRequest,
        })
      })
    }

    isRefreshing = true

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      )

      // 토큰 재발급 성공시
      processQueue(null)
      return privateAPI(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError as AxiosError)
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default privateAPI
