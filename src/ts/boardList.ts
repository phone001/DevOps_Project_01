function boardRender(i: number) {
    const contents = document.querySelector(".contents") as HTMLDivElement;
    const boardManager = new BoardManager();
    const boardList: Board[] = boardManager.getBoardList();

    const layouts = document.createElement("div") as HTMLDivElement;
    layouts.classList.add("content-layouts");

    const num = document.createElement("div") as HTMLDivElement;
    num.classList.add("content-num")
    num.innerHTML = "" + (boardList[i].getIndex() + 1);

    const title = document.createElement("div") as HTMLDivElement;
    title.classList.add("content-title");
    title.innerHTML = `<a href="../html/boardDetail.html?index=${boardList[i].getIndex()}">${boardList[i].getTitle()}</a>`;

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
    let endI = startI - 20 < 0 ? 0 : startI - 20;
    for (startI; startI >= endI; startI--) {
        boardRender(startI);
    }
}



function pagenation(_totalPage: number, _pageNum: number) {

    const urlSearch = new URLSearchParams(location.search);
    if (_totalPage <= 20) return;

    const totalPage = Math.ceil(_totalPage / 20);
    const pageGroup = Math.ceil(_pageNum / 5);
    let lastNum = Math.ceil(pageGroup * 5);
    if (lastNum > totalPage) lastNum = totalPage;
    let firstNum = Math.ceil((pageGroup - 1) * 5 + 1);

    console.log(totalPage);

    function searchUrl() {
        if (!(urlSearch.get("searchTarget") === null)) {
            return `&value=${urlSearch.get("value")}&searchTarget=${urlSearch.get("searchTarget")}`;
        } else {
            return "";
        }
    }

    const pagenationWrap = document.querySelector(".pagination-wrap") as HTMLDivElement;
    pagenationWrap.innerHTML = "";
    if (!(firstNum === 1)) {
        pagenationWrap.innerHTML += !(urlSearch.get("searchTarget") === null) ? `<a href="./boardList2.html?page=1${searchUrl()}">&lt&lt</a>` : `<a href="./boardList.html?page=1">&lt&lt</a>`
        pagenationWrap.innerHTML += !(urlSearch.get("searchTarget") === null) ? `<a href="./boardList2.html?page=${firstNum - 1}${searchUrl()}">&lt</a>` : `<a href="./boardList.html?page=${firstNum - 1}">&lt</a>`
    }
    for (let i = firstNum; i <= lastNum; i++) {
        if (i === _pageNum) {
            pagenationWrap.innerHTML += `<em>${i}</em>`;
            continue;
        }
        pagenationWrap.innerHTML += !(urlSearch.get("searchTarget") === null) ? `<a href="./boardList2.html?page=${i}${searchUrl()}">${i}</a>` : `<a href="./boardList.html?page=${i}">${i}</a>`
    }
    if (!(lastNum === totalPage)) {
        pagenationWrap.innerHTML += !(urlSearch.get("searchTarget") === null) ? `<a href="./boardList2.html?page=${lastNum + 1}${searchUrl()}">&gt</a>` : `<a href="./boardList.html?page=${lastNum + 1}">&gt</a>`
        pagenationWrap.innerHTML += !(urlSearch.get("searchTarget") === null) ? `<a href="./boardList2.html?page=${totalPage}${searchUrl()}">&gt&gt</a>` : `<a href="./boardList.html?page=${totalPage}">&gt&gt</a>`
    }
}




// 검색버튼 클릭 시 검색
const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement;
searchBtn.onclick = (e: Event) => {
    const _value = document.querySelector("#searchTarget") as HTMLSelectElement;
    const _searchTarget = document.querySelector("#searchValue") as HTMLInputElement;
    location.href = `./boardList2.html?page=1&value=${_value.value}&searchTarget=${_searchTarget.value}`
}

// 엔터키 입력 시 검색
const searchInput = document.querySelector("#searchValue") as HTMLInputElement;
searchInput.onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        const _value = document.querySelector("#searchTarget") as HTMLSelectElement;
        const _searchTarget = document.querySelector("#searchValue") as HTMLInputElement;
        location.href = `./boardList2.html?page=1&value=${_value.value}&searchTarget=${_searchTarget.value}`
    }
}

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

// 문의하기 버튼 클릭 시 페이지 이동
const contactBtn = document.querySelector("#contactBtn") as HTMLButtonElement;
contactBtn.onclick = (e: Event) => {
    location.href = "../html/boardWrite.html";
}


const boardManager = new BoardManager();
const boardList: Board[] = boardManager.getBoardList();
const urlSearch = new URLSearchParams(location.search);
let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));

storageChk();