(function(module) {
  var repoView = {};


  // DONE: How do you want to render a single repo as html? Return your filled in HTML template.
  var render = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());

    return template(repo);

  };

  // DONE: Private methods declared here live only within the scope of the wrapping IIFE.
  var ui = function() {
    var $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  // DONE: If all the data is loaded, we can prep the UI and render the repos.
  repoView.index = function() {
    ui();

    repos.all.forEach(function(ele) {
      var daysAgo = parseInt((new Date() - new Date(ele.update_date))/60/60/24/1000);
      ele.update_date = daysAgo;
      $('#about').append(render(ele));
    });

    // The jQuery `append` method lets us append an entire array of HTML elements at once,
    // So we can use a little FP to transform our data-set into DOM nodes:
    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };

  module.repoView = repoView;
})(window);
