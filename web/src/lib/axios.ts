import axios from "axios";

function getAPIClient() {

  const baseUrl = {
    dev: 'http://localhost:3333',
    hml: 'http://localhost:3333',
    prod: 'http://localhost:3333'
  }

  const api = axios.create({
    baseURL: baseUrl.dev
  })

  return api;
}

export const api = getAPIClient()
