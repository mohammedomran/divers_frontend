jQuery(function($) {
  //   Function counts down from 1 minute, display turns orange at 20 seconds and red at 5 seconds.
    var countdownTimer = {
      init: function() {
          this.cacheDom();
          this.render();
      },
      cacheDom: function() {
          this.$el = $('.countdown');
          this.$time = this.$el.find('.countdown__time');
          this.$reset = this.$el.find('.countdown__reset');
      },
      // bindEvents: function() {
      //   this.$reset.on('click', this.resetTimer.bind(this));
      // },
      render: function() {
          var totalTime = 60 * 1,
              display = this.$time;
          this.startTimer(totalTime, display);
          this.$time.removeClass('countdown__time--red');
        this.$time.removeClass('countdown__time--orange');
      }, 
      startTimer: function(duration, display, icon) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
         seconds = parseInt(timer % 60, 10);
         minutes = minutes < 10 ? '0' + minutes : minutes;
         seconds = seconds < 10 ? '0' + seconds : seconds;
         display.text(minutes + ':' + seconds);
          if (--timer < 0) {
            clearInterval(interval);
          };
        if (timer < 20) {
            display.addClass('countdown__time--orange')
          };
          if (timer < 5) {
            display.addClass('countdown__time--red')
          };
        }, 1000);
        this.$reset.on('click', function() {
            clearInterval(interval);
          countdownTimer.render();  
          }); 
      },
  };
  });