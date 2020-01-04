function getmp3(type, id) {
    var api = "https://api.imjad.cn/cloudmusic/?type=" + type + "&id=" + id + "&search_type=1";
    var result;
    $.ajax({
        url : api,
        type : "GET",
        async : false,
        success : function (res) {
            // console.log(res)
            if (type === "song") {
                // console.log(res.data[0].url);
                result = res.data[0];
            } else if (type === "detail") {
                // console.log(res.songs[0].name);
                result = res.songs[0];
            }
        },
        fail : function (e) {
            console.error(e);
        }
    })
    return result;
}



$(function() {

    var mp3list = [];

    // mp3list[getmp3("detail", 1370978408).name] = getmp3("song", 1370978408).url;

    if (musiclist) {
        // 遍历id列表。获取歌名和歌曲url
        for (var i = 0; i < musiclist.length; i++) {
            mp3list[i] = { 
                "name" : getmp3("detail", musiclist[i]).name,
                "url" : getmp3("song", musiclist[i]).url
            };
        }   
    }    
    
    // console.log(mp3list);
    const audioname = $(".music > .media-body > .media-heading");
    const audio = $(".music > .media-body > audio");
    
    

    if (mp3list) {
        var random = Math.floor(Math.random() * mp3list.length);
        var name = mp3list[random].name;
        var url = mp3list[random].url;

        audioname.html(name);
        
        audio.append("<source src=" + url + " type='audio/mp3'>");

        audio.mediaelementplayer({
            pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/',
            shimScriptAccess: 'always',
            startVolume : musicvolume,
            src : url,
            success: function(media, originalNode, instance) {
                media.load();

                media.addEventListener('canplay', function() {
                    media.play();
                }, false);

                media.addEventListener('ended', function(e){
                    random = Math.floor(Math.random() * mp3list.length);
                    name = mp3list[random].name;
                    url = mp3list[random].url;

                    audioname.html(name);
                    media.src = url;
                    media.load();
                    media.play();
                });
            }
        });

    }

})