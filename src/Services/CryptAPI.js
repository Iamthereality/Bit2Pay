export default class {
    #prizmAPI = 'https://api.prizmbit.com/api/po/MarketData/GetMarketPrices';
    #ethereumAPI = 'https://mainnet.infura.io/v3/082feca54a1c4c4a9b60172a7acf35fd';

    get_data = async (api, url) => {
        const server_response = await fetch(`${ api }${ url }`);
        if (!server_response.ok) {
            throw new Error(`Could not fetch ${ api }${ url }, received ${ server_response.status }`);
        }
        return await server_response.json();
    };

    get_currency_prices = async () => {
        const server_response = await this.get_data(this.#prizmAPI, ``);
        return server_response.map((currency) => {
            return Object.entries(currency);
        });
    };

    get_prices = async () => {
        const server_response = await this.get_data(this.#prizmAPI, ``);
        return server_response;
    };

    #get_ethereum_data = async (request) => {
        const server_response = await fetch(this.#ethereumAPI, request);
        return await server_response.json();
    };

    get_ethereum_balance = async (address) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"":"2.0","method":"eth_getBalance","params": ["${ address }", "latest"],"id":1}`
        };
        return await this.#get_ethereum_data(request);
    };
}