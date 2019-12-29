function getParam() {
    var url = location.search;
    var json = {};
    if (url.indexOf("?") != -1) {
        var strparam = url.substr(1);
        var params = strparam.split("&");
        
        for (var i = 0; i < params.length; i++) {
            json[params[i].split("=")[0]] = params[i].split("=")[1];
        }
    }
    return json;
}

$(function() {
    
    // 获取页面请求参数
    let params = {};
    params = getParam();
    // console.log(params);



    // 使用steamapi获取玩家信息
    var tojsonp = "https://json2jsonp.com/?url=";
    var steamapi = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + APPKEY + "&steamids=" + params.steamids;
    var url = tojsonp + encodeURIComponent(steamapi) //+ "&callback=CALL_BACK";
    // console.log(url)

    const name = $(".personal #steamName");
    const avatar = $(".personal img");

    $.ajax({
        url : url,
        type : "GET",
        dataType:"jsonp",
        success : (data) => {
            steamobj = data.response.players[0]
            // console.log(steamobj);
            if (steamobj) {
                name.html(steamobj.personaname);
                avatar.attr("src", steamobj.avatarfull);
            } else {
                console.error("none url params")
            }
            // console.log(steamobj.personaname)
        },
        error: function() {
            console.error("异常！");
        }
    })



    // 刷新页面更换图片
    const bgimg = $(".bg");
    bgimg.css("background-image", "url(" + imgarr[Math.floor(Math.random() * imgarr.length)] + ")");
    // console.log(imgarr[Math.round(Math.random() * imgarr.length)]);



    // 遍历配置文件服务器规则数据
    const ruleListGp = $(".list-group");

    if (rulearr) {
        for (var _ in rulearr) {
            for (var k in rulearr[_]) {
                ruleListGp.append("<li class='list-group-item list-group-item-" + k + "'>" + rulearr[_][k] +  "</li>");
                // console.log(rulearr[_][k])
            }

        }
    }

    // 遍历配置文件游戏截图数据
    const indicat = $(".carousel-indicators");
    const inner = $(".carousel-inner");

    if (gameimgs) {
        for (var i =0; i < gameimgs.length; i++) {
            indicat.append("<li " + (i == 0 ? "class='active'" : "") + " data-target='#carouselExampleIndicators' data-slide-to='1'></li>");
            inner.append("<div class='carousel-item " + (i == 0 ? "active" : "") + "'><img src=" + gameimgs[i] + " class='gameimg'></div>")
        }
    }
})