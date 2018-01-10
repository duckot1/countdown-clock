var Game = {

  // Boolean
  counting: false,

  // DOM
  init: function() {
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
      } else if (e.keyCode === 51) {
        Timer.init();
        this.counting = false;
      }
    })
  }

}

Game.init()
