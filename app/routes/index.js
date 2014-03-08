export default Em.Route.extend({
  beforeModel: function() {
    return this.transitionTo('alphabet-test');
  }
});
