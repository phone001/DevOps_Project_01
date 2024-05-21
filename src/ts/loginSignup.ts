// 리다이렉트
if (document.readyState == "loading") {
    if (sessionStorage.getItem("currentUser") !== null) {
        location.href = "../html/boardList.html";
    }
}

// 레이아웃 변경 DOM
const changeSignupBtn = document.querySelector("#changeSignupBtn") as HTMLButtonElement;
const changeLoginBtn = document.querySelector("#changeLoginBtn") as HTMLButtonElement;
const contentWrap = document.querySelector(".content-wrap") as HTMLDivElement;

// 로그인 input
const signinId = document.querySelector("#signinId") as HTMLInputElement;
const signinPw = document.querySelector("#signinPw") as HTMLInputElement;

// 로그인 button
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;

// 회원가입 input
const signupId = document.querySelector("#signupId") as HTMLInputElement;
const signupPw = document.querySelector("#signupPw") as HTMLInputElement;
const signupPwChk = document.querySelector("#signupPwChk") as HTMLInputElement;
const signupNickname = document.querySelector("#signupNickname") as HTMLInputElement;

// 회원가입 button
const signupBtn = document.querySelector("#signupBtn") as HTMLButtonElement;

// 회원가입 레이아웃 변경 함수
changeSignupBtn.onclick = (e: Event) => {
    contentWrap.classList.add("on");
    signinId.value = "";
    signinPw.value = "";
}

// 로그인 레이아웃 변경 함수
changeLoginBtn.onclick = (e: Event) => {
    contentWrap.classList.remove("on");
    signupId.value = "";
    signupPw.value = "";
    signupPwChk.value = "";
    signupNickname.value = "";
}

// 로그인 함수
loginBtn.onclick = (e: Event) => {
    const _loginId: string = signinId.value;
    const _loginPw: string = signinPw.value;
    const userManager = new UserManager();
    const userList: User[] = userManager.getUserList();
    if (sessionStorage.getItem("currentUser") !== null) {
        alert("이미 로그인 된 사용자가 있습니다. 로그아웃 후 다시 요청해 주세요.");
        location.href = "../html/boardList.html";
        return;
    }
    if (_loginId === "" || _loginPw === "") {
        return alert("아이디와 비밀번호를 입력해 주세요");
    }
    if (userManager.getUserList().length <= 0) {
        return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].getLoginId() === _loginId && userList[i].getPassword() === _loginPw) {
            sessionStorage.setItem("currentUser", JSON.stringify({ loginId: userList[i].getLoginId(), nickname: userList[i].getNickname() }));
            location.href = "../html/boardList.html";
            return;
        }
        if (i === userList.length - 1) {
            return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }
}


// 회원가입 함수
signupBtn.onclick = (e: Event) => {
    const _signupId: string = signupId.value;
    const _signupPw: string = signupPw.value;
    const _signupPwChk: string = signupPwChk.value;
    const _signupNickname: string = signupNickname.value;

    const userManager = new UserManager();
    const userList: User[] = userManager.getUserList();

    if (_signupId === "") {
        return alert("아이디를 입력해 주세요");
    }
    if (_signupPw === "") {
        return alert("비밀번호를 입력해 주세요");
    }
    if (_signupPwChk === "") {
        return alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요");
    }
    if (_signupNickname === "") {
        return alert("닉네임을 입력해 주세요");
    }

    for (let user of userList) {
        if (user.getLoginId() === _signupId) {
            return alert("이미 존재하는 아이디입니다.");
        }
        if (user.getNickname() === _signupNickname) {
            return alert("이미 존재하는 닉네임입니다.");
        }
    }

    if (_signupPw !== _signupPwChk) {
        return alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요");
    }

    const user = new User(_signupId, _signupPw, _signupNickname);
    userManager.addUser(user);
    alert("가입이 완료되었습니다.");
    location.reload();
}


