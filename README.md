# `2주차 3조 정강이(12)` [Wiki](https://github.com/woowa-techcamp-2021/deal-12/wiki)

### 2주차 3조 팀 12 - 이[정](https://github.com/danmin20)민 + 이[강](https://github.com/KangyeolLee)열 = 정강이(?)

`Typescript` `Webpack` `Babel` `Node.js` `Express` `SCSS` `JWT` `MySQL` `Socket.io` `EC2` `Multer`

<br/>

# 정강이가 부러지도록 달려보겠습니다 -> [달려보았습니다](http://52.78.150.173:3000/#/home)
### [데모영상](https://youtu.be/Yl5WAihCP6Y)

<img src="https://i.ytimg.com/vi/GXSSZ_PytQ4/maxresdefault.jpg" />

<br/>

## `Install & Execute`

### .env

```
ACCESS_TOKEN_SECRET = jwt을 위한 스트링
SERVER_HOST = 서버 주소
DB_HOST = 데이터베이스 엔드포인트
DB_PORT = 데이터베이스 포트
DB_USER = 데이터베이스 유저
DB_PASSWORD = 데이터베이스 비밀번호
DATABASE = 데이터베이스 이름
```

<br/>

## `Scripts`

### client

- 개발 모드로 실행
  ```
  "dev": "nodemon --watch \"**\" --ext \"ts\" --exec \"ts-node\" app"
  ```

### server

- 프로덕션 모드로 실행
  ```
  "start": "webpack serve --mode=production --host=0.0.0.0 --disable-host-check"
  ```
- 개발 모드로 실행
  ```
  "start:dev": "webpack serve --mode=development"
  ```
- 프로덕션 모드로 빌드
  ```
  "build": "webpack --mode=production"
  ```
- 개발 모드로 빌드
  ```
  "build:dev": "webpack --mode=development"
  ```

<br/>

## `Structure`

```
client
├── assets                          # 필요한 리소스들
└── src
    ├── Components                  # 페이지 단위 컴포넌트들
    │   └── ${name}
    │       ├── index.ts
    │       ├── style.scss
    │       └── Shared              # 공용 컴포넌트들
    │           └── ${name}
    │               ├── index.ts
    │               └── style.scss
    ├── core                        # 모든 컴포넌트가 상속받는 컴포넌트 클래스
    ├── library                     # 유틸, 라우터 클래스
    ├── scss                        # 공용 스타일
    ├── index.html
    └── main.ts

server
├── controllers
├── database                        # config, 초기화 코드
├── middlewares                     # 인증, 사진 업로드
├── queries
├── routes
├── services
├── uploads                         # 업로드된 사진들
├── app.ts
└── socket.ts
```

<br/>

## `Screenshots`
![image](https://user-images.githubusercontent.com/50590192/126892874-fe232947-5290-46d0-be3f-e1d201e3198e.png)
![image](https://user-images.githubusercontent.com/50590192/126892957-8ac97d76-1971-48ee-9250-234015a902c5.png)
![image](https://user-images.githubusercontent.com/50590192/126892886-42eee6da-f415-4dfa-b106-a262cd660e51.png)
![image](https://user-images.githubusercontent.com/50590192/126892893-680f1217-de50-45b1-b2dc-9f56318a75c6.png)
![image](https://user-images.githubusercontent.com/50590192/126892896-fb0de254-0399-449e-bb3c-2d5505efb966.png)
![image](https://user-images.githubusercontent.com/50590192/126892906-b6d47398-dda7-4169-b734-faa77350bda6.png)
![image](https://user-images.githubusercontent.com/50590192/126892933-884ded9c-0488-4361-b05b-09659b4d8fd5.png)
