import './css/styles.css';

import { RestcountriesApi } from "./RestCountriesAPI";

const restCountries = new RestcountriesApi();


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', heandleSubmit);

function renderManyCountriesMarkup (data) {
    const markup = createManyCountriesMarkup(data);
    refs.list.innerHTML = markup;
}

function renderOneCountryInfoMarkup (data) {
    const markup = createOneCountryInfoMarkup(data);
    refs.info.innerHTML = markup;
};

function heandleSubmit(ev) {
    ev.preventDefault();

    const searchCountry = ev.currentTarget.value.trim().toLowerCase();

    restCountries.getCountries(searchCountry).then(data => {
        renderOneCountryInfoMarkup(data);
        renderManyCountriesMarkup(data);

    });
}


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

function createOneCountryInfoMarkup (data) {
    return data.map(({flags, name, capital, population, languages }) => {
        const langStr = Object.values(languages).join(', ');
        return /*html*/ `<h1 class="country"> ${name.official}</h1>
    <div class="form_country">
        <ul>
            <p class="capital"><span class="text">Capital: </span>${capital}</p>
            <p class="population"><span class="text">Population: </span>${population}</p>
            <p class="languages"><span class="text">Languages: </span>${langStr}</p>
        </ul>
        <ul><img src="${flags.svg}" alt="" class="flag" /></ul>
    </div>`
    }).join('');
};




// fetch(`https://restcountries.com/v2/name?fields=name,capital,population,flags,languages`).then(response => {
//     if (!response.ok) {
//         throw new Error(response.status);
//     }
//     return response.json();
// }).then(data => {
//     const countriesMarkup = fetchCountries(data);
//     countryInfoRef.innerHTML = countriesMarkup;
// }).catch(err => {
//     console.error(err.message);
// });

// function fetchCountries([{ name, capital, population, flags, languages }]) {
//     console.log(name.official);
//     console.log(capital[0]);
//     console.log(population);
//     console.log(flags.svg);
//     console.log(languages);
//     return `<h1 class="country"> ${name.official}</h1>
//     <div class="form_country">
//         <ul>
//             <p class="capital"><span class="text">Capital: </span>${capital[0]}</p>
//             <p class="population"><span class="text">Population: </span>${population}</p>
//             <ul class="languages"><span class="text">Languages:</span>${languages}
//                 <li class="tag-list__item">${name.official}</li>
//             </ul>
//         </ul>
//         <ul><img src="${flags.svg}" alt="" class="flag" /></ul>
//     </div>`
// };