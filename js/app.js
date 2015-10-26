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
    var randomTitle = "Random Quote Generator";
    $(".random-language").text(randomTitle);


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
        var latin = new Language(0x0020, 0x007E, "latin");
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
        
        console.log("randomPickStart: " + randomPickStart,"randomPickEnd: " + randomPickEnd);
        
        return {
            startLang: languageArray[0].startLang,
            endLang: languageArray[0].endLang  
        };
        
    }

    // splits text string
    function toArray(string){
        var array = string.split("");
        return array;
    }

    // randomText called from array of language options-
    // allow randomText to accept language-
    function randomText(start, end){
        var output = "";
        
        for(var i = 0; i < randomTitle.length; i++){
            var text = String.fromCharCode(start + Math.random() * (end-start+1));
            output += text;
        }
        return output;
    }





    // needs to in outer scope to work
    var randomIntervalSet;

    function startCycle(){ 
        randomIntervalSet = setInterval(function(){
            $(".random-language").text(randomText(randomLanguage().startLang, randomLanguage().endLang))
        }, 500);
    }

    function endCycle(){
        clearInterval(randomIntervalSet);
    }

    // changes random text every second.
    $(".random-language").mouseenter(function(){
        startCycle();
    }).mouseleave(function(){
        endCycle();
        $(".random-language").text(randomTitle);
    });

});