function boardRender(i: number) {
    const contents = document.querySelector(".contents") as HTMLDivElement;
    const boardManager = new BoardManager();
    const boardList: Board[] = boardManager.getBoardList();

    const layouts = document.createElement("div") as HTMLDivElement;
    layouts.classList.add("content-layouts");

    const num = document.createElement("div") as HTMLDivElement;
    num.classList.add("content-num")
    num.innerHTML = "" + (i + 1);

    const title = document.createElement("div") as HTMLDivElement;
    title.classList.add("content-title");
    title.innerHTML = `<a href="#">${boardList[i].getTitle()}</a>`;

    const auther = document.createElement("div") as HTMLDivElement;
    auther.classList.add("content-auther");
    auther.innerHTML = boardList[i].getName();

    const date = document.createElement("div") as HTMLDivElement;
    date.classList.add("content-date");
    date.innerHTML = boardList[i].getDate();

    layouts.append(num, title, auther, date);
    contents.append(layouts);
}

function boardListRender(index: number) {
    const boardManager = new BoardManager();
    const boardList: Board[] = boardManager.getBoardList();
    let startI = boardList.length - 1 - (20 * (index - 1));
    let endI = startI - 20;
    console.log(startI)
    console.log(endI)
    for (startI; startI > endI; startI--) {
        boardRender(startI);
    }
}

// function searchListRender(index: number, value: string, searchTarget: string) {
//     const boardManager = new BoardManager();
//     const boardList: Board[] = boardManager.getBoardList();
//     const contents = document.querySelector(".contents");
//     contents.innerHTML = "";
//     let startI = boardList.length - 1 - (20 * (index - 1));
//     let endI = startI - 20;
//     console.log(startI)
//     let count: number = 0;
//     for (startI; startI > endI; startI--) {
//         if (endI < 0) {
//             break;
//         }
//         if (searchTarget === "") {
//             break;
//         }
//         if (boardList[startI][value]().indexOf(searchTarget) >= 0) {
//             boardRender(startI);
//             count++
//         } else {
//             endI--;
//         }
//     }
//     console.log(endI)
//     return count;
// }



function pagenation(_totalPage: number, _pageNum: number) {

    //
    const urlSearch = new URLSearchParams(location.search);
    console.log(urlSearch.get("value"));
    if (_totalPage <= 20) return;

    const totalPage = Math.ceil(_totalPage / 20);
    const pageGroup = Math.ceil(_pageNum / 5);
    let lastNum = Math.ceil(pageGroup * 5);
    if (lastNum > totalPage) lastNum = totalPage;
    let firstNum = Math.ceil((pageGroup - 1) * 5 + 1);


    let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));

    function searchUrl() {
        if (!urlSearch.get("value") === null) {
            return `&value=${urlSearch.get("value")}&searchTarget=${urlSearch.get("searchTarget")}`;
        } else {
            return "";
        }
    }

    const pagenationWrap = document.querySelector(".pagination-wrap") as HTMLDivElement;
    pagenationWrap.innerHTML = "";
    if (!(firstNum === 1)) {
        pagenationWrap.innerHTML += `<a href="./boardList.html?page=1${searchUrl()}">&lt&lt</a>`
        pagenationWrap.innerHTML += `<a href="./boardList.html?page=${firstNum - 1}${searchUrl()}">&lt</a>`
    }
    for (let i = firstNum; i <= lastNum; i++) {
        if (i === _pageNum) {
            pagenationWrap.innerHTML += `<em>${i}</em>`;
            continue;
        }
        pagenationWrap.innerHTML += `<a href="./boardList.html?page=${i}${searchUrl()}">${i}</a>`;
    }
    if (!(lastNum === totalPage)) {
        pagenationWrap.innerHTML += `<a href="./boardList.html?page=${lastNum + 1}${searchUrl()}">&gt</a>`
        pagenationWrap.innerHTML += `<a href="./boardList.html?page=${totalPage}${searchUrl()}">&gt&gt</a>`
    }
}




// 검색버튼 클릭 시 검색
// const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement;
// searchBtn.onclick = (e: Event) => {
//     const _value = document.querySelector("#searchTarget") as HTMLSelectElement;
//     const _searchTarget = document.querySelector("#searchValue") as HTMLInputElement;
//     // location.href = `./boardList.html?page=1&value=${_value.value}&searchTarget=${_searchTarget.value}`
//     // const urlSearch = new URLSearchParams(location.search);
//     // let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));
//     // searchListRender(currentPage, urlSearch.get("value"), urlSearch.get("searchTarget"));
//     searchListRender(1, _value.value, _searchTarget.value);
// }

// // 엔터키 입력 시 검색
// const searchInput = document.querySelector("#searchValue") as HTMLInputElement;
// searchInput.onkeydown = (e: KeyboardEvent) => {
//     if (e.key === "Enter") {
//         const _value = document.querySelector("#searchTarget") as HTMLSelectElement;
//         const _searchTarget = document.querySelector("#searchValue") as HTMLInputElement;
//         // location.href = `./boardList.html?page=1&value=${_value.value}&searchTarget=${_searchTarget.value}`
//         // const urlSearch = new URLSearchParams(location.search);
//         // let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));
//         // searchListRender(currentPage, urlSearch.get("value"), urlSearch.get("searchTarget"));
//         searchListRender(1, _value.value, _searchTarget.value);
//     }
// }

// 로그인 상태 체크
function storageChk() {
    const redirectBtn = document.querySelector(".redirectBtn") as HTMLDivElement;
    if (sessionStorage.getItem("currentUser") === null) {
        redirectBtn.innerHTML = `<a href="../html/loginSignup.html">로그인</a>`;
    } else {
        const currentUser: { loginId: string, nickname: string } = JSON.parse(sessionStorage.getItem("currentUser"));
        redirectBtn.innerHTML = `<a href="#">${currentUser.nickname}님</a>`;
    }
}

const boardManager = new BoardManager();
const boardList: Board[] = boardManager.getBoardList();
const urlSearch = new URLSearchParams(location.search);
let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));

// document.querySelector(".eeewww").addEventListener("click", (e) => {
//     if (sessionStorage.getItem('eee') == "1")
//         sessionStorage.setItem('eee', "0");
//     else if (sessionStorage.getItem("eee") == "0")
//         sessionStorage.setItem("eee", "1");
// })

// if (sessionStorage.getItem("eee") === "0") {
// pagenation(boardList.length, currentPage);
// boardListRender(currentPage);
// }
// else if (sessionStorage.getItem("eee") == "1") {
//     const _value = document.querySelector("#searchTarget") as HTMLSelectElement;
//     const _searchTarget = document.querySelector("#searchValue") as HTMLInputElement;
//     pagenation(searchListRender(1, _value.value, _searchTarget.value), currentPage);
// }
pagenation(boardList.length, currentPage);
boardListRender(currentPage);
storageChk();