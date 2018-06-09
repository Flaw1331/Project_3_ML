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
        // var svgArea = d3.select("#graphic").select("svg");
        // if (!svgArea.empty()) {
        //     svgArea.remove();
        // };

        // Static arrays
        var keysList = [];
        var valueList = [];
        var valueListUnedit = [];

        // SVG wrapper dimensions are determined by the current width and height of the browser window.
        var svgWidth = d3.select('.row').node().getBoundingClientRect().width;
        var svgHeight = window.innerHeight - 300;


        var data = jsonData;
        console.log(data);
        Object.keys(data).forEach(function (key){
            key.value = +key.value;
            valueListUnedit.push(data[key]);
            valueList.push(Math.round(data[key]));
            keysList.push(key);
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
        //     .offset([-150,0])
        //     .html(function(data, index) {
        //         var word = keysList[index];
        //         return (`${word}`);
        //     });

        // Calling Tooltips
        // chart.call(toolTip);

        // Plotting circles
        chart.selectAll("circle")
            .data(keysList)
            .enter()
            .append("circle")
            .attr("cx", function(data, index) {
                return ((index+1)/(keysList.length+1)) * svgWidth;
            })
            .attr("cy", function(data, index) {
                return (svgHeight/2)+(-100*(valueList[index]/1));
            })
            .attr("r", function(data) {
                return 20;
            })
            .attr("fill", function(data, index) {
                if (valueList[index] > 0)
                    return 'green';
                else
                    return 'red';
            })
            .attr("stroke", 'black')
            .attr("stroke-width", 2)
            .attr("opacity", ".8")
            .on("mouseover", function(data, index) {
                if (valueList[index] > 0)
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("r", '60');
                else
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("r", '40');
                //toolTip.show(data);
            })
            .on("mouseout", function(data, index) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("r", "20");
                //toolTip.hide(data);
            });

        // Circle text add
        chart.selectAll('g')
            .data(keysList)
            .enter()
            .append("text")
            .attr("x", function(data, index) { 
                return ((index+1)/(keysList.length+1)) * svgWidth; 
            })
            .attr("y", function(data, index) { 
                return (svgHeight/2)+(-100*(valueList[index]/1))+5; 
            })
            .text(function (data) { return data.toUpperCase(); })
            .attr('fill', 'white')
            .style("font-size", function(data) { return '12'; })
            .style("text-anchor", "middle");
    });
};