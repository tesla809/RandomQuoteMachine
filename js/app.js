//app.js

// to do:

/*
-Add text to div *
-Add new font to div *
-Add function to scroll thru each individual letters randomly 
    -if not a space, must be underlined
-Add Loading three dots(...), that each goes up then down in a wave
-apply random individual letter scroll function to output div while loading takes place
    -doubles in size, the shrinks to 0
    -shows message in the same way. 
-Later on, add twitter api to get info from 
-Later on, add google translate api to translate quote
*/

$(document).ready(function(){
    //create random text generation in quote area
    var randomTitle = "Say...What?";
    // changes back to title;
    var randomTitleChanged = "";
    //get colors from background



    //Set to Title;
    $(".random-language").text(randomTitle);



    /*Random Language*/
    // create language object constructor function-
    function Language(startLang, endLang, langName){    
        this.startLang = startLang;
        this.endLang = endLang;
        this.langName = langName;
    } 

    // function for random language pick-
    function randomLanguage(){
        var languageArray = [];

        // add language with ranges
        var latin = new Language(0x0021, 0x007E, "latin");
        var arabic = new Language(0x060C,0x06FE,"arabic");
        var thai = new Language(0x0E01, 0x0E5B, "thai");
        var korean = new Language(0x1100, 0x11F9, "korean");

        
        languageArray.push(latin);
        languageArray.push(arabic);
        languageArray.push(thai);
        languageArray.push(korean);
        
        // picks random language and keep consistant set of UTF characters
        var randomPickStart = Math.floor(Math.random() * languageArray.length);
        var randomPickEnd = randomPickStart;
        
        // console.log("randomPickStart: " + randomPickStart,"randomPickEnd: " + randomPickEnd);
        
        return {
            startLang: languageArray[0].startLang,
            endLang: languageArray[0].endLang  
        };
        
    }

    /*Random Color*/
    // getting value for future manipulation
    var backgroundColor = $('body').css('background-color');
    var $body = $("body"); 

    var colorObj = {
        randomNumber: Math.floor(Math.random() * 100),
        randomColorPick: Math.floor(Math.random() * 2),
        alphaRandomNumber: Math.round(Math.random() * 100)/100,
        rgbaGrab: function(element){
            var rgba = element.css('background-color');
            return {
                rgb: rgba.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(','),
                alpha: element.css("opacity")
            } 
        },
        // this way each element can have its own color array made
        ColorArrayConstructor: function(rgb, opacity){
            this.red = rgb[0];
            this.green = rgb[1];
            this.blue = rgb[2];
            this.alpha = opacity;
        },
        colorUp: function(color){
                color = color + 1;
                return color;
        },
        colorDown: function(color){
            color--;
            return color;
        },


    };

    console.log(colorObj.randomNumber);
    console.log(colorObj.randomColorPick);
    console.log(colorObj.alphaRandomNumber);
    console.log(colorObj.rgbaGrab($body).rgb);
    console.log(colorObj.rgbaGrab($body).alpha);

    /*Random Text*/
    function toArray(string){
        var array = string.split("");
        return array;
    }

    function randomPosition(array){
        var jumpArrayPosition = Math.floor(Math.random() * array.length);
        return jumpArrayPosition;
    }

    // changes leter to random string
    function randomText(starter, ender, array){
        var arrayOriginal  = array;
        // get random postion of element
        var jumpArrayPosition = randomPosition(array);
        
        // generate random character
        var text = String.fromCharCode(starter + Math.random() * (ender-starter+1));

        // assign random character to random position
        arrayOriginal[jumpArrayPosition] = text;
        randomTitleChanged = arrayOriginal.join('');
        return randomTitleChanged;
    }

    function returnToTitle(stringInput){
        var stringOutput = "";
        var array = toArray(stringInput);
        var titleArray = randomTitle.split('');
        var jumpArrayPosition = randomPosition(array);
        
        array[jumpArrayPosition] = titleArray[jumpArrayPosition];
        stringOutput = array.join("");
        
        // assigns output randomTitleChanged
        randomTitleChanged = stringOutput;

        return randomTitleChanged;

    }

    var titleArray = toArray(randomTitle);

    /*Timer to create changes*/    
    // needs to be in outer scope to work
    var randomIntervalSet;
    var backToOriginalInterval;

    function startCycle(){ 
        randomIntervalSet = setInterval(function(){
            $(".random-language").text(randomText(randomLanguage().startLang, randomLanguage().endLang, titleArray));
            // get the value on every call back here.
            // be aware of name conflict, might be benifical, not not be
            randomTitleChanged = $(".random-language").text();
        }, 150);
    }

    function endCycle(){
        clearInterval(randomIntervalSet);
    }

    function backToOriginal(){
        backToOriginalInterval = setInterval(function(){
            $(".random-language").text(returnToTitle(randomTitleChanged));
        }, 75);
    }

    function endCycleBackToOriginal(){
        clearInterval(backToOriginalInterval);
    }


    // move data to new file.
    function quoteGenerator(){
        // have data in another file
        // use this function though
        var sampleQuotesArray = ["Hello There!","This is a test", "another one!", "The sweat the sweat sexy drips"];
        var randomQuotePosition = randomPosition(sampleQuotesArray);

        var outputQuote = sampleQuotesArray[randomQuotePosition];

        return outputQuote;
    }

    // changes random text every second.
    $(".random-language").mouseenter(function(){
        startCycle();
        endCycleBackToOriginal();
    }).mouseleave(function(){
        endCycle();
        backToOriginal();
    });

    $(".random-language").on("click", function(){
        $(".add-Quote").text(quoteGenerator());
    });
});