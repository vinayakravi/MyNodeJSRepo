$(document).ready(function () {
        $('ul.nav').find('li').each(function() {$(this).removeClass('active');})
        var url = window.location.pathname;
        $('ul.nav a[href="'+ url +'"]').parent().addClass('active');          
    });