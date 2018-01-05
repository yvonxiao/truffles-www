var MIN_W = 1200;
var $divBanner = $('div.banner');
var currentIndex = 0;
var imgNum = $divBanner.find('li').length,moveLeftResetIndex = imgNum-1,moveRightResetIndex = 1-imgNum;
var w,isMoving=0;

drawBanner();
resetDivBanner();

bindPageEvent();

function resetDivBanner(){
    w = $(window).width();
    if(w<MIN_W) w = MIN_W;

    var bannerH = Math.ceil(w/3.3);

    $divBanner.css('height',bannerH+'px');
    $divBanner.children('ul').css('width',w*imgNum+'px').children('li').css('width',w+'px').each(function(){
        var $me = $(this);
        var i = $me.attr('data-index');
        if(i==currentIndex){
            $me.stop(true,false).css('left','0px;');
        }else if(i<currentIndex){
            $me.stop(true,false).css('left','-'+w+'px');
        }else{
            $me.stop(true,false).css('left',w+'px');
        }
    });
    isMoving = 0;
}

function drawBanner(){
    var firstLiHtml = $divBanner.find('li:first').html();
    var $ul = $divBanner.children('ul');
    var appendHtml = '';
    $ul.find('li').each(function(){
        appendHtml+='<li>'+$(this).html()+'</li>';
    });
    $ul.prepend(appendHtml);

    $divBanner.children('ul').append('<li>'+firstLiHtml+'</li>');

    $divBanner.find('li').each(function(i){
        $(this).attr('data-index',(i-imgNum));
    });
}

function moveBannerLeft(){
    if(isMoving) return;
    var $currLi = $divBanner.find('li[data-index='+currentIndex+']');
    var $nextLi = $divBanner.find('li[data-index='+(currentIndex+1)+']');
    moveLi($currLi,-w);
    moveLi($nextLi,0,function(){
        currentIndex++;
        if(currentIndex>moveLeftResetIndex){
            // 到了实际最后一张(和初始第一张是一样的)，重置
            currentIndex = 0;
            resetLi();
        }
    });
}

function moveBannerRight(){
    if(isMoving) return;
    var $currLi = $divBanner.find('li[data-index='+currentIndex+']');
    var $prevLi = $divBanner.find('li[data-index='+(currentIndex-1)+']');
    moveLi($currLi,w);
    moveLi($prevLi,0,function(){
        currentIndex--;
        if(currentIndex<moveRightResetIndex){
            // 到了实际第一张(和初始第一张是一样的)，重置
            currentIndex = 0;
            resetLi();
        }
    })
}

function moveLi($li,left,doAfterMove){
    isMoving = 1;
    $li.stop(true,false).animate({'left':left+'px'},'slow',function(){
        if(doAfterMove) doAfterMove.call(window);
        isMoving = 0;
    });
}

function resetLi(){
    $divBanner.find('li').each(function(){
        var $me = $(this);
        var i = $me.attr('data-index');

        if(i==currentIndex){
            $me.stop(true,false).css('left','0px');
        }else if(i<currentIndex){
            $me.stop(true,false).css('left','-'+w+'px');
        }else{
            $me.stop(true,false).css('left',w+'px');
        }
    });
}

function bindPageEvent(){
    // 对于低版本IE，用onmouseover和onmouseout来模拟hover
    if(!window.XMLHttpRequest && !$.support.opacity){
        $divBanner.on('mouseover',function(){
            $divBanner.find('a.move-banner').show();
        }).on('mouseout',function(){
            $divBanner.find('a.move-banner').hide();
        })
    }

    $divBanner.children('a.move-banner-left').click(function(){
        moveBannerRight();
        return false;
    });

    $divBanner.children('a.move-banner-right').click(function(){
        moveBannerLeft();
        return false;
    });

    $divBanner.on('click',function(e){
        var eTarget = e.target;
        if(eTarget.nodeName==='IMG'){
            var $eTarget = $(eTarget),pageUrl = $eTarget.data('url');
            if(pageUrl) window.location.href = pageUrl;
        }
        return false;
    });

    $(window).resize(function(){
        resetDivBanner();
    });

    // 定义定时器
    var timer = window.setInterval(function(){
        moveBannerLeft();
    },5000);

    $(window).unload(function(){
        window.clearInterval(timer);
        timer = null;
    });

}
