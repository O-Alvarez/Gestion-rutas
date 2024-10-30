// archivo que arranca la aplicacion
import app from './app'
import './database/connection'

app.listen(app.get('port'))
console.log('Escuchando en el puerto: ', app.get('port'))