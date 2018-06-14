
const jwt = require('jsonwebtoken');

class JWTProcess {

	constructor(args){
		this.state = {
			secret: args.secret
		}
	}

  getSecret() {
    return this.state.secret;
  }

  createAuthToken (customer) {
    return jwt.sign({ customerId: customer }, this.state.secret);
  };

  decodeBearerToken (authHeader) {
    console.log(authHeader);
    if (!authHeader) {
      return false;
    }
    // Usar bearer token
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
     return false;
    }
    try {
    	return jwt.verify(part[1], this.state.secret);
    } catch(e) {
    	// statements
    	console.log(e);
    	return false;
    }
  }

  decodeToken(authHeader){
  	//console.log(authHeader);
    if (!authHeader) {
      return false;
    }
    try{
      return jwt.verify(authHeader, this.state.secret);
 	  }catch(e) {
 	  	// statements
 		 console.log("Invalid signature!");
 		 return false;
 	  }
  }

}

module.exports =  JWTProcess;