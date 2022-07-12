const bar_labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const bar_data = {
    labels: bar_labels,
    datasets: [{
      label: 'Total Home Sales',
      data: [0, 10, 5, 2, 20, 30, 45, 10, 30, 42, 13, 65],
      backgroundColor: "#0000FF",
    }]
  };

  const bar_config = {
    type: 'bar',
    data: bar_data,
    options: {}
  };

  const barChart = new Chart(
    document.getElementById('barChart'),
    bar_config
  );