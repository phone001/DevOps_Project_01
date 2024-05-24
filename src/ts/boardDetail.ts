const commentForm = document.querySelector("#comment-form") as HTMLFormElement;
const boardUpdateBtn = document.querySelector(".boardUpdateBtn") as HTMLButtonElement;
const boardDeleteBtn = document.querySelector(".boardDeleteBtn") as HTMLButtonElement;

/* 이벤트 부분 */
commentForm.onsubmit = function (e: Event) {
    e.preventDefault();
    commentInsert();
}


function updateBoard() {
    const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));

    location.href = `boardUpdate.html?index=${boardIndex}`;
}

function deleteBoard() {
    if (!confirm("삭제하시겠습니까?")) return;
    const boardindex: number = parseInt(new URLSearchParams(location.search).get("index"));
    const manager: BoardManager = new BoardManager();
    const commnetsManager: CommentsManager = new CommentsManager("commentsList", "replyList");
    const commnetsList: Comments[] = commnetsManager.getCommentsList();
    const replyList: Reply[] = commnetsManager.getReplyList();
    for (let i = commnetsList.length - 1; i >= 0; i--) {
        if (commnetsList[i].getBoardIndex() === boardindex) {
            commnetsList.splice(i, 1);
        }
    }
    for (let i = 0; i < commnetsList.length; i++) {
        if (commnetsList[i].getBoardIndex() > boardindex) {
            commnetsList[i].setBoardIndex(commnetsList[i].getBoardIndex() - 1);
        }
    }

    for (let i = replyList.length - 1; i >= 0; i--) {
        if (replyList[i].getBoardIndex() === boardindex) {
            replyList.splice(i, 1);
        }
    }
    for (let i = 0; i < replyList.length; i++) {
        if (replyList[i].getBoardIndex() > boardindex) {
            replyList[i].setBoardIndex(replyList[i].getBoardIndex() - 1);
        }
    }


    for (let i = 0; i < manager.getBoardList().length; i++) {
        if (manager.getBoardList()[i].getIndex() > boardindex) {
            manager.getBoardList()[i].setIndex(manager.getBoardList()[i].getIndex() - 1);
        }
    }
    manager.getBoardList().splice(boardindex, 1);
    manager.setBoardList();
    location.href = "boardList.html"
}


function sesstionCheck(): boolean {
    const sessionObj = sessionStorage.getItem("currentUser");
    if (sessionObj === null && sessionObj === undefined || sessionObj === '') {
        return true;
    }

    return false;
}


function checkEmpty(value: string): boolean {
    let isEmpty = false;
    if (value === null || value === undefined || value === '') {
        isEmpty = true;
    }
    return isEmpty;
}

function commentInsert() {
    const comment = document.querySelector("#comment") as HTMLTextAreaElement;
    const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));

    if (sesstionCheck()) {
        alert("로그인하세요");
        //나중에 로그인화면으로 전환
        return;
    }
    const sessionObj = JSON.parse(sessionStorage.getItem("currentUser"));
    if (sessionObj === null) {
        alert("로그인 정보가 없습니다.");
        return;
    }
    if (!checkEmpty(comment.value)) {
        const commentObj = new Comments(comment.value, sessionObj.nickname, boardIndex);
        const commnetManager = new CommentsManager("commentsList", "replyList");

        commnetManager.addComments(commentObj);
        commnetManager.setCommentsList();

        commentRender(boardIndex, commnetManager.getCommentsList(), commnetManager.getReplyList());
        comment.value = '';
    } else {
        alert("내용을 입력하세요");
    }
}

function commentRender(boardIndex: number, commentList: Comments[], replyList: Reply[]) {
    if (commentList !== null && commentList !== undefined) {
        const _container = document.querySelector("#comment_view");
        _container.innerHTML = '';
        for (let i = 0; i < commentList.length; i++) {

            if (commentList[i].getBoardIndex() === boardIndex) {
                const comment_obj = {
                    name: commentList[i].getName(),
                    comment: commentList[i].getComments(),
                    date: commentList[i].getDate(),
                    index: i
                }
                const _div = addBlock(modifyViewComment, delComment, addCommentInertView, "Comment", '수정', comment_obj);

                _div.id = `${commentList[i].getName()}_${i}`;
                if (replyList !== null && replyList !== undefined) {
                    for (let j = 0; j < replyList.length; j++) {

                        if (replyList[j].getBoardIndex() === boardIndex && i === replyList[j].getCommentIndex()) {
                            const replyObj = {
                                name: replyList[j].getName(),
                                comment: replyList[j].getAddComment(),
                                date: replyList[j].getDate(),
                                index: j
                            }
                            const reply_block = addBlock(modifyViewComment, delComment, addCommentInertView, 'Reply', '수정', replyObj);

                            reply_block.style.marginLeft = "20px";
                            _div.append(reply_block);
                        }
                    }
                }
                _container.append(_div);
            }
        }
    }
}


