# Sprice  
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)


A command line tool for querying stock price.  
**Sprice** stands for stock price or (search price).

## installation
`npm install -g sprice`  
Maybe you need 'sudo' to install globally.  
First time use npm? See [How to install npm](https://www.npmjs.com/get-npm).

## How to use
`Usage: sprice [options] [command]`  

### Current Price
Get the current price of some company  
`sprice price|p \<symbol\>`  
![](https://i.loli.net/2018/06/27/5b32e662144dc.jpg)

### News
Get the latest news about the company. You can move up and down to see all listed news. Selected one will be opened in the default browser.  
You can also specify the number of news you want to see by -t. The default number is 10.  
`sprice news|n \<symbol\> -n [number]`
![](https://i.loli.net/2018/06/27/5b32e33862d41.jpg)

### Company
Get the company information
`sprice company|co \<symbol\>`  
![](https://i.loli.net/2018/06/27/5b32e356befaf.jpg)

### Open Close High Low price
Get today's open/close/high/low price for the company.  
`sprice oc \<symbol\>`
![](https://i.loli.net/2018/06/27/5b32e47a02339.jpg)

### Chart
Get the chart information of the company. The difference is colored as green or red.  
`sprice charts|ch \<symbol\>`
![](https://i.loli.net/2018/06/27/5b32e5e91aae1.jpg)

### Earnings
Get the earnings for 4 most recent reported quarters.  
`sprice earnings|e \<symbol\>`  
![](https://i.loli.net/2018/06/27/5b32e4edb8862.jpg)

## Credit
Data provided for free by IEX. View [IEX’s Terms of Use](https://iextrading.com/api-exhibit-a/).

## License
(The MIT License)

Copyright (c) 2018 Frank Wang\<yocson@gmail.com\>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.