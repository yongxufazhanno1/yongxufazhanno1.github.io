$('.carousel').carousel({
    interval: 3000 // Change to the desired interval (in milliseconds)
  });

// script.js

const residentialData = [
    { country: "馬來西亞", value: 1.4888 },
    { country: "中國", value: 2.4238 },
    { country: "墨西哥", value: 2.6204 },
    { country: "土耳其", value: 2.6655 },
    { country: "台灣", value: 2.6849 },
    { country: "南韓", value: 3.1806 },
    { country: "泰國", value: 3.6626 },
    { country: "加拿大", value: 3.7198 },
    { country: "美國", value: 4.5034 }, 
    { country: "澳洲", value: 5.9554 },
    { country: "日本", value: 7.8372 },
    { country: "法國", value: 8.3919 },
 
    // ... add remaining data
];

const industrialData = [
    { country: "馬來西亞", value: 2.2928 },
    { country: "美國", value: 2.5175 },
    { country: "台灣", value: 2.7624 },
    { country: "加拿大", value: 2.7992 },
    { country: "中國", value: 2.8139 },
    { country: "南韓", value: 2.8372 },
    { country: "泰國", value: 2.9479 },
    { country: "法國", value: 4.0830 },
    { country: "澳洲", value: 4.7643 },
    { country: "日本", value: 5.2965 },
    // ... add remaining data
];

function createBars(data, containerId, maxValue, minValue) {
    const container = document.getElementById(containerId).querySelector('.bars');
    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        if (item.value === maxValue) {
            bar.setAttribute('data-max', 'true'); // Highlight max value
        } else if (item.value === minValue) {
            bar.setAttribute('data-min', 'true'); // Highlight min value
        }
        bar.setAttribute('data-country', item.country);
        bar.setAttribute('data-value', item.value);
        bar.style.width = 0; // Start with width 0 for dynamic effect
        container.appendChild(bar);
    });
}

function animateBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.width = (bar.getAttribute('data-value') / entry.target.dataset.maxValue * 100) + '%'; // Adjust the width based on the max value
            });
            observer.unobserve(entry.target); // Stop observing once the animation is done
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const residentialMaxValue = Math.max(...residentialData.map(item => item.value));
    const residentialMinValue = Math.min(...residentialData.map(item => item.value));
    const industrialMaxValue = Math.max(...industrialData.map(item => item.value));
    const industrialMinValue = Math.min(...industrialData.map(item => item.value));
    
    createBars(residentialData, 'residentialChart', residentialMaxValue, residentialMinValue);
    createBars(industrialData, 'industrialChart', industrialMaxValue, industrialMinValue);

    const observer = new IntersectionObserver(animateBars, { threshold: 0.1 });
    const residentialChart = document.getElementById('residentialChart');
    const industrialChart = document.getElementById('industrialChart');

    residentialChart.dataset.maxValue = residentialMaxValue;
    industrialChart.dataset.maxValue = industrialMaxValue;

    observer.observe(residentialChart);
    observer.observe(industrialChart);
});

document.addEventListener("DOMContentLoaded", function () {
    const energyData = [
        { year: 2013, coal: 30.84, oil: 46.97, gas: 11.94, nuclear: 8.44, renewable: 1.81 },
        { year: 2014, coal: 29.86, oil: 47.88, gas: 12.25, nuclear: 8.34, renewable: 1.66 },
        { year: 2015, coal: 29.95, oil: 47.72, gas: 13.31, nuclear: 7.29, renewable: 1.73 },
        { year: 2016, coal: 29.64, oil: 48.42, gas: 13.79, nuclear: 6.31, renewable: 1.84 },
        { year: 2017, coal: 30.47, oil: 47.99, gas: 15.29, nuclear: 4.48, renewable: 1.78 },
        { year: 2018, coal: 29.73, oil: 47.67, gas: 15.36, nuclear: 5.45, renewable: 1.80 },
        { year: 2019, coal: 30.20, oil: 46.31, gas: 15.15, nuclear: 6.38, renewable: 1.97 },
        { year: 2020, coal: 30.41, oil: 43.46, gas: 17.38, nuclear: 6.65, renewable: 2.10 },
        { year: 2021, coal: 31.11, oil: 42.81, gas: 18.28, nuclear: 5.64, renewable: 2.16 },
        { year: 2022, coal: 29.68, oil: 43.70, gas: 19.12, nuclear: 4.90, renewable: 2.60 }
    ];

    const energyChart = document.getElementById('energyChart');

    energyData.forEach(item => {
        const barContainer = document.createElement('div');
        barContainer.classList.add('energy-bar-container');

        const totalHeight = item.coal + item.oil + item.gas + item.nuclear + item.renewable;

        const createBarSegment = (height, className) => {
            const segment = document.createElement('div');
            segment.classList.add('energy-bar', className);
            segment.style.height = `${(height / totalHeight) * 100}%`;
            return segment;
        };

        barContainer.appendChild(createBarSegment(item.coal, 'energy-coal'));
        barContainer.appendChild(createBarSegment(item.oil, 'energy-oil'));
        barContainer.appendChild(createBarSegment(item.gas, 'energy-gas'));
        barContainer.appendChild(createBarSegment(item.nuclear, 'energy-nuclear'));
        barContainer.appendChild(createBarSegment(item.renewable, 'energy-renewable'));

        const label = document.createElement('div');
        label.classList.add('energy-label');
        label.textContent = item.year;
        barContainer.appendChild(label);

        energyChart.appendChild(barContainer);
    });

    const energyBars = document.querySelectorAll('.energy-bar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= energyChart.offsetTop) {
            energyBars.forEach(bar => {
                const heights = Array.from(bar.children)
                    .filter(child => child.classList.contains('energy-bar'))
                    .map(child => child.style.height);

                let cumulativeHeight = 0;
                heights.forEach((height, index) => {
                    const currentBar = bar.children[index];
                    cumulativeHeight += parseFloat(height);
                    currentBar.style.height = `${cumulativeHeight}%`;
                });
            });
        }
    });
});