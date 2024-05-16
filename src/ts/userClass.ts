class User {
    private loginId: string;
    private password: string;
    private nickname: string;
    private auth: boolean;
    constructor(loginId: string, password: string, nickname: string, auth: boolean = false) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.auth = auth;
    }

    getLoginId(): string {
        return this.loginId;
    }

    getPassword(): string {
        return this.password;
    }

    getNickname(): string {
        return this.nickname;
    }

    getAuth(): boolean {
        return this.auth;
    }

    setAuth(auth: boolean) {
        this.auth = auth;
    }

    updateNickname(nickname: string): void {
        this.nickname = nickname;
    }
}

