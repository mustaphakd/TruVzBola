var appControllers = angular.module('appControllers', []);

appControllers.controller('VideoListController', ['$scope', '$routeParams', '$location', 'medService', function ($scope, $routeParams, $location, videoService) {
    // debugger;
    $scope.medService = medService;
    $scope.$routeParams = $routeParams;

    $scope.NavigateTo = function (videoId) {
        //debugger;
        var pageId = $routeParams["pageId"];
        var vidId = videoId;
        var path = '/detail/' + vidId + '/page/' + pageId;
        $location.path(path);
    };

}]);

appControllers.controller('mainAppController',['$scope','$route', '$location','securityService', '$rootScope', '$modal',
    function($scope, $route, $location, securityService, $rootScope, $modal){

        $scope.$route = $route;
        $scope.$root = $rootScope;
        $scope.$country = null;
        $scope.$province = null;

        /***** Notication structs****/
        $scope.NotificationMessage = "zbonjopr";
        $scope.NotificationClass = "";  /*********to be used on status-bar ng-class to auto hide on click event*********/

        $scope.hideNotification = function(){
            $scope.NotificationClass = "hideNotice";
        }
        $scope.AnimHideNotification = function(){
            $scope.notify = false;
        }

        $scope.showNotification = function(msg){
            $scope.NotificationClass = "";
            $scope.NotificationMessage = msg;
            $scope.notify = true;
            //$scope.AnimHideNotification();
        }
        $scope.notify = true;

        /***** intro modal structs****/
        $scope.modalTitle = "";
        $scope.hasModalTitle = true;
        $scope.modalContent = "";
        $scope.modalshowCloseButton = true;

        $scope.showModal = function(title, content, hasTitle, showCloseButton){
            //debugger;

            hasTitle = (typeof hasTitle === "undefined") ? true : hasTitle;
            if(hasTitle)
            {
                $scope.modalTitle = title;
                $scope.modalContent = content;
            }
            else{
                $scope.modalContent = content;
            }

            showCloseButton = (typeof showCloseButton === "undefined") ? true : showCloseButton;

            var $modalInstance = $modal.open({
                templateUrl: 'views/modalTpl.html',
                //controller: 'ModalInstanceCtrl',
                scope: $scope
               /* resolve: {
                    modalTitle: function () {
                        return $scope.modalTitle;
                    },
                    modalContent: function () {
                        return $scope.modalContent;
                    },
                    hasModalTitle: function () {
                        return $scope.hasModalTitle;
                    }
                }*/
            });

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }

        /***** alert modal structs****/
        $scope.alert = function(msg){
            debugger;
            $scope.showModal("", msg, false, false);
        }

        debugger;
        $scope.$root.$on('$routeChangeStart', function(scope, next, current){
            //console.log('Changing from '+angular.toJson(current)+' to '+angular.toJson(next));
            if(next && next.$$route)
                $scope.showNotification('loading ' + next.$$route.originalPath) ;
        });

        $scope.$root.$on('$routeChangeSuccess', function(scope, next, current){
            //console.log('Changing from '+angular.toJson(current)+' to '+angular.toJson(next));
            if(next && next.$$route)
            {
                $scope.showNotification( 'done loading ' + next.$$route.originalPath);
                $scope.AnimHideNotification();
            }

        });

        $scope.$root.$on('$routeChangeError', function(scope, next, current){
            $scope.showNotification( 'Changing from '+angular.toJson(current)+' to '+angular.toJson(next));
        });
/*
        $scope.showModal("West Africa/Africa Center for Disease Monitoring", "This is a very simple demo app for " +
        "what is possible for a disease monitoring app for our region.  the actual app would be delivered as a web App " +
        "open to the public to see whats happening along with highly secured access control for allowed personnel.  we hope to also develop desktop app and mobile app" +
        " for real-time performance reasons and onsite auditing!", true, true);
*/
} ]);

appControllers.controller('hotspotsController', ['$scope', '$routeParams', '$location', 'hotSpotService', function ($scope, $routeParams, $location, hotSpotService) {
     debugger;
    $scope.hotSpotService = hotSpotService;
    $scope.$routeParams = $routeParams;
}]);

appControllers.controller('medcentersController', ['$scope', '$routeParams', '$location', 'medCentersService', function ($scope, $routeParams, $location, medCentersService) {
    debugger;
    $scope.medCentersService = medCentersService;
    $scope.$routeParams = $routeParams;
}]);

appControllers.controller('addMedcenterController', ['$scope', '$routeParams', '$location', 'addMedCenterService', function ($scope, $routeParams, $location, addMedCenterService) {
    debugger;
    $scope.addMedCenterService = addMedCenterService;
    $scope.$routeParams = $routeParams;
}]);

appControllers.controller('reportcaseController', ['$scope', '$routeParams', '$location', 'reportCaseService', function ($scope, $routeParams, $location, reportCaseService) {
    debugger;
    $scope.reportCaseService = reportCaseService;
    $scope.$routeParams = $routeParams;
}]);

