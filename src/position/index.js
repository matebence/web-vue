if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    let data = localStorage.getItem('browserData')
    const userPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    }

    if (!data) {
      localStorage.setItem('browserData', JSON.stringify({position: userPosition}))
    } else {
      data = JSON.parse(data)
      if (data.position === undefined) {
        localStorage.setItem('browserData', JSON.stringify({...data, position: userPosition}))
      }
    }
  })
}
