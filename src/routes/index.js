
const Garages = require('./garages')
const bookingRoutes = require('./bookingRoutes');
// const auth = require('./auth');
const statisticRoutes = require('./statisticRoutes')
const scheduleRoutes = require('./scheduleRoutes')

const serviceRoutes = require('./serviceRoutes')

const billRoutes = require('./billRoutes')
function route(app) {

        app.use('/garages', Garages)

        app.use('/booking', bookingRoutes);

app.use('/statistics', statisticRoutes);

app.use('/schedule', scheduleRoutes);

app.use('/bills', billRoutes);

app.use('/service', serviceRoutes);

               
}

module.exports= route

