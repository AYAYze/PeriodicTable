const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = "https://ko.wikipedia.org/wiki/%EC%9B%90%EC%86%8C_%EB%AA%A9%EB%A1%9D";

request(URL, (err,res,body)=>{
    if(err) console.log(err, "error");
    else {
        let $ = cheerio.load(body);

        //char 구하기
        let char = [];
        for(let i = 1; $('.wikitable > tbody > tr > td').eq(i).text() != 'Og'; i += 15){
            char.push($('.wikitable > tbody > tr > td').eq(i).text());
        }
        char.push('Og');
        //num 구하기
        let num = [];
        for(let i = 0; $('.wikitable > tbody > tr > td').eq(i).text() != '118'; i += 15){
            num.push($('.wikitable > tbody > tr > td').eq(i).text());
        }
        num.push('118');
        //name 구하기
        let name = [];
        for(let i = 3; $('.wikitable > tbody > tr > td').eq(i).text() != 'Oganesson'; i += 15){
            name.push($('.wikitable > tbody > tr > td').eq(i).text());
        }
        name.push('Oganesson');
        ///color 구하기
        let color = [];
        for(let i = 1; $('.wikitable > tbody > tr > td').eq(i).text() != 'Og'; i += 15){
            color.push($('.wikitable > tbody > tr > td').eq(i).attr('style').substring(11,18));
        }
        color.push('#e8e8e8');

        let period = require('./docs/periodTable.json');
        char.forEach((value, index) =>{
            period[index] = {
                char : value,
                num : num[index],
                name : name[index],
                color : color[index]
            }
        });
        console.log(period);
        fs.writeFile('./docs/periodTable.json', JSON.stringify(period));
    }
})