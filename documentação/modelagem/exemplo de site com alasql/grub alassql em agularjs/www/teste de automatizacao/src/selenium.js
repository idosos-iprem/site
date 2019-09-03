const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

var caminho = __dirname;
let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .usingServer(caminho)
    .build();