function modifyViewComment(e: Event, type: string) {
    const pNode = (e.target as HTMLButtonElement).closest(".comments") as HTMLDivElement;
    const _comment = pNode.childNodes[1] as HTMLDivElement;
    const insertDiv = document.querySelector(".is-insert") as HTMLDivElement;
    if (insertDiv === null || insertDiv === undefined) {
        _comment.classList.add("is-insert");
        const index = parseInt(pNode.dataset.index);

        _comment.contentEditable = "true";

        const updateBtn = pNode.querySelector(".comment-btn").childNodes[0] as HTMLButtonElement;
        updateBtn.innerHTML = "수정완료";
        updateBtn.onclick = function (e: Event) {
            modifyComment(e, index, type, _comment);
        };
    } else if (insertDiv !== null && insertDiv !== undefined && insertDiv.id == 'addReply') {
        (insertDiv.parentNode as HTMLDivElement).remove();
        const commnetNode = pNode.querySelector(".comment-content") as HTMLDivElement;
        commnetNode.contentEditable = "true";
        commnetNode.classList.add("is-insert");
        const updateBtn = pNode.querySelector(".comment-btn").childNodes[0] as HTMLButtonElement;
        updateBtn.innerHTML = "수정완료";
        const index = parseInt(pNode.dataset.index);
        updateBtn.onclick = function (e: Event) {
            modifyComment(e, index, type, _comment);
        };
    } else {
        insertDiv.contentEditable = "false";
        insertDiv.classList.remove("is-insert");

        const prebtn = insertDiv.nextSibling.childNodes[0] as HTMLButtonElement
        prebtn.innerHTML = '수정';

        prebtn.onclick = (e: Event) => {
            modifyViewComment(e, type);
        }
        _comment.classList.add("is-insert");
        const index = parseInt(pNode.dataset.index);

        _comment.contentEditable = "true";

        const updateBtn = pNode.querySelector(".comment-btn").childNodes[0] as HTMLButtonElement;
        updateBtn.innerHTML = "수정완료";
        updateBtn.onclick = function (e: Event) {
            modifyComment(e, index, type, _comment);
        };
    }
}


function modifyComment(e: Event, index: number, type: string, _comment: HTMLDivElement) {
    const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));
    const manager = new CommentsManager("commentsList", "replyList");

    const value = _comment.innerHTML;

    if (type === "Comment") {
        manager.updateComments(index, value);
    } else if (type === "Reply") {
        manager.updateReply(index, value);
    }
    commentRender(boardIndex, manager.getCommentsList(), manager.getReplyList());

}

function delComment(e: Event, type: string) {
    if (confirm("정말 삭제하시겠습니까?")) {
        const pNode = (e.target as HTMLButtonElement).closest(".comments") as HTMLDivElement;
        const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));
        const manager = new CommentsManager("commentsList", "replyList");
        if (type === "Comment") {
            manager.deleteComments(parseInt(pNode.dataset.index), boardIndex)
        } else if ("Reply") {
            manager.deleteReply(parseInt(pNode.dataset.index));
        }
        commentRender(boardIndex, manager.getCommentsList(), manager.getReplyList());
    }

}

