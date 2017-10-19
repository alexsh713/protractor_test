



describe('validate_fields', function() {
  
  var ssidName = element(by.model('wifi.ap.data.SSID'));
  var maxAssocClients = element(by.model('wifi.ap.data.MaxAssociatedDevices'));
  var shapingButton = element(by.model('wifi.advancedAp.bandwidthRestrictedEnable'));
  var shapingField = element(by.model('wifi.ap.data.BandwidthRestricted'));
  var pskKey = element(by.model('wifi.ap.data.Security.PreSharedKey'));
  var wifi_basic = element(by.css('[ui-sref="wifi.common"]'));
  var EC = protractor.ExpectedConditions;

  function makeSSID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

   function wait(element) {
       browser.wait(function() {
            return element.isPresent()});
   };
  


  it('wifi_basic', function() {
    
    
    browser.get('http://192.168.0.1');
    browser.ignoreSynchronization=true;
    
    //wait for login form-----------------------------------
    browser.wait(function() {
        return element(by.model("fm.username")).isPresent()});

    browser.wait(function() {
        return element(by.model("password.value")).isPresent()});

    browser.wait(function() {
        return element(by.binding("btnLogin")).isPresent()});
    //---------------------------------------------------------

    
    //login to the router-----------------------------------
    element(by.model('fm.username')).sendKeys('admin');
    element(by.model('password.value')).sendKeys('1');
    element(by.binding('btnLogin')).click();
    //-----------------------------------------------------
    

    //set ssid names-------------------------------------
    function config_ssid(ssid_name) {
        element(by.model('wifi.ap.data.SSID')).clear();
        //element(by.model('wifi.ap.data.SSID')).sendKeys(ssid_name);
        element(by.buttonText('Apply')).click();
    };
    
    //----------------------------------------------------

    //wait for element
    var EC = protractor.ExpectedConditions;
    
    //search for wifi menu ---------------------------------------
    var wifi = element.all(by.repeater('menu in menuList')).filter(function(elem, index) {
        return elem.getText().then(function(text){
            return text == 'Wi-Fi';
        });
    }).click();
    

    //browser.wait(EC.visibilityOf(wifi), 5000);
    //wifi.click();
    //----------------------------------------------------------
    
    
    //click wifi->basic-----------------------------------------
    var wifi_basic = element(by.css('[ui-sref="wifi.common"]'));
    wifi_basic.click();
    //----------------------------------------------------------
    

   //wait for ssid 2.4 input and config it-------------------------
    browser.wait(function() {
      return element(by.model("wifi.ap.data.SSID")).isPresent()});

    config_ssid(makeSSID());
    var error = element(by.cssContainingText('.ng-binding', 'Field is mandatory'));
    //console.log(myElement.getText());
    browser.wait(EC.visibilityOf(error), 5000);
   
   //go to 5g ssid-------------------------------------------------------
    /*var wifi_5g = element.all(by.repeater('key in wifi.band.list')).get(1);
    browser.wait(EC.visibilityOf(wifi_5g), 40000);
    wifi_5g.click();*/
    //---------------------------------------------------------------------

   
    //config 5g ssid----------------------------------------------
    /*browser.wait(function() {
        return element(by.model("wifi.ap.data.SSID")).isPresent()});
    config_ssid('bungalo234234228-5g');*/
    //-------------------------------------------------------------

    
    
    

    
    //browser.sleep(10000);
    
  });
});


