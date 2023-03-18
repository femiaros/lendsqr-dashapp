import Chart from "react-apexcharts"
import { selectAllUsers,selectActiveUsers } from "../users/usersSlice"
import { useSelector} from "react-redux"

const AreaChart = () => {
    // *** required states ***
    const AllUsers = useSelector(selectAllUsers)
    const ActiveUsers = useSelector(selectActiveUsers)

    const chartProps = {
        options: {
            colors: ['#1b222f'],
            chart:{
                id: "basic-bar",
                fontFamily: 'Nunito, sans-serif',
                background: '#fff',
                foreColor: '#213F7D'
            },
            xaxis: {
                categories: ['all', 'actives','loans','savings']
            },
            dataLabels:{
                enabled: false
            },
            title:{
                text: `All User's Plot`,
                align: 'left',
                margin:10,
                offsetY:0,
                style:{
                    fontSize: '15px',
                    color: '#213F7D'
                }
            }
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
       type='area' 
       height='100%'
       width='100%'
    />
  )
}

export default AreaChart