$(document).ready(function(){
    var ctxA = document.getElementById("myChart").getContext("2d");
    var ctxB = document.getElementById("myChart1").getContext("2d");
    var ctxC = document.getElementById("myChart2").getContext("2d");

    let data_A1 = [{
            x: "2010",
            y: "130"
        },
        {
            x: "2011",
            y: "110"
        },
        {
            x: "2012",
            y: "160"
        },
        {
            x: "2013",
            y: "150"
        },
        {
            x: "2014",
            y: "140"
        },
        {
            x: "2015",
            y: "160"
        },
        {
            x: "2016",
            y: "150"
        },
        {
            x: "2017",
            y: "300"
        },
        {
            x: "2018",
            y: "400"
        },
        {
            x: "2019",
            y: "500"
        },
        {
            x: "2020",
            y: "550"
        }
    ];

    let data_B1 = [{
            x: "2010",
            y: "130"
        },
        {
            x: "2011",
            y: "110"
        },
        {
            x: "2012",
            y: "160"
        },
        {
            x: "2013",
            y: "150"
        },
        {
            x: "2014",
            y: "140"
        },
        {
            x: "2015",
            y: "160"
        },
        {
            x: "2016",
            y: "150"
        },
        {
            x: "2017",
            y: "300"
        },
        {
            x: "2018",
            y: "400"
        },
        {
            x: "2019",
            y: "500"
        },
        {
            x: "2020",
            y: "550"
        }
    ];

    let data_C1 = [{
            x: "2010",
            y: "130"
        },
        {
            x: "2011",
            y: "110"
        },
        {
            x: "2012",
            y: "160"
        },
        {
            x: "2013",
            y: "150"
        },
        {
            x: "2014",
            y: "140"
        },
        {
            x: "2015",
            y: "160"
        },
        {
            x: "2016",
            y: "150"
        },
        {
            x: "2017",
            y: "300"
        },
        {
            x: "2018",
            y: "400"
        },
        {
            x: "2019",
            y: "500"
        },
        {
            x: "2020",
            y: "550"
        }
    ];


    var myChartA = new Chart(ctxA, {
        type: 'line',
        data: {
            datasets: [{
                label: '1st Data',
                data: data_A1,
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: '#358EE8',
                pointBackgroundColor: "#358EE8",
                showLine: true
            }]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormat: 'h:mm',
                    }
                }]
            }
        }
    });

    var myChartB = new Chart(ctxB, {
        type: 'line',
        data: {
            datasets: [{
                label: '1st Data',
                data: data_B1,
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: '#358EE8',
                pointBackgroundColor: "#358EE8",
                showLine: true
            }]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormat: 'h:mm',
                    }
                }]
            }
        }
    });

    var myChartC = new Chart(ctxC, {
        type: 'line',
        data: {
            datasets: [{
                label: '1st Data',
                data: data_C1,
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: '#358EE8',
                pointBackgroundColor: "#358EE8",
                showLine: true
            }]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormat: 'h:mm',
                    }
                }]
            }
        }
    });


    // var legendItems = document.querySelector('.legend').getElementsByTagName('li');
    // for (var i = 0; i < legendItems.length; i++) {
    //   legendItems[i].addEventListener("click", legendClickCallback.bind(this,i), false);
    // }

    // function legendClickCallback(legendItemIndex){
    //   document.querySelectorAll('.myChart').forEach((chartItem,index)=>{
    //     var chart = Chart.instances[index];
    //     var dataItem = chart.data.datasets[legendItemIndex]    
    //     if(dataItem.hidden == true || dataItem.hidden == null){
    //       dataItem.hidden = false;
    //     } else {
    //       dataItem.hidden = true;
    //     }
    //     chart.update();
    //   })  
    // }
});