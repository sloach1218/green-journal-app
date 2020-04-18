import React from 'react'

const PlantsContext = React.createContext({
  plants: [],
  error: null,
  updatePlants: () => {},
  updatePlant: () => {},
  deletePlant: () => {},
  setLogs: () => {},
  deleteLog: () => {},
})
export default PlantsContext