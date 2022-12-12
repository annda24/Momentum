# Momentum
https://annda24.github.io/Momentum/

lastest : 2022.12.12

# 프로젝트 설명
chrome web app인 Momentum 을 클론코딩한 프로젝트 입니다.

https://momentumdash.com/
https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca

# 프로젝트 구성
 0. 로그인 폼
 로그인 폼에서는 사용자의 이름/닉네임을 저장합니다.
 로그인 폼에서는 랜덤 배경이미지 기능만 로딩됩니다.
 local Storage에서 사용자의 이름/닉네임 저장 유무를 확인하여 로그인 페이지/서비스 페이지를 로딩합니다.
  
 1. 현재 시간
 현재 시간을 초단위로 업데이트되며, 시간에 따라 인삿말이 다르게 출력됩니다.
  - 6시~11시 : Good Morning, ${user}
  - 12시~19시 : Good Afternoon, ${user}
  - 20시~5시 : Good Evening, ${user}
  
  2. 지역 날씨/기온
  위치 정보를 사용자에게 요청하여 위도/경도를 확인한 후
  Current weather data API를 이용하여 해당 위치(위도/경도)의 날씨/기온 정보를 제공합니다.
  # 현재 해당 기능에서 에러를 확인하여 수정중입니다.
  
  3. 검색/북마크
  사이트 이름과 링크를 저장하여 북마크 기능을 제공할 수 있습니다.
  원하는 사이트에서 바로 검색할 수 있습니다.
  - 북마크 기능은 local Storage에 저장됩니다.
  - 마지막으로 검색에 이용된 사이트는 local Storage에 저장되어,
    별도의 변경이 없는경우 마지막으로 검색한 사이트에서 검색 기능이 수행됩니다.
    
  4. 랜덤 배경이미지 / 랜덤 명언
  pixabay의 api를 이용하여 해당 프로젝트에서는 'cityscape'이미지들을 랜덤으로 가져와서 사이트 배경화면으로 제공합니다.
  해당 이미지에 대한 정보 또한 이미지 정보에 출력됩니다.
   - 랜덤으로 선정된 이미지가 존재하는 경우, 선정된 이미지를 배경화면으로 제공합니다.
   - 자정이 지날경우 배경이미지가 새롭게 랜덤으로 선정됩니다.
   
  quotes 객체에 저장된 명언들을 랜덤으로 제공합니다.
   - 이미 선정된 명언이 존재하는 경우,
     자정이 지나기 전까지/local Storage에서 저장된 정보를 삭제하지 않을 경우
     기존에 선정된 명언이 출력됩니다.
   - 사이트 언어 설정이 한국어인 경우, 명언이 한국어로 출력되며, 그 외의 경우에는 영어로 출력됩니다.
  
  5. to do list
   작성된 to do list를 local Storage에 저장합니다.
   체크 박스를 클릭하면 해당 to do만 삭제합니다.
