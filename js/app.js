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

    //Set to Title
    $(".random-language").text(randomTitle);

    //Get html color for future manipulation
    var htmlBackgroundColor = $("html").css("background-color");
    var $html = $("html"); 

    var red = colorChange(rgbaGrab($html).red);
    var green = colorChange(rgbaGrab($html).green);
    var blue =  colorChange(rgbaGrab($html).blue);

    // alpha needs own color change & revert function.
    var alpha="";  

    htmlBackgroundColorTest = "rgba("+red+","+green+","+blue+","+alpha+")";

    console.log(alphaChange());


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

 
    /* Background Color Change */
    function rgbaGrab(element){
        var rgb = element.css('background-color');
        var rgbArray = rgb.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
        var red =  parseInt(rgbArray[0]);
        var green =  parseInt(rgbArray[1]);
        var blue =  parseInt(rgbArray[2]);
        var alpha = parseInt(element.css("opacity"));

        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        }
    }

    function colorChange(color){
        var randomColorValue = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        
        if (randomNumber <= 5){
            color = color + randomColorValue;
        }
        
        if (randomNumber > 5){
            color = color - randomColorValue;
        }
        
        if(color < 0 || color > 255){
            return colorChange(color);
        } else{
            return color; 
        }
    }

    

    // to revert back to color
    function colorRevert(originalColor, randomColor){
        var differenceColor;
        if(originalColor === randomColor){
            return originalColor;
        } else if (originalColor > randomColor){
            return randomColor = randomColor + 1;
        } else {
            return randomColor = randomColor - 1;
        }     
        // this would be much more efficent if I can use the closet set of two primes 
        // between 0 and 255.
    }

    function alphaChange(opacity){
        var randomOpacity = Math.round(Math.random() * 100)/100;
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        
        if (randomNumber <= 5){
            opacity = opacity + randomOpacity;
        }
        
        if (randomNumber > 5){
            opacity = opacity - randomOpacity;
        }
        
        if(opacity < 0 || opacity > 1){
            return alphaChange(opacity);
        } else{
            return opacity; 
        }
    }

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
   
    // needs to be in outer scope to work
    var randomIntervalSet;
    var backToOriginalInterval;

    // future fix, pass in parameters to change. later.
    // that way any text or element can be randomized.
    function startCycle(){ 
        randomIntervalSet = setInterval(function(){
            // works by getting the new value on every call back.
            //text
            $(".random-language").text(randomText(randomLanguage().startLang, randomLanguage().endLang, titleArray));
            randomTitleChanged = $(".random-language").text();
            
            //color       
            
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




    /*** User Interaction ***/
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