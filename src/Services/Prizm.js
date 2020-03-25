export const Prizm = () => {

    // #img_url = `https://starwars-visualguide.com/assets/img/`;

    return get_data('GetChart');

};

const api_base = 'https://api.prizmbit.com/api/po';

const get_data = async (url) => {
    const server_response = await fetch(`${api_base}${url}`);
    if (!server_response.ok) {
        throw new Error(`Could not fetch ${api_base}${url}, received ${server_response.status}`);
    }
    return await server_response;
};

// const getChart = async (GetChart) => {
//     return get_data(GetChart);
// };