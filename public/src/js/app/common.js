import Cookies from '../vendors/js.cookie.js'

$(function(){

    var $menuBar = $('div.menu-bar');
    if($menuBar.length){
        var $divHeader = $('div.header'),initLeft,selfDistance;

        var initMenuBarLeft = function(){
            var $headerText = $divHeader.find('div.headerText'),$aActive = $divHeader.find('a.active');
            var distance = $divHeader.outerHeight()-$headerText.position().top-$headerText.outerHeight()+1;
            selfDistance = Math.round($menuBar.width()/2);
            initLeft = $aActive.position().left+Math.round($aActive.width()/2)-selfDistance;

            $menuBar.css({
                left:initLeft+'px',
                bottom:'-'+distance+'px',
                display:'block'
            });
        };

        if($divHeader.find('div.headerMain img').height()<10){
            $divHeader.find('div.headerMain img').load(function(){
                initMenuBarLeft();
            });
        }else{
            initMenuBarLeft();
        }

        $divHeader.find('div.headerText li').hover(function(){
            var $me = $(this);
            var currLeft = $me.position().left+Math.round($me.width()/2)-selfDistance;

            $menuBar.stop().animate({
                left:currLeft+'px'
            },'fast');
        },function(){
            $menuBar.stop().animate({
                left:initLeft+'px'
            },'fast');
        });
    }

    $('#search-truffles').submit(function(){
        var searchVal = $.trim($(this).children('input.fl').val());
        if(searchVal)
            window.location.href = "https://defeisi.tmall.com/?q="+searchVal+"&type=p&search=y";
        else
            window.location.href = "https://defeisi.tmall.com";
        return false;
    });

    $('#set-locale a').click(function(){
        Cookies.set('locale',$(this).data('locale'),{expires:365});
        window.location.reload(true);
    });
});