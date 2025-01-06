(function ($) {
 "use strict";
 
    // Sidebar header Expand on Mobile/Tablet
    var expandWrap = $('.sidebar-layout');
    expandWrap.on('click', '.menu-icon', function(e){
      expandWrap.toggleClass('expand');
      e.stopPropagation()
    });
    $(document).on('click',function(e){
      var withoutTA = $('.sidebar-header'); // Without Targeted/That Area
      if(!withoutTA.is(e.target) && withoutTA.has(e.target).length === 0 ){
        expandWrap.removeClass('expand');
      }
      
    });

    // STICKY ACTIVE
    var activeSticky = $('#active-sticky'),
        winD = $(window);
      winD.on('scroll',function() {
        var scroll = $(window).scrollTop(),
            isSticky = activeSticky;
        if (scroll < 115) {
            isSticky.removeClass("is-sticky");
        }
        else{
          isSticky.addClass("is-sticky");
        }
     });

    // Accordion Menu
    var $AccordianMenu = $('#accordianMenu a');
    $AccordianMenu.on('click',function() {
        var link = $(this);
        var closestUl = link.closest("ul");
        var parallelActiveLinks = closestUl.find(".active")
        var closestLi = link.closest("li");
        var linkStatus = closestLi.hasClass("active");
        var count = 0;

        closestUl.find("ul").slideUp(function() {
            if (++count == closestUl.find("ul").length)
                parallelActiveLinks.removeClass("active");
        });

        if (!linkStatus) {
            closestLi.children("ul").slideDown();
            closestLi.addClass("active");
        }
    });

    /*
      RT Progress
      ================================== */
      var rtMainElement = $('.rt-progress');
      rtMainElement.each(function() {
        var $rtElement = $(this);
        $rtElement.waypoint(function() {

          // RT Progress bar
          var progressBar = $(".progress-bar"),
               progressBarSpan = $('.progress-bar span');
           progressBar.each(function(){
            var eachBarWidth = $(this).attr('aria-valuenow');
              $(this).width(eachBarWidth + '%');
            });
            progressBarSpan.addClass('opacity');
        },
        {
          offset: $rtElement.data('rt-offset')
        });
      });


      // RT Counter Up
      var rtCountUp = $('.rt-countup');
      rtCountUp.waypoint(function() {
        // Count
        var count = $('.counter');
        count.each(function () {
          $(this).prop('Counter',1).animate({
              Counter: $(this).text()
          },{
              duration: 3000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              }
          });
        });
        this.destroy();
      },
      {
        offset: rtCountUp.data('rt-offset')
      });


      // Venobox Active
      var venoPopup = $('.venobox');
      venoPopup.venobox();

      // Slick Active
      var twoInOn = $('#two-in-one'),
          sevenItems = $('#seven-items');

      twoInOn.slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300
      });
      sevenItems.slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 7,
          slidesToScroll: 3,
          responsive: [
           {
             breakpoint: 1024,
             settings: {
               slidesToShow: 5,
               slidesToScroll: 3
             }
           },
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 3,
               slidesToScroll: 2
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 3,
               slidesToScroll: 3
             }
           }
          ]
       });
      
    // Scroll UP
    $.scrollUp({
        scrollText: '<i class="ti-angle-up"></i>', // Text for element, can contain HTML
        scrollSpeed: 800
    });
     
      /*
      MAIL CHIMP AJAX ACTIVE
      ======================*/
      var mCForm = $('#mc-form');
      mCForm.ajaxChimp({
        callback: mailchimpCallback,
        //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        url: "http://regaltheme.us16.list-manage.com/subscribe/post?u=9779a0e5298ed51ec0ff0a92b&amp;id=5466926a9f"
      });
      function mailchimpCallback(resp) {
        if (resp.result === 'success') {
          alert(resp.msg);

        } else if(resp.result === 'error') {
          alert(resp.msg);
        }
        return false;
      }

     /*
     CONTACT FORM VALIDATIONS SETTINGS
     ========================================*/
     var CTForm = $('#contactForm');
      if ($('#contactForm').length) {
        CTForm.validate({
          onfocusout: false,
          onkeyup: false,
          rules: {
            name: "required",
            email: {
              required: true,
              email: true
            }
          },
          errorPlacement: function(error, element) {
            error.insertBefore(element);
          },
          messages: {
            name: "What's your name?",
            email: {
              required: "What's your email?",
              email: "Please, enter a valid email"
            }
          },
                
          highlight: function(element) {
            $(element)
            .text('').addClass('error')
          },                    
                
          success: function(element) {
            element
            .text('').addClass('valid')
          }
        });
      } 

     /*
     CONTACT FORM SCRIPT
     ========================================*/
     if ($('#contactSubmit').length) {
      var CTSubmit = $('#contactSubmit');
      CTForm.submit(function() {
        // submit the form
        if($(this).valid()){
           CTSubmit.button('loading'); 
          var action = $(this).attr('action');
          $.ajax({
            url: action,
            type: 'POST',
            data: {
              contactname: $('#name').val(),
              contactemail: $('#email').val(),
              contactmessage: $('#message').val()
            },
            success: function() {
               CTSubmit.button('reset');
               CTSubmit.button('complete');
            },
            error: function() {
              CTSubmit.button('reset');
              CTSubmit.button('error');
            }
          });
        // return false to prevent normal browser submit and page navigation 
        } else {
          CTSubmit.button('reset')
        }
        return false; 
      });
     }

     /*
      WINDOW LOAD FUNCTIONS
      ================================== */
      var WinD = $(window);
         WinD.on('load', function() {
             // Preloader
             var preeLoad = $('#loading-wrap');
             preeLoad.fadeOut(1000);


            /* Isotope Settings */
            var fitRowGrid = $('#fitRows-grid'),
                masonryGrid = $('#masonry-grid'),
                filterMenu = $('#filter-menu');

             // FITROWS GRID
           		if (fitRowGrid.length) {
           		 fitRowGrid.isotope({
           			 itemSelector: '.grid-item',
           			 // layout mode options
           			 layoutMode: 'fitRows'
           		 });
           		}
             // MASONRY GRID
           		if (masonryGrid.length) {
           		 masonryGrid.isotope({
           			itemSelector: '.grid-item',
           			// layout mode options
           			layoutMode: 'masonry',
           			masonryHorizontal: {
           				   rowHeight: 100
           			  }
           		 });
           		}
             // filter items on button click
              filterMenu.on( 'click', 'ul li', function() {
                var filterValue = $(this).attr('data-filter');
                fitRowGrid.add(masonryGrid).isotope({ filter: filterValue });
              });
              // change is-active class on buttons
              filterMenu.each( function( i, filterFunction ) {
                var $filterActive = $( filterFunction );
                $filterActive.on( 'click', 'ul li', function() {
                  $filterActive.find('.is-active').removeClass('is-active');
                  $(this).addClass('is-active');
                });
              });

         });

    // Copy Right Year Update
    $("#currentYear").text( (new Date).getFullYear() );


})(jQuery);
