// Create the chart
Highcharts.chart('containerbarchart', {
  chart: {
    type: 'column'
  },
  accessibility: {
    announceNewData: {
      enabled: true
    }
  },
  xAxis: {
    labels: {
      enabled: false
    }
  },
  yAxis: {
    title: {
      text: ''
    }

  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.y:.1f}%',
        style: {
          color: '#0C569E'
        }
      }
    }
  },
  tooltip: {
  },

  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
          name: "",
          y: 62.74,
          drilldown: "Chrome",
          color: '#0C569E'
        },
        {
          name: "Firefox",
          y: 10.57,
          drilldown: null,
          color: '#0C569E'
        },
        {
          name: "Internet Explorer",
          y: 7.23,
          drilldown: "Internet Explorer",
          color: '#0C569E'
        },
        {
          name: "Safari",
          y: 5.58,
          drilldown: "Safari",
          color: '#0C569E'
        },
        {
          name: "Edge",
          y: 4.02,
          drilldown: "Edge",
          color: '#0C569E'
        },
        {
          name: "Opera",
          y: 1.92,
          drilldown: "Opera",
          color: '#0C569E'
        }
      ]
    }
  ],
});