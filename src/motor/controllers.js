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

        $scope.showPopWindow = function(title, message, scrollbar){

            scrollbar = scrollbar || false;

            var ScreenWidth=window.screen.width;
            var ScreenHeight=window.screen.height;
            var movefromedge=0;
            placementx=(ScreenWidth/2)-((400)/2);
            placementy=(ScreenHeight/2)-((300+50)/2);
            WinPop=window.open("About:Blank","","width=400,height=300,toolbar=0,location=false,directories=false,status=0,scrollbars=" + scrollbar + ",menubar=0,resizable=0,left="+placementx+",top="+placementy+",scre enX="+placementx+",screenY="+placementy+",");
            var msg = "<strong>" + message + "</strong>";
            WinPop.document.write('<html>\n<head>\n<title>' + title + '</title>></head>\n<body>'+ msg +'</body></html>');

        }
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

appControllers.controller('regionController', ['$scope', '$routeParams', '$location', 'regionService', '$q', '$timeout', '$window', '$interval',
    function ($scope, $routeParams, $location, regionService , $q, $timeout, $window, $interval) {
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



    $scope.addViewModel.mapLevel = "country"; // can be country, province, department or city
    $scope.addViewModel.panelTitle = "New Country";
    $scope.addViewModel.placeholder = "Enter Country Name";
    $scope.addViewModel.popoverString ='Add new country';

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

    $scope.addViewModel.updateFormControls = function(){

        switch($scope.addViewModel.mapLevel)
        {
            case 'province':
                $scope.addViewModel.panelTitle = "New Province";
                $scope.addViewModel.placeholder = "Enter Province Name";
                $scope.addViewModel.popoverString ='Add new province';
                break;

            default :
                $scope.addViewModel.panelTitle = "New Country";
                $scope.addViewModel.placeholder = "Enter Country Name";
                $scope.addViewModel.popoverString ='Add new country';
                break;
        }
    }

    /*///////////////////////////////////////////***********************************/

        $scope.addViewModel.newCountryTempArr = [];

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
                //debugger;
                var parsed = JSON.parse($scope.addViewModel.newModel.coordinates);
                var striinged = JSON.stringify($scope.addViewModel.newModel.coordinates);
                coordinates = JSON.stringify(parsed);

            }

            switch($scope.addViewModel.mapLevel)
            {
                case 'province':
                    if($scope.addViewModel.selectedCountryId != null)
                    {
                        $scope.addViewModel.saveProvince({name: $scope.addViewModel.newModel.name, coord: coordinates || ""});
                    }
                break;

                default :
                    $scope.regionService.addNewCountry({name: $scope.addViewModel.newModel.name, coord: coordinates || ""}).then(
                        function(succeed){

                            $scope.addViewModel.setProcessing(false);
                            $scope.addViewModel.collapseAddNewCountry();

                            if( $scope.countries != null) {
                                //debugger;
                                var obj = succeed;
                                $scope.countries[0].objects.push(obj);

                                $scope.addViewModel.newCountryTempArr = [];
                                $scope.addViewModel.newCountryTempArr.push(obj);

                                //var cntryType = { type: "path", objects : $scope.addViewModel.newCountryTempArr};

                                $scope.updateMap(obj);
                                obj = null;
                            }
                            else
                            {
                                $scope.updateMap(null);
                            }

                        },
                        function(failMsg){
                            $scope.addViewModel.setProcessing(false);
                            $scope.addViewModel.collapseAddNewCountry();
                        }
                    );
                break;
            }

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

/************ province logic*************************************************************/
    $scope.addViewModel.selectedCountryId = null;
    $scope.addViewModel.prevSelectedCountryId = null;

    $scope.addViewModel.saveProvince = function(provinceData)
    {
        $scope.regionService.addNewProvince($scope.addViewModel.selectedCountryId, provinceData).then(
            function(succeed){

                $scope.addViewModel.setProcessing(false);
                $scope.addViewModel.collapseAddNewCountry();

                    var model = {
                        requiredAction :"viualAppend",
                        actualData: {
                            type:        'path',
                            objects:     []
                        }
                    };
                model.actualData.objects.push(succeed);


                    $scope.updateMap(model);


            },
            function(failMsg){
                $scope.addViewModel.setProcessing(false);
                $scope.addViewModel.collapseAddNewCountry();
            }
        );
    }
/*********************Map logic************************************************************************/
    $scope.countries = null;
    $scope.countriesTimeoutCancelToken = null;
    $scope.countriesUpdateTimeoutCancelToken = null;
    $scope.countriesPromese = null;
    $scope.getMap = function(parentEntity){

        var countriesPromese = $q.defer();

        if(parentEntity == undefined || parentEntity == null)
        {
            $scope.addViewModel.mapLevel = "country";
            $scope.addViewModel.selectedCountryId = null;
            $scope.addViewModel.updateFormControls();


        }
        else
        {
            if( (parentEntity.area != undefined  && parentEntity.area != null) &&
                (parentEntity.area.properties != undefined  && parentEntity.area.properties != null) &&
                (parentEntity.area.properties.mapLevel != undefined  && parentEntity.area.properties.mapLevel != null))
            {
                switch(parentEntity.area.properties.mapLevel  )
                {
                    case "country":
                        $scope.addViewModel.mapLevel = "province";
                    break;
                    case "province":
                        $scope.addViewModel.mapLevel = "department";
                    break;
                    case "department" :
                        $scope.addViewModel.mapLevel = "city";
                    break
                    default:
                        $scope.addViewModel.mapLevel = "country";
                        break;
                }

            }
        }

        switch($scope.addViewModel.mapLevel)
        {
            case 'province':
                $scope.addViewModel.selectedCountryId = parentEntity.area.properties.id;
                $scope.addViewModel.updateFormControls();
                $scope.regionService.getProvinces($scope.addViewModel.selectedCountryId).then(
                    function (data) {

                        data[0].getID = $scope.mapGetID;
                        countriesPromese.resolve(data);
                    }
                );
            break;

            case 'country' :
                $scope.addViewModel.updateFormControls();
                if($scope.countries == null) {
                    $scope.regionService.getCountries().then(
                        function (data) {

                            $scope.countries = data;
                            countriesPromese.resolve(data);
                        }
                    );
                }
                else {
                    if($scope.countriesTimeoutCancelToken != null)
                        $timeout.cancel($scope.countriesTimeoutCancelToken);

                    $scope.countriesTimeoutCancelToken= null;

                    $scope.countriesTimeoutCancelToken = $timeout(function(){
                        countriesPromese.resolve($scope.countries);
                        $timeout.cancel($scope.countriesTimeoutCancelToken);
                        $scope.countriesTimeoutCancelToken= null;
                    }, 5);
                }
            break;

            default:
                if($scope.countriesTimeoutCancelToken != null)
                    $timeout.cancel($scope.countriesTimeoutCancelToken);

                $scope.countriesTimeoutCancelToken= null;

                $scope.countriesTimeoutCancelToken = $timeout(function(){

                    var model = {
                        type: "path",
                        objects: [],
                        getID: $scope.mapGetID};

                    model.objects.push(parentEntity.area)

                    countriesPromese.resolve(model);
                    $timeout.cancel($scope.countriesTimeoutCancelToken);
                    $scope.countriesTimeoutCancelToken= null;
                }, 5);
            break;
        }
        return countriesPromese.promise;
    }
    $scope.countriesClass = "countriesClass";

    $scope.getMapUpdate = function(){
        if($scope.countriesPromese == null)
            $scope.countriesPromese = $q.defer();

        return $scope.countriesPromese.promise;
    }

    $scope.updateMap = function(newModel){

        if($scope.countriesPromese == null)
            return;

        var nwModel = newModel;

        if($scope.countriesUpdateTimeoutCancelToken != null)
            $timeout.cancel($scope.countriesUpdateTimeoutCancelToken);

        $scope.countriesPromese.notify(nwModel);
    }

    $scope.mapGetID = function(node){
        if((node != null && node != undefined) && (node.properties != undefined) && (node.properties.id != undefined))
        {
            node.id = node.properties.id;
            return node.properties.id;
        }
    }


        /****************************************************** Import Export Logic *******************/
        $scope.importExport = {};
        $scope.importExport.operationBeingProcessed = false;
        $scope.importExport.title = "";
        $scope.importExport.buttonTitle = "";
        $scope.importExport.data = null;
        $scope.importExport.dataPlaceHolder = "";
        $scope.importExport.canceled = false;
        $scope.importExport.opIE = "none";
        $scope.importExport.cancelButtonTitle = "Close";
        $scope.importExport.importTimeoutCancelToken = null;

        $scope.importExport.importEnabled = true; // true or false
        $scope.importExport.exportEnabled = true; // true or false

        $scope.importExport.cancelOperation = function(){

            $scope.importExport.canceled = true;

            if($scope.importExport.operationBeingProcessed == false) {
                $('.import-export-form-collapse').collapse('hide');

                $scope.importExport.enableImportExport(true);
                $scope.importExport.opIE = "none";
                $scope.importExport.cancelButtonTitle = "Close";
            }
            else {
                $scope.importExport.cancelButtonTitle = "Close";
                $scope.importExport.enableImportExport(false);
                $scope.importExport.operationBeingProcessed = false;

                switch($scope.importExport.opIE)
                {
                    case "imp":
                        $scope.importExport.title = "Import Countries & Provinces";
                        $scope.importExport.dataPlaceHolder = "Please paste the data to be imported!";
                        break;
                    case "exp" :
                        $scope.importExport.title = "Export Countries & Provinces";
                        $scope.importExport.dataPlaceHolder = "click the Export button to start processing the data base for export";
                        break;
                    default:
                        break;
                }

            }
        }

        $scope.importExport.completeOperation = function(){
            if( $scope.importExport.opIE == null)
            {
                return
            }
            $scope.importExport.canceled = false;
            switch( $scope.importExport.opIE)
            {
                case "imp":
                    $scope.importExport.cancelButtonTitle = "Cancel";
                    $scope.importExport.dataPlaceHolder = "Please wait while your pasted data is being imported!";
                    $scope.importExport.title = "Importing Countries & Provinces";

                    $scope.importExport.operationBeingProcessed = true;

                    var tempData = $scope.importExport.data;
                    $scope.importExport.data = "";

                    $timeout(function(){
                        $scope.regionService.importCountries(tempData).then(
                            function(successData){
                                $scope.importExport.cancelOperation();
                                tempData = "";
                                tempData = null;
                                $scope.importExport.$intervalCounter = 3;
                                $scope.importExport.importTimeoutCancelToken = $interval(function() {

                                    //if($scope.importExport.$intervalCounter == 0)
                                    //{
                                        $scope.countries = null;
                                        $scope.updateMap(null);
                                    //}
                                   // else
                                   // {
                                        //$scope.updateMap($scope.countries);
                                   // }


                                    $scope.importExport.$intervalCounter -- ;

                                    if($scope.importExport.$intervalCounter <= 0)
                                    {
                                        $timeout.cancel($scope.importExport.importTimeoutCancelToken);
                                        $scope.importExport.importTimeoutCancelToken = null;
                                    }
                                }, 2, 3);
                            },
                            function(errMsg){
                                tempData = "";
                                tempData = null;
                            }
                        );
                    }, 20);



                    $scope.importExport.operationBeingProcessed = true;
                    break;
                case "exp":
                    $scope.importExport.cancelButtonTitle = "Cancel";
                    $scope.importExport.title = "Exporting Countries & Provinces";
                    $scope.importExport.dataPlaceHolder = "Please wait while the database is being exported";

                    $scope.importExport.operationBeingProcessed = true;

                    $scope.regionService.exportCountries().then(
                        function(successData){
                            $scope.showPopWindow("Exported Data", JSON.stringify(successData));
                            $scope.importExport.cancelOperation();
                        },
                        function(errMsg){}
                    );

                    $scope.importExport.operationBeingProcessed = true;
                    break;
                default:
                    break;
            }
        }

        $scope.importExport.onImportClicked = function(){
            $scope.importExport.enableImportExport(false);

            $scope.importExport.title = "Import Countries & Provinces";
            $scope.importExport.buttonTitle = "Import";
            $scope.importExport.dataPlaceHolder = "Please paste the data to be imported!";

            $scope.importExport.opIE = "imp";
        }

        $scope.importExport.onExportClicked = function(){
            $scope.importExport.enableImportExport(false);

            $scope.importExport.title = "Export Countries & Provinces";
            $scope.importExport.buttonTitle = "Export";
            $scope.importExport.dataPlaceHolder = "click the Export button to start processing the data base for export";

            $scope.importExport.opIE = "exp";
        }

        $scope.importExport.enableImportExport = function(enabledState){
            $scope.importExport.importEnabled = enabledState; // true or false
            $scope.importExport.exportEnabled = enabledState;
        }

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