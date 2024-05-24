type sessionCheck = {
    loginId: string,
    nickname: string;
}

window.addEventListener("DOMContentLoaded", (e) => {

    if (sessionStorage.getItem("currentUser") === null) {
        alert("로그인 정보가 없습니다.");
        location.href = "../html/loginSignup.html";
    }

})

function setCookie(key: string, value: string, minute: number, path: string = location.href) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minute);
    document.cookie = `${key}=${value};expires=${date.toUTCString()}/path=${path}`;
}

function getCookie(key: string): string {
    const cookieList = document.cookie.split(";");
    for (let item of cookieList) {
        const value = item.split("=");
        if (value[0].trim() === key) {
            return value[1];
        }
    }
}

window.onload = () => {
    let check: boolean = getCookie("myPageCheck") === null ? false : new Boolean(getCookie("myPageCheck")).valueOf();
    const reloadCheck: PerformanceEntryList = performance.getEntriesByType("navigation");

    // 리로드 되었거나 마이페이지에서 다시 마이페이지로 이동한 경우
    // 패스워드를 다시 체크하지 않는다.
    if (check && (document.referrer === location.href || reloadCheck[0]["type"] === "reload")) {
        view();
    } else {
        passwordCheck()
    }

    changeNickname();
    main();
    const _backBtn = document.querySelector("#backBtn") as HTMLButtonElement;
    _backBtn.onclick = () => history.back();
}

function main(): void {
    const session: sessionCheck = sessionStorage.getItem("currentUser") === null ? null : JSON.parse(sessionStorage.getItem("currentUser"));
    if (session === null) {
        alert("로그인 정보가 없습니다.");
        history.back();
    }
    const manager: UserManager = new UserManager();
    const list = manager.getUserList();
    const user = list.find((item) => {
        return session.loginId === item.getLoginId();
    })
    const loginId = document.querySelector("#loginId") as HTMLInputElement;
    const nickname = document.querySelector("#nickname") as HTMLInputElement;
    loginId.value = user.getLoginId();

    nickname.value = user.getNickname();
}


function changeBoardNicnname(oldName: string, newName: string): void {
    // 닉네임이 변경되면 기존 게시글 및 댓글들을
    // 권한에 의해 조작될 수 없어 글들의 닉네임 전부 변경
    const boardManager: BoardManager = new BoardManager();
    const commentsManager: CommentsManager = new CommentsManager("commentsList", "replyList");
    boardManager.updateBoardNickname(oldName, newName);
    commentsManager.updateCommentsNickname(oldName, newName);
}



function view(): void {
    const pupup = document.querySelector(".PWCheck") as HTMLDivElement;
    pupup.style.display = "none";
    const container = document.querySelector(".infoForm") as HTMLDivElement;
    container.style.display = "block"
}

function passwordCheck(): void {
    const _form = document.querySelector("#passwordCheckform") as HTMLFormElement;
    const popupExit = document.querySelector("#popupExit") as HTMLInputElement;
    popupExit.onchange = (e: Event) => {
        const exit = (e.target as HTMLInputElement).checked;
        if (exit) {
            history.back();
        }
    }
    _form.onsubmit = (e: Event) => {
        e.preventDefault();
        const { password } = e.target as HTMLFormElement
        const manager: UserManager = new UserManager();

        // 세션에 저장된 로그인 정보가 없다면 
        // 다시 로그인하게 한다.
        const session = sessionStorage.getItem("currentUser") === null ? null : JSON.parse(sessionStorage.getItem("currentUser"));
        if (session === null) {
            alert("로그인 정보가 없습니다.")
            location.href = "loginSignup.html"
        }

        const user: User = manager.getUserList().find(item => {
            if (session.loginId === item.getLoginId() && password.value === item.getPassword()) {
                return item;
            }
        })

        // 입력한 현재 로그인 id와 입력받은 패스워드에 매칭되는 유저가 없다면
        // 입력한 패스워드가 다르거나 기존 유저가 없다.
        if (user === null || user === undefined) {
            alert("입력한 패스워드가 다릅니다.");
            password.value = '';
            return;
        }

        setCookie("myPageCheck", true + "", 5);

        const pwCheck = document.querySelector(".PWCheck") as HTMLDivElement;
        pwCheck.style.display = "none";
        const container = document.querySelector(".infoForm") as HTMLDivElement;
        container.style.display = "block"
    }

}

function changeNickname(): void {
    const _form = document.querySelector("#form") as HTMLFormElement;
    _form.onsubmit = (e: Event) => {
        e.preventDefault();
        const manager: UserManager = new UserManager();
        const oldName = JSON.parse(sessionStorage.getItem("currentUser")).nickname;
        const nickname = document.querySelector("#nickname") as HTMLInputElement;
        const _loginId = document.querySelector("#loginId") as HTMLInputElement;

        const list: User[] = manager.getUserList()

        //닉네임 중복체크
        let isExist = false;
        for (let item of list) {
            if (item.getNickname() === nickname.value) {
                isExist = true;
                alert("이미 등록된 닉네임입니다.");
                return;
            }
        }

        const index = list.findIndex((item) => {
            return item.getLoginId() === _loginId.value;
        })

        manager.updateNickname(index, nickname.value);
        const updateSesstion: sessionCheck = {
            loginId: _loginId.value,
            nickname: nickname.value
        }

        //변경된 닉네임으로 세션 재설정
        sessionStorage.setItem("currentUser", JSON.stringify(updateSesstion));
        changeBoardNicnname(oldName, nickname.value)
        alert("수정이 완료되었습니다.");
    }
}


