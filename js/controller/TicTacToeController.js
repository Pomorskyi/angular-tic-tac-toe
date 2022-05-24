var myApp = angular.module('myApp', []);
myApp.controller('TicTacToeController', function($scope) { 

    $scope.field=[
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];

    $scope.stepCounter = 0;

    function isFree(x, y){
        return $scope.field[x][y] === ' ';
    }

    $scope.registerStep = function(x, y){
        if(isFree(x, y)){
            $scope.field[x][y] = $scope.stepCounter % 2 ? 'X' : 'O';
            $scope.stepCounter++;
        }
    }

    $scope.clearField = function(){
        $scope.stepCounter = 0;
        $scope.field = [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' ']
        ];
    }
});