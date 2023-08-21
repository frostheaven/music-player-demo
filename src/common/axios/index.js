import axios from 'axios'

const http = axios.create({
    baseURL: 'http://124.221.63.19:3000'
})

export default http
