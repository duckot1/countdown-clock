var Game = {

  // Boolean
  counting: false,


  init: function() {
    // DOM
    this.$ = {
      clock: $('#clock'),
      timesUp: $('#timesup'),
      loading: $('#loading'),
      loading_bar: $('.loading')
    }

    this.gameButtonListeners()
  },

  gameButtonListeners: function() {
    $(document).on('keypress', function(e) {
      if (e.keyCode === 49) {
        if (!this.counting) {
          Timer.count();
          this.counting = true;
        }
      } else if (e.keyCode === 50) {
        Timer.stop();
        this.counting = false;
      } else if (e.keyCode === 51) {3
        if (!this.counting) {
          this.counting = false;
          Timer.init();
        }
      }
    })
  },

  gameOver: function() {
    this.gameOverAnimationSequence(Game.here)
  },

  gameOverAnimationSequence: function(cb) {
    this.$.clock
      .animate({
        top: "-200",
        opacity: 0.25
      }, 1000)
      .queue(function() {
        Game.$.timesUp
          .show()
          .animate({
            top: "42%",
            opacity: 1
          }, 1000)
          .delay(2000)
          .fadeOut(400)
          .queue(function() {
            Game.$.loading
              .fadeIn(400)
              .delay(2000)
              .queue(function(next) {
                Game.$.loading_bar.fadeOut(400)
                next()
              })
              .delay(500)
              .animate({top: 0}, 1000)
              .queue(function(next) {
                $('.leaderboard-border').addClass('border-cross')
                next()
              })
              .animate({left: '15px', right: "100%"}, 1000)
              .queue(function() {
                Game.$.timesUp.dequeue()
                Game.$.clock.dequeue()
                $(this).dequeue()
              })
          })
      })
  },

  saveScore: function() {
    console.log('here');
  },

  getScores: function() {
    console.log('get scores');
  }

}

Game.init()
