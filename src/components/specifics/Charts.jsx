import {
  ArcElement,
  CategoryScale,
  Chart as ChartJs,
  Filler,
  Legend,
  LineElement,
  LinearScale, PointElement,
  Tooltip
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import { getLast7Days } from "../../lib/features"

ChartJs.register(
  Tooltip, Filler,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Legend
)

const labels = getLast7Days()

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
    cutout:110,
}

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
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    }
  }
}
const LineChart = ({ value = [] }) => {

  const data = {
    labels,
    datasets: [{
      data: value,
      label: "Revenue",
      fill: false,
      backgroundColor: "#fc9526",
      borderColor: "#1ba1d0"
    }
    ]
  }

  return <Line data={data} options={lineChartOption} />
}


const DoughnutChart = ({value =[], labels = [] }) => {

  const data = {
    labels,
    datasets: [{
      data: value,
      label: "Total Chats vs Group Chats",
      backgroundColor: ["#fc9526" , "#1ba1d0"],
      borderColor: ["#af5a00", "#024e68"],
      offset: "20"
    }
    ]
  }


  return (
    <Doughnut style={{zIndex: 10}} data={data} options={DoughnutChartOptions}/>
  )
}



export { DoughnutChart, LineChart }
