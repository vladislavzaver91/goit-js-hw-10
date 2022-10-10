import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// const countryInfoRef = document.querySelector('.country-info');
const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
}

refs.input.addEventListener('input', heandleSubmit);

function heandleSubmit(ev) {
    ev.preventDefault();
    const searchCountry = ev.currentTarget.value.trim().toLowerCase();
    console.log(searchCountry);
}

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