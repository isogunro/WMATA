 $(function() {

      //When document loads populate drop-down     
      populateDD();

      //When the value in drop-down changes, grab the value of the metro station
      _("stations").addEventListener('change', function( event ){
        //alert("change detected");
        var StationCode = event.target.value;
       // alert("station code to pass: "+StationCode);
        var key='a52cddcb77d9463da82271d3cd9d1229';
        var url='https://api.wmata.com/Rail.svc/json/jStationParking?StationCode='+StationCode+"&api_key="+key;
        //console.log(url);

        $.ajax({
          url : url,
          dataType: 'JSON',
          headers: {
            api_key: key
          }
        }).then(function(resp) {
          console.log(resp);
          //alert(resp.StationsParking[0].Code)
          _("code").value = resp.StationsParking[0].AllDayParking.Code;
          _("notes").value = resp.StationsParking[0].AllDayParking.Notes;
          _("longTermTotalCount").value = resp.StationsParking[0].AllDayParking.TotalCount;
          _("riderCost").value = resp.StationsParking[0].AllDayParking.RiderCost;
          _("nonRiderCost").value = resp.StationsParking[0].AllDayParking.NonRiderCost;
          _("shortTermTotalCount").value = resp.StationsParking[0].ShortTermParking.TotalCount;          
          _("stParking").value = resp.StationsParking[0].ShortTermParking.Notes;          
          
          //console.dir(resp.StationsParking[0].Notes);
        })
      })
           /*{
  "StationsParking": [{
    "Code": "E08",
    "Notes": null,
    "AllDayParking": {
      "TotalCount": 1068,
      "RiderCost": 4.70,
      "NonRiderCost": 4.70
    },
    "ShortTermParking": {
      "TotalCount": 56,
      "Notes": "Parking available 8:30 AM - 2 AM, time limit 7 hours."
    }
  }]
} */ 
      //This function makes grabbing any id efficient.  No need to type 'document.getElementById()'. Too long.
      function _(id) {
        return document.getElementById(id);
      }

      //Used to populate the Stations drop down
      function populateDD(){

          var key='a52cddcb77d9463da82271d3cd9d1229';
          var url='https://api.wmata.com/Rail.svc/json/jStations';

         $.ajax({
            url : url,
            dataType: 'JSON',
            headers: {
              api_key: key
            }
          }).then(function(resp) {
            //Get all stations
            var Stations = resp.Stations;

              //Loop through each station and build drop down
              Stations.forEach(function(station){
                  var option = document.createElement('option');
                                                  
                    option.value = station.Code;
                    option.innerHTML = station.Name;
    
                _("stations").appendChild(option);          
              })
           })       
        }
    });


/*
{
    "Address": {
        "City": "Washington",
        "State": "DC",
        "Street": "607 13th St. NW",
        "Zip": "20005"
    },
    "Code": "A01",
    "Lat": 38.8983144732,
    "LineCode1": "RD",
    "LineCode2": null,
    "LineCode3": null,
    "LineCode4": null,
    "Lon": -77.0280779971,
    "Name": "Metro Center",
    "StationTogether1": "C01",
    "StationTogether2": ""
}

*/