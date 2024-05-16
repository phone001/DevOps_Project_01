class Board {
    private title: string;
    private name: string;
    private date: Date;
    private content: string;
    constructor(title: string, name: string, content: string, date: Date = new Date()) {
        this.title = title;
        this.name = name;
        this.date = date;
        this.content = content;
    }

    getTitle(): string {
        return this.title;
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

    getContent(): string {
        return this.content;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setContent(content: string) {
        this.content = content;
    }

    updateBoard(title: string, content: string) {
        this.setTitle(title);
        this.setContent(content);
    }
}
