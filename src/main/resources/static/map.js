$(function(){

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    function locationLoadSuccess(pos){
        // 현재 위치 받아오기
        var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

        // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
        map.panTo(currentPos);

        // 마커 생성
        var marker = new kakao.maps.Marker({
            position: currentPos
        });

        // 기존에 마커가 있다면 제거
        marker.setMap(null);
        marker.setMap(map);

    };

    function locationLoadError(pos){
        alert('위치 정보를 가져오는데 실패했습니다.');
    };

    // // 위치 가져오기 버튼 클릭시
    //     function getCurrentPosBtn(){
    //         navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
    //     };
//
    $("#getMyPositionBtn").on("click",function(){
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        //     infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'idle', function() {

            searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        });

        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }

    });

    $("#getMyPositionBtn").trigger("click");


})