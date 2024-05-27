// 로그인 상태 체크
function storageChk() {
    const loginArea = document.querySelector(".loginArea") as HTMLDivElement;
    if (sessionStorage.getItem("currentUser") === null) {
        loginArea.innerHTML = `<a href="../html/loginSignup.html">로그인</a>`;
    } else {
        const currentUser: { loginId: string, nickname: string } = JSON.parse(sessionStorage.getItem("currentUser"));
        loginArea.innerHTML = `<a href="../html/myPage.html">${currentUser.nickname}님</a><span id="logoutBtn">로그아웃</span>`;
    }
}

storageChk();
// 로그아웃
if (document.querySelector("#logoutBtn") !== null) {
    const logoutBtn = document.querySelector("#logoutBtn") as HTMLSpanElement;
    logoutBtn.onclick = (e: Event) => {
        sessionStorage.clear();
        location.reload();
    }
}
