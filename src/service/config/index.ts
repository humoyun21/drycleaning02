import axios  from 'axios';

const request = axios.create({
      baseURL: 'https://app.olimjanov.uz/v1'
})

request.interceptors.request.use((config) => {
      const token = ""
      if (token) {
            config.headers['Authorization'] = token
      }
      return config
})

export default request;