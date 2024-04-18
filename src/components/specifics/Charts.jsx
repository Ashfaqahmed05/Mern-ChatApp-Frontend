import { Line, Doughnut } from "react-chartjs-2"
import { Chart as ChartJs, Tooltip, Filler,
CategoryScale, LinearScale, PointElement, LineElement,
ArcElement, Legend} from "chart.js"
import { getLast7Days } from "../../lib/features"

ChartJs.register(
  Tooltip, Filler,
CategoryScale, LinearScale, PointElement, LineElement,
ArcElement, Legend
)

const labels = getLast7Days()

const lineChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    }
},
scales: {
  x:{
    grid:{
      display: false,
    },
  },
  y:{
    beginAtZero: true,
    grid:{
      display: false,
    },
  }
}
}
const LineChart = ({value = []}) => {

  const data = {
    labels,
  datasets: [{
    data:value,
    label: "Revenue",
    fill: false,
    backgroundColor:"lightblue", 
    borderColor: "darkpurple"
  }
]
  }

  return <Line data={data} options={lineChartOption}/>
}


const DoughnutChart = () => {
  return (
    <div>DoughnutChart</div>
  )
}



export  {LineChart, DoughnutChart};