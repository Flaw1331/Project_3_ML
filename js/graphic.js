// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#graphic").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    };


    // SVG wrapper dimensions are determined by the current width and height of the browser window.
    var svgWidth = 1600
    var svgHeight = 900;

    // Creating final word list
    var wordList = ['yes', 'no', 'up', 'down', 'left', 'right', 'on', 'off', 'stop', 'go'];

    //  --------------------------------------
    var posArray = [0,10,20,30,40,50,60,70,80,90];
    //  --------------------------------------

    // Create SVG wrapper
    var svg = d3.select("#graphic")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g");

    var chart = svg.append('g');

    // Append a div to the body to create tooltips, assign it a class
    // d3.select("#graphic").select('svg')
    //     .append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);

    // Creating tooltips
    var toolTip = d3.tip()
        .attr('class', 'tooltip')
        .offset([150,0])
        .html(function(wordList, index) {
            var word = wordList;
            //
            return (`${word}`);
        });

    // Calling Tooltips
    chart.call(toolTip);

    // Plotting circles
    chart.selectAll("circle")
        .data(posArray)
        .enter()
        .append("circle")
        .attr("cx", function(data, index) {
            return ((index+1)/(posArray.length+1) * svgWidth);
        })
        .attr("cy", function(data, index) {
            return svgHeight/4;
        })
        .attr("r", function(data, index) {
            return svgHeight*.04;
        })
        .attr("fill", 'black')
        .on("mouseover", function(data, index) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("r", svgHeight*.05)
                .style("fill", "red");
            toolTip.show(data);
        })
        .on("mouseout", function(data, index) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("r", svgHeight*.04)
                .style("fill", "black");
            toolTip.hide(data);
        });

    // State Abbr add
    chart.selectAll('g')
        .data(wordList)
        .enter()
        .append("text")
        .attr("x", function(data, index) { return ((index+1)/(posArray.length+1) * svgWidth); })
        .attr("y", function(data) { return svgHeight/4; })
        .text(function (data) { return data; })
        .attr('fill', 'white')
        .style("font-size", function(data) { return svgHeight*.02; })
        .style("text-anchor", "middle");
};