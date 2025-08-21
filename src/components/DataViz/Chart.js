import React, { useState, useRef, useEffect } from 'react';
import './Chart.scss';

const Chart = ({
    type = 'line',
    data = [],
    options = {},
    height = 300,
    width = '100%',
    className = '',
    onDataPointClick,
    interactive = true,
    showLegend = true,
    showGrid = true,
    showTooltip = true
}) => {
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);
    const tooltipRef = useRef(null);

    // * Default chart options
    const defaultOptions = {
        colors: [
            'var(--primary-500)',
            'var(--secondary-500)',
            'var(--accent-500)',
            'var(--success-500)',
            'var(--warning-500)',
            'var(--info-500)'
        ],
        strokeWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        gridColor: 'var(--border-subtle)',
        gridOpacity: 0.3,
        fontFamily: 'var(--font-family-sans)',
        fontSize: 'var(--fs-14)',
        ...options
    };

    // * Process data for different chart types
    const processData = () => {
        switch (type) {
            case 'line':
                return processLineData();
            case 'bar':
                return processBarData();
            case 'pie':
                return processPieData();
            case 'area':
                return processAreaData();
            default:
                return processLineData();
        }
    };

    const processLineData = () => {
        if (!data || data.length === 0) return [];

        const processed = data.map((series, index) => ({
            ...series,
            color: series.color || defaultOptions.colors[index % defaultOptions.colors.length],
            strokeWidth: series.strokeWidth || defaultOptions.strokeWidth,
            pointRadius: series.pointRadius || defaultOptions.pointRadius
        }));

        return processed;
    };

    const processBarData = () => {
        if (!data || data.length === 0) return [];

        return data.map((item, index) => ({
            ...item,
            color: item.color || defaultOptions.colors[index % defaultOptions.colors.length]
        }));
    };

    const processPieData = () => {
        if (!data || data.length === 0) return [];

        let total = 0;
        const processed = data.map((item, index) => {
            total += item.value;
            return {
                ...item,
                color: item.color || defaultOptions.colors[index % defaultOptions.colors.length]
            };
        });

        return processed.map(item => ({
            ...item,
            percentage: (item.value / total) * 100
        }));
    };

    const processAreaData = () => {
        if (!data || data.length === 0) return [];

        return data.map((series, index) => ({
            ...series,
            color: series.color || defaultOptions.colors[index % defaultOptions.colors.length],
            fillOpacity: series.fillOpacity || 0.2
        }));
    };

    // * Calculate chart dimensions and scales
    const calculateScales = () => {
        const chartWidth = chartRef.current?.offsetWidth || 400;
        const chartHeight = height;
        const padding = 40;

        const availableWidth = chartWidth - (padding * 2);
        const availableHeight = chartHeight - (padding * 2);

        return {
            width: availableWidth,
            height: availableHeight,
            padding,
            chartWidth,
            chartHeight
        };
    };

    // * Handle mouse events for interactivity
    const handleMouseMove = (e) => {
        if (!interactive) return;

        const rect = chartRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // * Find closest data point
        const closestPoint = findClosestPoint(x, y);

        if (closestPoint) {
            setHoveredPoint(closestPoint);
            setTooltipPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
        setHoveredPoint(null);
    };

    const handleClick = (e) => {
        if (!interactive || !onDataPointClick) return;

        const rect = chartRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedPoint = findClosestPoint(x, y);
        if (clickedPoint) {
            onDataPointClick(clickedPoint);
        }
    };

    // * Find closest data point to mouse position
    const findClosestPoint = (mouseX, mouseY) => {
        // * Implementation depends on chart type
        // * This is a simplified version
        return null;
    };

    // * Render chart based on type
    const renderChart = () => {
        const processedData = processData();

        switch (type) {
            case 'line':
                return renderLineChart(processedData);
            case 'bar':
                return renderBarChart(processedData);
            case 'pie':
                return renderPieChart(processedData);
            case 'area':
                return renderAreaChart(processedData);
            default:
                return renderLineChart(processedData);
        }
    };

    const renderLineChart = (data) => {
        const scales = calculateScales();

        return (
            <svg
                width={scales.chartWidth}
                height={scales.chartHeight}
                className="chart__svg"
            >
                {/* * Grid */}
                {showGrid && renderGrid(scales)}

                {/* * Axes */}
                {renderAxes(scales)}

                {/* * Data lines */}
                {data.map((series, seriesIndex) => (
                    <g key={seriesIndex} className="chart__series">
                        {series.data.map((point, pointIndex) => (
                            <circle
                                key={pointIndex}
                                cx={scales.padding + (point.x / 100) * scales.width}
                                cy={scales.padding + (point.y / 100) * scales.height}
                                r={hoveredPoint === point ? series.pointHoverRadius : series.pointRadius}
                                fill={series.color}
                                className="chart__point interactive"
                                onMouseEnter={() => setHoveredPoint(point)}
                                onMouseLeave={() => setHoveredPoint(null)}
                            />
                        ))}

                        {/* * Connect points with lines */}
                        <path
                            d={generatePath(series.data, scales)}
                            stroke={series.color}
                            strokeWidth={series.strokeWidth}
                            fill="none"
                            className="chart__line"
                        />
                    </g>
                ))}
            </svg>
        );
    };

    const renderBarChart = (data) => {
        const scales = calculateScales();
        const barWidth = scales.width / data.length * 0.8;

        return (
            <svg
                width={scales.chartWidth}
                height={scales.chartHeight}
                className="chart__svg"
            >
                {/* * Grid */}
                {showGrid && renderGrid(scales)}

                {/* * Bars */}
                {data.map((item, index) => (
                    <rect
                        key={index}
                        x={scales.padding + (index * scales.width / data.length) + (scales.width / data.length - barWidth) / 2}
                        y={scales.padding + (item.y / 100) * scales.height}
                        width={barWidth}
                        height={scales.height - (item.y / 100) * scales.height - scales.padding}
                        fill={item.color}
                        className="chart__bar interactive"
                        onMouseEnter={() => setHoveredPoint(item)}
                        onMouseLeave={() => setHoveredPoint(null)}
                    />
                ))}
            </svg>
        );
    };

    const renderPieChart = (data) => {
        const scales = calculateScales();
        const radius = Math.min(scales.width, scales.height) / 2 * 0.8;
        const centerX = scales.padding + scales.width / 2;
        const centerY = scales.padding + scales.height / 2;

        let currentAngle = 0;

        return (
            <svg
                width={scales.chartWidth}
                height={scales.chartHeight}
                className="chart__svg"
            >
                {data.map((item, index) => {
                    const angle = (item.percentage / 100) * 2 * Math.PI;
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + angle;

                    const x1 = centerX + radius * Math.cos(startAngle);
                    const y1 = centerY + radius * Math.sin(startAngle);
                    const x2 = centerX + radius * Math.cos(endAngle);
                    const y2 = centerY + radius * Math.sin(endAngle);

                    const largeArcFlag = angle > Math.PI ? 1 : 0;

                    const pathData = [
                        `M ${centerX} ${centerY}`,
                        `L ${x1} ${y1}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        'Z'
                    ].join(' ');

                    currentAngle += angle;

                    return (
                        <path
                            key={index}
                            d={pathData}
                            fill={item.color}
                            className="chart__pie-segment interactive"
                            onMouseEnter={() => setHoveredPoint(item)}
                            onMouseLeave={() => setHoveredPoint(null)}
                        />
                    );
                })}
            </svg>
        );
    };

    const renderAreaChart = (data) => {
        // * Similar to line chart but with filled areas
        return renderLineChart(data);
    };

    // * Helper functions
    const generatePath = (points, scales) => {
        if (points.length < 2) return '';

        const pathData = points.map((point, index) => {
            const x = scales.padding + (point.x / 100) * scales.width;
            const y = scales.padding + (point.y / 100) * scales.height;
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        });

        return pathData.join(' ');
    };

    const renderGrid = (scales) => {
        const gridLines = [];
        const gridStep = scales.width / 10;

        for (let i = 0; i <= 10; i++) {
            const x = scales.padding + i * gridStep;
            gridLines.push(
                <line
                    key={`grid-v-${i}`}
                    x1={x}
                    y1={scales.padding}
                    x2={x}
                    y2={scales.padding + scales.height}
                    stroke={defaultOptions.gridColor}
                    strokeOpacity={defaultOptions.gridOpacity}
                    className="chart__grid-line"
                />
            );
        }

        return <g className="chart__grid">{gridLines}</g>;
    };

    const renderAxes = (scales) => {
        return (
            <g className="chart__axes">
                {/* * X-axis */}
                <line
                    x1={scales.padding}
                    y1={scales.padding + scales.height}
                    x2={scales.padding + scales.width}
                    y2={scales.padding + scales.height}
                    stroke="var(--border-strong)"
                    strokeWidth="1"
                    className="chart__axis"
                />

                {/* * Y-axis */}
                <line
                    x1={scales.padding}
                    y1={scales.padding}
                    x2={scales.padding}
                    y2={scales.padding + scales.height}
                    stroke="var(--border-strong)"
                    strokeWidth="1"
                    className="chart__axis"
                />
            </g>
        );
    };

    // * Render legend
    const renderLegend = () => {
        if (!showLegend) return null;

        const processedData = processData();

        return (
            <div className="chart__legend">
                {processedData.map((series, index) => (
                    <div key={index} className="chart__legend-item">
                        <div
                            className="chart__legend-color"
                            style={{ backgroundColor: series.color }}
                        />
                        <span className="chart__legend-label">
                            {series.label || `Series ${index + 1}`}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // * Render tooltip
    const renderTooltip = () => {
        if (!showTooltip || !isVisible || !hoveredPoint) return null;

        return (
            <div
                ref={tooltipRef}
                className="chart__tooltip"
                style={{
                    left: tooltipPosition.x + 10,
                    top: tooltipPosition.y - 10,
                    transform: 'translateY(-50%)'
                }}
            >
                <div className="chart__tooltip-content">
                    <div className="chart__tooltip-title">
                        {hoveredPoint.label || 'Data Point'}
                    </div>
                    <div className="chart__tooltip-value">
                        {hoveredPoint.value || hoveredPoint.y}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`chart chart--${type} ${className}`}
            style={{ height, width }}
        >
            <div
                ref={chartRef}
                className="chart__container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {renderChart()}
                {renderTooltip()}
            </div>

            {renderLegend()}
        </div>
    );
};

export default Chart;
