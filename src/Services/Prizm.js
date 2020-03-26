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

    // #extract_id = (item) => {
    //     const reg_exp = /\/([0-9]*)\/$/;
    //     return item.url.match(reg_exp)[1];
    // };
    //
    // #transform_person_data = (person) => {
    //     return {
    //         id: this.#extract_id(person),
    //         name: person.name,
    //         gender: person.gender,
    //         birth_year: person.birth_year,
    //         eye_color: person.eye_color
    //     }
    // };
    //
    // get_person = async (id) => {
    //     const person = await this.get_data(`/people/${id}`);
    //     console.log(this.#transform_person_data(person));
    //     return this.#transform_person_data(person);
    // };
}