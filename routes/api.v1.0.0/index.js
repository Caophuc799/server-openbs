
import user from './user'
import mangotree from './mangotree'
import cooperative from './cooperative'
import farmer from './farmer'
import purchase from './purchase'
import auth from './auth'

/* GET home page. */

export default (app, passport) => {
  app.use('/api/auth', auth)
  app.use('/api/users', user)
  app.use('/api/mangotrees', mangotree)
  app.use('/api/cooperatives', cooperative)
  app.use('/api/farmers', farmer)
  app.use('/api/purchases', purchase)
}
