import axios from "axios";

const clientFactus = axios.create({
    /* baseURL: "http://localhost:3999/runTour", */
    baseURL: "https://runtour.onrender.com/runTour"
});

clientFactus.interceptors.request.use(
    (config) => {
        if (!config.url.includes("/user/login") && !config.url.includes("/inscription/register") && !config.url.includes("/upload/images")) {
            const store = JSON.parse(localStorage.getItem("store"));
            const token = store.token || "";
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
        }   
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clientFactus;
