import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-78d24.firebaseio.com/'
});
export default instance;