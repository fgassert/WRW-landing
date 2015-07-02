
var RocketLauncher = function() {
    'use strict';

    new IntroductionView();
    new SignalsView();
    new DescriptionView();
    new FeaturesView();
};


window.onload = function() {
  'use strict';

   new RocketLauncher();
};


var DescriptionView = Backbone.View.extend({

  el: '#description',

  initialize: function() {
    this.startSlider();
  },

  startSlider: function() {
    var slick = $.fn.slick;

    this.$el.find('.slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  }

});


var FeaturesView = Backbone.View.extend({
  el: '.features',

  events: {
    'click .learn-more': 'setFeature',
    'click .link-feature': 'setFeature'
  },

  setFeature: function(e) {
    var $currentFeature,
      $item;

    if (e) {
      e.preventDefault();
      $currentFeature = $(e.currentTarget).closest('.features-item');
      $item = $(e.currentTarget).data('item');
    }

    if ($currentFeature) {
      $currentFeature.addClass('is-hidden');
    }


    $('.inline').addClass('unrevealed fix-height');


    $('.inline .features-item').removeClass('is-hidden');
    $('#item-' + $item).addClass('is-hidden');
    // debugger;

    // Reveals slider and slide
    $('.expose-container').removeClass('unrevealed is-hidden');
    $('.expose-container .slide').addClass('unrevealed');
    $('.expose-container #slide-' + $item).removeClass('unrevealed');

    // Hide two-columns list
    $('.features-list').first().addClass('is-hidden');

    // Shows row list
    window.setTimeout(function() {
      $('.inline').removeClass('unrevealed');
    }, 150);

  }

});


var IntroductionView = Backbone.View.extend({

  el: '.introduction',

  initialize: function() {
    $(window).on('scroll', _.bind(this.doParalaxEfect, this));
    this.bg = $('.bg');
    this.doParalaxEfect();
    this.launchModal();
  },

  launchModal: function() {
    var $video = this.$el.find('video');

    this.$el.find('.play-video').on('click', function(e) {
      e.preventDefault();

      $('#modal-intro').foundation('reveal', 'open');
      $video[0].play();
    });
  },

  getScroll: function() {
    return window.pageYOffset;
  },

  doParalaxEfect: function() {
    var scroll = this.getScroll();

    var translateY = (scroll / 0.7).toFixed(0);

    this.bg.css({
      '-webkit-transform': 'translate3d(0,' + translateY + 'px, 0)',
      '-moz-transform': 'translate3d(0,' + translateY + 'px, 0)',
      '-ms-transform': 'translate3d(0,' + translateY + 'px, 0)',
      '-o-transform': 'translate3d(0,' + translateY + 'px, 0)',
      'transform' :  'translateY(' + translateY + 'px)'
     });
  }

});


var SignalsView = Backbone.View.extend({


  el: '.signals',

  events: {
    'click .link-signals' : 'moveLeft',
    'click .back' : 'moveRight'
  },

  moveLeft: function(e) {
    e.preventDefault();

    this.$el.find('.slide-1').removeClass('move m-right');
    this.$el.find('.slide-2').removeClass('move m-right');

    this.$el.find('.slide-1').addClass('move m-left');
    this.$el.find('.slide-2').addClass('move m-left');
  },

  moveRight: function(e) {
    e.preventDefault();

    this.$el.find('.slide-1').removeClass('move m-left');
    this.$el.find('.slide-2').removeClass('move left');

    this.$el.find('.slide-1').addClass('move m-right');
    this.$el.find('.slide-2').addClass('move m-right');
  }

});


