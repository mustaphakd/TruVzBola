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
            country:{ type: "country", required: true, inverseProperty: "provinces"}
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
            contact: {type: "string", required: true}
        });

    $data.Entity.extend("note",
        {
            id: {type: "int", key:true, computed: true},
            detail: {type: String, required: true},
            quand:{type: Date},
            dcase:{type:"dcase", required: true, inverseProperty:"notes"}
        });

    $data.Entity.extend("medsite",
        {
            id: {type: "int", key:true, computed: true},
            name: {type: "string", required: true},
            province:{ type: "province", required: true},
            location:{type:"gpslocation"},
            detail: {type: String, required: true}
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
            notes:{type: Array, elementType: "note", inverseProperty:"dcase"}
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

    this.Db = new CDMDatabase({ provider: 'indexedDb', databaseName:'DiseaseMonitoringDb', version: 1 });

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

appservices.factory('regionService', [  "$location", "$q" , "repositoryService", function ( $location, $q, repositoryService) {
    var service = {};

    service.addNewCountry = function(newItem){
        var newDeferredCountry = $q.defer();

        var repos = repositoryService.Db;

        repos.onReady(function() {
            repos.Countries.add({ name: newItem.name, geometry: newItem.coord});
            repos.saveChanges();
            newDeferredCountry.resolve(null);
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
                debugger;

                // id, data, type: "map"
                var temp = JSON.parse(country.geometry);

               /* try{
                    temp = JSON.parse(country.geometry).coordinates['0'];
                }
                catch(ex){
                    temp = JSON.parse(country.geometry).coordinates;
                }*/


               /*  var obj = {
                    id: country.id,
                    type: 'path'  ,
                    /* objects: {
                        "type": "Feature",
                         "id" : country.id,
                         "properties": { "name": "Alabama" },
                        "geometry": [

                        ]
                    }*/
                    // "geometry": JSON.parse(country.geometry)temp  //{"type": "Polygon", "coordinates": temp.coordinates}
                    //objects: country.geometry
                    //objects: JSON.parse(country.geometry)"type": "Polygon", "coordinates":
                   // objects: temp
                  /*  objects:  [

                    ]
                }*/



                jData.push(obj);

            }).then(function(){
                debugger;
                //newDeferredCountry.resolve(jData);

                var collection = {type: "FeatureCollection", features: jData}; // GeoJSON
                var topology = topojson.topology({collection: collection},{"property-transform":function(object){return object.properties;}}); // convert to TopoJSON preserving  properties info
                console.log(topology.objects.collection); // inspect TopoJSON


                debugger;
                newDeferredCountry.resolve([{
                                  type:        'path',
                                  objects:     topojson.feature(map, map.objects.russia).features
                                }]);
            });
        });

        return newDeferredCountry.promise;
    }


    return service;

}]);