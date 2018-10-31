
import user from './user'
import mangotree from './mangotree'

/* GET home page. */

export default (app, passport) => {
  app.use('/api/users', user)
  app.use('/api/mangotrees', mangotree)
}
