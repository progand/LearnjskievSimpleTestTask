angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/math_test.html","\n<div ng-controller=\"MathTestCtrl\">\n    <h1>Тестування знань з математики</h1>\n\n    <form name=\"testform\" class=\"panel panel-default\" novalidate ng-submit=\"testform.$valid && onSubmit()\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Порахуйте результат прикладу</h3>\n        </div>\n        <div class=\"panel-body text-center\">\n            <div class=\"alert alert-warning\" role=\"alert\" ng-show=\"example===null\">Для продовження потрібно вибрати хоча б одну математичну операцію в \"Налаштуваннях\"</div>\n            <code >{{example.question}}</code>\n        </div>\n        <div class=\"panel-footer\">\n            <div class=\"form-group\" ng-class=\"{\'has-error\': testform.userResult.$error.pattern, \'has-warning\': testform.userResult.$error.required, \'has-success\': testform.userResult.$valid}\">\n                <label class=\"control-label\" for=\"userResult\">Відповідь: </label>\n                <input type=\"text\" ng-model=\"userResult\" id=\"userResult\" name=\"userResult\" required ng-pattern=\"/^[0-9]{1,7}$/\" placeholder=\"Введіть результат\" autofocus=\"\">               \n                <input type=\"submit\" class=\"btn btn-primary pull-right btn-sm\" value=\"Перевірити\">\n            </div>  \n             <div class=\"text-danger\" ng-show=\"testform.userResult.$error.pattern\">Підказка: вводьте тільки додаткові цілі числа</div>\n        </div>\n    </form>\n\n\n    <div role=\"tabpanel\">\n\n        <!-- Nav tabs -->\n        <ul class=\"nav nav-tabs\" role=\"tablist\">\n            <li role=\"presentation\" class=\"active\" ><a href=\"#test\" aria-controls=\"test\" role=\"tab\" data-toggle=\"tab\">Перевірка</a></li>\n            <li role=\"presentation\"><a href=\"#options\" aria-controls=\"options\" role=\"tab\" data-toggle=\"tab\">Налаштування</a></li>            \n        </ul>\n\n        <!-- Tab panes -->\n        <div class=\"tab-content\">\n            <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"test\">\n                <p>Результати:</p>\n                <ul class=\"list-inline\">\n                    <li class=\"text-success\">\n                        Правильні відповіді <span class=\"badge\">{{results.correct}}</span>\n                    </li>\n                    <li class=\"text-danger\">\n                        Неправильні відповіді <span class=\"badge\">{{results.wrong}}</span>\n                    </li>\n                </ul> \n            </div>\n            <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"options\">\n                <p>Виберіть типи завдань для тестування:</p>\n                <ul class=\"list-unstyled\">\n                    <li ng-repeat=\"operation in operations\">\n                        <label >\n                            <input type=\"checkbox\" ng-model=\"operation.use\" ng-change=\"loadNextExample()\"> {{operation.name}}\n                        </label>\n                    </li>\n                </ul> \n            </div>            \n        </div>\n\n    </div>\n\n</div>\n\n\n");}]);;
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
