<template>

</template>

<script>
/**
 * Отзывы "Мнения.Про" в карточке товара
 */
export default {
  name: "NewCatalogMneniyaPro.vue",

  props: {},

  data: () => ({}),

  created() {

  },

  mounted() {
    this.getReviews();
  },

  methods: {
    /**
     * получение отзывов на товар
     */
    getReviews: function () {
      let preloader = $('.product-review__preloader');
      let review__component = $('.product-review__component');

      preloader.show();
      review__component.hide();

      let sku_id = $(review__component).data('sku_id');
      console.log('getReviews');

      $.ajax({
        type: "GET",
        url: "/ajax/mneniya_pro/getReviewsHtml.php",
        data: {"SKU_ID": sku_id},
        success: function (result) {
          // console.log(result);
          preloader.hide();
          review__component.show();
          review__component.html(result);
          this.initReviews();
        }
      });
    },

    /**
     * Работа модалки отзывов - открытие окна.
     */
    initReviews: function () {

      $('#open-review-modal').on('click', function (event) {
        event.preventDefault();
        $('#review-overlay').addClass('review-overlay--show');
        $('#review-modal').fadeIn();
      });

      $('#review-overlay, #close-review-modal, #cancel-review-modal').on('click', function (event) {
        event.preventDefault();
        this.closeReviewModal();
      });

      $('#review-overlay').on('click', function (event) {
        event.preventDefault();
        $('#review-form__success-modal').fadeOut();
        $('#review-form__success').text('');
      });
    },

    closeReviewModal: function () {
      $('#review-overlay').removeClass('review-overlay--show');
      $('#review-modal').fadeOut();
      $('#fbPhotos-modal').fadeOut();
      $('.fbPhotos-modal-container, .fbPhotos-left, .fbPhotos-right').remove();
      $('#review-name, #review-email, #review-dignity, #review-defect, #review-comment').val('');
      $('#review-checkbox').prop('checked', true);
      $('#photo-collection').children().remove();
      $('.review-form .stars .stars__item').removeClass('stars__item--full');
      $('.review-form .stars .stars__item').addClass('stars__item--gray');
      $('#review-error').text('');
      $('#review-stars-error').text('');
      $('#review-file-error').text('');
    }
  },

  /**
   * Работа модалки отзывов - заполнение звездочек
   * @param index
   */
  starsItemClick: function (index) {
    // TODO: повесить обработчик
    //$('.review-form .stars .stars__item').on('click', function (event) {

    event.preventDefault();
    var starIndex = $(this).index();
    var starAll = '.review-form .stars .stars__item';

    $(starAll).removeClass('stars__item--full');
    $(starAll).addClass('stars__item--gray');
    $(starAll).each(function () {
      if ($(this).index() > starIndex) {
        return false;
      } else {
        $(this).removeClass('stars__item--gray');
        $(this).addClass('stars__item--full');
      }
    });

  },

  /**
   * загрузка картинки в отзывах и создание блока с ней
   */
  inputFileChange: function () {
    // TODO: повесить обработчик
    //$('#input__file').on('change', function () {

    // Проверка размера загружаемого файла
    if (this.files[0].size <= 2097152) {

      let file = this.files[0],
          url = URL.createObjectURL(file),
          fileCount = $('#photo-collection').children().length;

      this.getBase64(file).then((data) => {
        const fileBase64 = data;
        if (fileCount <= 3) {
          $('#photo-collection').append($('<div class="photo-item" data-img="' + fileBase64 + '" style="background-image: url(' + url + ');">' +
              '<div class="photo-item__close"></div>' +
              '</div>'));
          // удаление загруженной картинки в отзывах
          $('.photo-item__close').on('click', function (event) {
            event.preventDefault();
            $(this).parent().remove();
          });
        }
        $('#review-file-error').text('');
      });

    } else {
      $('#review-file-error').text('Загруженный Вами файл недопустимого размера :(');
      this.value = "";
    }

  },

  // перевод картинки в формат для мнения про
  getBase64: function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  setButtonDefault: function (button) {
    setTimeout(
        () => $(button).html('Опубликовать').prop('disabled', false),
        500
    );
  },

  setButtonProcess: function (button) {
    $(button).html('Отзыв публикуется').prop('disabled', true);
  },

  // логика публикации
  publish: function () {
    // TODO: повесить обработчик
    //$('#publish-review').on('click', function (event) {
    event.preventDefault();
    let nameReview = $('#review-name').val(),
        emailReview = $('#review-email').val(),
        starCount = $('.review-form .stars .stars__item--full').length,
        reviewDignity = $('#review-dignity').val(),
        reviewDefect = $('#review-defect').val(),
        reviewComment = $('#review-comment').val(),
        reviewCheckbox = $('#review-checkbox').prop("checked"),
        photosReview = $('#photo-collection .photo-item'),
        photos = $('#photo-collection .photo-item').attr('data-img'),
        photosBase = [],
        productId = $('.small-country').text().replace(/[^0-9]/gi, ''),
        productName = $('.maxi_container h1').text(),
        productUrl = $('.product-review__component').data('link');
    photosReviewUrl = [];

    let submitButton = this;
    $('#review-stars-error').text('');
    $('#review-error').text('');

    if (nameReview != '' && emailReview != '' && emailReview.indexOf('@') > -1 && starCount > 0) {
      if (reviewDignity.length > 0 || reviewDefect.length > 0 || reviewComment.length > 0) {
        //if (nameReview != '' && emailReview != '' && emailReview.indexOf('@') > -1) {
        //if (nameReview != '') {
        this.setButtonProcess(submitButton);

        if (photosReview.length > 0) {
          for (let i = 0; i < photosReview.length; i++) {
            photosReviewUrl.push(photosReview[i].style.backgroundImage);
            photosBase.push(photosReview[i].getAttribute('data-img'));
          }
        }

        let data = {
          nameReview: nameReview,
          emailReview: emailReview,
          starCount: starCount,
          reviewDignity: reviewDignity,
          reviewDefect: reviewDefect,
          reviewComment: reviewComment,
          reviewCheckbox: reviewCheckbox,
          photosReviewUrl: photosReviewUrl,
          productId: productId,
          productName: productName,
          photosBase: photosBase,
          productUrl: productUrl
        };
        $.ajax({
          type: "POST",
          url: "/ajax/mneniya_pro/putReviewJson.php",
          data: {"data": data},
          success: function (result) {
            console.log(result);
            if (result) {
              if (result.review) {
                if (result.photo) {
                  this.closeReviewModal();
                  //createNewReview(nameReview, emailReview, starCount, reviewDignity, reviewDefect, reviewComment, photosReviewUrl, photosBase);
                  $('#review-form__success').text('Отзыв отправлен!');
                  $('#review-overlay').addClass('review-overlay--show');
                  $('#review-form__success-modal').fadeIn();
                } else
                  $('#review-error').text('Отзыв отправлен, фото не отправлено :(');
                $('#review-name, #review-email, #review-dignity, #review-defect, #review-comment').val('');
                $('#review-checkbox').prop('checked', true);
                $('#photo-collection').children().remove();
                $('.review-form .stars .stars__item').removeClass('stars__item--full');
                $('.review-form .stars .stars__item').addClass('stars__item--gray');
              } else {
                $('#review-error').text('Отзыв не отправлен, попробуйте еще раз :(');
              }
            } else {
              $('#review-error').text('Отзыв не отправлен, попробуйте еще раз :(');
            }
            this.setButtonDefault(submitButton);
          }
        });
      } else {
        $('#review-error').text('Заполните хотя бы одно из полей: "Достоинства", "Недостатки" или "Комментарий"');
      }
    } else {
      if (starCount <= 0) {
        $('#review-stars-error').text('Пожалуйста, оцените товар');
      }
      if (nameReview == '' || emailReview == '' || emailReview.indexOf('@') <= -1) {
        $('#review-error').text('Вы не заполнили обязательные поля "Имя" и "Email" или заполнили их с ошибкой');
      }
    }
  },

  /**
   * Создаёт слайдер при клике на картинки в отзывах
   */
  createSlider: function (target) {
    $('#fbPhotos-modal').append($(
        '<div id="fbPhotos-modal-container" class="fbPhotos-modal-container owl-carousel owl-theme"></div>' +
        '<a href="#" class="arrow-left fbPhotos-left"></a>' +
        '<a href="#" class="arrow-right fbPhotos-right"></a>'
    ))
    for (let sibling of target.parentNode.children) {
      let imageUrl = sibling.style.backgroundImage,
          imageId = `fb-slide-photo${+new Date}${this.getRandomInRange(1, 1000)}`;
      $('#fbPhotos-modal-container').append($(
          '<div class="item">' +
          '<div class="item-img" id="' + imageId + '"></div>' +
          '</div>'
      ));
      $(`#${imageId}`).css('background-image', imageUrl);
    }
    $("#fbPhotos-modal-container").owlCarousel({
      navigation: false,
      pagination: false,
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true
    });
    $(".fbPhotos-left").on('click', function (e) {
      e.preventDefault();
      $('#fbPhotos-modal-container').trigger('owl.prev');
    });
    $(".fbPhotos-right").on('click', function (e) {
      e.preventDefault();
      $('#fbPhotos-modal-container').trigger('owl.next');
    });
    $('#review-overlay').addClass('review-overlay--show');
    $('#fbPhotos-modal').fadeIn();
  },

  // TODO: повесить обработчики
  // $('.feedback__item_example .feedback__photo').on('click', function () {
  //   createSlider(this);
  // });
  // $('.feedback__item .feedback__photo').on('click', function () {
  //   createSlider(this);
  // });

  /**
   * Добавляет отзыв в список.
   * Функция не используется, была сделана просто для визуализации добавления...
   *
   * @param name
   * @param email
   * @param args
   */
  createNewReview: function (name, email, ...args) {
    let feedbackItemId = `feedbackItem${+new Date}`;

    if (args[1] == '') {
      args[1] = '-';
    }
    if (args[2] == '') {
      args[2] = '-';
    }
    if (args[3] == '') {
      args[3] = '-';
    }
    $('#feedback').append($(
        '<div class="feedback__item" id="' + feedbackItemId + '">' +
        '<div class="feedback__personal">' +
        '<img src="https://cdn.mneniya.pro/usermedia/default_avatar.png" class="feedback__img" alt="фото отзыва">' +
        '<div class="feedback__fio">' + name + '</div>' +
        '<div class="feedback__date">13 июля 2020</div>' +
        '<div class="stars">' +
        '</div>' +
        '</div>' +
        '<div class="feedback__info">' +
        '<div class="feedback__dignity">' +
        '<div class="feedback__h">' +
        '<div class="feedback__plus">+</div>' +
        'Достоинства' +
        '</div>' +
        '<div class="feedback__decription">' + args[1] +
        '</div>' +
        '</div>' +
        '<div class="feedback__defect">' +
        '<div class="feedback__h">' +
        ' <div class="feedback__minus">-</div>' +
        ' Недостатки' +
        '</div>' +
        '<div class="feedback__decription">' + args[2] + '</div>' +
        '</div>' +
        '<div class="feedback__comment">' +
        '<div class="feedback__h">Комментарий</div>' +
        '<div class="feedback__decription">' + args[3] + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="feedback__photos" id="fbPhotos">' +
        '</div>' +
        '</div>'
    ));

    let starAllFeedback = `#${feedbackItemId} .stars`,
        fbPhotos = `#${feedbackItemId} #fbPhotos`;

    // создаем звездочки в отзыве
    for (let i = 0; i < 5; i++) {
      if (i < args[0]) {
        $(starAllFeedback).append('<div class="stars__item stars__item--full"></div>');
      } else {
        $(starAllFeedback).append('<div class="stars__item stars__item--gray"></div>');
      }
    }

    // создаёт фоточки в отзыве
    for (let i = 0; i < args[4].length; i++) {
      let urlNewReview = args[4][i],
          fbPhotoId = `fb-photo${+new Date}${getRandomInRange(1, 1000)}`;

      $(fbPhotos).append('<div class="feedback__photo" id="' + fbPhotoId + '"></div>');
      $(`#${fbPhotoId}`).css('background-image', urlNewReview);
      $(`#${fbPhotoId}`).on('click', function () {
        this.createSlider(this);
      });
    };

    this.closeReviewModal();
  },

  getRandomInRange: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Проверяет email
   */
  reviewEmailChange: function () {
    // TODO: повесить обработчик
    //$("#review-email").change(function () {
    if ($('#review-email').val().indexOf('@') == -1 || $('#review-email').val() == '') {
      $('#review-email').addClass('text-input-error');
      $('#review-email-err').addClass('text-input__error-msg--show');
    } else {
      $('#review-email').removeClass('text-input-error');
      $('#review-email-err').removeClass('text-input__error-msg--show');
    }
  }
}
</script>

<style scoped>

</style>