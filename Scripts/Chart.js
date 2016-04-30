
function dashboard(id, fData) {
    var barColor = 'steelblue';
    function segColor(c) { return { THEFT: "#807dba", BATTERY: "#e08214", CRIMINAL_DAMAGE: "#41ab5d", NARCOTICS: "#3cdb5c", ASSAULT: "#41cd43", OTHER_OFFENSE: "#ff0000", MOTOR_VEHICLE_THEFT: "#ffff00", BURGLARY: "#00ffbf", ROBBERY: "#0000ff", DECEPTIVE_PRACTICE: "#bf00ff", CRIMINAL_TRESPASS: "#ff00bf", PROSTITUTION: "#b94646", WEAPONS_VIOLATION: "#000000", PUBLIC_PEACE_VIOLATION: "#990000", OFFENSE_INVOLVING_CHILDREN: "#999900", SEX_OFFENSE: "#009973", CRIM_SEXUAL_ASSAULT: "#993300", LIQUOR_LAW_VIOLATION: "#544a45", ARSON: "#ffccb3", GAMBLING: "#006600", KIDNAPPING: "#660033", HOMICIDE: "#80ff00", INTERFERENCE_WITH_PUBLIC_OFFICER: "#cc5933", INTIMIDATION: "#996688", STALKING: "#3d0f2e", OBSCENITY: "#ff8000", PUBLIC_INDECENCY: "#cccc00", RITUALISM: "#269900", OTHER_NARCOTIC_VIOLATION: "#ff0055", DOMESTIC_VIOLENCE: "#996633" }[c]; }

    // compute total for each state.
    //fData.forEach(function (d) { d.total = d.freq.THEFT + d.freq.BATTERY + d.freq.CRIMINAL_DAMAGE + d.freq.NARCOTICS + d.freq.ASSAULT + d.freq.OTHER_OFFENSE + d.freq.MOTOR_VEHICLE_THEFT + d.freq.BURGLARY + d.freq.ROBBERY + d.freq.DECEPTIVE_PRACTICE + d.freq.CRIMINAL_TRESPASS + d.freq.PROSTITUTION + d.freq.WEAPONS_VIOLATION + d.freq.PUBLIC_PEACE_VIOLATION + d.freq.OFFENSE_INVOLVING_CHILDREN + d.freq.SEX_OFFENSE + d.freq.CRIM_SEXUAL_ASSAULT + d.freq.LIQUOR_LAW_VIOLATION + d.freq.ARSON + d.freq.GAMBLING + d.freq.KIDNAPPING + d.freq.HOMICIDE + d.freq.INTERFERENCE_WITH_PUBLIC_OFFICER + d.freq.INTIMIDATION + d.freq.STALKING + d.freq.OBSCENITY + d.freq.PUBLIC_INDECENCY + d.freq.RITUALISM + d.freq.OTHER_NARCOTIC_VIOLATION + d.freq.DOMESTIC_VIOLENCE; });
    fData.forEach(function (d) { d.total = (Number(d.freq.THEFT) + Number(d.freq.BATTERY) + Number(d.freq.HOMICIDE) + Number(d.freq.NARCOTICS) + Number(d.freq.PROSTITUTION) + Number(d.freq.INTIMIDATION) + Number(d.freq.OBSCENITY)); });

    // function to handle histogram.
    function histoGram(fD) {
        var hG = {}, hGDim = { t: 30, r: 0, b: 30, l: 0 };
        hGDim.w = 900 - hGDim.l - hGDim.r,
        hGDim.h = 225 - hGDim.t - hGDim.b;

        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
            .attr("width", hGDim.w + hGDim.l + hGDim.r)
            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
            .attr("transform", "translate(" + hGDim.l / 2 + "," + hGDim.t / 2 + ")");

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.3)
                .domain(fD.map(function (d) { return d[0]; }));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + hGDim.h + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 1])
                .domain([0, d3.max(fD, function (d) { return d[1]; })]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
                .append("g").attr("class", "bar");

        //create the rectangles.
        bars.append("rect")
            .attr("x", function (d) { return x(d[0]); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("width", x.rangeBand() - 5)
            .attr("height", function (d) { return hGDim.h - y(d[1]); })
            .attr('fill', barColor)
            .on("mouseover", mouseover)// mouseover is defined below.
            .on("mouseout", mouseout);// mouseout is defined below.

        //Create the frequency labels above the rectangles.
        bars.append("text").text(function (d) { return d3.format(",")(d[1]) })
            .attr("x", function (d) { return x(d[0]) + x.rangeBand() / 2; })
            .attr("y", function (d) { return y(d[1]) - 5; })
            .attr("text-anchor", "middle");

        function mouseover(d) {  // utility function to be called on mouseover.
            // filter for selected state.
            var st = fData.filter(function (s) { return s.year == d[0]; })[0],
                //nD = d3.keys(st.freq).map(function (s) { return { type: s, freq: st.freq[s] }; });
                nD = d3.keys({ 'THEFT': 0, 'BATTERY': 0, 'NARCOTICS': 0, 'PROSTITUTION': 0, 'HOMICIDE': 0, 'INTIMIDATION': 0, 'OBSCENITY': 0 }).map(function (s) { return { type: s, freq: st.freq[s] }; });

            // call update functions of pie-chart and legend.
            pC.update(nD);
            leg.update(nD);
        }

        function mouseout(d) {    // utility function to be called on mouseout.
            // reset the pie-chart and legend.
            pC.update(tF);
            leg.update(tF);
        }

        // create function to update the bars. This will be used by pie-chart.
        hG.update = function (nD, color) {
            // update the domain of the y-axis map to reflect change in frequencies.
            y.domain([0, d3.max(nD, function (d) { return d[1]; })]);

            // Attach the new data to the bars.
            var bars = hGsvg.selectAll(".bar").data(nD);

            // transition the height and color of rectangles.
            bars.select("rect").transition().duration(500)
                .attr("y", function (d) { return y(d[1]); })
                .attr("height", function (d) { return hGDim.h - y(d[1]); })
                .attr("fill", color);

            // transition the frequency labels location and change value.
            bars.select("text").transition().duration(500)
                .text(function (d) { return d3.format(",")(d[1]) })
                .attr("y", function (d) { return y(d[1]) - 5; });
        }
        return hG;
    }

    // function to handle pieChart.
    function pieChart(pD) {
        var pC = {}, pieDim = { w: 250, h: 250 };
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
            .attr("transform", "translate(" + pieDim.w / 2 + "," + pieDim.h / 2 + ")");

        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function (d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
            .each(function (d) { this._current = d; })
            .style("fill", function (d) { return segColor(d.data.type); })
            .on("mouseover", mouseover).on("mouseout", mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function (nD) {
            console.log(nD);
            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                .attrTween("d", arcTween);
        }
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d) {
            // call the update function of histogram with new data.
            hG.update(fData.map(function (v) {
                return [v.year, v.freq[d.data.type]];
            }), segColor(d.data.type));
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d) {
            // call the update function of histogram with all data.
            hG.update(fData.map(function (v) {
                return [v.year, v.total];
            }), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
            // console.log(a);
            var i = d3.interpolate(this._current, a);
            //console.log(i(0));
            this._current = i(0);
            return function (t) { return arc(i(t)); };
        }
        return pC;
    }

    // function to handle legend.
    function legend(lD) {
        var leg = {};

        // create table for legend.
        d3.select(id).append("br");
        var legend = d3.select(id).append("table").attr('class', 'legend');

        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
            .attr("width", '16').attr("height", '16')
			.attr("fill", function (d) { return segColor(d.type); });

        // create the second column for each segment.
        tr.append("td").text(function (d) { return d.type; });

        // create the third column for each segment.
        tr.append("td").attr("class", 'legendFreq')
            .text(function (d) { return d3.format(",")(d.freq); });

        // create the fourth column for each segment.
        tr.append("td").attr("class", 'legendPerc')
            .text(function (d) { return getLegend(d, lD); });

        // Utility function to be used to update the legend.
        leg.update = function (nD) {
            // update the data attached to the row elements.
            var l = legend.select("tbody").selectAll("tr").data(nD);

            // update the frequencies.
            l.select(".legendFreq").text(function (d) { return d3.format(",")(d.freq); });

            // update the percentage column.
            l.select(".legendPerc").text(function (d) { return getLegend(d, nD); });
        }

        function getLegend(d, aD) { // Utility function to compute percentage.
            return d3.format("%")(d.freq / d3.sum(aD.map(function (v) { return v.freq; })));
        }

        return leg;
    }

    // calculate total frequency by segment for all state.
    //var tF = ['THEFT', 'BATTERY', 'CRIMINAL_DAMAGE', 'NARCOTICS', 'ASSAULT', 'OTHER_OFFENSE', 'MOTOR_VEHICLE_THEFT', 'BURGLARY', 'ROBBERY', 'DECEPTIVE_PRACTICE', 'CRIMINAL_TRESPASS', 'PROSTITUTION', 'WEAPONS_VIOLATION', 'PUBLIC_PEACE_VIOLATION', 'OFFENSE_INVOLVING_CHILDREN', 'SEX_OFFENSE', 'CRIM_SEXUAL_ASSAULT', 'LIQUOR_LAW_VIOLATION', 'ARSON', 'GAMBLING', 'KIDNAPPING', 'HOMICIDE', 'INTERFERENCE_WITH_PUBLIC_OFFICER', 'INTIMIDATION', 'STALKING', 'OBSCENITY', 'PUBLIC_INDECENCY', 'RITUALISM', 'OTHER_NARCOTIC_VIOLATION', 'DOMESTIC_VIOLENCE'].map(function (d) {
    var tF = ['THEFT', 'BATTERY', 'NARCOTICS', 'PROSTITUTION', 'HOMICIDE', 'INTIMIDATION', 'OBSCENITY'].map(function (d) {
        return { type: d, freq: d3.sum(fData.map(function (t) { return t.freq[d]; })) };
    });

    // calculate total frequency by state for all segment.
    var sF = fData.map(function (d) { return [d.year, d.total]; });

    var hG = histoGram(sF), // create the histogram.
        pC = pieChart(tF), // create the pie-chart.
        leg = legend(tF);  // create the legend.
}


