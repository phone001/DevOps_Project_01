class Reply {
    private comments: string;
    private date: Date;
    private name: string;
    private boardIndex: number;
    private commentIndex: number;
    constructor(comments: string, name: string, boardIndex: number, commentIndex: number, date: Date = new Date()) {
        this.comments = comments;
        this.name = name;
        this.date = date;
        this.boardIndex = boardIndex;
        this.commentIndex = commentIndex;
    }

    //getter
    getAddComment(): string {
        return this.comments;
    }
    getDate(): string {
        const _date: Date = new Date(this.date);
        const m = _date.getMonth() + 1 > 9 ? `${_date.getMonth() + 1}` : `0${_date.getMonth() + 1}`;
        const d = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
        const fullDate = `${_date.getFullYear()}/${m}/${d}`;
        return fullDate;
    }
    getName(): string {
        return this.name;
    }
    getBoardIndex(): number {
        return this.boardIndex;
    }

    getCommentIndex(): number {
        return this.commentIndex;
    }

    //setter
    setAddComment(comments: string): void {
        this.comments = comments;
    }
    setName(name: string): void {
        this.name = name;
    }
    setBoardIndex(boardIndex: number) {
        this.boardIndex = boardIndex;
    }
    setCommnetIndex(commnetIndex: number): void {
        this.commentIndex = commnetIndex;
    }
    updateReply(comments: string) {
        this.setAddComment(comments);
    }
}