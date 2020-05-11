;(function (data) {
  if (!Array.isArray(data)) {
    return console.info('invalid data to draw subscribers', data)
  }

  var ctx = document.getElementById('chart')
  if (!ctx) {
    return console.info('missing chart element', ctx)
  }

  data = data.map(d => new Date(d))
  const datesWithCount = data.reduce((acc, curr, i) => acc.concat([i]), [])
  console.log('data', data, datesWithCount)

  var chart = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels: data,
      datasets: [{
        label: 'subscribers',
        data: datesWithCount,
        borderWidth: 4,
        backgroundColor: '#fe1'
      }]
    },
    options: {
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
