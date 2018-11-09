
var TokenOpenBS = require('../services/TokenOpenBS')
// Mongo
var blockStart = require('../constants/constant').blockStart

class OpenBSSmart {
  async mintUniqueTokenTo (_from, _idToken, _tokenURI) {
    await TokenOpenBS.methods.mintUniqueTokenTo(_from, _idToken, _tokenURI)
      .then(result => {
        console.log(result)
        return result
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }
}

export default new OpenBSSmart()
