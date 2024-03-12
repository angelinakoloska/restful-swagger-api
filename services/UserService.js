class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async create(username, password, score) {
        return this.User.create({
            Username: username,
            Password: password,
            Score: score
        });
    }

    async getAll() {
        return await this.User.findAll({
            where: {}
        })
    }

    async delete(id) {
        return this.User.destroy({
            where: {id: id}
        })
    }
}

module.exports = UserService;