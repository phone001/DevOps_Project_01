class UserManager {
    userList: User[];
    constructor() {
        this.storageCheck();
    }

    storageCheck() {
        if (localStorage.getItem("userList") === null) {
            this.userList = [];
        } else {
            this.userList = JSON.parse(localStorage.getItem("userList")).map((e) => { return new User(e.loginId, e.password, e.nickname, e.auth) });
        }
    }

    getUserList(): User[] {
        return this.userList;
    }

    updateNickname(index: number, nickname: string) {
        this.userList[index].updateNickname(nickname);
        this.setUserList()
    }

    addUser(newUser: User) {
        this.userList.push(newUser);
        this.setUserList()
    }

    setUserList() {
        localStorage.setItem("userList", JSON.stringify(this.userList));
    }
}