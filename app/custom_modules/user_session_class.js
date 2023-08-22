class UserSession {

    constructor () {

    }

    async createSession (req, res) {
        res.json({test: "test login"});
    }

} 

module.exports = UserSession;