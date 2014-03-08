export default Em.Controller.extend({
  winningStreak: 0,
  randomLetter: 'a',
  enteredLetter: null,
  brailleLetter: function() {
    return new Handlebars.SafeString(
      '<div class="braille-letter braille-'+this.get('randomLetter')+'"></div>');
  }.property('randomLetter'),
  generateLetter: function() {
    Em.debug("Generating random letter");
    var chars='abcdefghijklmnopqrstuvwxyz';
    this.set('randomLetter', chars[Math.round(Math.random() * (chars.length - 1))]);
  },
  gotLetter: function() {
    if (Em.isEmpty(this.get('enteredLetter'))) {
      return;
    }
    var l = this.get('enteredLetter'),
        streak = (l === this.get('randomLetter')) ? this.get('winningStreak') + 1 : 0;
    this.set('winningStreak', streak);
    this.set('enteredLetter', null);
    this.generateLetter();
  }.observes('enteredLetter')
});
