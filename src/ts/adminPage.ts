window.addEventListener("DOMContentLoaded", (e) => {

    // const sesstion = sessionStorage.getItem("currentUser") === null ? null : JSON.parse(sessionStorage.getItem("currentUser"));
    // if (sesstion === null) {
    //     alert("로그인 정보가 없습니다.");
    //     location.href = "../html/loginSignup.html"
    // }
    //관리자 계정이 아니면 메인페이지로
    // if () {
    //
    // }


})

function userMain() {
    const _checkbox = document.querySelector("#allCheckBox") as HTMLInputElement;
    adminAuth()
    userRender();
    allCheckTest();
}
function userRender() {
    const list: User[] = new UserManager().getUserList();
    const view = document.querySelector(".user-list") as HTMLDivElement;
    view.append(getlistTitle("no", "loginId", "닉네임", "사용승인", ""));
    view.append(getListItem(list));
}

function getlistTitle(...titles: string[]): HTMLUListElement {
    const _ul = document.createElement("ul") as HTMLUListElement;
    _ul.classList.add("list-title");
    const classList = ["content-no", "content-id", "content-nickname", "content-auth", "content-checkbox"];
    for (let index in titles) {
        const _li = document.createElement("li") as HTMLLIElement;
        _li.innerHTML = titles[index];
        _li.classList.add(classList[index]);
        if (parseInt(index) === titles.length - 1) {
            _li.innerHTML = `<input type='checkbox' id='allCheckBox'>`;
        }
        _ul.append(_li)
    }
    return _ul;
}

function getListItem(list: User[]): HTMLDivElement {
    const _div = document.createElement("div") as HTMLDivElement;
    _div.classList.add("list-item");
    for (let i = 0; i < list.length; i++) {
        //if (list[i].getLoginId() === 'admin') continue;
        const _ul = document.createElement("ul") as HTMLUListElement;
        const _liNo = document.createElement("li") as HTMLLIElement;
        const _liLoginId = document.createElement("li") as HTMLLIElement;
        const _liNickname = document.createElement("li") as HTMLLIElement;
        const _liAuth = document.createElement("li") as HTMLLIElement;
        const _liAuthCheck = document.createElement("li") as HTMLLIElement;
        const _input = document.createElement("input") as HTMLInputElement;
        _input.name = "authCheck";
        _input.type = "checkbox";
        _input.checked = list[i].getAuth();
        _input.onchange = (e: Event) => {
            allCheckTest();
        }

        _liNo.innerHTML = (i + 1) + "";
        _liNo.classList.add("content-no");
        _liLoginId.innerHTML = list[i].getLoginId();
        _liLoginId.classList.add("content-id");
        _liNickname.innerHTML = list[i].getNickname();
        _liNickname.classList.add("content-nickname");
        _liAuth.innerHTML = list[i].getAuth() ? "O" : "X";
        _liAuth.classList.add("content-auth");
        _liAuthCheck.append(_input);
        _liAuthCheck.classList.add("content-checkbox");
        _ul.append(_liNo, _liLoginId, _liNickname, _liAuth, _liAuthCheck);
        _div.append(_ul);
    }
    return _div;
}


userMain();

const backBtn1 = document.querySelector("#backBtn") as HTMLButtonElement;
backBtn1.onclick = () => history.back();

const form = document.querySelector("#userUpdateForm") as HTMLFormElement;
form.onsubmit = (e: Event) => {
    e.preventDefault();
    const { authCheck } = e.target as HTMLFormElement
    const _authCheck: boolean[] = [];
    for (let item of authCheck) {
        _authCheck.push(item.checked);
    }
    const manager: UserManager = new UserManager();
    manager.updateAuth(_authCheck)
    alert("권한 수정이 완료되었습니다.");
    location.reload();
}

const _allCheck = document.querySelector("#allCheckBox") as HTMLInputElement;
_allCheck.onchange = (e) => {
    const _checkbox = document.querySelectorAll("input[name=authCheck]") as NodeList;
    const { checked } = e.target as HTMLInputElement
    allCheck(_checkbox, checked)
}

function allCheck(list: NodeList, checked: boolean) {
    list.forEach((item) => {
        (item as HTMLInputElement).checked = checked;
    })
}

function allCheckTest(): void {
    const allCheckBox = document.querySelector("#allCheckBox") as HTMLInputElement;
    const authCheckList = document.querySelectorAll("input[name=authCheck]") as NodeList;
    for (let item of authCheckList) {
        if ((item as HTMLInputElement).checked) {
            allCheckBox.checked = true;
        } else {
            allCheckBox.checked = false;
            break;
        }
    }
}

function adminAuth() {
    const sessionObj = sessionStorage.getItem("currentUser") === null ? null : JSON.parse(sessionStorage.getItem("currentUser"));
    if (sessionObj === null || sessionObj.loginId === null || sessionObj.loginId === undefined) {
        alert("계정 정보가 없습니다.")
        location.href = "loginSignup.html";
    } else if (sessionObj.loginId !== 'admin') {
        alert("관리 권한이 없습니다.");
        history.back();
    }

}

const mypage = document.querySelector("#mypage") as HTMLLIElement;
mypage.onclick = () => location.href = "myPage.html";
const admin = document.querySelector("#adminPage") as HTMLLIElement;
admin.onclick = () => location.href = "adminPage.html";