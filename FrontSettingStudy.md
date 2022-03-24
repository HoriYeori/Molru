# 프론트엔드 세팅 방법

> [린트(ESLint)와 프리티어(Prettier)로 협업 환경 세팅하기](#린트eslint와-프리티어prettier로-협업-환경-세팅하기)
>
> - [1. 린트(ESLint)](#1-린트eslint)
> - [2. 프리티어(Prettier)](#2-프리티어prettier)
> - [3. 통합 방법](#3-통합-방법)
> - [4. 자동화](#4-자동화)

> [2022년 CSS 트렌드](#2022년-css-트렌드)
>
> - [1. CSS 전처리기](#1-css-전처리기)
> - [2. CSS 프레임워크)](#2-css-프레임워크)
> - [3. CSS-IN-JS](#3-css-in-js)

## 린트(ESLint)와 프리티어(Prettier)로 협업 환경 세팅하기

[참고 영상](https://www.youtube.com/watch?v=Y3kjHM7d3Zo)

### 1. 린트(ESLint)

#### 1) 린트란?

코드 스타일(코드 포맷팅)과 잠재적인 버그(코드 품질)를 검사하는 것입니다.

> _코드 포맷팅 : 일관된 코딩 컨벤션을 유지하는 기능_  
> _코드 품질 : 잠재적인 오류를 찾아주는 기능_

#### 2) 설치 및 사용법

- cmd

  ```bash
  $ npm install eslint
  $ touch .eslintrc.js
  $ npm run lint  # 코드 검사
  ```

- package.json

  ```json
  "scripts" : {
      "lint": "eslint src"
  }
  ```

- .eslintrc.js

  ```javascript
  module.exports = {
    extends: ["eslint: recommended"],
  };
  ```

### 2. 프리티어(Prettier)

#### 1) 프리티어란?

프리티어는 ESLint 보다 좀 더 일관적인 스타일로 코드를 만들어줍니다.

#### 2) 설치 및 사용법

- cmd
  ```bash
  $ npm install prettier
  $ npm prettier src/**/*  # 코드 검사
  ```

### 3. 통합 방법

#### 1) eslint-config-prettier & eslint-plugin-prettier

프리티어 포매팅 규칙을 ESlint로 추가하고, 서로 충돌하는 옵션이 있으면 프리티어의 규칙을 사용하도록 하는 도구입니다.

#### 2) 설치 및 사용법

- cmd

  ```bash
  $ npm install eslint-config-prettier eslint-plugin-prettier
  $ npm run lint  # 코드 검사
  ```

- .eslintrc.js

  ```javascript
  module.exports = {
    extends: ["eslint: recommended", "plugin:prettier/recommended"],
    /* env: {
        browser: true;
    } */
  };
  ```

### 4. 자동화

#### 1) 깃 훅

깃에 커밋할때, 스테이징된 파일을 린트합니다.

- cmd

  ```bash
  $ npm install husky
  $ npm install lint-staged
  ```

- package.json

  ```json
  "husky": {
      "hooks": {
          "pre-commit": "npm run lint"
      }
  },
  "lint-staged": {
      "*.js": "npm run lint"
  }
  ```

#### 2) 에디터 확장 도구

코딩할 때, 바로 검사합니다.

- vsCode의 확장 도구 탭에서 ESLint 익스텐션 설치

- 설정 파일(setting.json)

  ```json
  {
    "eslint.enable": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
  ```

---

## 2022년 CSS 트렌드

[참고 영상](https://www.youtube.com/watch?v=Eim11QYLfEY)

### 1. CSS 전처리기

기존 CSS 문법보다 조금 더 간편한 문법을 이용해서 개발할 수 있는 도구입니다.

- 사용률
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **Sass** | 86% | 80% | 90% |
  | Less | 56% | 54% | 55% |
  | PostCSS | 40% | 49% | 56% |

- 만족도
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **PostCSS** | 91% | 92% | 91% |
  | Sass | 90% | 88% | 84% |
  | Less | 46% | 39% | 34% |

### 2. CSS 프레임워크

개발자가 작업 속도를 높이기 위해 라이브러리입니다. (웹 디자인을 더 쉽게)

- 사용률
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **Bootstrap** | 87% | 86% | 85% |
  | Tailwind CSS | 6% | 26% | 39% |

- 만족도
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **Tailwind CSS** | 81% | 87% | 78% |
  | Bootstrap | 52% | 48% | 41% |

### 3. CSS-IN-JS

자바스크립트에서 CSS를 정의할 수 있는 기술입니다.

- 사용률
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **Styled Components** | 40% | 52% | 52% |
  | CSS Modules | 25% | 36% | 41% |

- 만족도
  | | 2019 | 2020 | 2021 |
  | :-----: | :--: | :--: | :--: |
  | **CSS Modules** | 86% | 87% | 86% |
  | Styled Components | 85% | 82% | 77% |
