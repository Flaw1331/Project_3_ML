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
    var svgWidth = window.innerWidth - 100;
    var svgHeight = window.innerHeight - 280;

    // Retrieve data from the CSV file and execute everything below
    d3.csv("http://localhost/data/data.csv", function (err, recordData) {
        
        // Error check
        if (err) throw err;
    
        // Parse data
        recordData.forEach(function (data) {
            data.train_acc = +data.train_acc;
            data.train_err = +data.train_err;
            data.test_acc = +data.test_acc;
            data.test_err = +data.test_err;
        });

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
            .html(function(data, index) {
                var word = data.word;
                //
                return (`${word}`);
            });

        // Calling Tooltips
        chart.call(toolTip);

        // Plotting circles
        chart.selectAll("circle")
            .data(recordData)
            .enter()
            .append("circle")
            .attr("cx", function(data, index) {
                return ((index+1)/(data.length+1) * svgWidth);
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
                    .style("fill", "red");
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
            .text(function (data) { return (data.name).toUpperCase(); })
            .attr('fill', 'white')
            .style("font-size", function() { return '22'; })
            .style("text-anchor", "middle");

    });
};