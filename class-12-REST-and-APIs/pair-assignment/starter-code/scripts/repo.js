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
            'repo_name VARCHAR(255) NOT NULL, ' +
            'file_name VARCHAR(255) NOT NULL, ' +
            'download_url VARCHAR(255) NOT NULL);',
          function(result) {
            console.log('Successfully created repo_files table');
            if (callback) callback();
          }
        );
      }
    );
  };

  repos.dropTables = function(callback) {
    webDB.execute(
      'DROP TABLE IF EXISTS repos;'
    );
    webDB.execute(
      'DROP TABLE IF EXISTS repo_files;'
    );

    if (callback) callback();

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

            // Remove {+path} from contents_url
            item.contents_url = item.contents_url.replace('{+path}', '');

            webDB.execute(
              [
                {
                  'sql': 'INSERT INTO repos (name, url, update_date, contents_url, ssh_url) VALUES (?, ?, ?, ?, ?);',
                  'data': [item.name, item.url, item.updated_at, item.contents_url, item.ssh_url]
                }
              ]
            );

            repos.requestFiles(item.name, item.contents_url);
          });
        });
      }
    });
  };

/*
/////// $.ajax guide
repos.requestRepos = function(callback) {
  $.ajax({
    url: 'https://api.github.com/users/brookr/repos' +
          '?per_page=100' +
          '&sort=updated',
    type: 'GET',
    headers: { 'Authorization': 'token ' + githubToken },
    success: function(data, message, xhr) {
      repos.all = data;
    }
  }).done(callback);
};

*/
  repos.requestFiles = function(repoName, repoContentsUrl) {
    $.ajax({
      url: repoContentsUrl,
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken},
      success: function(rawData, message, xhr){
        console.log(rawData);
        rawData.forEach(function(item) {

          if (item.type !== 'dir') {
            console.log('Adding file: ' + item.name);
            webDB.execute(
              [
                {
                  'sql': 'INSERT INTO repo_files (file_name, repo_name, download_url) VALUES (?, ?, ?);',
                  'data': [item.name, repoName, item.download_url]
                }
              ]
            );
          } else {
            console.log('Adding folder: ' + item.name);
            repos.requestFiles(repoName, item._links.self);
          };
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
