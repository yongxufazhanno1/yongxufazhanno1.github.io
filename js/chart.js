
		document.addEventListener('DOMContentLoaded', function () {
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

    const maxResidentialValue = Math.max(...residentialData.map(d => d.value));
    const minResidentialValue = Math.min(...residentialData.map(d => d.value));
    const maxIndustrialValue = Math.max(...industrialData.map(d => d.value));
    const minIndustrialValue = Math.min(...industrialData.map(d => d.value));

    createBars(residentialData, 'residentialChart', maxResidentialValue, minResidentialValue);
    createBars(industrialData, 'industrialChart', maxIndustrialValue, minIndustrialValue);

    const observer = new IntersectionObserver(animateBars, { threshold: 0.1 });
    document.querySelectorAll('.chart').forEach(chart => {
        chart.dataset.maxValue = Math.max(...Array.from(chart.querySelectorAll('.bar')).map(bar => parseFloat(bar.getAttribute('data-value'))));
        observer.observe(chart);
    });
});

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

