var app = angular.module('mathTestApp', ['templates'])
        .directive("mathTest", function () {
            return {
                restrict: "ECMA",
                templateUrl: "/templates/math_test.html"
            };
        });


app.controller('MathTestCtrl', function ($scope) {
    //all basic math operations
    $scope.operations = [
        {name: "Додавання", id: "+", use: true},
        {name: "Віднімання", id: "-", use: true},
        {name: "Множення", id: "*", use: true},
        {name: "Ділення", id: "/", use: true}
    ];

    
    //Store for user input
    $scope.userResult = null;

    //contains number of correct and wrond answers
    $scope.results = {
        correct: 0,
        wrong: 0
    };

    //current example
    $scope.example = {
        question: "null",
        result: null
    };

    /**
     * Generates integer value within provided interval.
     * @param {type} min - Number, minimum of interval
     * @param {type} max - Number, maximum of interval
     * @returns {Number}
     */
    $scope.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    /**
     * Function generates new example. It generates {String} representation of question and correct result of evaluation.
     * @param {Array} operations - Array of all operations, selected and no
     * @returns {Object} - Object with 2 fields: {String} question and {Number} result 
     */
    $scope.generateExample = function (operations) {
        var allowedOperations, //operations was choosen
                nextOperationIndex, //index of our next math operation 
                nextOperation, //our next math operation object
                a, b, //operands
                result, //number - result of question
                question; //text to evaluate (like "2 + 2")
                
        //lets filter all operations and use selected only
        allowedOperations = jQuery.grep(operations, function (operation, index) {
            return operation.use ? operation : null;
        });
        
        //retutn if nothing was selected
        if(allowedOperations.length === 0){
            return null;
        }
        
        //randomly select operation index within allowed operations
        nextOperationIndex = $scope.getRandomInt(0, allowedOperations.length - 1);
        //and determine math operation for question
        nextOperation = allowedOperations[nextOperationIndex];

        //first of all lets generate second operand (second because of "/", see further)
        b = $scope.getRandomInt(1, 9);

        switch (nextOperation.id) {
            case "+":
                a = $scope.getRandomInt(1, 9);
                result = a + b;

                break;
            case "*":
                a = $scope.getRandomInt(1, 9);
                result = a * b;

                break;
            case "-":
                a = $scope.getRandomInt(1, 9);
                if (a < b) {//we need a >=b to have positive number as result
                    //then swap them
                    b = [a, a = b][0];
                }
                result = a - b;

                break;
            case "/":
                result = $scope.getRandomInt(1, 9);
                a = result * b;

                break;
        }
        
        question = [a, nextOperation.id, b].join(" ");

        return {
            question: question,
            result: result
        };        
    };
    
    /**
     * Function clears userResult and set up question
     * @returns {undefined}
     */
    $scope.loadNextExample = function(){
        $scope.example = $scope.generateExample($scope.operations);
        $scope.userResult = "";        
    };
    
    /**
     * Math tast form submit handler.
     * @returns {Boolean}
     */
    $scope.onSubmit = function(){
        var userResult = Number($scope.userResult);
        
        if(userResult === $scope.example.result){
            $scope.results.correct += 1;
        } else {
            $scope.results.wrong += 1;
        }
        $scope.loadNextExample();
        
        return false;
    };

    //set up an example on page loading
    $scope.loadNextExample();
});
