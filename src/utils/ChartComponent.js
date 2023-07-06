import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ChartComponent = () => {
	// const chartContainerRef = useRef(null);

	// useEffect(() => {
	//   // Generate some sample data
	//   const data = [
	//     { name: 'A', value: 20 },
	//     { name: 'B', value: 50 },
	//     { name: 'C', value: 30 },
	//   ];

	// Set up chart dimensions
	//   const width = 300;
	//   const height = 200;

	//   // Select chart container element
	//   const chartContainer = d3.select(chartContainerRef.current);

	//   // Clear existing content
	//   chartContainer.selectAll('*').remove();

	//   // Create SVG element
	//   const svg = chartContainer
	//     .append('svg')
	//     .attr('width', width)
	//     .attr('height', height);

	//   // Create scales for x and y axes
	//   const xScale = d3
	//     .scaleBand()
	//     .domain(data.map((d) => d.name))
	//     .range([0, width])
	//     .padding(0.2);

	//   const yScale = d3
	//     .scaleLinear()
	//     .domain([0, d3.max(data, (d) => d.value)])
	//     .range([height, 0]);

	//   // Create bars
	//   svg
	//     .selectAll('rect')
	//     .data(data)
	//     .enter()
	//     .append('rect')
	//     .attr('x', (d) => xScale(d.name))
	//     .attr('y', (d) => yScale(d.value))
	//     .attr('width', xScale.bandwidth())
	//     .attr('height', (d) => height - yScale(d.value))
	//     .attr('fill', 'steelblue');

	//   // Create x-axis
	//   const xAxis = d3.axisBottom().scale(xScale);
	//   svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

	//   // Create y-axis
	//   const yAxis = d3.axisLeft().scale(yScale);
	//   svg.append('g').call(yAxis);
	// }, []);

  return (
      <div className=" text-center text-bold text-2xl p-24">
          No Data Available at the moment...
      </div>
  );
	
};

export default ChartComponent;
