<p align="center">
<img src="docs/b1-1_5-ai-border-128.png" alt="logo" width="96">
</p>

# Ajous! 확장프로그램
> ### 여기서 다운로드 하세요.
> 
> <a href="https://chrome.google.com/webstore/detail/ajous/liladcidbbkjjepphflacbinfgihhlde?hl=ko">
> <img src="https://img.shields.io/badge/Chrome%20Extension-v.20220408-success?logo=googlechrome&logoColor=white" alt="chrome-download">
> </a>

### Ajous! 는

아주대학교의 여러 정보를 한데 모았다는 의미에서 지은 이름이에요.

### Ajous! 는 다음과 같은 기능을 수행해요.

- AjouBb 에서 과제 확인하기
- MPortal 에서 식사메뉴 확인하기
- 도서관 홈페이지에서 대여 도서 확인하기

### Ajous! 를 다음과 같이 사용하세요.

- 아이콘을 누르면 정보 페이지가 나와요.
- 빠르게 사용하려면 아이콘 옆 압정 버튼으로 주소창에 고정하세요.
- AjouBb, 도서관 등 홈페이지에서 로그아웃되면 자동으로 로그인 팝업창이 열려요. 로그인 후 정보가 자동으로 불러와져요.
- 옵션을 열어보세요. 옵션은 아이콘을 우클릭하면 나오는 메뉴에서 열 수 있어요.
- 옵션에서 포틀릿 구성을 변경할 수 있어요. 원하는 내용만 켜고 끄세요.

### Ajous! 는 다음과 같은 방식으로 동작해요.

Ajous! 를 계속 사용하는 경우 아래 방식과 같이 확장 프로그램이 동작한다는 것에 동의한다는 의미로 받아들일게요.

- 동작 방식
    1. 확장프로그램은 각 기능에 필요한 쿠키를 수집한다.
    2. 확장프로그램은 수집된 쿠키를 백엔드 서버(이하 "서버")에 전송한다.
    3. 서버는 쿠키가 로그인된 세션인지 확인한다.
        1. 서버는 쿠키값이 정상이면 정보를 불러와 hbs로 사이트를 컴파일 후 리턴한다.
        2. 서버는 쿠키값이 비정상이면 null을 리턴한다.
            1. 확장 프로그램은 로그인창을 불러온다.
            2. 로그인 완료 시 팝업창을 닫고 다시 쿠키를 수집, 서버에 전송한다.
               1. 특정 URL로의 요청이 발생한 경우 로그인이 완료되었다고 간주한다.
            3. 다시 3번으로 수행한다.
    4. 확장 프로그램은 서버로부터 받은 마크업 코드를 페이지에 삽입한다.

### 필요한 경우 아래의 채널이 열려있어요.

Ajous! 는 여러분의 생각이 필요해요. 개선점이나 문제점이 있을 때 아래의 채널로 의견을 보내주세요. 항상 업데이트될 Ajous! 를 기대해주세요. 너무 많이는 말구요.

- Github: [https://github.com/khskeb0513/ajous-assignments](https://github.com/khskeb0513/ajous-assignments)
- Email: [Hyeonseung Kang <h5k@ajou.ac.kr>](mailto:h5k@ajou.ac.kr)

### 연관문서

[Notion Site](https://ajous.notion.site/)

[Server Status](https://status.ajous.ga)

[Code](https://github.com/khskeb0513/ajous-assignments)
