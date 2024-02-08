class UserModel {
    constructor() {
        this.first_name = ''
        this.last_name = ''
        this.age = 1
        this.defense = 100
        this.attack = 50
        this.life = 100
    }

    getFullName() {
        return this.first_name + ' ' + this.last_name
    }

    getAgeGap(user) {
        return Math.abs(this.age - user.age)
    }

    doAttack(user) {
        user.defense = user.defense - this.attack
        if (user.defense < 0) {
            user.life = user.life - Math.abs(user.defense)
        }
    }

    doHeal(point) {
        point = parseInt(point)
        this.life = this.life + point
    }

}

exports.UserModel = UserModel

// exports.getFullName = getFullName
