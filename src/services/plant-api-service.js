import config from '../config'
import TokenService from '../services/token-service'

const PlantApiService = {
  
  postPlant(plant) {
    console.log(JSON.stringify(plant))
    return fetch(`${config.API_ENDPOINT}/plants`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(plant),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default PlantApiService