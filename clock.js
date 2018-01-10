var Timer = {
  // Backbone-like structure
  $el: $('.countdown'),

  // Params
  countdown_interval: null,
  total_seconds     : 0,


  init: function() {

    // DOM
		this.$ = {
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    this.total_seconds = 10;

    // Init countdown values
    this.values = {
      seconds: this.total_seconds,
    };

    // RESET TIME
    this.$.seconds.map((i, fig) => {
      var initialVal;
      if (this.total_seconds.toString().length === 1) {
        (i === 0) ? initialVal = 0 : initialVal = this.total_seconds.toString()[0];
      } else {
        (i === 0) ? initialVal = this.total_seconds.toString()[0] : initialVal = this.total_seconds.toString()[1];
      }

      $(fig).children().map((i, span) => {
        if (i % 2 === 0) {
          $(span).html(initialVal)
        }
      })
    })

  },

  count: function() {

    var that    = this,
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);

    this.countdown_interval = setInterval(function() {
      if(that.total_seconds > 0) {
        --that.values.seconds;
        // Update DOM values

        // Seconds
        that.checkSeconds(that.values.seconds, $sec_1, $sec_2);

        --that.total_seconds;
      } else {
        clearInterval(that.countdown_interval)
        console.log('Countdown complete');
      }
    }, 1000);
  },

  animateFigure: function($el, value) {

     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    // Before we begin, change the back value
    $back_top.find('span').html(value);

    // Also change the back bottom value
    $back_bottom.find('span').html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, {
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        clearProps          : 'all'
    });
  },

  checkSeconds: function(value, $el_1, $el_2) {
    console.log(value, $el_1, $el_2);

    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        // Animate only if the figure has changed
        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        // If we are under 10, replace first figure with 0
        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }
  },

  stop: function () {
    clearInterval(this.countdown_interval)
  }
}

Timer.init()
