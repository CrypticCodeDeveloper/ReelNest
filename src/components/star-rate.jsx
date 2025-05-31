import { Rate, ConfigProvider } from 'antd';


const StarRate = ({vote_average, star_size}) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Rate: {
                        starBg: '#f2efa9',
                        starSize: star_size ? star_size : '20px',
                    },
                },
            }}
        >

            <Rate disabled defaultValue={Number((vote_average / 2).toFixed(1))}
                  allowHalf/>

        </ConfigProvider>
    )
}
export default StarRate
