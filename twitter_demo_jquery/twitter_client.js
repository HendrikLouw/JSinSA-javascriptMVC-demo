var getSearchResults = function (options) {
    var search_term = options['search_term']
    var search_url = "http://search.twitter.com/search.json?callback=?"
    $.getJSON( search_url,
               { q : search_term,
                 rpp : 1500
               }, function(data) {
                    updateSearchDisplay(data)
               }
    )
}

var getUserTweets = function (options) {
    var user = options['user']
    var user_url = "http://api.twitter.com/1/statuses/user_timeline.json?callback=?"
    $.getJSON( user_url, 
              {
                screen_name : user
              }, function(data) {
                showCurrentUserTweets(data)
              }

    )
}

var showCurrentUserTweets = function (data) {
    
    console.log(data)
    if ( !$('#user_tweets').length ) {
        $('body').append($("<div />").attr('id', 'user_tweets'))
    }
    $('#user_tweets').html('')
    var output = "<ul>"
    $.each( data, function() {
        output += "<li>"
        output += this.text
        output += "</li>"
    })
    output += "</ul>"
    $('#user_tweets').append(output)
    $('#user_tweets').show()
    $('#user_tweets').click(function() {
        $(this).hide()
    })
}

var updateSearchDisplay = function(data) {
    var results_count = data.results.length
    
    updateTweetsView( { data : data.results })
}

var updateTweetsView = function( options ) {
    var data = options['data']
    if( !$('#search_results .tweets').length ) {
        $('#search_results').append( $("<div />").attr( 'class', 'tweets'))
    }
    
    $.each(data, function() {
        addTweet( { tweet : this } )
    })
    
    setupTweetUI()
}

var addTweet = function(options) {
    var tweet = options['tweet']
  console.log(tweet)  
    var output = "<div id='" + tweet.id + "' class='tweet clearfix' data-current-user-name='" + tweet.from_user +"'>"
 
    output +=  "<img src='" + tweet.profile_image_url + "' alt='profile picture: " + tweet.profile_image_url + "' />"
    output += "<p class='text'>"
    output += tweet.text
    output += "</p>"
    
    $('#search_results .tweets').append(output)
}

var setupTweetUI = function() {
    $('.tweet').hover( function() {
        $(this).addClass('hover')
        if( !$('#current_user').length ) {
            $('body').append($('<div />').attr('id', 'current_user'))
        }
        var current_user_name = $(this).attr('data-current-user-name')
        $('#current_user').html(current_user_name)
        $('#current_user').show()
        
    }, function() {
        $(this).removeClass('hover')
        $('#current_user').html('')
        $('#current_user').hide()
    })
    
    $('.tweet').click( function() {
         var current_user_name = $(this).attr('data-current-user-name')
        getUserTweets( { user : current_user_name })
    })
}

$(document).ready(function() {
    var searchTerm = "jsinsa"
    getSearchResults( { search_term : 'jsinsa' })
})
