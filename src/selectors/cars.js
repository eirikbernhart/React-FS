



// Get visible cars
export default (cars, { text }) => {
    return cars.filter((car) => {
        const textMatch = car.carName.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
       
    })
}