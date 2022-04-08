### readme 초안
# ajous-sync
> 캘린더에 ical 형식으로 과제를 표시하는 서비스(예정)

> 할 겸 확장 프로그램도

## 초안
1. sso token 받아서
2. eclass2.ajou.ac.kr 에 SAMLRequest 로 세션 받고
3. calendarItems API 받아서 JSON parse 하고
4. iCalendar 형식으로 리턴

## 보완1
1. eclass2.ajou.ac.kr 의 bbrouter 쿠키 받아서: chrome extenstion을 통해서
2. calendarItems API 받아서 JSON parse 하고
3. iCalendar 형식으로 리턴

### 과제

- 서비스에서 엔드유저 식별 어떻게?
  - 쿼리 파라미터로 토큰 받아서
- ajous 공통 token을 하나의 테이블에서 관리하는 방안
- 서비스에 id/pw를 넘겨주어야 하는 문제
  - chrome extension 을 이용해보는 것도 방안?
  - 여기서 그냥 session storage 접근해서 ssotoken 가져오는 것도 방안?
  - 서비스에 ssotoken 받는 API도 만들어야 할 듯?
  - 이를 통해 타 ip, 즉 was 서버 ip로 로그인되어 유저 브라우저 세션이 만료되는 문제 해결 됨?
  - 근데 아주bb 세션을 그럴려면 가져와야 될 듯? 어차피 ssotoken으로 saml인증하며 타 ip 면 아주bb에서 saml request 인증할 때 어차피 타 ip 로 인증하 되니까
  - 그러면 아주bb 세션을 그때 그때 가져와서 calendarItems를 가져오는 걸로 하고
  - 일다 ip 맞출려고 네이티브 프로그램은 좀 아니고 크로 익스텐션이 제일 대안인 듯
  - 사파리 지원은 좀 어렵나? 일단 애플 dev 계정은 있으니까 좀 생각해보고
- 수요는ㅠㅠ?
