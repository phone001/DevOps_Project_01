class Reply {
    private commnets: string;
    private date: Date;
    private name: string;
    private boardIndex: number;
    private commnetIndex?: number;
    constructor(comments: string, name: string, boardIndex: number, commnetIndex: number, date: Date = new Date()) {
        this.commnets = comments;
        this.name = name;
        this.date = date;
        this.boardIndex = boardIndex;
        this.commnetIndex = commnetIndex;
    }

    //getter
    getAddComment(): string {
        return this.commnets;
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
        return this.commnetIndex;
    }

    //setter
    setAddComment(comments: string): void {
        this.commnets = comments;
    }
    setName(name: string): void {
        this.name = name;
    }
    setBoardIndex(boardIndex: number) {
        this.boardIndex = boardIndex;
    }
    setCommnetIndex(commnetIndex: number): void {
        this.commnetIndex = commnetIndex;
    }
    updateReply(comments: string) {
        this.setAddComment(comments);
    }
}