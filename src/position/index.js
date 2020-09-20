if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    let data = localStorage.getItem(process.env.LOCAL_STORAGE_BROWSER_DATA)
    const userPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    }

    if (!data) {
      localStorage.setItem(process.env.LOCAL_STORAGE_BROWSER_DATA, JSON.stringify({position: userPosition}))
    } else {
      data = JSON.parse(data)
      if (data.position === undefined) {
        localStorage.setItem(process.env.LOCAL_STORAGE_BROWSER_DATA, JSON.stringify({...data, position: userPosition}))
      }
    }
  })
}
