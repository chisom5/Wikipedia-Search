window.onload = function() {
    document.getElementById("search-input").focus();
};


// ajax call
function fetchAjax(keyword) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: function(response) {
            // console.log(response.query);
            if (response.query.searchinfo.totalhits === 0) {
                showError(keyword);
            } else {
                showResults(response);
            }
        },
        error: function() {
            alert("Error retrieving search results, please refresh the page");
        }
    })

}


function showResults(data) {

    $('.display-result').html("");

    // we want to display at least 10 element from search
    for (var i = 0; i <= 9; i++) {
        $(".display-results").append("<div class='result-list result-" + i + "'>" + "<span class='result-title title-" + i + "'></span>" + "<br>" + "<span class='result-snippet snippet-" + i + "'></span>" + "</div>");
    }

    // handle the result from wikimedia and append to our DOM.
    for (var m = 0; m <= 9; m++) {
        var title = data.query.search[m].title;
        // var url = title.replace(/ /g, "_");
        var url = title;

        var timestamp = data.query.search[m].timestamp;
        timestamp = new Date(timestamp);
        //"Wed Aug 27 2014 00:27:15 GMT+0100 (WAT)";
        // console.log(timestamp);
        $(".title-" + m).html("<a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + data.query.search[m].title + "</a>");
        $(".snippet-" + m).html(data.query.search[m].snippet);
        $(".metadata-" + m).html((data.query.search[m].size / 1000).toFixed(0) + "kb (" + data.query.search[m].wordcount + " words) - " + timestamp);
    }

}

// display error
function showError(keyword) {
    $(".display-results").append("<div class='error'> <p>Your search <span class='keyword'>" + keyword + "</span> did not match any documents.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div> ");
}


$(".cursor-search").click(function(event) {
    event.preventDefault();

    $(".display-results").html("");
    var keyword = $("#result-search-form-input").val();

    document.getElementById("result-search-form-input").blur();
    fetchAjax(keyword);
});

$('#btn-search').click(function(event) {
    event.preventDefault();

    var keyword = $("#search-input").val();


    if (keyword !== "") {

        $("#result-search-form-input").val(keyword);

        $(".head-wrapper").addClass('hidden');
        $(".result").removeClass('hidden');

        document.getElementById("search-input").blur();

        $("#search-input").val("");

        document.getElementById("result-search-form-input").blur();

        $(".display-results").html("");
        fetchAjax(keyword);
    } else {
        alert("Enter a keyword into the search box");
    }

});