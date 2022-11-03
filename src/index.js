import './css/styles.css';
import ApifetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import countryListTpl from './templates/list.hbs';


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const apifetchCountries = new ApifetchCountries();
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(evt) {
    
    apifetchCountries.provalue = evt.target.value.trim();
    cleaerHTML();
    if (apifetchCountries.provalue !== '') {
        apifetchCountries.fetchCountries().then(foundData => {
            if (foundData.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (foundData.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else if (foundData.length >= 2 && foundData.length <= 10) {
                // apifetchCountries.fetchCountries().then(renderListCountries);
            } else if (foundData.length === 1) {
                apifetchCountries.fetchCountries().then(renderOneCountry);
            }
        });
    }

    
}

// function renderListCountries(foundData) {
//     refs.countryList.insertAdjacentHTML('beforeend', countryListTpl(foundData));
// }


function cleaerHTML() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}
function renderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages).join(', ')} </p>
                </li>`;
        })
          .join('');
    console.log(markup);
      refs.countryInfo.innerHTML = markup;
}