class Test {
  constructor(fede, julio) {
    this.fede = fede
    this.julio = julio
  }
  run() {
    console.log('')
    console.log('--- Tests for Name ---')
    console.log(`User Federico should have name Federico --> ${this.fede.name === 'Federico'}`)
    console.log(`User Julio should have name Julio --> ${this.julio.name === 'Julio'}`)

    console.log('')
    console.log('--- Tests for Post ---')
    console.log(`User Federico should have 1 post --> ${this.fede.collectionPost.length === 1}`)
    console.log(`User Juli should have 2 post --> ${this.julio.collectionPost.length === 2}`)
    console.log()

    console.log('')
    console.log('--- Tests for Password post ---')
    //console.log(`Federico's password should be validPASS123 --> ${this.fede.#password === 'validPASS123'}`)
    //console.log(`Julio's password should be Fede123asdasd --> ${this.fede.#password === 'Fede123asdasd'}`)
    console.log()
  }
}

module.exports = Test
