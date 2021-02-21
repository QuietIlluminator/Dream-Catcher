var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var number = [];

        function display() {
          number = [];
          
          number.push(document.getElementById("sundayNumber").value);
          number.push(document.getElementById("mondayNumber").value);
          number.push(document.getElementById("tuesdayNumber").value);
          number.push(document.getElementById("wednesdayNumber").value);
          number.push(document.getElementById("thursdayNumber").value);
          number.push(document.getElementById("fridayNumber").value);
          number.push(document.getElementById("saturdayNumber").value);

        

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: days,
                datasets: [{
                  data: number,
                  label: "Daily sleep",
                  backgroundColor: 'rgb(119, 224, 203)',
                  borderColor: 'rgb(119, 224, 203)',  
                  fill: false    
                }]
            },

            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: 'Tracking Your Dreams',
                    fontSize: 36
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Dreams',
                            fontSize: 36
                            
                        }
                    }],

                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Days',
                            fontSize: 36
                        }
                    }]
                }
            }
        });

        }