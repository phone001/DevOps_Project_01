const commentForm = document.querySelector("#comment-form") as HTMLFormElement;

commentForm.onsubmit = function (e: Event) {
    e.preventDefault();
    commentInsert();
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
    const boardIndex = 0;
    const name = "김기현";
    if (!checkEmpty(comment.value)) {
        const commentObj = new Comments(comment.value, name, boardIndex);
        const commnetManager = new CommentsManager("commentsList", "replyList");

        commnetManager.addComments(commentObj);
        commnetManager.setCommentsList();
        console.log(commnetManager.getReplyList());

        commentRender(boardIndex, commnetManager.getCommentsList(), commnetManager.getReplyList())
    }
}

function commentRender(boardIndex: number, commentList: Comments[], replyList: Reply[]) {
    console.log(replyList.length)
    if (commentList !== null && commentList !== undefined) {
        const _container = document.querySelector("#comment_view");
        _container.innerHTML = '';
        let index = 0;
        for (let i = 0; i < commentList.length; i++) {
            if (commentList[i].getBoardIndex() === boardIndex) {
                const comment_obj = {
                    name: commentList[i].getName(),
                    comment: commentList[i].getComments(),
                    date: commentList[i].getDate(),
                    index: i
                }
                const _div = addBlock(modifyViewComment, delComment, addCommentInertView, "Comment", '수정', comment_obj);

                if (replyList !== null && replyList !== undefined) {
                    for (let j = 0; j < replyList.length; j++) {
                        if (i === replyList[j].getCommentIndex()) {
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
                index++;
            }
        }
    }
}

function modifyViewComment(e: Event, type: string) {
    const current = document.querySelector(".currentUpdate")
    if (current !== null) {
        current.classList.remove("currentUpdate");
    }
    const pNode = ((e.target as HTMLButtonElement).parentNode as HTMLDivElement);
    console.log(pNode)
    const index = parseInt(pNode.dataset.index);
    const text = (pNode.childNodes[1] as HTMLDivElement).innerHTML;
    const _input = document.createElement("input") as HTMLInputElement;
    const updateBtn = document.createElement("button") as HTMLButtonElement;
    updateBtn.id = "commentUpdate";
    updateBtn.innerHTML = "수정완료";
    updateBtn.onclick = function (e: Event) {
        modifyComment(e, index, type);
    }
    _input.value = text;
    _input.id = "newCommentInput";
    pNode.childNodes[1].replaceWith(_input)
    pNode.childNodes[3].replaceWith(updateBtn);
}


function modifyComment(e: Event, index: number, type: string) {
    const manager = new CommentsManager("commentsList", "replyList");
    //const input = document.querySelector("#newCommentInput") as HTMLInputElement;
    const pNode = (e.target as HTMLButtonElement).parentNode as HTMLDivElement;
    const input = pNode.childNodes[1] as HTMLInputElement;
    console.log(input)
    const oldBtn = pNode.childNodes[3] as HTMLButtonElement;
    const value = input.value;
    const _divComments = document.createElement("div") as HTMLDivElement;
    _divComments.innerHTML = value;
    input.replaceWith(_divComments)
    if (type === "Comment") {
        manager.updateComments(index, value);
    } else if (type === "Reply") {
        manager.updateReply(index, value);
    }
    const _updateBtn = document.createElement("button") as HTMLButtonElement;
    _updateBtn.innerHTML = '수정';
    _updateBtn.onclick = (e: Event) => {
        modifyViewComment(e, type);
    }
    oldBtn.replaceWith(_updateBtn);
}

function delComment(e: Event, type: string) {
    if (confirm("정말 삭제하시겠습니까?")) {
        const pNode = (e.target as HTMLButtonElement).parentNode;
        const boardIndex = parseInt(new URLSearchParams().get("index")) || 0;
        const manager = new CommentsManager("commentsList", "replyList");
        if (type === "Comment") {
            manager.deleteComments(parseInt((pNode as HTMLDivElement).dataset.index), boardIndex)
        } else if ("Reply") {
            manager.deleteReply(parseInt((pNode as HTMLDivElement).dataset.index))
        }
        location.reload();
    }

}

function addCommentInertView(e: Event) {
    const reply_input = document.querySelector(".addCommentForm");
    if (reply_input === null) {
        const pNode = ((e.target as HTMLButtonElement).parentNode) as HTMLDivElement;
        console.log(pNode)
        const target = ((pNode as HTMLDivElement).childNodes[0] as HTMLDivElement).innerHTML;
        const _div = document.createElement("div") as HTMLDivElement;

        _div.classList.add("addCommentForm");
        _div.style.marginLeft = "20px"
        const _divName = document.createElement("div") as HTMLDivElement;
        const addComments = document.createElement("input") as HTMLInputElement;
        // addComments.value = `@${target} `
        const _divDate = document.createElement("div") as HTMLDivElement;
        const _upbtn = document.createElement("button") as HTMLButtonElement;
        _upbtn.innerHTML = '추가';
        _upbtn.onclick = function () {
            addComment(parseInt((pNode as HTMLDivElement).dataset.index), _div);
        }
        const _delbtn = document.createElement("button") as HTMLButtonElement;
        _delbtn.innerHTML = '삭제';
        const _replybtn = document.createElement("button") as HTMLButtonElement;
        _replybtn.innerHTML = '답글달기'
        _div.append(_divName, addComments, _divDate, _upbtn, _delbtn, _replybtn)
        pNode.append(_div)
        console.log(pNode)
    } else if (reply_input !== null) {
        reply_input.remove();
    }
}

function addComment(commentIndex: number, _div: HTMLDivElement) {
    const boardIndex = 0;
    console.log(_div)
    const value = (_div.childNodes[1] as HTMLInputElement).value;
    console.log(_div)
    const reply = new Reply(value, "test1", boardIndex, commentIndex);
    const replyManager = new CommentsManager("commentsList", "replyList");
    replyManager.addReply(reply);
    replyManager.setReplyList();
    commentRender(boardIndex, replyManager.getCommentsList(), replyManager.getReplyList());
}

function renderMain() {
    const boardIndex = parseInt(new URLSearchParams().get("index")) || 0;
    const commnetManager = new CommentsManager("commentsList", "replyList");
    const commentsList = commnetManager.getCommentsList();
    const replyList = commnetManager.getReplyList();
    commentRender(boardIndex, commentsList, replyList);
}
renderMain();

function addBlock(updateFn: Function, delFn: Function, addFn: Function, type: string, str: string, obj: object): HTMLDivElement {
    const _div = document.createElement('div') as HTMLDivElement;
    const _commentBox = document.createElement("div") as HTMLDivElement;

    const _divName = document.createElement('div') as HTMLDivElement;
    const _divComments = document.createElement('div') as HTMLDivElement;
    const _divDate = document.createElement('div') as HTMLDivElement;
    const _divInputForm = document.createElement('div') as HTMLDivElement;

    const _updateBtn = document.createElement("button") as HTMLButtonElement;
    const _delBtn = document.createElement("button") as HTMLButtonElement;

    _commentBox.dataset.index = obj["index"] + "";

    _divName.innerHTML = obj["name"];
    _divComments.innerHTML = obj["comment"];
    _divDate.innerHTML = obj["date"];

    _updateBtn.innerHTML = str;
    _updateBtn.onclick = (e) => { updateFn(e, type) };
    _delBtn.innerHTML = '삭제';
    _delBtn.onclick = (e) => { delFn(e, type) };

    _commentBox.append(_divName, _divComments, _divDate, _updateBtn, _delBtn);
    if (type === "Comment") {
        const _addCommtBtn = document.createElement("button") as HTMLButtonElement;
        _addCommtBtn.innerHTML = '답글달기'
        _addCommtBtn.onclick = (e) => { addFn(e) };
        _commentBox.append(_addCommtBtn);
    }
    _div.append(_commentBox);
    return _div;
}