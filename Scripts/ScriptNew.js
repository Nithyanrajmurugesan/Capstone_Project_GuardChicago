var public_data;
$(document).ready(

function () {
    $.ajax("https://data.cityofchicago.org/resource/6zsd-86xi.json", { method: "GET" }).done(
            function (data) {
                var result_content = '';
                public_data = jQuery.extend(true, {}, data);
                for (var item = 0; item < data.length; item++) {
                    result_content = result_content.concat("<tr><td>" + data[item].primary_type + "</td><td>" + data[item].community_area + "</td><td>" + data[item].year + "</td></tr>");
                }
                $("#search_result").html(result_content);
                $("#crime_table").dataTable();
            });

    $("#crime_type").val("SELECT CRIME");
    $("#crime_type").on('change', function () {
        var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?"
        if ($("#crime_type").val() != "SELECT CRIME") {
            url += "primary_type=" + $("#crime_type").val();
        }
        if ($("#community_type").val() != "SELECT COMMUNITY") {
            url += "&community_area=" + $("#community_type").val();
        }
        if ($("#year_type").val() != "SELECT YEAR") {
            url += "&year=" + $("#year_type").val();
        }
        //window.alert(url);

        $.ajax(url, { method: "GET" }).done(
            function (data) {
                var result_content = '';

                for (var item = 0; item < data.length; item++) {
                    result_content = result_content.concat("<tr><td>" + data[item].primary_type + "</td><td>" + data[item].community_area + "</td><td>" + data[item].year + "</td></tr>");
                }
                $("#crime_table").removeAttr("hidden");
                $("#search_result").html(result_content);


            });
    });
    $("#community_type").val("SELECT COMMUNITY");
    $("#community_type").on('change', function () {
        var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?"
        if ($("#crime_type").val() != "SELECT CRIME") {
            url += "primary_type=" + $("#crime_type").val();
        }
        if ($("#community_type").val() != "SELECT COMMUNITY") {
            url += "&community_area=" + $("#community_type").val();
        }
        if ($("#year_type").val() != "SELECT YEAR") {
            url += "&year=" + $("#year_type").val();
        }
        $.ajax(url, { method: "GET" }).done(
            function (data) {
                var result_content = '';

                for (var item = 0; item < data.length; item++) {
                    result_content = result_content.concat("<tr><td>" + data[item].primary_type + "</td><td>" + data[item].community_area + "</td><td>" + data[item].year + "</td></tr>");
                }
                $("#crime_table").removeAttr("hidden");
                $("#search_result").html(result_content);
                //window.alert(url);

            });
    });
    $("#year_type").val("SELECT YEAR");
    $("#year_type").on('change', function () {
        var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?"
        if ($("#crime_type").val() != "SELECT CRIME") {
            url += "primary_type=" + $("#crime_type").val();
        }
        if ($("#community_type").val() != "SELECT COMMUNITY") {
            url += "&community_area=" + $("#community_type").val();
        }
        if ($("#year_type").val() != "SELECT YEAR") {
            url += "&year=" + $("#year_type").val();
        }
        $.ajax(url, { method: "GET" }).done(
            function (data) {
                var result_content = '';

                for (var item = 0; item < data.length; item++) {
                    result_content = result_content.concat("<tr><td>" + data[item].primary_type + "</td><td>" + data[item].community_area + "</td><td>" + data[item].year + "</td></tr>");
                }
                $("#crime_table").removeAttr("hidden");
                $("#search_result").html(result_content);
                //window.alert(url);

            });
    });
});




