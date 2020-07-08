const jsonn = fetch("./periodTable.json").then(data => data.json());

async function makeStr() {
    
    let dividedStr = [

    ];

    let eng = /^[a-zA-Z\s]+$/; 
    let str = document
        .getElementById('str')
        .value;
    if(!eng.test(str)){
        //console.log("영어만 부탁해~")
        alert('영어만 부탁해~');
        return;
    }
    const json = await jsonn;
    let one = false;
    let two = false;
    let count = 0;
    while(str.length > 0){
        if(str[0] == ' ') {
            str = str.substring(1,str.length);
            dividedStr[count] = ' ';
            count++;
        }
        json.forEach((value, index) => {
            if ((str.substring(0, 2)).toLowerCase() == value.char.toLowerCase()) {
                two = true;
                //console.log(value.char + ' ' + index);
                dividedStr[count] = {
                    num : value.num,
                    char : value.char,
                    name : value.name,
                    color : value.color
                }
            }

        });
        if (!two) {
            json.forEach((value, index) => {
                if ((str.substring(0, 1)).toLowerCase() == value.char.toLowerCase()) {
                    one = true;
                    //console.log(value.char + ' ' + index);
                    dividedStr[count] = {
                        num : value.num,
                        char : value.char,
                        name : value.name,
                        color: value.color
                    }
                }
            });
        }
        if(one) {
            str = str.substring(1,str.length);
        }else if(two){
            str = str.substring(2, str.length);
        }
        count++;
        one = false;
        two = false;
    }
        
    //console.log(dividedStr)
    let form = '';
    dividedStr.forEach((value, index) => {
        let a = value.num;
        let b = value.char;
        let c = value.name;
        let d = value.color?.substr(1,6);
        let e = value.color?.substr(1,6);
        let nonBorder = '';
        console.log(b);
        if(b == undefined){
            a = ' '
            b = ' '
            c = ' '
            nonBorder = 'border:none;width:30px';
        }
        let rgbaForBox = {
            r: parseInt(d?.substr(0,2),16),
            g: parseInt(d?.substr(2,2),16),
            b: parseInt(d?.substr(4,2),16)
        } 
        console.log(d);
        //console.log(rgbaForBox);
        //form += '<div class="period" style="background-color:' + d + ';'+nonBorder+';rgba("><div class="num">' + a + '</div><div class="chr">' + b + '</div><div class="name">' + c + '</div></div>'
        form += `<div class="period" style="background-color:#${d};${nonBorder};box-shadow:10px 10px 15px rgba(${rgbaForBox.r-20},${rgbaForBox.g-20},${rgbaForBox.b-20},0.9),-10px -10px 15px rgba(${rgbaForBox.r+20}, ${rgbaForBox.g+20}, ${rgbaForBox.b+20},0.5),inset 10px 10px 30px transparent,inset -10px -10px 30px transparent;" onmouseover="this.style.boxShadow='10px 10px 30px transparent,-10px -10px 30px transparent,inset 10px 10px 30px rgba(${rgbaForBox.r - 20}, ${rgbaForBox.g - 20}, ${rgbaForBox.b - 20}, 0.9),inset -10px -10px 30px rgb(${rgbaForBox.r + 20}, ${rgbaForBox.g + 20}, ${rgbaForBox.b + 20})'" onmouseout="this.style.boxShadow='10px 10px 15px rgba(${rgbaForBox.r-20},${rgbaForBox.g-20},${rgbaForBox.b-20},0.9),-10px -10px 15px rgba(${rgbaForBox.r+20}, ${rgbaForBox.g+20}, ${rgbaForBox.b+20},0.5),inset 10px 10px 30px transparent,inset -10px -10px 30px transparent'"><div class="num">${a}</div><div class="chr">${b}</div><div class="name">${c}</div></div>`
        document.getElementById('builtStr').innerHTML = form;

    })
    

}

function enter(){
    if(window.event.keyCode == 13) {
        makeStr();
    }
}

