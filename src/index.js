//Domain: DW Messenger
const User = require('./user')
const Tests = require('./test')

//User 1
const fede = new User('Federico', 'fedect1', 'fede@gmail.com', 'validPASS123')

fede.post('08/07/2023', '22:30', 'This is my first message')
fede.post('09/07/2023', '03:30', 'Checking if it is working')
fede.deletePost(1)

console.log(fede.info)

//User 2
const julio = new User('Julio', 'julioce', 'julito@gmail.com', 'val555aR')

julio.post('06/07/2023', '08:30', 'Sometimes I win, sometimes I dont')
julio.post(
  '07/07/2023',
  '00:30',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi condimentum venenatis massa non gravida. Ut in fermentum lacus. Nam quam eros, tincidunt in ante a, sollicitudin auctor lectus. Sed fermentum purus nec dui rhoncus, ac suscipit erat eleifend. Praesent tempor consectetur justo sit amet iaculis. Quisque commodo bibendum consequat. Vivamus pellentesque tempor enim, nec suscipit erat ultricies non. Etiam vel metus tincidunt mauris malesuada efficitur.'
)

julio.password = 'Fede123asdasd'

const tests = new Tests(fede, julio)
tests.run()
