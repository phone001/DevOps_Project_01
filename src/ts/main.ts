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