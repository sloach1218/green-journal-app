import config from '../config'
import TokenService from '../services/token-service'

const PlantApiService = {
  getPlants(){
    return fetch(config.API_PLANTS_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      }
    }).then(response => response.json())
  },
  postPlant(plant) {
    
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
  imageUploader(plant){
      const formData = new FormData();
      formData.append('image', plant)
      return fetch(`${config.API_ENDPOINT}/image-upload`, {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
  }, 
  updatePlant(newPlant){
    return fetch(`${config.API_ENDPOINT}/plants`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newPlant),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
  },
  getPlantLogs(plantId) {
    return fetch(`${config.API_ENDPOINT}/plants/${plantId}/logs`, {
      headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postLog(log) {
    
    return fetch(`${config.API_ENDPOINT}/logs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(log),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteLog(logId){
    return fetch(`${config.API_ENDPOINT}/logs`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(logId),
    })
    .then(res => {
        
      if (!res.ok){
        return res.json().then(e => Promise.reject(e))
      }
      return
    })
  }
  /*getPlant(plantId) {
    return fetch(`${config.API_ENDPOINT}/plants/${plantId}`, {
      headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },*/
}
    

export default PlantApiService