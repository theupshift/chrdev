;(function (data) {
  if (!Array.isArray(data)) {
    return console.info('invalid data to draw subscribers', data)
  }

  const ctx = document.getElementById('chart')
  if (!ctx) {
    return console.info('missing chart element', ctx)
  }

  data = data.map(d => new Date(d))
  const datesWithCount = data.reduce((acc, curr, i) => acc.concat([i + 1]), [])
  console.log('data', data, datesWithCount)

  const chart = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: data,
      datasets: [{
        label: 'subscribers',
        data: datesWithCount,
        borderWidth: 4
      }]
    },
    options: {
      height: 200,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'week'
          }
        }]
      }
    }

  })

  console.log(chart)
})(window.subscribers)
