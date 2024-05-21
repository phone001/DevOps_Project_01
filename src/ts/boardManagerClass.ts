class BoardManager {
    boardList: Board[];
    constructor() {
        this.storageCheck();
    }

    storageCheck() {
        if (localStorage.getItem("boardList") === null) {
            this.boardList = [];
        } else {
            this.boardList = JSON.parse(localStorage.getItem("boardList")).map((e) => { return new Board(e.title, e.name, e.content, e.date) });
        }
    }

    getBoardList(): Board[] {
        return this.boardList;
    }

    updateBoard(index: number, title: string, content: string) {
        this.boardList[index].updateBoard(title, content);
        this.setBoardList();
    }

    addBoard(newBoard: Board) {
        this.boardList.push(newBoard);
        this.setBoardList()
    }

    setBoardList() {
        localStorage.setItem("boardList", JSON.stringify(this.boardList));
    }
    deleteBoard(boardIndex: number) {
        const commenManager: CommentsManager = new CommentsManager("commentsList", "replyList");
        commenManager.deleteBoard(boardIndex);
        this.boardList.splice(boardIndex, 1);
        this.setBoardList();
    }
}