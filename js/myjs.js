$('.carousel').carousel({
    interval: 3000 // Change to the desired interval (in milliseconds)
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('energyChart').getContext('2d');
    const data = {
        labels: ['燃煤', '燃氣', '再生能源', '核能', '燃油', '抽蓄水力'],
        datasets: [
            {
                label: '2022年發電量占比 (%)',
                data: [42.07, 38.81, 8.27, 8.24, 1.54, 1.06],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: '2023年發電量占比 (%)',
                data: [42.24, 39.57, 9.47, 6.31, 1.34, 1.08],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        cutout: '50%',
        plugins: {
            legend: {
                display: true, // 隐藏图例
                onClick: () => {} // 禁用点击图例更新图表功能
            }
        }
    };

    const energyChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
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
