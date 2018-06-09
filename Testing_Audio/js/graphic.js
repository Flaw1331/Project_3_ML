// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that automatically resizes the chart
function makeResponsive() {

    // Find json data
    d3.json("/predict", function (error, jsonData) {

        if (error) throw error;

        // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
        var svgArea = d3.select("#graphic").select("svg");
        if (!svgArea.empty()) {
            svgArea.remove();
        };


        // SVG wrapper dimensions are determined by the current width and height of the browser window.
        var svgWidth = window.innerWidth - 700;
        var svgHeight = window.innerHeight - 300;

        console.log(Object.keys(jsonData));
        // var keys = Object.keys(jsonData);
        var data = jsonData;
        Object.keys(data).forEach(function (key){
            key.value = +key.value;
        });

        // Create SVG wrapper
        var svg = d3.select("#graphic")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g");

        var chart = svg.append('g');

        // Creating tooltips
        // var toolTip = d3.tip()
        //     .attr('class', 'tooltip')
        //     .offset([150,0])
        //     .html(function(data, index) {
        //         var word = data.key;
        //         return (`${word}`);
        //     });

        // Calling Tooltips
        // chart.call(toolTip);


        console.log(svgHeight/2, svgWidth/Object.keys(data).length);
        // Plotting circles
        chart.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(data) {
                return svgWidth/Object.keys(data).length;
            })
            .attr("cy", function(data) {
                return svgHeight/2;
            })
            .attr("r", function(data) {
                return 50;
            })
            .attr("fill", 'black')
            .attr("opacity", ".8")
            .on("mouseover", function(data, index) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", '60')
                    .style("fill", "yellow");
                //toolTip.show(data);
            })
            .on("mouseout", function(data, index) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", "50")
                    .style("fill", "black");
                //toolTip.hide(data);
            });
        
        console.log(Object.keys(data).length);
        // State Abbr add
        chart.selectAll('g')
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(data, index) { return ((index+1)/(Object.keys(jsonData.keys()).length+1) * svgWidth); })
            .attr("y", function(data) { return svgHeight/4 + 5; })
            .text(function (data) { return data.keys().toUpperCase(); })
            .attr('fill', 'white')
            .style("font-size", function(data) { return '22'; })
            .style("text-anchor", "middle");
    });
};