## TODO

1. update 기능 추가 및 필터링 키워드 설정 interactive하게
2. db에서 filtering 된 아이템들 show
3. login button 위치 변경 필요
4. 다른 사이트들 연동

### pagination 구현 방식

1. client side에서 => 페이지 내 로딩 스패너 돌림. 대신 새로고침 처리를 따로 해줘야함. 브라우저에 저장하는 방식.
2. server side에서 => 다음 리스트 로딩 때까지 페이지 전체 로딩 시간이 길어짐. with url params

고민이네
