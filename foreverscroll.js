/// foreverscroll ///////////////////////////
(function( $ ){
$.fn.foreverscroll = function (id,options){
    var $this    = this;
    var id       = this.selector;
    var ul       = $this.find('.overview');
    var viewport = $this.find('.viewport');
    var pagi     = $('.pagi');
    var pagiLi   = $('.pagi li');
    var thename  = this.selector;
    //console.log(thename ,' called');
    
    // default
    var fo = $.extend({
                    type : 'article',
                    slideCode : false,
                    prev : '.prev',
                    next : '.next',
                    paginate : false,
                    item : 0
                }, 
                options);
                
    var licountpre  = ul.children(fo.type).length; //count before we clone

    /////////////////////////////////
    // paginate click
    if(fo.paginate == true){
        var $menupag = $('<ul></ul>',{'class' : 'pagi'});
        viewport.after($menupag);
        var $hovRegName;
        var ip = 0;

        $this.find(fo.type).each(function(){
            
            $(this).attr('data-item','item-'+ip);        
            $menupag.append($('<li></li>', {'class': 'item-'+ip,'text':ip}));
            
            ip++;
        });

        

    $('.pagi li').click(function(e){
            currentClass = $(this).attr('class');
            howfaralong = pagiLi.index(this);
            console.log(ip, currentClass,howfaralong);
            //$('article'+currentClass)
            if(!$(this).hasClass('current')){
                
                if(ip > 2){
                    if($(fo.type+'.'+currentClass)){

                    }
                    ul.animate({ 'margin-left' : liwidthn*howfaralong });
                }else{
                    //if()
                }
                //$(thename+' > div '+fo.type+':first').before($(thename + ' > div '+fo.type+':last'));
                console.log('clicked: ', $(this).attr('class'));
            }
        })
    }

    

    /////////////////////////////////
    //we clone if number is below 6 as then we can center
    if(licountpre < 6){
        ul.find(fo.type).clone().addClass('after').appendTo(ul);
        ul.find(fo.type+':not(.after)').clone().addClass('pre').prependTo(ul);
    }
    
    $('.item-'+fo.item).not('.pre, .after').addClass('current');
    dataitem = fo.item;
    var current = $('.current');

    var licount  = ul.children(fo.type).length; //count again
    var liwidth  = ul.children(fo.type).width();
    var liheight  = ul.children(fo.type).height();
    
    if(liwidth == "100%"){
        liwidth = $('body').width();    
    }
    ul.children(fo.type).css('width' , liwidth);
    //ul.children(fo.type).css('height' , liheight);
    
    var liwidthn  = liwidth * -1;
    var liwidthnegative = liwidth * -1;
    var liwidthpositive = liwidth * 1;
    var ulwidth  = liwidth * licount;
    var resetAnim = liwidthn;

    ul.width(ulwidth);
    console.log(liwidthn);
    
    multiplier = fo.item;
    if(fo.item == 0){
        //liwidthn = 0;
        $(thename+' > div '+fo.type+':first').before($(thename + ' > div '+fo.type+':last')); 
        $(thename+' > div '+fo.type+':first').before($(thename + ' > div '+fo.type+':last'));  
    }else {
        ul.css({
            'left'        :liwidthn,
            'margin-left' : liwidthn*fo.item, 
            'position'    : 'relative'
        });
    }
    
    ul.css({
        'left'        :liwidthn,
        'margin-left' : liwidthn*fo.item, 
        'position'    : 'relative'
    });
    
    viewport.css({width: liwidth});
    //heightCheck();
    
    $(window).resize(function(){
        liwidth = $('body').width();
        
        ul.children(fo.type).css('width' , liwidth);
        //ul.children(fo.type).css('height' , liheight);
        
        liwidthn  = liwidth * -1;
        liwidthnegative = liwidth * -1;
        liwidthpositive = liwidth * 1;
        ulwidth  = liwidth * licount;
        resetAnim = liwidthn;
        
        ul.width(ulwidth);
        ul.css({
            'left':liwidthn,
            'margin-left' : liwidthn*fo.item 
        });
        viewport.css({width: liwidth});
        //heightCheck();
    });
    
   function heightCheck(){
        var theHeight = 0;
        ul.children(fo.type).each(function(){
            if($(this).height() > theHeight){
                theHeight = $(this).outerHeight();
            }
        });
        theHeight = theHeight + 30;
        ul.css('height',theHeight);
        ul.parent().css('height',theHeight);
    }
    
    $(thename).find(fo.prev).click(function(){
       
        dataClicked();

        changeItemCurrrent($(this), 'prev');

        if(fo.slideCode == true){
            slideUpCode();
        }
        //console.log(thename);
        $(thename).find('.overview').animate({
            'left' : liwidthpositive-liwidthpositive},1000,function(){
            //console.log($(thename+' > div > '+fo.type+':first'));
            $(thename+' > div '+fo.type+':first').before($(thename + ' > div '+fo.type+':last')); 
                console.log(thename, fo.type);
                ul.css({'left':resetAnim});
                console.log('here');
                $(thename).find(fo.prev).attr('data-clicked', 'no');
            });
        return false;
    });
    $(thename).find(fo.next).click(function(){
        
        dataClicked();

        changeItemCurrrent($(this), 'next');
        
        if(fo.slideCode == true){
            slideUpCode();
        }

        //console.log(thename);
        $(thename).find('.overview').animate({
            'left' : liwidthnegative+liwidthnegative},1000,function(){
            $(thename+' > div '+fo.type+':last').after($(thename+' > div '+fo.type+':first')); 
            //console.log(thename, fo.type);
                ul.css({'left':liwidthnegative});
                $(thename).find(fo.next).attr('data-clicked', 'no');
            });
        return false;
    });


    function slideUpCode(){
        $('.show-more').text('Read More').removeClass('show');
        $('.show-hide').slideUp(500);
    }

    function dataClicked(){
        if($(this).attr('data-clicked') == 'yes')return;
        $(this).attr('data-clicked', 'yes');
    }

    function changeItemCurrrent(thisob, dir){
        //console.log(licount);
        lcountH = licount -1;
        
        switch(dir) {
            case 'next':
                dataitem = dataitem+1;
                if(dataitem > lcountH){
                    dataitem = 0;
                }

                //console.log('next');
            break;
            case 'prev':
                dataitem = dataitem-1;
                if(dataitem < 0){
                    dataitem = lcountH;
                }
                
                //console.log('next');
            break;
        }


        matchcurrent = $(fo.type+'.current').attr('data-item');
        $(fo.type+'.current').removeClass('current')
        $(fo.type+'.item-'+dataitem).addClass('current');
        //console.log(matchcurrent, dataitem);
        
        if(fo.paginate == true){
            $('.pagi').children('.current').removeClass('current');
            $('.pagi').children('.item-'+dataitem).addClass('current');
        }
        current = $('.current');

    }
};
})( jQuery );