var myApp = angular.module('myApp', []);

myApp.controller('TicTacToeController', function($scope) { 
    $('#chooseTypeModal').modal({backdrop: 'static', keyboard: false})  
    $('#chooseTypeModal').modal('show')

    $scope.field=[
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];

    $scope.stepCounter = 0;
    $scope.currentPlayer = getSymbol($scope.stepCounter)
    $scope.winner = ' ';

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

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

    function computerGame(){
        switch($scope.firstPlaying){
            case 'computer':
                if($scope.stepCounter < 9){

                }else{
                    if(getWinner === ' '){
                        $scope.winner = 'noone! DRAW!';
                    }
                }
                break;
            case 'player':
                break;    
        }
    }

    $scope.registerStep = function(x, y){
        if(isFree(x, y)){
            $scope.field[x][y] = getSymbol($scope.stepCounter);
            $scope.stepCounter++;
            $scope.currentPlayer = getSymbol($scope.stepCounter);

            $scope.winner = getWinner();
            if($scope.stepCounter > 2){     //cheking winner
                if($scope.winner !== ' '){
                    $('#winnerModal').modal('show')
                }
            }
            if($scope.stepCounter === 9 && $scope.winner === ' '){
                $scope.winner = 'noone! DRAW!';
                $('#winnerModal').modal('show')
            }
        }
    }

    $scope.registerChoice = function(choice){
        $('#chooseTypeModal').modal('hide')
        
        $scope.userChoice = choice
        if(choice === 'computer'){
            $('#firstStepModal').modal({backdrop: 'static', keyboard: false})  
            $('#firstStepModal').modal('show')

            setTimeout(() => {
                $('#firstStepModalLongTitle').html('Cubes are rolling... 2')
                setTimeout(() => {
                    $('#firstStepModalLongTitle').html('Cubes are rolling... 1')
                    setTimeout(() => {
                        switch(getRandomInt(2)){
                            case 0:         //computer - first
                                $('#firstStepModalLongTitle').html('Computer is playing first!')
                                $scope.firstPlaying = 'computer'
                                break;
                            case 1:         //player - first
                                $('#firstStepModalLongTitle').html('You are playing first!')
                                $scope.firstPlaying = 'player'
                                break;
                        }
                        
                        setTimeout(() => {
                            computerGame()
                            $('#firstStepModal').modal('hide')
                        }, 3000)
                    }, 1000)
                }, 1000)
            }, 1000)
            
            
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

