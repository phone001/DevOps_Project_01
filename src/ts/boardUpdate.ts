const backBtn = document.querySelector("#back") as HTMLButtonElement;


backBtn.onclick = function () {
    history.back();
}

function emptyCheck(value: string): boolean {
    let isEmpty = false;
    if (value === null || value === undefined || value === '') {
        isEmpty = true;
    }
    return isEmpty;
}