appControllers.controller('addCaseController', ['$scope', '$routeParams', '$location', 'addCaseService', function ($scope, $routeParams, $location, addCaseService) {
     debugger;
    $scope.addCaseService = addCaseService;
    $scope.$routeParams = $routeParams;
}]);

appControllers.controller('regionController', ['$scope', '$routeParams', '$location', 'regionService', '$q', function ($scope, $routeParams, $location, regionService , $q) {
    // debugger;
    $scope.regionService = regionService;
    $scope.$routeParams = $routeParams;

    $scope.viewModel = "list";
    $scope.viewUrl = "views/region/list.html";

    $scope.addViewModel ={};
    $scope.addViewModel.isDisabled = false;
    $scope.addViewModel.openned = false;
    $scope.addViewModel.addTitle = " ";
    $scope.addViewModel.titlePlacement = "left";
    $scope.addViewModel.buttonsDivClass = "divBtn";

    /************************New Coontry********/
    $scope.addViewModel.newModel = {
        coordinates: "",
        name: "",
        isValid: false,
        processing: false
    };
    $scope.validation= {};
    $scope.validation.countryName = {
        errorClass: "",
        showError: false
    };

    /************************************************/

    $scope.addViewModel.addNewCountry = function(){
        $scope.addViewModel.newModel = {
            coordinates: "",
            name: "",
            isValid: false,
            processing: false
        };
        $scope.addViewModel.openned = true;
        $scope.addViewModel.isDisabled = true;

    }
    $scope.addViewModel.collapseAddNewCountry = function(){
        //alert();
        $scope.addViewModel.openned = false;
        $scope.addViewModel.isDisabled = false;

    }

    /********************** zto be deleted */
    $scope.addViewModel.showAddNewContry = function(){
        if($scope.addViewModel.openned == false)
        {
            $scope.addViewModel.addTitle = "Add New Country";
        }
        else
        {
            $scope.addViewModel.addTitle = " ";
        }
    }

    $scope.addViewModel.hideAddNewContry = function(){
            $scope.addViewModel.addTitle = " ";
    }

    /*///////////////////////////////////////////***********************************/

    $scope.addViewModel.setProcessing = function(enabled)
    {
        if(enabled)
        {
            $scope.addViewModel.newModel.processing = true;
            $scope.addViewModel.buttonsDivClass = "divBtnDisabled";
        }
        else{
            $scope.addViewModel.newModel.processing = false;
            $scope.addViewModel.buttonsDivClass = "divBtn";
        }
    }

    $scope.addViewModel.cancelcountry = function(){
        if($scope.addViewModel.newModel.processing)
            return;

        $scope.addViewModel.newModel.coordinates = "";
        $scope.addViewModel.newModel.name = "";

        $scope.clearNewCountryValidationErrors();
        $scope.addViewModel.collapseAddNewCountry();
        $scope.addViewModel.setProcessing(false);
    }

    $scope.addViewModel.savecountry = function(){
        if($scope.addViewModel.newModel.processing)
            return;
        $scope.clearNewCountryValidationErrors();
        $scope.validateNewCountryModel();

        if($scope.addViewModel.newModel.isValid == true)
        {
            $scope.addViewModel.setProcessing(true)
            //submit form lol!
            //disable all buttons

            var coordinates = null;
            if( $scope.addViewModel.newModel.coordinates.length > 0){
                debugger;
                var parsed = JSON.parse($scope.addViewModel.newModel.coordinates);
                var striinged = JSON.stringify($scope.addViewModel.newModel.coordinates);
                coordinates = JSON.stringify(parsed);

            }
            $scope.regionService.addNewCountry({name: $scope.addViewModel.newModel.name, coord: coordinates || ""}).then(
                function(succeed){
                    $scope.addViewModel.setProcessing(false);
                    $scope.addViewModel.collapseAddNewCountry();

                },
                function(failMsg){
                    $scope.addViewModel.setProcessing(false);
                    $scope.addViewModel.collapseAddNewCountry();
                }
            );
            //to be deleted
            //$scope.addViewModel.collapseAddNewCountry();
        }
    }

    $scope.validateNewCountryModel = function(){

        $scope.addViewModel.newModel.isValid = true;

        if( $scope.addViewModel.newModel.name.length < 1)
        {
            $scope.addViewModel.newModel.isValid = false;
            $scope.validation.countryName.errorClass = "has-error has-feedback";
            $scope.validation.countryName.showError = true;
        }
        else
        {
            $scope.addViewModel.newModel.isValid = true;
        }
    }

    $scope.clearNewCountryValidationErrors = function(){
        $scope.addViewModel.newModel.isValid = false;
        $scope.validation.countryName = {errorClass:"", showError:false};
    }
/*********************Map logic************************************************************************/

    $scope.getMap = function(){
        var prom = $q.defer();

        $scope.regionService.getCountries().then(
            function(data)
            {
                debugger;
                prom.resolve(data);
            }
        );


        return prom.promise;
    }
    $scope.countriesClass = "countriesClass";



}]);

