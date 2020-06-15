$(document).ready(function() {
	
	    
    /* ======= Bootstrap Lightbox plugin ======= */
    /* Ref: http://ashleydw.github.io/lightbox/ */
    
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox({
	        leftArrow: '<span class="arrow-left"></span>',
	        rightArrow: '<span class="arrow-right"></span>'
        });
    });	  


});