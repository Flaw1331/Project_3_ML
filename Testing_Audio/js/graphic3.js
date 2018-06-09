// When the browser window is resized, responsify() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that automatically resizes the chart
function makeResponsive() {

    // Find json data
    d3.json("/predict", function (error, jsonData) {

        // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
        var svgArea = d3.select("#graphic").select("svg");
        if (!svgArea.empty()) {
            svgArea.remove();
        };

        console.log(Object.keys(jsonData).length)
        
        var labels = []
        var scores = []
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                labels.push(key)
                scores.push(jsonData[key])
            }
        }
        console.log(labels);
        console.log(scores);



        // SVG wrapper dimensions are determined by the current width and height of the browser window.
        var svgWidth = window.innerWidth - 100;
        var svgHeight = window.innerHeight - 280;

        // Creating final word list
        // var wordList = ['yes', 'no', 'up', 'down', 'left', 'right', 'on', 'off', 'stop', 'go'];

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

        // Creating tooltips
        var toolTip = d3.tip()
            .attr('class', 'tooltip')
            .offset([150,0])
            .html(function(jsonData, index) {
                var word = data[index];
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
                return '50';
            })
            .attr("fill", 'black')
            .attr("opacity", ".8")
            .on("mouseover", function(data, index) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", '60')
                    .style("fill", "yellow");
                toolTip.show(data);
            })
            .on("mouseout", function(data, index) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", "50")
                    .style("fill", "black");
                toolTip.hide(data);
            });

        // State Abbr add
        chart.selectAll('g')
            .data(wordList)
            .enter()
            .append("text")
            .attr("x", function(data, index) { return ((index+1)/(data.length+1) * svgWidth); })
            .attr("y", function(data) { return svgHeight/4 + 5; })
            .text(function (data) { return data.toUpperCase(); })
            .attr('fill', 'white')
            .style("font-size", function(data) { return '22'; })
            .style("text-anchor", "middle");
    });
};