class CommentsManager {
    commentsList: Comments[];
    replyList: Reply[];
    constructor(commentsList: string, replyList: string) {
        this.storageCheck(commentsList);
        this.storageCheck(replyList);
    }

    storageCheck(value: string) {
        if (localStorage.getItem(value) === null) {
            this[value] = [];
        } else {
            if (value === "commentsList") {
                this[value] = JSON.parse(localStorage.getItem(value)).map((e) => { return new Comments(e.comments, e.name, e.boardIndex, e.date) });;
            } else if (value === "replyList") {
                this[value] = JSON.parse(localStorage.getItem(value)).map((e) => { return new Reply(e.comments, e.name, e.boardIndex, e.commentIndex, e.date) });;
            }
        }

    }

    getCommentsList(): Comments[] {
        return this.commentsList;
    }

    getReplyList(boardIndex: number): Reply[] {
        const arr: Reply[] = [];
        for (let reply of this.replyList) {
            if (reply.getBoardIndex() === boardIndex) {
                arr.push(reply);
            }
        }
        return arr;
    }

    addComments(comments: Comments) {
        this.commentsList.push(comments);
    }

    addReply(reply: Reply) {
        this.replyList.push(reply);
    }

    setCommentsList() {
        localStorage.setItem("commentsList", JSON.stringify(this.commentsList))
    }

    setReplyList() {
        localStorage.setItem("replyList", JSON.stringify(this.replyList))
    }

    updateComments(index: number, comments: string) {
        this.commentsList[index].updateComment(comments);
        this.setCommentsList();
    }
    updateReply(index: number, comments: string) {
        this.replyList[index].updateReply(comments);
        this.setReplyList();
    }
}
