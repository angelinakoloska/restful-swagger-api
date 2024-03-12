class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }
    async create(Username, Password, Score) {
        return this.User.create({
            Username: Username,
            Password: Password,
            Score: Score
        });
    }
    async getAll() {
        return this.User.findAll({
            where: {}
        });
    }
    async deleteUser(userId) {
        return this.User.destroy({
            where: { id: userId }
        });
    }
}
module.exports = UserService;
