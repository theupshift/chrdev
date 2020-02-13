const ps = [...document.querySelectorAll('.p')]
console.log({ ps })

ps.forEach(p => {
  // p.innerText = (p.innerText || '').replace(/[omrd]/gi, '*')
  p.addEventListener('click', (e) => {
    if (e.target.innerText === 'pomodoro') {
      p.innerText = (p.innerText || '').replace(/[omrd]/gi, '*')
    } else {
      p.innerText = 'pomodoro'
    }
  })
})
