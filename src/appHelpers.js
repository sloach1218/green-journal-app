export const getPlant = (plants, plantId) => {
    const thePlant = plants.find(plant => plant.id === plantId)
    return thePlant;
}