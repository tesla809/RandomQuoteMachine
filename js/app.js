//app.js

// to do:
/*
-Add text to div
-Add new font to div
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
    var $description  = "<div class='jumbotron description'>"
    	$description +=	"<div class='description'><p>Here are some random quotes that I have stolen from Twitter.";
        $description += "</br>I hope you enjoy them as much as I enjoyed stealing them.</p></div>";
        $description += "</div>";


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
        var arabic = new Language(0x060C,0x06FE,"arabic");
        var thai = new Language(0x0E01, 0x0E5B, "thai");
        var korean = new Language(0x1100, 0x11F9, "korean");
        var latin = new Language(0x0020, 0x007E, "latin");
        
        languageArray.push(latin);
        languageArray.push(arabic);
        languageArray.push(thai);
        languageArray.push(korean);
        
        // picks random language and keep consistant set of UTF characters
        var randomPickStart = Math.floor(Math.random() * languageArray.length);
        var randomPickEnd = randomPickStart;
        
        console.log("randomPickStart: " + randomPickStart,"randomPickEnd: " + randomPickEnd);
        
        return {
            start: languageArray[0].startLang,
            end: languageArray[0].endLang  
        };
        
    }

    // randomText called from array of language options-
    // allow randomText to accept language-
    function randomText(start, end){
        var output = "";
        var randomNumberOfLetters = Math.floor(Math.random() * 10);
        
        for(var i = 0; i < randomNumberOfLetters; i++){
            var text = String.fromCharCode(start + Math.random() * (end-start+1));
            output += text;
        }
        return output;
    }

    var outputRandomLang = randomText(randomLanguage().start, randomLanguage().end);

    // chnages random language every second.
    setInterval(function(){
        $(".random-language").text(randomText(randomLanguage().start, randomLanguage().end));
    }, 1000);

});