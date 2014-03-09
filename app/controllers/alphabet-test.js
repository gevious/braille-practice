export default Em.Controller.extend({
  winningStreak: 0,
  randomLetter: 'a',
  lastLetter: Em.Object.create(),
  enteredLetter: null,
  streakDetail: Em.A([]),
  getBrailleLetter: function(letter) {
    return new Handlebars.SafeString(
      '<div class="pull-left braille-letter braille-'+letter+'"></div>');
  },
  brailleLetter: function() {
    return this.getBrailleLetter(this.get('randomLetter'));
  }.property('randomLetter'),
  generateLetter: function() {
    Em.debug("Generating random letter");
    var chars='abcdefghijklmnopqrstuvwxyz';
    this.set('randomLetter', chars[Math.round(Math.random() * (chars.length - 1))]);
  },
  updateStreakDetail: function(success, el) {
    this.get('streakDetail').reverseObjects();
    this.get('streakDetail').pushObject({success:success, letter: el});
    this.get('streakDetail').reverseObjects();
    // keep history of 5 elements
    if (this.get('streakDetail').get('length') > 5) {
      this.get('streakDetail').popObject();
    }
  },
  gotLetter: function() {
    if (Em.isEmpty(this.get('enteredLetter'))) {
      return;
    }
    var el = this.get('enteredLetter'),
        al = this.get('randomLetter'),
        success = Boolean(el === al),
        streak = (success) ? this.get('winningStreak') + 1 : 0;
    this.set('winningStreak', streak);
    // We could just make the following observales, but I want to avoid
    // the observable being called on the enteredLetter = null
    this.updateStreakDetail(success, el);
    this.generateLetter();
    // updating result of last entered letter
    this.set('lastLetter',
        {'status': success, 'enteredLetter': el, 'actualLetter': al,
         'braille': this.getBrailleLetter(al)});
    this.set('enteredLetter', null);
  }.observes('enteredLetter')
});
