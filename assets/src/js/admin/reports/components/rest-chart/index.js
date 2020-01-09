import axios from 'axios'
import Chart from '../chart'
import { useState, useEffect, Fragment } from 'react'
import { useStoreValue } from '../../app/store';

const RESTChart = ({type, aspectRatio, endpoint, showLegend}) => {

	const [{ period }, dispatch] = useStoreValue()
	const [fetched, setFetched] = useState(null)

	useEffect(() => {

		console.log('period changed!', period)

		axios.get(wpApiSettings.root + 'give-api/v2/reports/' + endpoint, {
			params: {
				start: period.startDate.format('YYYY-MM-DD'),
				end: period.startDate.format('YYYY-MM-DD')
			},
			headers: {
				'X-WP-Nonce': wpApiSettings.nonce
			}
		})
		.then(function (response) {
			console.log(response)
			setFetched(response.data.data)
		})

	}, [period, endpoint])



	return (
		<Fragment>
			{fetched && (
				<Chart
					type={type}
					aspectRatio={aspectRatio}
					data={fetched}
					showLegend={showLegend}
				/>
			)}
		</Fragment>
	)
}
export default RESTChart
