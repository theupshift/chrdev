;(function (data) {
  if (!Array.isArray(data)) {
    return console.info('invalid data to draw contributions', data)
  }

  const ctx = document.getElementById('yearsChart')
  if (!ctx) {
    return console.info('missing chart element', ctx)
  }
  const yearsChart = new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.year),
      datasets: [{
        label: '# of public commits',
        data: data.map(d => d.total),
        borderWidth: 1
      }]
    }
  })

  console.log(yearsChart)
})(window.contributionsByYear)
