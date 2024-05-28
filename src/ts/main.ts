const slides = document.querySelector(".slides") as HTMLUListElement;
const slideImgs = slides.children as HTMLCollection;
const slidePrevBtn = document.querySelector(".flex-nav-prev") as HTMLLIElement;
const slideNextBtn = document.querySelector(".flex-nav-next") as HTMLLIElement;
let index: number = 1;
let isActive: boolean = false;


// 관리자 아이디 생성
const admin1 = new User("admin", "1234", "관리자", true);
const userManager = new UserManager();
const userList = userManager.getUserList();
if (userList.length === 0) {
  userManager.addUser(admin1);
} else {
  let adminChk: number = 0;
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].getLoginId() === admin1.getLoginId()) {
      adminChk++
    }
  }
  if (adminChk === 0) {
    userManager.addUser(admin1);
  }
}


// 슬라이드 자동 동작 시간
let interval = setInterval(() => {
  if (isActive) return;
  index++;
  if (slideImgs.length === index) {
    index = 0;
  }
  slideImgs[index].classList.add("on");
  if (index === 0) {
    slideImgs[slideImgs.length - 1].classList.remove("on");
  } else {
    slideImgs[index - 1].classList.remove("on");
  }
  setTimeout(() => {
    isActive = false;
  }, 1000);
}, 5000);


// 이전 버튼
slidePrevBtn.onclick = (e: Event) => {
  e.preventDefault();
  clearInterval(interval);
  if (isActive) return;
  isActive = true;
  index--;
  if (index < 0) {
    index = slideImgs.length - 1;
  } else {
    slideImgs[index + 1].classList.remove("on");
  }
  slideImgs[index].classList.add("on");
  setTimeout(() => {
    isActive = false;
  }, 1000);
}

// 다음 버튼
slideNextBtn.onclick = (e: Event) => {
  e.preventDefault();
  clearInterval(interval);
  if (isActive) return;
  isActive = true;
  index++;
  if (slideImgs.length <= index) {
    index = 0;
  }
  slideImgs[index].classList.add("on");
  if (index === 0) {
    slideImgs[slideImgs.length - 1].classList.remove("on");
  } else {
    slideImgs[index - 1].classList.remove("on");
  }
  setTimeout(() => {
    isActive = false;
  }, 1000);
}