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

  repos.truncateTable = function() {
    webDB.execute(
      'DELETE FROM repos;'
    );
    webDB.execute(
      'DELETE FROM repo_files;'
    );
  };

  repos.loadAll = function(rows) {
    repos.all = rows.forEach(function(ele) {
      console.log(ele);
    });
  };


  repos.requestRepos = function(callback) {
    // TODO: How would you like to fetch your repos? Don't forget to call the callback.
    webDB.execute('SELECT * FROM repos ORDER BY update_date DESC', function(rows) {
      if (rows.length) {
        /*
        Article.loadAll(rows);
        callback();
        */

      } else {
        $.get('https://api.github.com/users/haanj/repos', function(rawData){
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            console.log(item);
            webDB.execute(
              [
                {
                  'sql': 'INSERT INTO repos (name, url, update_date, contents_url, ssh_url) VALUES (?, ?, ?, ?, ?);',
                  'data': [item.name, item.url, item.updated_at, item.contents_url, item.ssh_url]
                }
              ]
            );
          });
          webDB.execute('SELECT * FROM repos ORDER BY update_date DESC', function(rows) {
            console.log(rows);
          });
        });
      }
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
