
import user from './user'
import mangotree from './mangotree'

/* GET home page. */

export default (app, passport) => {
  app.use('/api/user', user)
  app.use('/api/mangotree', mangotree)
}
