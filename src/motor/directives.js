var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('statusBar', [
    function () {
        //debugger;
        return {
            restrict: 'A',
            scope: {
                modelContent  :  '=ngModel',
                //showSpinner     :  '=',
                //onComplete       :  '&evtCompleted'
                onCloseRequest: '&closeRequest'
            },

            controller : function ($scope) {
                //debugger;

                $scope.show = (typeof $scope.show === 'undefined') ? true : $scope.show;
                $scope.content = (typeof $scope.modelContent === 'undefined') ? "" : $scope.modelContent;
                $scope.updateHandler = null;
                $scope.attRemoved = false;
                $scope.cache = null;
                $scope.showSpinner = (typeof $scope.showSpinner === 'undefined') ? true : $scope.showSpinner;


                $scope.$watch(function(){return $scope.modelContent}, function(newValue, oldValue) {
                   // debugger;
                    if (oldValue != newValue)
                        if($scope.updateHandler != null)
                        $scope.updateHandler(newValue);
                });
            },

            template: '<button type="button" class="close" data-ng-click="onCloseRequest()" ><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> ' +
            '<strong><i class="fa fa-bolt fa-2x"></i></strong> {{content}}',

           // terminal: true,

            compile: function () {
                //debugger;
                return {
                    pre: function (scope, element, attributes) {
                        //debugger;
                        if(!scope.attRemoved) {

                            scope.attRemoved = true;
                           $(element).removeAttr("status-bar");
                          $(element).addClass("alert alert-info statusBar alert-dismissible").attr("role", "alert");
                            //.attr("ng-show", "{{show}}");

                            //angular.element(element).injector().get('$compile')(element)(scope);
                        }
                    },
                    post: function (scope, element, attributes, controller) {
                         //debugger;

                       //scope.cache = element;

                        /* scope.closeAlert = function(){
                            debugger;
                            this.show = false;

                            angular.element(this.cache).injector().get('$compile')(this.cache)(this);

                            //this.$apply(); //function(){this.show = false;});

                        }*/

                        scope.updateHandler  = function(newContent){
                            scope.content = newContent;
                            scope.show = true;
                            scope.show = false;
                        };
                    }
                }
            }

        };
    }
]);

