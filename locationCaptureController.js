({
    doInit : function(component, event, helper) {
       
        helper.findGeolocation(component, event, helper);
        console.log('doInit called');
        
    }
})
