import Chart from "react-apexcharts"
import { selectAllUsers,selectActiveUsers } from "../users/usersSlice"
import { useSelector} from "react-redux"

const BarChart = () => {
  // *** required states ***
  const AllUsers = useSelector(selectAllUsers)
  const ActiveUsers = useSelector(selectActiveUsers)

  const chartProps = {
    options: {
      chart: {
        id: "basic-bar",
        fontFamily: 'Nunito, sans-serif',
        background: '#fff',
        foreColor: '#213F7D'
      },
      xaxis: {
        categories: ['all', 'actives','loans','savings']
      },
      plotOptions:{
        bar:{
          horizontal: true
        }
      },
      fill:{
        colors: ['#39CDCC']
      },
      dataLabels:{
        enabled: false
      },
  
    },
    series: [
      {
        name: "users",
        data: [AllUsers.length,ActiveUsers.length,100,100]
      }
    ]
  
  }

  return (
    <Chart 
       options={chartProps.options}
       series={chartProps.series}
       type='bar' 
       height='100%'
       width='100%'
    />
  )
}

export default BarChart