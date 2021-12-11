function colorChange(obj, color) {
    obj.style.backgroundColor = color;
}

function showView(obj, id){
	var con = document.getElementById(id);
    var q = obj.getElementsByClassName("Q_btn")
	if(con.style.display=='grid'){
		con.style.display = 'none';
        q[0].innerHTML = ">";
	}else{
		con.style.display = 'grid';
        q[0].innerHTML = "<";
	}
    // getElementsByClassName는 id와 다르게 여러개의 클래스를 가져옴 우리는 첫번째만 필요함으로 [0]을 붙여줬음
}

function passvalue() {
	var v = document.getElementById("search_text").value;
	localStorage.setItem("textvalue", v);
	return false;
}



function SearchValue() {
	var q = document.getElementsByClassName("q_item");
	for(var i = 0; i < q.length; i++){
			q[i].style.display = "none";
		}
	var cnt = 0;
	var v = document.getElementById("search_text").value;
	var c = document.getElementById("search_result");
	
	var span = document.getElementsByTagName("span");
	for(var i = 0; i < span.length; i++) {
		var s = span[i].innerHTML;
		if(s.includes(v)){
			var t = s.replace(v, "<span id = 'colorreplace'>"+v+"</span>");

			var k = span[i].parentNode.parentNode.parentNode;
			k.style.display = "grid";
			cnt +=1;
			
		}

	}
	
	if (v.length == 0 ||cnt == 0){
		c.innerHTML = "‟"+v+"”"+" 검색결과가 없습니다.";
	} else {
		c.innerHTML = "‟"+v+"”"+" 검색결과 " + cnt + " 건";
	}
}

