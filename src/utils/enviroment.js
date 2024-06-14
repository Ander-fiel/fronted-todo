export const enviroment = {
    BASE_URL :process.env.NODE_ENV =="production"
    ? process.env.RENDER_URL
    : "http://localhost:3000",
}