// 검색 후 페이지네이션 갯수
let count: number = 0;
for (let i = boardList.length - 1; i > 0; i--) {
    if (boardList[i][urlSearch.get("value")]().indexOf(urlSearch.get("searchTarget")) >= 0) {
        count++
    }
}

// 검색한 결과가 담긴 배열 생성
const searchResult = [];
for (let result of boardList) {
    if (result[urlSearch.get("value")]().indexOf(urlSearch.get("searchTarget")) >= 0) {
        searchResult.push(result)
    }
}

// 검색 결과 랜더링 element
function searchRender(i: number) {
    const contents = document.querySelector(".contents") as HTMLDivElement;

    const layouts = document.createElement("div") as HTMLDivElement;
    layouts.classList.add("content-layouts");

    const num = document.createElement("div") as HTMLDivElement;
    num.classList.add("content-num")
    num.innerHTML = "" + (searchResult[i].getIndex() + 1);

    const title = document.createElement("div") as HTMLDivElement;
    title.classList.add("content-title");
    title.innerHTML = `<a href="../html/boardDetail.html?index=${searchResult[i].getIndex()}">${searchResult[i].getTitle()}</a>`;

    const auther = document.createElement("div") as HTMLDivElement;
    auther.classList.add("content-auther");
    auther.innerHTML = searchResult[i].getName();

    const date = document.createElement("div") as HTMLDivElement;
    date.classList.add("content-date");
    date.innerHTML = searchResult[i].getDate();

    layouts.append(num, title, auther, date);
    contents.append(layouts);
}

// 검색 결과 20개 랜더링
function searchListRender(index: number, value: string, searchTarget: string) {
    const contents = document.querySelector(".contents");
    contents.innerHTML = "";
    let startI = searchResult.length - 1 - (20 * (index - 1));
    let endI = startI - 20 < 0 ? 0 : startI - 20;

    for (startI; startI >= endI; startI--) {
        console.log(endI);
        console.log(searchResult[startI]);
        if (searchTarget === "") {
            break;
        }
        if (searchResult[startI][value]().indexOf(searchTarget) >= 0) {
            searchRender(startI);
        }
    }
}

searchListRender(parseInt(urlSearch.get("page")), urlSearch.get("value"), urlSearch.get("searchTarget"))
pagenation(count, parseInt(urlSearch.get("page")));