var SOURCE_URL = "https://newsapi.org/v2/sources?";
var NEWS_URL = "https://newsapi.org/v2/top-headlines?";
var KEY = "aed9c8c7f69142638cec4e1c6949fbdb"

function valid_request(output) {
    "use strict";
    document.getElementById("fail").style.visibility = "none";
    document.getElementById("fail").style.display = "none";
    document.getElementById("output").innerHTML = output;
}

function invalid_request() {
    "use strict";
    document.getElementById("output").innerHTML = "";
    document.getElementById("fail").style.visibility = "visible";
    document.getElementById("fail").style.display = "block";
}

// Use sync call to laod the source list
function getsources() {
    "use strict";
    var request_url = SOURCE_URL + "apiKey=" + KEY;
    var request = new XMLHttpRequest();
    request.open("GET", request_url, false);
    request.send();
    var json = JSON.parse(request.responseText);
    var sources = json.sources;
    if (sources.length !== 0) {
        var output = "<option value=''>[Select Source]</option>";
        for (var i = 0; i < sources.length; i++) {
            output += "<option value='" + sources[i].id + "'>" + sources[i].name + "</option>";
        }
        document.getElementById("searchSource").innerHTML = output;
    } else {
        alert("Unable to load source list!!!");
    }
}

// Use asyc call to load the news list
function search() {
    "use strict";
    var searchTopic = document.getElementById("searchTopic").value;
    var searchSource = document.getElementById("searchSource").value;
    if (searchTopic && searchSource) {
        var parameters = "q=" + searchTopic + "&sources=" + searchSource;
    } else if (searchTopic) {
        var parameters = "q=" + searchTopic;
    } else if (searchSource) {
        var parameters = "sources=" + searchSource;
    } else {
        invalid_request();
        return;
    }
    var request_url = NEWS_URL + parameters + "&apiKey=" + KEY;

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var json = JSON.parse(this.responseText);
            var articles = json.articles;
            if (articles.length !== 0) {
                var output = "";
                for (var i = 0; i < articles.length; i++) {
                    output += "<h2>" + articles[i].title + "</h2>";
                    output += "<p>" + (new Date(articles[i].publishedAt)).toUTCString() + "</p>";
                    output += "<a href='" + articles[i].url + "' target='_blank'>" + "<img src='" + articles[i].urlToImage + "' class='img-responsive img-thumbnail'></a>";
                    output += "<hr>";
                }
                valid_request(output);
            } else {
                invalid_request();
                return;
            }
        } else {
            invalid_request();
            return;
        }
    };
}