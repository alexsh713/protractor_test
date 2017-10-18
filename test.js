



describe('wifi_config', function() {
  it('wifi_basic', function() {
    
    
    
    browser.get('http://192.168.0.50');
    browser.ignoreSynchronization=true;
    
    browser.wait(function() {
        return element(by.model("fm.username")).isPresent()});

    browser.wait(function() {
        return element(by.model("password.value")).isPresent()});

    browser.wait(function() {
        return element(by.buttonText("Login")).isPresent()});



    element(by.model('fm.username')).sendKeys('admin');
    element(by.model('password.value')).sendKeys('1');
    element(by.buttonText('Login')).click();

    
    function config_ssid(ssid_name) {
        element(by.model('wifi.ap.data.SSID')).clear();
        element(by.model('wifi.ap.data.SSID')).sendKeys(ssid_name);
        element(by.buttonText('Apply')).click();
    };
    
    var EC = protractor.ExpectedConditions;
    var first = element.all(by.repeater('menu in menuList')).get(4);
    browser.wait(EC.visibilityOf(first), 5000);
    first.click();
    
    var wifi_basic = element(by.css('[ui-sref="wifi.common"]'));
    /*browser.wait(EC.visibilityOf(wifi_basic), 5000);
    wifi_basic.click();*/
    wifi_basic.click();

    browser.wait(function() {
        return element(by.model("wifi.ap.data.SSID")).isPresent()});

    /*element(by.model('wifi.ap.data.SSID')).clear();
    element(by.model('wifi.ap.data.SSID')).sendKeys('bungalo1_1224');
    element(by.buttonText('Apply')).click();*/
    config_ssid('bungal234234o228');
    
    var wifi_5g = element.all(by.repeater('key in wifi.band.list')).get(1);
    browser.wait(EC.visibilityOf(wifi_5g), 40000);
    wifi_5g.click();

    browser.wait(function() {
        return element(by.model("wifi.ap.data.SSID")).isPresent()});
    config_ssid('bungalo234234228-5g');

    /*element(by.model('wifi.ap.data.SSID')).clear();
    element(by.model('wifi.ap.data.SSID')).sendKeys('bungalo121_5');
    element(by.buttonText('Apply')).click();*/
    
    

    
    browser.sleep(10000);
    
  });
});


