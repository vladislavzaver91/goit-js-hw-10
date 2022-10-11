import './css/styles.css';
import refs from "./refs";
import { FetchCountriesApi } from "./fetchCountries";
import { createOneCountryInfoMarkup, createManyCountriesMarkup } from './markup';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const restCountries = new FetchCountriesApi();

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearchOfCountries, DEBOUNCE_DELAY));

function renderManyCountriesMarkup (data) {
    const markup = createManyCountriesMarkup(data);
    refs.list.innerHTML = markup;
}

function renderOneCountryInfoMarkup (data) {
    const markup = createOneCountryInfoMarkup(data);
    refs.info.innerHTML = markup;
};

function onSearchOfCountries(ev) {
    ev.preventDefault();
    clearList();
    clearInfo();

    const searchCountry = ev.target.value.trim().toLowerCase();

    if (!searchCountry) {
        return;
    }

    restCountries.getCountries(searchCountry)
    .then(data => {
        if (data.length === 1) {
            renderOneCountryInfoMarkup (data);
        } else if (data.length >= 2 && data.length <= 10) {
            renderManyCountriesMarkup (data);
        } else if (data.length > 10) {
            reportsManySimilarities();
        }
    }).catch(err => {
        reportsInvalidName();
    });
};

function reportsManySimilarities() {
    return Notify.info ('Too many matches found. Please enter a more specific name.');
};

function reportsInvalidName() {
    return Notify.failure('Oops, there is no country with that name');
};

function clearList() {
    refs.list.innerHTML = '';
};

function clearInfo() {
    refs.info.innerHTML = '';
};