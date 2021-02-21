var feeling = ['Awesome', 'Normal', 'Tense', 'Horrible'];
var days = [];

function display() {
  days = [];

  days.push(document.getElementById("awesome").value);
  days.push(document.getElementById("normal").value);
  days.push(document.getElementById("tense").value);
  days.push(document.getElementById("horrible").value);



  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
      labels: ['awesome', 'normal', 'tense', 'horrible'],
      datasets: [{
        data: days,
        label: "Dream vs. Nightmare Breakdown",
        backgroundColor: [
          "#9EF3CE",
          "#A5EAF3 ",
          "#D2BEF3",
          "#B98CF1"
        ],
        borderColor: [
          "#52F0D1",
          "#6CDDF3 ",
          "#B17EF2",
          "#944AF2"
        ],
        fill: false
      }]
    },

    // Configuration options go here
    options: {
      title: {
        display: true,
        text: 'I woke up feeling...',
        fontSize: 36
      },
      animation: {
        animateScale: true
      }

    }
  });

}