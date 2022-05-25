var myApp = angular.module('myApp', []);

myApp.controller('TicTacToeController', function($scope) { 

    $scope.field=[
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];

    $scope.stepCounter = 0;
    $scope.currentPlayer = getSymbol($scope.stepCounter)
    $scope.winner = ' ';

    function isFree(x, y){
        return $scope.field[x][y] === ' ';
    }

    function getSymbol(step){
        return step % 2 ? 'X' : 'O'
    }

    function getWinner(){
        // if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[0][1] && $scope.field[0][1] === $scope.field[0][2]) console.log(1);
        // if($scope.field[1][0] !== ' ' && $scope.field[1][0] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[1][2]) console.log(2);
        // if($scope.field[2][0] !== ' ' && $scope.field[2][0] === $scope.field[2][1] && $scope.field[2][1] === $scope.field[2][2]) console.log(3);

        // if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[1][0] && $scope.field[1][0] === $scope.field[2][0]) console.log(4);
        // if($scope.field[0][1] !== ' ' && $scope.field[0][1] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][1]) console.log(5);
        // if($scope.field[0][2] !== ' ' && $scope.field[0][2] === $scope.field[1][2] && $scope.field[1][2] === $scope.field[2][2]) console.log(6);

        // if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][2]) console.log(7);
        // if($scope.field[0][2] !== ' ' && $scope.field[0][2] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][0]) console.log(8);

        if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[0][1] && $scope.field[0][1] === $scope.field[0][2]) return $scope.field[0][2]
        if($scope.field[1][0] !== ' ' && $scope.field[1][0] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[1][2]) return $scope.field[1][2]
        if($scope.field[2][0] !== ' ' && $scope.field[2][0] === $scope.field[2][1] && $scope.field[2][1] === $scope.field[2][2]) return $scope.field[2][2]
 
        if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[1][0] && $scope.field[1][0] === $scope.field[2][0]) return $scope.field[2][0]
        if($scope.field[0][1] !== ' ' && $scope.field[0][1] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][1]) return $scope.field[2][1]
        if($scope.field[0][2] !== ' ' && $scope.field[0][2] === $scope.field[1][2] && $scope.field[1][2] === $scope.field[2][2]) return $scope.field[2][2]

        if($scope.field[0][0] !== ' ' && $scope.field[0][0] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][2]) return $scope.field[2][2]
        if($scope.field[0][2] !== ' ' && $scope.field[0][2] === $scope.field[1][1] && $scope.field[1][1] === $scope.field[2][0]) return $scope.field[2][0]
        
        return ' '
    }

    $scope.registerStep = function(x, y){
        if(isFree(x, y)){
            $scope.field[x][y] = getSymbol($scope.stepCounter);
            $scope.stepCounter++;
            $scope.currentPlayer = getSymbol($scope.stepCounter);

            if($scope.stepCounter > 2){     //cheking winner
                $scope.winner = getWinner();
                if($scope.winner !== ' '){
                    console.log("Winner is recognised")
                    $('#winnerModal').modal('show')
                }
            }
        }
    }

    $scope.clearField = function(){
        $scope.stepCounter = 0;
        $scope.currentPlayer = getSymbol($scope.stepCounter);
        $scope.field = [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' ']
        ];
    }

    $('#winnerModal').on('hide.bs.modal', function (e) {
        $scope.clearField();
    })
});

