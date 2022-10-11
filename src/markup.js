function createOneCountryInfoMarkup (data) {
    return data.map(({name, capital, population, flags, languages }) => {
        const langStr = Object.values(languages).join(', ');
        return /*html*/ `<h1 class="country"> ${name.official}</h1>
    <div class="form_country">
        <ul>
            <p class="capital"><span class="text">Capital: </span>${capital}</p>
            <p class="population"><span class="text">Population: </span>${population}</p>
            <p class="languages"><span class="text">Languages: </span>${langStr}</p>
        </ul>
        <ul><img class="flag" width="350px" height="250px" src="${flags.svg}"/></ul>
    </div>`
    }).join('');
};

function createManyCountriesMarkup (data) {
    return data.map(({ flags, name }) => {
        return /*html*/ `<li class="country-list__item">
        <img
            class="country-list__flag"
            src="${flags.svg}"
            width="30px"
            height="20px"
        />
        <p class="country-list__name">${name.official}</p>
        </li>`
    }).join('');
};

export {
    createOneCountryInfoMarkup, 
    createManyCountriesMarkup,
};