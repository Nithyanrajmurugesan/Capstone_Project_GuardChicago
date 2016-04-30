window.onload = function () {

    document.getElementById('get').addEventListener('click', function () {
        var url = "https://data.cityofchicago.org/resource/6zsd-86xi.json?"
        if ($("#community_type").val() != "SELECT COMMUNITY") {
            url += "community_area=" + $("#community_type").val();
        }
        if ($("#year_type").val() != "SELECT YEAR") {
            url += "&year=" + $("#year_type").val();
        }
        url += "&$select=primary_type,COUNT(primary_type) AS no_of_crime&$group=primary_type&$order=no_of_crime DESC";

        $.ajax(url, { method: "GET" }).done(
            function (data) {
                var result_content = '';

                for (var item = 0; item < data.length; item++) {
                    result_content = result_content.concat("<tr><td>" + data[item].primary_type + "</td><td>" + data[item].no_of_crime + "</td></tr>");
                }
                $("#crime_table").removeAttr("hidden");
                $("#search_result").html(result_content);


            });
    });
}

