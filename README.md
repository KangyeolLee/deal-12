# 2주차 3조 정강이(12)
### 2주차 3조 팀 12 - [이정민](https://github.com/danmin20) + [이강열](https://github.com/KangyeolLee) = 정강이(?)

`Typescript` `Webpack` `Babel` `Node.js` `Express` `SCSS` `JWT` `MySQL` `Socket.io` `EC2` `Multer`

# 정강이가 부러지도록 달려보겠습니다 -> [달려보았습니다](http://3.34.200.100:3000/#/home)

<img src="https://i.ytimg.com/vi/GXSSZ_PytQ4/maxresdefault.jpg" />

## Install & Execute
### .env
```
ACCESS_TOKEN_SECRET = jwt을 위한 스트링
DB_HOST = 데이터베이스 엔드포인트
DB_PORT = 데이터베이스 포트
DB_USER = 데이터베이스 유저
DB_PASSWORD = 데이터베이스 비밀번호
DATABASE = 데이터베이스 이름
```
## Scripts
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

## Structure
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
├── controllers                     # 컨트롤러들
└── database                        # config, 초기화 코드
├── middlewares                     # 인증, 사진 업로드
├── queries           
├── routes           
├── services              
├── uploads                         # 업로드된 사진들
├── app.ts
└── socket.ts
```


# Wiki
- [Convention](https://github.com/woowa-techcamp-2021/deal-12/wiki)
- [API](https://github.com/woowa-techcamp-2021/deal-12/wiki/RESTful-API)
- [Bundling](https://github.com/woowa-techcamp-2021/deal-12/wiki/Webpack-%EB%B0%8F-Babel-%EC%84%A4%EC%A0%95)
- [Routing](https://github.com/woowa-techcamp-2021/deal-12/wiki/Router-%EC%84%A4%EC%A0%95)
- [DB](https://github.com/woowa-techcamp-2021/deal-12/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4)
- [Component](https://github.com/woowa-techcamp-2021/deal-12/wiki/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%8B%A8%EC%9C%84-%EC%B6%94%EC%83%81%ED%99%94)
