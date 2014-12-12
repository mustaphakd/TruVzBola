/*///<reference path="C:\S\Javascript_DS_LIBS\jaydata.d.ts" />*/

var appservices = angular.module('appServices',[]);

appservices.service('repositoryService', [ "$data", "$q", function($data, $q){

    var x=$data.Entity.extend("country",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            geometry:{type: "string"},
            provinces:{type: Array, elementType:"province", inverseProperty:"country"}
        });

    $data.Entity.extend("province",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            geometry:{type: "string"},
            country:{ type: "country", required: true, inverseProperty: "provinces"},
            countryId:{type: "int", required: true}
        });

    $data.Entity.extend("disease",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            description:{type: "string"}
        });

    $data.Entity.extend("hotline",
        {
            id: {type: "int", key:true, computed: true},
            description: {type: "string", required: true},
            province:{type: "province"},
            country:{type: "country"},
            contact: {type: "string", required: true},
            countryId:{type: "int", required: true},
            provinceId:{type: "int", required: true}
        });

    $data.Entity.extend("note",
        {
            id: {type: "int", key:true, computed: true},
            detail: {type: String, required: true},
            quand:{type: Date},
            dcase:{type:"dcase", required: true, inverseProperty:"notes"},
            dcaseId:{type: "int", required: true}
        });

    $data.Entity.extend("medsite",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            province:{ type: "province", required: true},
            location:{type:"gpslocation"},
            detail: {type: String, required: true},
            country:{ type: "country", required: true},
            countryId:{type: "int", required: true},
            provinceId:{type: "int", required: true}
        });

    $data.Entity.extend("gpslocation",
        {
            id: {type: "int", key:true, computed: true},
            lat:{type: String, required : true},
            long: {type: String, required: true}
        }
    );

    $data.Entity.extend("dcase",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            diseaseType:{type: "disease", required: true},
            province:{ type: "province", required: true},
            location:{type:"gpslocation"},
            initiallyReported:{type: Date},
            dateConfirmed:{type: Date},
            notes:{type: Array, elementType: "note", inverseProperty:"dcase"},
            country: {type: "country", required: true},
            countryId:{type: "int", required: true},
            provinceId:{type: "int", required: true}
        });

    /**************************************************************************************************/


    $data.EntityContext.extend("CDMDatabase",
        {
            Countries: {type: $data.EntitySet, elementType: country},
            Provinces: {type: $data.EntitySet, elementType: province},
            Diseases: {type: $data.EntitySet, elementType: disease},
            Hotlines: {type: $data.EntitySet, elementType: hotline},
            Notes: {type: $data.EntitySet, elementType: note},
            MedSites: {type: $data.EntitySet, elementType: medsite},
            Locations: {type: $data.EntitySet, elementType: gpslocation},
            Cases: {type: $data.EntitySet, elementType: dcase}
        });

    this.Db = new CDMDatabase({ provider: 'indexedDb', databaseName:'DiseaseMonitoringDb', version: 1.1 });

    /* debug version

     this.Db = new CDMDatabase({ provider: 'indexedDb', databaseName:'DiseaseMonitoringDb', dbCreation: $data.storageProviders.DbCreationType.DropTableIfChanged, version: 1 });

     DropTableIfChanged: The IndexedDB database is dropped if it exists but JayData detects any change (added, removed or modified) in the key properties of the data model. This behavior is different for WebSQL - WebSQL DB is dropped if JayData detects any change in the data model.
     DropAllExistingTables: This option is primarily useful for testing, it recreates the datastore from scratch each time the program is run.
     */

    /*this.Db .onReady(function() {
        DB1.People.add({ Name: 'Jay Data'});
        DB1.saveChanges();
    });*/
}]);

appservices.factory('medService', [ "$location", "$q" , function ( $location, $q) {
    var service = {};
    //debugger;


    return service;

}]);


appservices.factory('securityService', [ "$location", "$q" , function ( $location, $q) {
    var service = {};
    //debugger;


    return service;

}]);

appservices.factory('hotSpotService', [  "$location", "$q" , function ( $location, $q) {
    var service = {};
    //debugger;


    return service;

}]);

