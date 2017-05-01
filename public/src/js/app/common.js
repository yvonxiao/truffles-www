;(function($,window,undefined){
    $(function(){
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
})(jQuery,window);