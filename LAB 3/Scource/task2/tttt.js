var Twitter = require('twitter');
var fs = require('fs');

var client = new Twitter({
    consumer_key: "ZLxqFQ6xSU126W3gWt2Azz9jl",
    consumer_secret: "Zn5dgjA1Np1APe5hEy7EHtJ74AN4BzPFeE827J4D8iI4soUT4b",
    access_token_key: "976045398-tU7WUKUzYRjJZgDHfVCe8g30BWFrh7YPJubQ9BXa",
    access_token_secret: "wLRUBC8Q0kUrfK4CL069MHsu6PhQPu3iYcL3oVk88tjHH"
});

var searchCriteria = "narendramodi";
var params = {screen_name: searchCriteria,
    count: 100};

var dict = {name: searchCriteria};

client.get('friends/list', params, function(error, tweets, response) {
    var a1=[];
    if (!error) {


        for (i = 0; i < tweets.users.length; i++) {

            var d1={name:tweets.users[i].screen_name};
            a1.push(d1);
        }
        dict.children = a1;
        console.log(dict);
    }
    var dictstring = JSON.stringify(dict);
    fs.writeFile("data.json", dictstring);
});