class Comments {
    private comments: string;
    private date: Date;
    private name: string;
    private boardIndex: number;
    constructor(comments: string, name: string, boardIndex: number, date: Date = new Date()) {
        this.comments = comments;
        this.name = name;
        this.date = date;
        this.boardIndex = boardIndex;
    }

    //getter
    getComments(): string {
        return this.comments;
    }
    getName(): string {
        return this.name;
    }
    getDate(): string {
        const _date: Date = new Date(this.date);
        const m = _date.getMonth() + 1 > 9 ? `${_date.getMonth() + 1}` : `0${_date.getMonth() + 1}`;
        const d = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
        const fullDate = `${_date.getFullYear()}/${m}/${d}`;
        return fullDate;
    }
    getBoardIndex(): number {
        return this.boardIndex;
    }

    //setter
    setComments(comments: string): void {
        this.comments = comments;
    }
    setName(name: string): void {
        this.name = name;
    }
    setBoardIndex(boardIndex: number): void {
        this.boardIndex = boardIndex;
    }

    updateComment(comments: string) {
        this.setComments(comments);
    }
}