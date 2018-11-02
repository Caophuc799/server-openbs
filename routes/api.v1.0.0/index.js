
import user from './user'
import mangotree from './mangotree'
import cooperative from './cooperative'

/* GET home page. */

export default (app, passport) => {
  app.use('/api/users', user)
  app.use('/api/mangotrees', mangotree)
  app.use('/api/cooperatives', cooperative)
}
