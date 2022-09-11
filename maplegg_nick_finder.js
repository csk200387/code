function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
	if(msg.startsWith("/닉넴검색 ")){
		var start = new Date();
		var count = org.jsoup.Jsoup.connect("https://wordrow.kr/시작하는-말/"+msg.substr(6)+"/두%20글자/").ignoreContentType(true).get().select("body > div.content > section:nth-child(5) > div.sub-heading > h1").get(0).text().split(": ")[1].replace("개",""); // 단어 개수
		replier.reply(msg.substr(6)+" 으로 시작하는 단어 "+count+"개를 찾았습니다.\n리스트 생성중\n딜레이를 걸어두어 살짝 걸릴 수 있습니다");
		var arr = []; // 결과 출력할 빈 배열
		var page = Math.ceil(count / 100); // 크롤링할 페이지 수
		for(var l1 = 0; l1 < Math.ceil(page/2); l1++){
			for(var l = 0; l < page; l++){
				var data = org.jsoup.Jsoup.connect("https://wordrow.kr/시작하는-말/"+msg.substr(6)+"/두%20글자/?쪽="+(l+1)).ignoreHttpErrors(true).ignoreContentType(true).get().select("body > div.content > section:nth-child(5) > div.larger > ul > li");
				var size = data.size();
				for (var i = 0; i < size; i++){
					var word = data.select("a").get(i).text();
					var len = "";
					try{
						len = org.jsoup.Jsoup.connect("https://maple.gg/search?q="+word).ignoreHttpErrors(true).ignoreContentType(true).get().select("#app > section > div > div:nth-child(1) > div.mt-3.search-result__character > div.search-result__item.search-result__loading.text-center.py-5").get(0).text().length; // 멮지지에서 닉넴 검색
					}
					catch(e) { len = null; }; // len = null;
					if(len == 0){ // 결과가 없으면 배열에 추가
						arr.push(word);
					}
					java.lang.Thread.sleep(50);
				}
			}
		}
		replier.reply("리스트\n"+Utils.compress()+arr.join("\n"));
		var end = new Date();
		replier.reply("런타임 "+(end - start)/1000+"s");
	}
}
