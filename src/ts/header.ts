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


// 호텔찾기 버튼 제어
const findHotelBtn = document.querySelector(".hotel-find-btn") as HTMLAnchorElement;
findHotelBtn.onclick = (e: Event) => {
  e.preventDefault();
  const hotelBox = document.querySelector(".hotel-box") as HTMLDivElement;
  const fhModal = document.querySelector(".fh-modal") as HTMLDivElement;
  const fhmScreen = document.querySelector(".fhm-screen") as HTMLDivElement;
  const body = document.querySelector("body") as HTMLBodyElement;
  hotelBox.classList.add("on");
  fhModal.setAttribute("style", "display:block;");
  fhmScreen.setAttribute("style", "display:block;");
  body.setAttribute("style", "margin-top: 0px; padding-right: 17px; overflow:hidden;");
}

// 호텔찾기 모달 권역별 브랜드별 스위칭
const fhmTab1Btn = document.querySelector(".fhm-tab1-btn") as HTMLAnchorElement;
const fhmTab1 = document.querySelector(".fhm-tab1") as HTMLLIElement;
const fhmBody1 = document.querySelector(".fhm-body1") as HTMLDivElement;
const fhmTab2Btn = document.querySelector(".fhm-tab2-btn") as HTMLAnchorElement;
const fhmTab2 = document.querySelector(".fhm-tab2") as HTMLLIElement;
const fhmBody2 = document.querySelector(".fhm-body2") as HTMLDivElement;
// 권역별
fhmTab1Btn.onclick = (e: Event) => {
  e.preventDefault();
  fhmTab1.classList.add("on");
  fhmBody1.setAttribute("style", "display:block;");
  fhmTab2.classList.remove("on");
  fhmBody2.setAttribute("style", "display:none;");
}

// 브랜드별
fhmTab2Btn.onclick = (e: Event) => {
  e.preventDefault();
  fhmTab1.classList.remove("on");
  fhmBody1.setAttribute("style", "display:none;");
  fhmTab2.classList.add("on");
  fhmBody2.setAttribute("style", "display:block;");
}

// 호텔찾기 모달창 닫기
const fhmClose = document.querySelector(".fhm-close") as HTMLAnchorElement
fhmClose.onclick = (e: Event) => {
  e.preventDefault();
  const hotelBox = document.querySelector(".hotel-box") as HTMLDivElement;
  const fhModal = document.querySelector(".fh-modal") as HTMLDivElement;
  const fhmScreen = document.querySelector(".fhm-screen") as HTMLDivElement;
  const body = document.querySelector("body") as HTMLBodyElement;
  hotelBox.classList.remove("on");
  fhModal.setAttribute("style", "display:none;");
  fhmScreen.setAttribute("style", "display:none;");
  body.removeAttribute("style");
}

// 예약 버튼 제어
const rsvBtn = document.querySelector(".rsv-btn") as HTMLAnchorElement;
rsvBtn.onclick = (e: Event) => {
  e.preventDefault();
  const rsvBox = document.querySelector(".rsv-box") as HTMLDivElement;
  const rsvModal = document.querySelector(".rsv-modal") as HTMLDivElement;
  const rsvScreen = document.querySelector(".rsv-screen") as HTMLDivElement;
  const body = document.querySelector("body") as HTMLBodyElement;
  rsvBox.classList.add("on");
  rsvModal.setAttribute("style", "display:block;");
  rsvScreen.setAttribute("style", "display:block;");
  body.setAttribute("style", "margin-top: 0px; padding-right: 17px; overflow:hidden;");
}

// 예약 모달창 닫기
const rsvClose = document.querySelector(".rsv-close") as HTMLAnchorElement
rsvClose.onclick = (e: Event) => {
  e.preventDefault();
  const rsvBox = document.querySelector(".rsv-box") as HTMLDivElement;
  const rsvModal = document.querySelector(".rsv-modal") as HTMLDivElement;
  const rsvScreen = document.querySelector(".rsv-screen") as HTMLDivElement;
  const body = document.querySelector("body") as HTMLBodyElement;
  rsvBox.classList.remove("on");
  rsvModal.setAttribute("style", "display:none;");
  rsvScreen.setAttribute("style", "display:none;");
  body.removeAttribute("style");
}