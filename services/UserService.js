class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.user = db.User;
    }
    async create(username, password, score) {
        return this.user.create({
            Username: username,
            Password: password,
            Score: score
        });
    }
    async getAll() {
        return this.user.findAll({
            where: {}
        });
    }
    async deleteUser(userId) {
        return this.user.destroy({
            where: { id: userId }
        });
    }
}
module.exports = UserService;
