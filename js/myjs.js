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