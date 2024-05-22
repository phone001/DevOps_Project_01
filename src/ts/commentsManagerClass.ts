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

    getReplyList(): Reply[] {
        return this.replyList;
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
    deleteComments(index: number, boardIndex: number) {
        this.commentsList.splice(index, 1);
        for (let i = this.replyList.length - 1; i >= 0; i--) {
            if (this.replyList[i].getCommentIndex() === index && this.replyList[i].getBoardIndex() === boardIndex) {
                this.replyList.splice(i, 1);
            }
        }
        for (let i = 0; i < this.replyList.length; i++) {
            if (this.replyList[i].getCommentIndex() > index) {
                this.replyList[i].setCommnetIndex(this.replyList[i].getCommentIndex() - 1);
            }
        }

        this.setCommentsList();
        this.setReplyList();
    }
    deleteReply(index: number) {
        this.replyList.splice(index, 1);
        this.setReplyList();
    }
}