appControllers.controller('infoController', ['$scope', '$routeParams', '$location', 'infomationService', function ($scope, $routeParams, $location, infomationService) {
     //debugger;
    $scope.infomationService = infomationService;
    $scope.$routeParams = $routeParams;
    $scope.countryFilter= "";
    $scope.infos = [];
    $scope.view = "Listing ...";
    $scope.viewModel = "list";
    $scope.viewUrl = "views/information/list.html";
    $scope.newModel = {
        provinceTitle : "Province",
        countryTitle: "Country",
        province: "",
        country: "",
        isValid:  false,
        description: "",
        contactInfo: ""
    };

    $scope.newModelWatcher = {
        province : "",
        country: ""
    };
    $scope.newModel.titleWatchers = null;
    $scope.validation = {};

    $scope.validation.description = {
        errorClass: "",
        showError: false
    };
    $scope.validation.contactInfo = {
        errorClass: "",
        showError: false
    };
    $scope.validation.country = {
        errorClass: "",
        showError: false
    };
    $scope.validation.province = {
        errorClass: "",
        showError: false
    };


    $scope.showNotification('loading the Information Hotlines module ... ' ) ;

    var prmise = $scope.infomationService.FetchInfos().then(function(data){

        },function(msg){
            $scope.showNotification(' Error loading data from infomationService.FetchInfos ' + msg , "error") ; //somw how inclue error notification
        },function(dataUpdate){

        }
    );

    $scope.$watch("viewModel", function(newVal, oldVal){
        if(newVal != oldVal)
        {
            switch(newVal)
            {
                case "list":
                        $scope.view = "Listing ...";
                        $scope.viewUrl = "views/information/list.html";
                    break;
                case "add":

                    if($scope.newModel.titleWatchers == null)
                    {
                        $scope.newModel.titleWatchers = $scope.$watch(function(){
                            //debugger;

                            if($scope.newModelWatcher.province != $scope.newModel.province)
                            {
                                //oldVal = $scope.newModelWatcher.province;
                                $scope.newModelWatcher.province = $scope.newModel.province;
                                return  {
                                    province : "",
                                    //province : $scope.newModel.province,
                                    country: $scope.newModelWatcher.country
                                };
                            }

                            if($scope.newModelWatcher.country != $scope.newModel.country) {
                                $scope.newModelWatcher.country = $scope.newModel.country;

                                return  {
                                    province : $scope.newModel.province,
                                    //country: $scope.newModelWatcher.country
                                    country: ""
                                };

                            }
                            return $scope.newModelWatcher;

                        }, function(newVal, oldVal){
                            debugger;
                            if(newVal.country != oldVal.country || newVal.province != oldVal.province)
                            {
                                $scope.newModel.provinceTitle = $scope.newModel.province.length > 0 ? $scope.newModel.province : "Province";
                                $scope.newModel.countryTitle = $scope.newModel.country.length > 0 ? $scope.newModel.country : "Country";
                            }

                        });
                    }
                    $scope.view = "Add new information."
                    $scope.viewUrl = "views/information/add.html";
                    break;
                case "map": $scope.view = "Map View";
                    break;
                default: break;
            }
        }
    });

    $scope.Save = function(){

        $scope.clearValidationErrors();
        $scope.validateNewModel();

        var desc = $scope.newModel.description ;
        var cntinfo = $scope.newModel.contactInfo ;
        var cntry = $scope.newModel.country ;
        var prvnce = $scope.newModel.province;

        if($scope.newModel.isValid == true)
        {
          //submit form lol!
        }
    }

    $scope.cancel = function(){
        $scope.newModel.description = "";
        $scope.newModel.contactInfo = "";
        $scope.newModel.country = "";
        $scope.newModel.province = "";
        $scope.newModel.provinceTitle = "Province";
        $scope.newModel.countryTitle = "Country";
        $scope.clearValidationErrors();
    }

    $scope.validateNewModel = function(){

        $scope.newModel.isValid = true;

        if( $scope.newModel.description.length < 1)
        {
            $scope.newModel.isValid = false;
            $scope.validation.description.errorClass = "has-error has-feedback";
            $scope.validation.description.showError = true;
        }
        if( $scope.newModel.contactInfo.length < 1)
        {
            $scope.newModel.isValid = false;
            $scope.validation.contactInfo.errorClass = "has-error has-feedback";
            $scope.validation.contactInfo.showError = true;
        }
        if( $scope.newModel.country.length < 1)
        {
            $scope.newModel.isValid = false;
            $scope.validation.country.errorClass = "has-error has-feedback";
            $scope.validation.country.showError = true;
        }
        if( $scope.newModel.province.length < 1)
        {
            $scope.newModel.isValid = false;
            $scope.validation.province.errorClass = "has-error has-feedback";
            $scope.validation.province.showError = true;
        }
    }

    $scope.clearValidationErrors = function(){
        $scope.newModel.isValid = false;
        $scope.validation.description.errorClass = "";
        $scope.validation.description.showError = false;

        $scope.validation.contactInfo = {errorClass:"", showError:""};
        $scope.validation.country = {errorClass:"", showError:""};
        $scope.validation.province = {errorClass:"", showError:""};
    }

}]);

///TODO: Add country and province views and controllers, add geometry type to fields: "polygon" or "multipolygon"*/