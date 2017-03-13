/*
 * Copyright (C) 2014-2017 Andrea Feccomandi
 *
 * Licensed under the terms of GNU GPL License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.gnu.org/licenses/gpl-2.0.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY.
 * See the GNU General Public License for more details.
 *
 */

angular.module('bibiscoApp').service('ProjectDbService', function(
  BibiscoDbService, LoggerService) {
  'use strict';

  var remote = require('electron').remote;
  var projectdbproxy = remote.getGlobal('projectdbproxy');
  var projectdb;

  return {
    createProjectDb: function(projectToCreate) {

      LoggerService.debug('Start ProjectDbService.createProjectDb...');

      projectdb = projectdbproxy.createProjectDb(projectToCreate.id,
        BibiscoDbService.getProperty(
          'projectsDirectory'));

      var project = projectdb.addCollection('project');
      project.insert(projectToCreate);

      projectdb.addCollection('premise');
      projectdb.addCollection('fabula');
      projectdb.addCollection('setting');
      projectdb.addCollection('strands');
      projectdb.addCollection('chapters');
      projectdb.addCollection('scenes');
      projectdb.addCollection('characters');
      projectdb.addCollection('locations');

      LoggerService.debug('End ProjectDbService.createProjectDb...');
    },
    saveDatabase: function(callback) {
      return projectdb.saveDatabase(callback);
    }
  };
});