angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/templates/math_test.html","\n<div ng-controller=\"MathTestCtrl\">\n    <h1>Тестування знань з математики</h1>\n\n    <form name=\"testform\" class=\"panel panel-default\" novalidate ng-submit=\"testform.$valid && onSubmit()\">\n        <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Порахуйте результат прикладу</h3>\n        </div>\n        <div class=\"panel-body text-center\">\n            <div class=\"alert alert-warning\" role=\"alert\" ng-show=\"example===null\">Для продовження потрібно вибрати хоча б одну математичну операцію в \"Налаштуваннях\"</div>\n            <code >{{example.question}}</code>\n        </div>\n        <div class=\"panel-footer\">\n            <div class=\"form-group\" ng-class=\"{\'has-error\': testform.userResult.$error.pattern, \'has-warning\': testform.userResult.$error.required, \'has-success\': testform.userResult.$valid}\">\n                <label class=\"control-label\" for=\"userResult\">Відповідь: </label>\n                <input type=\"text\" ng-model=\"userResult\" id=\"userResult\" name=\"userResult\" required ng-pattern=\"/^[0-9]{1,7}$/\" placeholder=\"Введіть результат\" autofocus=\"\">               \n                <input type=\"submit\" class=\"btn btn-primary pull-right btn-sm\" value=\"Перевірити\">\n            </div>  \n             <div class=\"text-danger\" ng-show=\"testform.userResult.$error.pattern\">Підказка: вводьте тільки додаткові цілі числа</div>\n        </div>\n    </form>\n\n\n    <div role=\"tabpanel\">\n\n        <!-- Nav tabs -->\n        <ul class=\"nav nav-tabs\" role=\"tablist\">\n            <li role=\"presentation\" class=\"active\" ><a href=\"#test\" aria-controls=\"test\" role=\"tab\" data-toggle=\"tab\">Перевірка</a></li>\n            <li role=\"presentation\"><a href=\"#options\" aria-controls=\"options\" role=\"tab\" data-toggle=\"tab\">Налаштування</a></li>            \n        </ul>\n\n        <!-- Tab panes -->\n        <div class=\"tab-content\">\n            <div role=\"tabpanel\" class=\"tab-pane fade in active\" id=\"test\">\n                <p>Результати:</p>\n                <ul class=\"list-inline\">\n                    <li class=\"text-success\">\n                        Правильні відповіді <span class=\"badge\">{{results.correct}}</span>\n                    </li>\n                    <li class=\"text-danger\">\n                        Неправильні відповіді <span class=\"badge\">{{results.wrong}}</span>\n                    </li>\n                </ul> \n            </div>\n            <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"options\">\n                <p>Виберіть типи завдань для тестування:</p>\n                <ul class=\"list-unstyled\">\n                    <li ng-repeat=\"operation in operations\">\n                        <label >\n                            <input type=\"checkbox\" ng-model=\"operation.use\" ng-change=\"loadNextExample()\"> {{operation.name}}\n                        </label>\n                    </li>\n                </ul> \n            </div>            \n        </div>\n\n    </div>\n\n</div>\n\n\n");
$templateCache.put("/templates/old.html","\n<form ng-app=\"trainingPlan\" ng-controller=\"TrainingPlanCtrl\" class=\"training-plan-for-endurance\">\n    <p>\n        <label for=\"training-plan-sport\">Вид спорту:</label>                  \n        <select ng-model=\"sport\" ng-options=\"sport as sport.name for sport in sports\" id=\"training-plan-sport\"></select>\n    </p>\n    <p>\n        <label for=\"training-plan-summary\">Сумарний річний об’єм тренувань, годин чи хвилин:</label> <input type=\"number\" ng-model=\"summary\" id=\"training-plan-summary\"/>\n        <span class=\'training-plan-export\'>\n            <span>Експорт в:</span>\n            <a download=\"training_plan.xls\"  href=\"#\" onclick=\"return ExcellentExport.excel(this, \'training-plan-table\', \'Training plan\');\">Excel</a>\n            <a download=\"training_plan.csv\"  href=\"#\" onclick=\"return ExcellentExport.csv(this, \'training-plan-table\');\">CSV</a>\n        </span>\n    </p>   \n    <table id=\'training-plan-table\'>\n        <thead>\n            <tr>\n                <th>4-тижневий цикл</th>\n                <th ng-repeat=\"stage in sport.stages\" colspan=\"{{stage.weeks.length}}\">{{$index + 1}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Етап підготовки</td>\n                <td ng-repeat=\"stage in sport.stages\" colspan=\"{{stage.weeks.length}}\">{{stage.name}}</td>\n            </tr>\n            <tr>\n                <td>% річного циклу</td>\n                <td ng-repeat=\"stage in sport.stages\" colspan=\"{{stage.weeks.length}}\">{{stage.percentOfSummary}}</td>\n            </tr>\n            <tr>\n                <td>Об’єм циклу</td>\n                <td ng-repeat=\"stage in sport.stages\" colspan=\"{{stage.weeks.length}}\">{{summary * stage.percentOfSummary / 100| number : 1}}</td>\n            </tr>\n            <tr>\n                <td>Тиждень</td>\n                <td ng-repeat=\"stage in sport.stages| flattenWeeks\">{{$index + 1}}</td>\n            </tr>\n            <tr>\n                <td>Періодизація (% від обєму 4-тижневого циклу)</td>\n                <td ng-repeat=\"stage in sport.stages| flattenWeeks\">{{stage.periodization}}</td>\n            </tr>\n            <tr style=\"color: #3276b1\">\n                <td>Тижневий об’єм</td>\n                <td ng-repeat=\"stage in sport.stages| flattenWeeks\">{{summary * stage.parent.percentOfSummary * stage.periodization / 10000| number : 1}}</td>\n            </tr>\n\n            <tr>\n                <td colspan=\"{{sport.stages.length * sport.stages[0].weeks.length + 1}}\">&nbsp;</td>\n            </tr>\n\n            <tr>\n                <td colspan=\"{{sport.stages.length * sport.stages[0].weeks.length + 1}}\">Нижче: відсотковий розподіл тижневого об’єму між окремими тренувальними компонентами підготовки на кожному 4-тижневому циклі</td>\n            </tr>\n\n            <tr ng-repeat=\"component in components\">\n                <td>{{component.label}}</td>\n                <td ng-repeat=\"stage in sport.stages\" colspan=\"{{stage.weeks.length}}\">{{stage.componentPercents[component.name]}}</td>\n            </tr> \n\n            <tr>\n                <td colspan=\"{{sport.stages.length * sport.stages[0].weeks.length + 1}}\">&nbsp;</td>\n            </tr>\n\n            <tr>\n                <td colspan=\"{{sport.stages.length * sport.stages[0].weeks.length + 1}}\">Нижче: розподіл часу між різними видами діяльності (помножте тижневий об’єм тренувального компонента на відсоткову величину для конкретного виду діяльності)</td>\n            </tr>\n\n            <tr ng-repeat=\"component in components\">\n                <td>{{component.label}} <p ng-show=\"sport.showPartsFor[component.name] && part.componentPercents[component.name]\" ng-repeat=\"part in sport.parts\"  class=\"sport-part sport-part-label\">{{part.name}} {{part.componentPercents[component.name]}}%</p></td>\n                <td ng-repeat=\"stage in sport.stages| flattenWeeks\">                            \n                    {{summary * stage.parent.componentPercents[component.name] * stage.parent.percentOfSummary * stage.periodization / 1000000| number : 1}}\n                    <p ng-show=\"sport.showPartsFor[component.name] && part.componentPercents[component.name]\" ng-repeat=\"part in sport.parts\"  class=\"sport-part\">{{summary * part.componentPercents[component.name] * stage.parent.componentPercents[component.name] * stage.parent.percentOfSummary * stage.periodization / 100000000| number : 1}}</p>\n                </td> \n            </tr>\n        </tbody>\n    </table>\n</form>");}]);;
var app = angular.module('mathTestApp', ['templates'])
        .directive("mathTest", function () {
            return {
                restrict: "ECMA",
                templateUrl: "/templates/math_test.html"
            };
        });
;

app.controller('MathTestCtrl', function ($scope) {
    //all basic math operations
    $scope.operations = [
        {name: "Додавання", id: "+", use: true},
        {name: "Віднімання", id: "-", use: true},
        {name: "Множення", id: "*", use: true},
        {name: "Ділення", id: "/", use: true}
    ];

    $scope.userResult = null;

    $scope.results = {
        correct: 0,
        wrong: 0
    };

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
    
    
    $scope.loadNextExample = function(){
        $scope.example = $scope.generateExample($scope.operations);
        $scope.userResult = "";
        
    };
    
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

    $scope.loadNextExample();
});
