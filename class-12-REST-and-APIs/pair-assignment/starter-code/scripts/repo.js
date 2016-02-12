(function(module) {
  var repos = {};

  repos.all = [];

  repos.createTables = function(callback) {
    webDB.execute( // create table for repos
      'CREATE TABLE IF NOT EXISTS repos(' +
        'id INTEGER PRIMARY KEY, ' +
        'name VARCHAR(255) NOT NULL, ' +
        'url VARCHAR(255) NOT NULL, ' +
        'update_date VARCHAR(255) NOT NULL, ' +
        'contents_url TEXT NOT NULL, ' +
        'ssh_url VARCHAR(255) NOT NULL);',
      function(result) {
        console.log('Successfully created repo table');
        webDB.execute( // create table for files
          'CREATE TABLE IF NOT EXISTS repo_files(' +
            'id INTEGER PRIMARY KEY, ' +
            'repo_id INTEGER, ' +
            'file_name VARCHAR(255), ' +
            'download_url VARCHAR(255));',
          function(result) {
            console.log('Successfully created repo_files table');
            if (callback) callback();
          }
        );
      }
    );
  };


  repos.requestRepos = function(callback) {
    // TODO: How would you like to fetch your repos? Don't forget to call the callback.
    $.get('https://api.github.com/users/haanj/repos', function(data){
      console.log(data);


    });
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
