export function sortCryptoData(
	data: any,
	sortBy: any,
	sortOrder: any,
) {
	return data.sort((a: any, b: any) => {
		const valueA = getSortValue(a, sortBy);
		const valueB = getSortValue(b, sortBy);

		if (
			typeof valueA === 'string' &&
			typeof valueB === 'string'
		) {
			return sortOrder === 'asc'
				? valueA.localeCompare(valueB)
				: valueB.localeCompare(valueA);
		} else if (
			typeof valueA === 'number' &&
			typeof valueB === 'number'
		) {
			return sortOrder === 'asc'
				? valueA - valueB
				: valueB - valueA;
		} else {
			return 0;
		}
	});
}

export function getSortValue(asset: any, sortBy: any) {
	if (sortBy === 'amount') {
		return asset.amount * asset.price;
	} else if (sortBy === 'todayProfit') {
		return (
			asset.amount *
			asset.price *
			(asset.percent_change_24h / 100)
		);
	} else {
		return asset[sortBy];
	}
}

export function mapCryptoData(asset: any, symbolData: any) {
	return {
		id: asset.id,
		cryptoId: asset.cryptoId,
		amount: asset.amount,
		symbol: symbolData.symbol,
		name: symbolData.name,
		image: symbolData.image,
		price: symbolData.current_price,
		marketCap: symbolData.market_cap,
		volume24h: symbolData.total_volume,
		change24h: symbolData.price_change_percentage_24h,
		lastUpdated: symbolData.last_updated,
		percent_change_1h:
			symbolData.price_change_percentage_1h_in_currency,
		percent_change_24h:
			symbolData.price_change_percentage_24h_in_currency,
		percent_change_7d:
			symbolData.price_change_percentage_7d_in_currency,
		percent_change_30d:
			symbolData.price_change_percentage_30d_in_currency,
		circulating_supply: symbolData.circulating_supply,
		max_supply: symbolData.max_supply,
		sparkline_in_7d: symbolData.sparkline_in_7d,
	};
}
