//1. Slider 

  
const swiper1 = new Swiper('.swiper', {
    // Optional parameters
    direction : 'horizontal' ,
    spaceBetween : 70,
    slidesPerView : 1,
    loop : true,
    stopOnLastSlide : false,
    allowTouchMove : true,
    autoplay : {
    delay : 5000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
  });


//   Second Slider

const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    direction : 'horizontal' ,
    spaceBetween : 70,
    slidesPerView : 1,
    loop : true,
    centeredSlides: false,
    stopOnLastSlide : false,
    allowTouchMove : true,
    autoplay : {
    delay : 5000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
      },
  });

// STICKY
  $(document).ready(function() {
    // grab the initial top offset of the navigation 
       let stickyNavTop = $('.header').offset().top;
       
       // our function that decides weather the navigation bar should have "fixed" css position or not.
       let stickyNav = function(){
        let scrollTop = $(window).scrollTop(); // our current vertical position from the top
             
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scrollTop > stickyNavTop) { 
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky'); 
        }
    };

    stickyNav();
    // and run it again every time you scroll
    $(window).scroll(function() {
        stickyNav();
    });
});


// ARROW HREF TO COLLECTION 

$(document).ready(function(){
	$("#offer-arrow__btn").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 2000);
	});
});

// MODAL WINDOW

$('.phone_modal').on('click', function () {
  $('.wrapp-modal').fadeIn();
})
$('.exit_btn').on('click', function (){
  $('.wrapp-modal').fadeOut();
})
$('.overlay').on('click', function (){
  $('.wrapp-modal').fadeOut();
})
$('.form-book').children().on('click', function (e){
  e.stopPropagation();
})
// $('.form_btn').on('click', function (regex) {
//   $('.modal-window').fadeOut();
//   $('.modal-accept').fadeIn();
// })
$('.modal-accept_btn').on('click', function () {
  $('.wrapp-modal').fadeOut();
})


// MENU NAV ACTIVE

// $(function() {
//   $("#menu li a").click(function() {
//       $("#menu li a").removeClass("active");         
//       $(this).toggleClass("active");
//   })
// });


// BURGER

$('.burger').on('click', function () {
  $('.menu-nav-up').toggle();
})

$('#burger_btn').on('click', function () {
  $(this).toggleClass('active');
})



// SHOP PAGINATION ACTIVE 


$(function() {

  // MENU NAV ACTIVE

  $("#menu li a").click(function() {
    $("#menu li a").removeClass("active");         
    $(this).toggleClass("active");
})

  // MENU NAV ACTIVE END

  // PAGINATION FOR SHOP
  $(".shop-pagination_btn").click(function() {
      $(".shop-pagination_btn").removeClass("active");         
      $(this).toggleClass("active");
  })

  // PAGINATION FOR SHOP END

  // ONE ITEM SIZE BTNS

  $(".item-choice-size-btns_btn").click(function () {
    $(".item-choice-size-btns_btn").removeClass("active");
    $(this).toggleClass("active")
  })

  // ONE ITEM SIZE BTNS END

    // ONE ITEM COLOR BTNS
    $(".item-choice-color-btns_btn").click(function () {
      $(".item-choice-color-btns_btn").removeClass("active");
      $(this).toggleClass("active")
    })
    // ONE ITEM COLOR BTNS END
});


// VALIDATION
$(document).ready(function () {
  $('[data-submit]').on('click', function(e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
})

// $(document).ready(function () {
//   $('[data-submit1]').on('click', function(e) {
//     e.preventDefault();
//     $(this).parent('form').submit();
//   })
// })

$.validator.addMethod('regex', function (value,element,regexp){
  let regExsp = new RegExp(regexp);
  return this.optional(element) || regExsp.test(value);
}, 'Пожайлуста проверте правильность вводимых данных')


  function valEl(el) {
    el.validate ({
      rules : {
        firstName: {
          required : true,
          regex : "[A-Яа-я]"
        },
        email : {
          required : true,

        },
        phoneNumber : {
          required : true,
          digits : true,
          regex : "[0-9]+"
        },
        user_message : {
          required : true,
          regex : "[A-Яа-я]"
        }
      },
      messages: {
        phoneNumber : {
          required : 'Поле необходимо заполнить',
          regex : 'Введите свой телефон корректно'
        },
        email : {
          required : 'Поле необходимо заполнить',
          regex : 'Введите свою почту корректно'
        },
        firstName : {
          required : 'Поле необходимо заполнить',
          regex : 'Введите своё имя корректно'
        }
      },

      submitHandler: function(form) {
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch($formId) {
          case 'form-book__2':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done (function () {
              setTimeout (function () {
                console.log('done');
                $('#form-message').fadeIn();
                setTimeout (function () {
                  $('#form-message').fadeOut();
                }, 2000)
              }, 1000)
            })
            .fail (function () {
              console.log('fail');
            })
            .always (function () {
              setTimeout (function () {

                $form.trigger('reset');
              }, 1000)
            });
            break;
            case 'form-book__1':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize()
              })
              .done (function () {
                console.log('done')
                setTimeout (function () {
                  $('#modal-accept').fadeIn();
                }, 500)
                $('#modal-window').fadeOut();
              })
              .fail (function () {
                console.log('fail');
              })
              .always (function () {
                setTimeout(function () {
                  $form.trigger('reset');
                }, 1000)
              });
              break;
        }
        return false;
      },
      
      
    })
  };
  $('.form-val').each(function () {
    valEl($(this));
  })