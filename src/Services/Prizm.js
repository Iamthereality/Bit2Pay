export default class {
    #api_base = 'https://api.prizmbit.com/api/po/MarketData/GetMarketPrices';

    get_data = async (url) => {
        const server_response = await fetch(`${this.#api_base}${url}`);
        if (!server_response.ok) {
            throw new Error(`Could not fetch ${this.#api_base}${url}, received ${server_response.status}`);
        }
        return await server_response.json();
    };

    get_currency_prices = async (selected_currency) => {
        const server_response = await this.get_data(``);
        return server_response.map((currency) => {
            return Object.entries(currency);
        });
    };
}