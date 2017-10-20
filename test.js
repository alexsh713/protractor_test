



describe('validate_fields', function() {
  
  var ssidName = element(by.model('wifi.ap.data.SSID'));
  var maxAssocClients = element(by.model('wifi.ap.data.MaxAssociatedDevices'));
  var shapingButton = element(by.model('wifi.advancedAp.bandwidthRestrictedEnable'));
  var shapingField = element(by.model('wifi.ap.data.BandwidthRestricted'));
  var pskKey = element(by.model('wifi.ap.data.Security.PreSharedKey'));
  var wifi_basic = element(by.css('[ui-sref="wifi.common"]'));
  var wireless_mode = element(by.model('wifi.general.data.OperatingStandards'));
  var selectChannelAutomaticly = element(by.model('wifi.general.data.AutoChannelEnable'));
  var applyButton = element(by.binding('apply'));
  var channelList = element(by.css('[ng-click="!wifi.general.data.AutoChannelEnable && wifi.general.selectWifiChannel(wifi.band.state)"]'));
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

   function config_ssid(ssid_name) {
        ssidName.clear();
        ssidName.sendKeys(ssid_name);
        element(by.buttonText('Apply')).click();
    };

    function refresh() {
      browser.refresh();
      browser.switchTo().alert().then(function(alert) {
        alert.accept();
      });
    };
  
  /*beforeEach(function() {
    browser.get('http://192.168.0.1');
    browser.ignoreSynchronization=true;
    //wait for login form
    wait(element(by.model("fm.username")));
    wait(element(by.model("password.value")));
    wait(element(by.binding("btnLogin")));
    //login to the router
    element(by.model('fm.username')).sendKeys('admin');
    element(by.model('password.value')).sendKeys('1');
    element(by.binding('btnLogin')).click();
    //wifi menu
    var wifi = element.all(by.repeater('menu in menuList')).filter(function(elem, index) {
        return elem.getText().then(function(text){
            return text == 'Wi-Fi';
        });
    }).click();

    wifi_basic.click();


  });*/


  it('config_ssid', function() {
    browser.get('http://192.168.1.1');
    browser.ignoreSynchronization=true;
    //wait for login form
    wait(element(by.model("fm.username")));
    wait(element(by.model("password.value")));
    wait(element(by.binding("btnLogin")));
    //login to the router
    element(by.model('fm.username')).sendKeys('admin');
    element(by.model('password.value')).sendKeys('1');
    element(by.binding('btnLogin')).click();
    //wifi menu
    var wifi = element.all(by.repeater('menu in menuList')).filter(function(elem, index) {
        return elem.getText().then(function(text){
            return text == 'Wi-Fi';
        });
    }).click();

    wifi_basic.click();

   //wait for ssid 2.4 input and config it-------------------------
    
    wait(element(by.model("wifi.ap.data.SSID")));
    
    config_ssid(makeSSID());
    
    //var error = element(by.cssContainingText('.ng-binding', 'Field is mandatory'));
    //browser.wait(EC.visibilityOf(error), 5000);
   
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
  it('it should show error', function(){
    browser.sleep(5000);

    wait(element(by.model("wifi.ap.data.SSID")));
    ssidName.clear();
    element(by.buttonText('Apply')).click();
    var error = element(by.cssContainingText('.ng-binding', 'Field is mandatory'));
    browser.wait(EC.visibilityOf(error), 5000);
    //expect(element(by.css('.nwfield_valid')).isDisplayed()).toBeTruthy();
  });


  it('it should show password required', function(){
    refresh();
    wait(pskKey);
    pskKey.clear();
    element(by.buttonText('Apply')).click();
    var error = element(by.cssContainingText('.ng-binding', 'Field is mandatory'));
    browser.wait(EC.visibilityOf(error), 5000);
    //browser.sleep(5000);
  });


  it('click wireless_mode', function(){
    refresh();
    wait(wireless_mode);
    wireless_mode.click();
    wireless_mode.$('[value="b"]').click();
    element(by.binding('apply')).click();
    
  });

  it('selectChannel' ,function(){
    browser.wait(EC.visibilityOf(selectChannelAutomaticly), 5000);
    selectChannelAutomaticly.click();
    applyButton.click();
    wait(channelList);
    channelList.click();
    browser.sleep(5000);





  });

});


//https://stackoverflow.com/questions/18406674/a-way-of-clicking-on-hidden-elements-in-protractor-end-to-end-tests