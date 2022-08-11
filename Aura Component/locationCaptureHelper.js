({
    findGeolocation : function(component, event) {
      
        //finds the geolocation of the user's device
       if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
            function success(position) {
                var lat = position.coords.latitude;
                component.set("v.latitude", lat);
                var lng = position.coords.longitude;
                component.set("v.longitude", lng);
                console.log(lat, lng)
                var taskId = component.get("v.recordId");
        //pointer to Apex method in GeolocationController
        var action = component.get("c.updateGeolocation");
        //set parameters for Apex method updateGeolocation
        action.setParams({
            "taskId" : taskId,
            "lat" : component.get("v.latitude"),
            "lng" : component.get("v.longitude")
        });
        //set callback method
        action.setCallback(this, function(response) {
            var state = response.getState(); //fetch the response state
            if (state === "SUCCESS") {
                 var toastEvent = $A.get("e.force:showToast");
                 toastEvent.setParams({
                 title: "Success!",
                 type: 'success',
                 message: "Geolocation saved."
                   });
                   toastEvent.fire();
                 $A.get("e.force:closeQuickAction").fire();
                $A.get('e.force:refreshView').fire();
            }
            else {
                alert("Geolocation not saved.");
                $A.get("e.force:closeQuickAction").fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
        
            }
        } else {
            
            error('Geolocation is not supported');
        }
    }

})
