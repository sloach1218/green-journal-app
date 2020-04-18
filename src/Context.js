import React from 'react'

const PlantsContext = React.createContext({
  plants: [],
  error: null,
  updatePlants: () => {},
  updatePlant: () => {},
  setLogs: () => {},
  deleteNote: () => {},
})
export default PlantsContext