class GeneralDao {
    constructor(session) {
        this.session = session;
    }
    getConnection() {
        let promise = new Promise((resolve, reject) => {
            this.session.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                resolve(connection);
            });
        });
        return promise;
    }
}

module.exports = GeneralDao;