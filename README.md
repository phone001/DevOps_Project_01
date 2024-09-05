# 1차 프로젝트
## 목차
1. [개요](#개요)
2. [주요 기능](#주요기능)
3. [팀 내 역할](#팀-내-역할)
4. [이슈사항](#이슈사항)

## 개요
 기간 : 2024.05.14 ~ 2024.05.28 <br>

 개발 인원 : 2명 <br>
 - 팀원 1 : 로그인, 회원가입, 게시판 목록 화면 및 기능 구현
 - 팀원 2 : 게시판 및 댓글 추가, 조회, 수정, 삭제 및 마이페이지 기능 구현

 기술스택<br>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> 
<img src="https://img.shields.io/badge/HTML-D0654C?style=for-the-badge&logo=HTML5&logoColor=white"> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> 
<img src="https://img.shields.io/badge/Typescript-3D6AAC?style=for-the-badge&logo=Typescript&logoColor=white"> 

목표   
프론트 영역에서 모던한 느낌의 화면 구성 및 게시판, 로그인 기능 구현

## 주요기능
- 메인 페이지
![1차 메인](https://github.com/user-attachments/assets/a0c9e987-b8c4-40fc-9e8d-e4db6a478711)
   - 게시판 및 로그인 페이지 이동
   - 팝업을 사용한 호텔 찾기 및 예약 화면

- 로그인 및 회원가입
![1차 로그인](https://github.com/user-attachments/assets/b8bcc89d-947f-429f-b664-ebad2a13afbd)
   - 사용자 정보로 가입 및 로그인
   - 가입한 사용자 중복 확인

- 마이페이지 및 관리자 페이지
![1차 마이페이지](https://github.com/user-attachments/assets/e24d2ec3-8950-4793-bb32-23edb4084572)
   - 현재 인증한 사용자의 정보 확인 및 수정
   - 관리자 인증시 사용자 가입허가 

- 게시판
  ![1차 게시판](https://github.com/user-attachments/assets/5a08363f-12ef-45ce-9317-afed8e223641)
   - 작성된 게시글 조회
   - 게시글 작성, 수정, 삭제

## 팀 내 역할
1. 게시판 
 > 1 ) 화면 구성   
 > 2 ) 사용자 인증 확인 글 게시 기능 구현   
 > 3 ) 작성자 인증 확인 후 수정,삭제 기능 구현    

2. 마이페이지 및 관리 페이지
 > 1 ) 화면 구성   
 > 2 ) 재인증 후 마이페이지 사용자 정보 표시 및 정보변경 기능 구현   
 > 3 ) 관리자 계정 인증 후 사용자 가입허가 기능 구현   

## 이슈사항
> 1. 게시글 및 대댓글 삭제시 이전 글의 댓글, 대댓글로 이동    
> => 삭제시 각 게시글, 댓글, 대댓글의 index 수정   
> 2. 닉네임 변경시 게시글 수정, 삭제 권한 없음   
> => 삭제시 각 게시글, 댓글, 대댓글의 index 수정