appservices.factory('infomationService', [  "$location", "$q", "$timeout" , function ( $location, $q, $timeout) {
    var service = {};
    service.timeoutTkn = null;

    service.FetchInfos = function(){
        var deferred = $q.defer();

        service.timeoutTkn = $timeout(function(){
            $timeout.cancel(service.timeoutTkn);
            deferred.reject("Error man!");
        }, 100);



        return deferred.promise;
    }
    //debugger;

    service.InsertInfos = function(info){
        var deferred = $q.defer;



        return deferred.promise;
    }


    return service;

}]);

//mapLevels: country, province, department, city
appservices.factory('regionService', [  "$location", "$q" , "repositoryService","$data", function ( $location, $q, repositoryService, $data) {
    var service = {};

    service.addNewCountry = function(newItem){
        var newDeferredCountry = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            repos.Countries.add({ name: newItem.name, geometry: newItem.coord});
            repos.saveChanges();
            var geom = JSON.parse( newItem.coord);
            var obj = { "type": "Feature", "properties": { }, "geometry": geom};
            obj.properties.country = newItem.name;

            newDeferredCountry.resolve(obj);
            geom = null;
            obj = null;
        });

        return newDeferredCountry.promise;
    }

    service.getCountries = function(){
        var newDeferredCountry = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            //format data
            var jData = [];
            var data = repos.Countries.forEach(function(country){
                var temp = JSON.parse(country.geometry);
                var obj = { "type": "Feature", "properties": { }, "geometry": temp};
                obj.properties.label = country.name;
                obj.properties.id = country.id;
                obj.properties.mapLevel = "country";
                jData.push(obj);

            }).then(function(){

               // var collection = {type: "FeatureCollection", features: jData}; // GeoJSON
                //var topology = topojson.topology({collection: collection},{"property-transform":function(object){return object.properties;}}); // convert to TopoJSON preserving  properties info
               // console.log(topology.objects.collection); // inspect TopoJSON

                newDeferredCountry.resolve([{
                                  type:        'path',
                                  objects:     jData
                                }]);
            });
        });

        return newDeferredCountry.promise;
    }

    service.exportCountries = function(){
        var exportCountryDeffered = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            //format data
            var jData = [];
            var data = repos.Countries.forEach(function(country){
                var cntry = country;
                jData.push(cntry);
                cntry = null;
            }).then(function(){
                exportCountryDeffered.resolve(jData);
                jData = [];
            });
        });

        return exportCountryDeffered.promise;
    }

    service.importCountries = function(countriesString){

        var importtCountryDeffered = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            var cntryArr = JSON.parse(countriesString);

            if(angular.isArray(cntryArr))
            {
                cntryArr.forEach(function(elem, idx, arr){
                    repos.Countries.add({ name: elem.name, geometry: elem.geometry});

                });
            }
            repos.saveChanges();
            cntryArr = [];
            cntryArr = null;
            importtCountryDeffered.resolve("done!");
        });

        return importtCountryDeffered.promise;
    }

    service.getProvinces = function(countryIdVal){
        var newDeferredCountry = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            //format data
            var jData = [];

           repos.Provinces.forEach(function(province){

               if(province.countryId == countryIdVal)
               {
                   var temp = JSON.parse(province.geometry);
                   var obj = { "type": "Feature", "properties": { }, "geometry": temp};
                   obj.properties.label = province.name;
                   obj.properties.id = province.id;
                   obj.properties.mapLevel = "province";

                   jData.push(obj);
               }
           }).then(function(){
               newDeferredCountry.resolve([{
                   type:        'path',
                   objects:     jData
               }]);
           });
        });

        return newDeferredCountry.promise;
    }

    service.addNewProvince = function(countryIdVal, newItem){
        var newDeferredCountry = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {

            repos.Countries.single(function(country){
                return  country.id == this.countryId
            }, {countryId : countryIdVal})
                .then(function(foundCountry){
                    repos.Countries.attach(foundCountry);
                    var prov = new province({ name: newItem.name, geometry: newItem.coord});
                    prov.country = foundCountry;
                    prov.countryId = foundCountry.id;

                    repos.Provinces.add(prov);
                    repos.saveChanges();

                    var temp = JSON.parse(newItem.coord);
                    var obj = { "type": "Feature", "properties": { }, "geometry": temp};
                    obj.properties.label = newItem.name;
                    obj.properties.id = newItem.id;
                    obj.properties.mapLevel = "province";


                    newDeferredCountry.resolve(obj);

                });
        });

        return newDeferredCountry.promise;
    }

    return service;

}]);