'use strict';

formsAngular.factory('SubmissionsService', ['$http', function ($http) {
  /*
   generate a query string for a filtered and paginated query for submissions.
   options consists of the following:
   {
   aggregate - whether or not to aggregate results (http://docs.mongodb.org/manual/aggregation/)
   find - find parameter
   limit - limit results to this number of records
   skip - skip this number of records before returning results
   order - sort order
   }
   */
  var generateListQuery = function (options) {
    var queryString = '';

    var addParameter = function (param, value) {
      if (value && value !== '') {
          if (typeof value === 'object') {
              value = JSON.stringify(value);
          }
          if (queryString === '') {
              queryString = '?';
          } else {
              queryString += '&';
          }
        queryString += param + '=' + value;
      }
    };

    addParameter('q', options.query);
    addParameter('l', options.limit);
    addParameter('f', options.find);
    addParameter('a', options.aggregate);
    addParameter('o', options.order);
    addParameter('s', options.skip);
    addParameter('format', options.format);

    return queryString;
  };

  return {
    getListAttributes: function (ref, id) {
      return $http.get('/api/' + ref + '/' + id + '/list');
    },
    readRecord: function (modelName, id) {
      return $http.get('/api/' + modelName + '/' + id);
    },
    getAll: function (modelName) {
      return $http.get('/api/' + modelName, {cache: true});
    },
    getPagedAndFilteredList: function (modelName, options) {
      return $http.get('/api/' + modelName + generateListQuery(options));
    },
    searchModelPagedAndFilteredList: function (modelName, needle, options) {
      options = _.extend(options, {query: needle});
      return $http.get('/api/search/' + modelName + generateListQuery(options));
    },
    searchPagedAndFilteredList: function (needle, options) {
      options = _.extend(options, {query: needle});
      return $http.get('/api/search' + generateListQuery(options));
    },
    deleteRecord: function (model, id) {
      return $http.delete('/api/' + model + '/' + id);
    },
    updateRecord: function (modelName, id, dataToSave) {
      return $http.post('/api/' + modelName + '/' + id, dataToSave);
    },
    createRecord: function (modelName, dataToSave) {
      return $http.post('/api/' + modelName, dataToSave);
    }

  };
}]);