function addCommentInertView(e: Event, type: string) {
    const insertDiv = document.querySelector(".is-insert") as HTMLDivElement;

    if (insertDiv === null) {
        const pNode = (e.target as HTMLButtonElement).closest(".comments") as HTMLDivElement;

        const _div = document.createElement("div") as HTMLDivElement;

        const addComments = document.createElement("div") as HTMLDivElement;
        addComments.contentEditable = "true";
        addComments.style.border = "1px solid"
        addComments.id = "addReply"
        addComments.classList.add("is-insert")
        const _upbtn = document.createElement("button") as HTMLButtonElement;
        _upbtn.innerHTML = '추가';

        _upbtn.onclick = function () {
            addComment(parseInt(pNode.dataset.index), addComments.innerHTML);
        }

        _div.append(addComments, _upbtn)
        pNode.append(_div)
    } else if (insertDiv !== null && insertDiv.id === 'addReply') {
        (insertDiv.parentNode as HTMLDivElement).remove();
    } else {
        insertDiv.contentEditable = "false";
        insertDiv.classList.remove("is-insert");

        const prebtn = insertDiv.nextSibling.childNodes[0] as HTMLButtonElement
        prebtn.innerHTML = '수정';

        prebtn.onclick = (e: Event) => {
            modifyViewComment(e, type);
        }
        const pNode = (e.target as HTMLButtonElement).closest(".comments") as HTMLDivElement;

        const _div = document.createElement("div") as HTMLDivElement;

        const addComments = document.createElement("div") as HTMLDivElement;
        addComments.contentEditable = "true";
        addComments.style.border = "1px solid"
        addComments.id = "addReply"
        addComments.classList.add("is-insert")
        const _upbtn = document.createElement("button") as HTMLButtonElement;
        _upbtn.innerHTML = '추가';

        _upbtn.onclick = function () {
            addComment(parseInt(pNode.dataset.index), addComments.innerHTML);
        }

        _div.append(addComments, _upbtn)
        pNode.append(_div)

    }
}

function addComment(commentIndex: number, value: string): void {
    const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));
    if (sesstionCheck()) {
        alert("로그인 하십시오");
        //나중에 로그인화면으로 
        //location.href = "loginSignup.html"
        return;
    }
    const sessionObj = sesstionCheck() ? null : JSON.parse(sessionStorage.getItem("currentUser"));
    const name = sessionObj === null ? null : sessionObj.nickname
    if (name === null) {
        alert("로그인 정보가 없습니다.")
        return;
    }
    const reply = new Reply(value, sessionObj.nickname, boardIndex, commentIndex);
    const replyManager = new CommentsManager("commentsList", "replyList");
    replyManager.addReply(reply);
    replyManager.setReplyList();
    commentRender(boardIndex, replyManager.getCommentsList(), replyManager.getReplyList());
}

function renderMain() {

    const boardIndex = parseInt(new URLSearchParams(location.search).get("index"));
    const commnetManager = new CommentsManager("commentsList", "replyList");
    const commentsList = commnetManager.getCommentsList();
    const replyList = commnetManager.getReplyList();
    commentRender(boardIndex, commentsList, replyList);
}
renderMain();

function addBlock(updateFn: Function, delFn: Function, addFn: Function, type: string, str: string, obj: object): HTMLDivElement {
    const _div = document.createElement('div') as HTMLDivElement;
    const _commentTitle = document.createElement('div') as HTMLDivElement;
    const _commentContent = document.createElement('div') as HTMLDivElement;
    const _wrap = document.createElement('div') as HTMLDivElement;
    const _commentBtn = document.createElement('div') as HTMLDivElement;

    const _divName = document.createElement('div') as HTMLDivElement;
    const _divComments = document.createElement('div') as HTMLDivElement;
    const _divDate = document.createElement('div') as HTMLDivElement;
    _div.classList.add("comments")

    _div.dataset.index = obj["index"] + "";
    _divName.innerHTML = obj["name"];
    _divComments.innerHTML = obj["comment"];


    _divDate.innerHTML = obj["date"];

    _commentTitle.append(_divName, _divDate)
    _commentContent.append(obj["comment"])
    const sessionObj = sessionStorage.getItem("currentUser") === null ? null : JSON.parse(sessionStorage.getItem("currentUser"));

    if (sessionObj !== null && sessionObj.nickname === obj["name"]) {

        const _updateBtn = document.createElement("button") as HTMLButtonElement;
        const _delBtn = document.createElement("button") as HTMLButtonElement;

        _updateBtn.innerHTML = str;
        _updateBtn.onclick = (e) => { updateFn(e, type) };
        _delBtn.innerHTML = '삭제';
        _delBtn.onclick = (e) => { delFn(e, type) };
        _commentBtn.append(_updateBtn, _delBtn)
    }
    if (type === "Comment") {
        const _addCommtBtn = document.createElement("button") as HTMLButtonElement;
        _addCommtBtn.innerHTML = '답글달기'
        _addCommtBtn.onclick = (e) => { addFn(e, type) };
        _commentBtn.append(_addCommtBtn);
    }
    _commentBtn.classList.add("comment-btn");
    _commentTitle.classList.add("comment-title");
    _commentContent.classList.add("comment-content");

    _div.append(_commentTitle, _commentContent, _commentBtn)
    _wrap.append(_div)

    return _wrap;
}


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
