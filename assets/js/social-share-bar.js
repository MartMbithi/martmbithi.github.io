$(document).ready(function() {
	
	    
    /* ======= jQuery Social Share Bar ======= */ 
    /* Ref: https://viima.github.io/jquery-social-share-bar/ */   
    /* 'channels': ['facebook', 'twitter', 'googleplus', 'linkedin','reddit', 'email', 'digg', 'pinterest', 'tumblr'] */
    $('#share-bar').share({
	    'channels': ['facebook', 'twitter', 'linkedin','reddit']

	});

	/* ======= jQuery Social Share Bar ======= */ 
    /* Ref: https://viima.github.io/jquery-social-share-bar/ */   
    /* 'channels': ['facebook', 'twitter', 'googleplus', 'linkedin','reddit', 'email', 'digg', 'pinterest', 'tumblr'] */
    
    var $socialBar =  $('#share-bar');
    var $blogPageTop = $('#blog-post-top').height();
    
    /* Show social share bar based on scrolling */  
    $(window).on('scroll load', function() {
	    
	    //alert('$scrollBottom');
         
         if ($(window).scrollTop() > $blogPageTop) {
	         
             $socialBar.addClass('show-me');

         } else {
	         
	         $socialBar.removeClass('show-me');
         }
    });
    

});