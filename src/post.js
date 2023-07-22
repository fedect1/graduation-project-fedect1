class Post {
  comments = []
  likes = []
  date = new Date()
  expirationDate = new Date()
  timeOut = 10 // 10800seg are 3 hours
  status = true


  constructor(message) {
    this.message = message
  }


  countDown() {
    if (this.timeOut <= 0) {
      this.status = false
      return this.status // Devolver false cuando el tiempo expira
    }

    const min = `${Math.floor(this.timeOut / 60)}`.padStart(2, '0')
    const sec = `${this.timeOut % 60}`.padStart(2, '0')
    console.log(`${min}:${sec}`)
    this.timeOut--

    setTimeout(() => {
      this.countDown()
    }, 1000)

    return this.status
  }



  get expired() {
    return this.countDown()
  }



  get dateFeedFormat() {
    const calcDaysPassed = () => {
      const currentDate = new Date(2023, 7, 5) //new Date()
      const daysPassed = Math.round(Math.abs(currentDate - this.date) / (1000 * 60 * 60 * 24))
      return daysPassed
    }
    const daysPassed = calcDaysPassed()

    if (daysPassed === 0) return 'Today'
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed < 7) return `${daysPassed} days ago`
    if (daysPassed) return `${Math.floor(daysPassed / 7)} weeks ago`
  }
}

module.exports = Post
