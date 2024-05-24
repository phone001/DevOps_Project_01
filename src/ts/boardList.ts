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
    let endI = startI - 19 < 0 ? 0 : startI - 19;
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



// 문의하기 버튼 클릭 시 페이지 이동
const contactBtn = document.querySelector("#contactBtn") as HTMLButtonElement;
contactBtn.onclick = (e: Event) => {
    if (sessionStorage.getItem("currentUser") === null) {
        alert("로그인 후 이용해 주세요.");
        return;
    }
    location.href = "../html/boardWrite.html";
}


const boardManager = new BoardManager();
const boardList: Board[] = boardManager.getBoardList();
const urlSearch = new URLSearchParams(location.search);
let currentPage = urlSearch.size === 0 ? 1 : parseInt(urlSearch.get("page"));




// 예약 확인 버튼 제어
const resrveBtn = document.querySelector(".resrve-btn") as HTMLAnchorElement;
resrveBtn.onclick = (e: Event) => {
    e.preventDefault();
    const resrveConfirmBox = document.querySelector(".resrve-confirm-box") as HTMLDivElement;
    const list = document.querySelector(".list") as HTMLUListElement;
    console.log(list.getAttribute("style"))
    if (list.getAttribute("style") === null) {
        resrveConfirmBox.classList.add("on");
        list.setAttribute("style", "display: block");
    } else {
        resrveConfirmBox.classList.remove("on");
        list.removeAttribute("style");
    }
}


// 호텔찾기 버튼 제어
const findHotelBtn = document.querySelector(".hotel-find-btn") as HTMLAnchorElement;
findHotelBtn.onclick = (e: Event) => {
    e.preventDefault();
    const hotelBox = document.querySelector(".hotel-box") as HTMLDivElement;
    const fhModal = document.querySelector(".fh-modal") as HTMLDivElement;
    const fhmScreen = document.querySelector(".fhm-screen") as HTMLDivElement;
    const body = document.querySelector("body") as HTMLBodyElement;
    hotelBox.classList.add("on");
    fhModal.setAttribute("style", "display:block;");
    fhmScreen.setAttribute("style", "display:block;");
    body.setAttribute("style", "margin-top: 0px; padding-right: 17px; overflow:hidden;");
}

// 호텔찾기 모달 권역별 브랜드별 스위칭
const fhmTab1Btn = document.querySelector(".fhm-tab1-btn") as HTMLAnchorElement;
const fhmTab1 = document.querySelector(".fhm-tab1") as HTMLLIElement;
const fhmBody1 = document.querySelector(".fhm-body1") as HTMLDivElement;
const fhmTab2Btn = document.querySelector(".fhm-tab2-btn") as HTMLAnchorElement;
const fhmTab2 = document.querySelector(".fhm-tab2") as HTMLLIElement;
const fhmBody2 = document.querySelector(".fhm-body2") as HTMLDivElement;
// 권역별
fhmTab1Btn.onclick = (e: Event) => {
    e.preventDefault();
    fhmTab1.classList.add("on");
    fhmBody1.setAttribute("style", "display:block;");
    fhmTab2.classList.remove("on");
    fhmBody2.setAttribute("style", "display:none;");
}

// 브랜드별
fhmTab2Btn.onclick = (e: Event) => {
    e.preventDefault();
    fhmTab1.classList.remove("on");
    fhmBody1.setAttribute("style", "display:none;");
    fhmTab2.classList.add("on");
    fhmBody2.setAttribute("style", "display:block;");
}

// 호텔찾기 모달창 닫기
const fhmClose = document.querySelector(".fhm-close") as HTMLAnchorElement
fhmClose.onclick = (e: Event) => {
    e.preventDefault();
    const hotelBox = document.querySelector(".hotel-box") as HTMLDivElement;
    const fhModal = document.querySelector(".fh-modal") as HTMLDivElement;
    const fhmScreen = document.querySelector(".fhm-screen") as HTMLDivElement;
    const body = document.querySelector("body") as HTMLBodyElement;
    hotelBox.classList.remove("on");
    fhModal.setAttribute("style", "display:none;");
    fhmScreen.setAttribute("style", "display:none;");
    body.removeAttribute("style");
}

// 예약 버튼 제어
const rsvBtn = document.querySelector(".rsv-btn") as HTMLAnchorElement;
rsvBtn.onclick = (e: Event) => {
    e.preventDefault();
    const rsvBox = document.querySelector(".rsv-box") as HTMLDivElement;
    const rsvModal = document.querySelector(".rsv-modal") as HTMLDivElement;
    const rsvScreen = document.querySelector(".rsv-screen") as HTMLDivElement;
    const body = document.querySelector("body") as HTMLBodyElement;
    rsvBox.classList.add("on");
    rsvModal.setAttribute("style", "display:block;");
    rsvScreen.setAttribute("style", "display:block;");
    body.setAttribute("style", "margin-top: 0px; padding-right: 17px; overflow:hidden;");
}

// 예약 모달창 닫기
const rsvClose = document.querySelector(".rsv-close") as HTMLAnchorElement
rsvClose.onclick = (e: Event) => {
    e.preventDefault();
    const rsvBox = document.querySelector(".rsv-box") as HTMLDivElement;
    const rsvModal = document.querySelector(".rsv-modal") as HTMLDivElement;
    const rsvScreen = document.querySelector(".rsv-screen") as HTMLDivElement;
    const body = document.querySelector("body") as HTMLBodyElement;
    rsvBox.classList.remove("on");
    rsvModal.setAttribute("style", "display:none;");
    rsvScreen.setAttribute("style", "display:none;");
    body.removeAttribute("style");
}
