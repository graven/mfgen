'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('StepsController', function StepsController($scope) {
  	$scope.steps = [
  		{
  			name: "provision",
  			phase: "provision",
  			action: "provisionVms",
  			parameters: { role: "app" }
  		},
  		{
  			name: "install-java",
  			phase: "install",
  			precedingPhases: "provision",
  			action: "chefrun",
  			parameters: { role: "app", runList: "java" }
  		},
  		{
  			name: "deploy-code",
  			phase: "deploy",
  			precedingPhases: "install",
  			action: "execrun",
  			parameters: { command: "rm -rf /" }
  		}
  	]

  	$scope.setCurrentStep = function(step) {
      $scope.currentStep = step;
    }

    $scope.addEmptyStep = function() {
    	var newStep = {name: "new", action: "nothing"}
      $scope.steps.push(newStep)
      $scope.currentStep = newStep;
    }

    $scope.assemblePhases = function() {
    	return $scope.steps.map(function(step) { return step.phase } )
    }
  });