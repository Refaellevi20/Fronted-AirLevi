function generateRandomTimestamps(): number[] {
    const timestamps: number[] = []
    const startDate = new Date(2020, 0, 1) 
  
    for (let i = 0; i < 100; i++) {
      const daysAdded = Math.floor(Math.random() * (365 * 10)) 
      const randomDate = new Date(startDate.getTime() + daysAdded * 24 * 60 * 60 * 1000)
      const timestamp = randomDate.getTime()
      timestamps.push(timestamp)
    }
  
    return timestamps
  }
  
  const timestamps = generateRandomTimestamps()
  console.log(timestamps)
  