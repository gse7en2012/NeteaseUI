$(function(){
    scrollPics_tab({
        currentTarget:'#slideShow',
        wrap: '#slideWrap',
        tab: '#slideShow ol a'
    });
    nie.use(["ui.tab",'ui.Switch'],function(){
        $.tab(".fTabNav li",".fTabCont .ftxtList");
        for(var i=0;i<$(".fSwitchPic a").length;i++){
            nums = i+1
            $(".fSwitchNav").append("<a>"+ nums +"</a>")
        }
        $.Switch(".fSwitchNav a",".fSwitchPic a");
//        大话2
        nie.util.abc.load({promark: "lis9z", callBack: function () {
            var g = $("#switch-2 a"), f = $("#switchnav-1");
            g.each(function (j) {
                var h = j + 1;
                f.append("<a>" + h + "</a>")
            });
            $.Switch({btnDoms: [f.children("a")], imgDoms: [g]});
        }, type: "js"})
    })
})
function scrollPics_tab(opt){
    //只针对一个tab con
    var settings = {
            currentTarget: '',
            autoplay : true,
            minNum: 1,
            time: 5000,
            tab: ''
        },
        opt = opt || {};
    settings = $.extend(settings, opt);

    var $currentTarget = $(settings.currentTarget),
        $wrap = $(settings.wrap),
        ul = $wrap.find("ul"),
        li_len = ul.find("li").length,
        li_w = ul.find("li").width(),
        left = $currentTarget.find("#prev"),
        right = $currentTarget.find("#next"),
        tab = $(settings.tab),
        timer = null,
        currentIndex = 0;
    tab.eq(currentIndex).addClass('current');

    if(li_len > settings.minNum){
        right.click(function() {
            currentIndex++;
            if(currentIndex == li_len){
                currentIndex = 0;
            }
            tab.removeClass('current').eq(currentIndex).addClass('current');

            ul.stop().animate({
                "left": -(li_w*currentIndex)
            }, 150)
        });
        left.click(function() {
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = li_len - 1;
            }
            tab.removeClass('current').eq(currentIndex).addClass('current');

            ul.stop().animate({
                "left": -(li_w*currentIndex)
            }, 300)
        });
        tab.click(function(){
            currentIndex = $(this).index(settings.tab);
            tab.removeClass('current').eq(currentIndex).addClass('current');
            ul.stop().animate({
                "left": -(li_w*currentIndex)
            }, 300)
        });
        if (settings.autoplay) {
            timer = setInterval(function() {
                right.trigger("click");
            }, settings.time);
            $wrap.mouseenter(function() {
                clearInterval(timer);
            })
            $wrap.mouseleave(function() {
                clearInterval(timer);
                timer = setInterval(function() {
                    right.trigger("click");
                }, settings.time);
            })
        };
    }
}