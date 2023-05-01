function searchCountry() {
   const searchInput = document.getElementById('search-input').value.trim();
   if (searchInput === '') {
     return;
   }
 
   const url = `https://restcountries.com/v3.1/name/${searchInput}`;
   fetch(url)
     .then(response => response.json())
     .then(data => displayCountry(data))
     .catch(error => console.error(error));
 }
 
 function displayCountry(countryData) {
  const container = document.getElementById('country-container');
  container.innerHTML = '';
  if (countryData.status === 404) {
    const notFound = document.createElement('p');
    notFound.innerText = 'Country not found';
    container.appendChild(notFound);
  } else {
    const country = countryData[0];
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('each-country');
    const flag = document.createElement('img');
    flag.src = country.flags.svg;
    countryDiv.appendChild(flag);
    const name = document.createElement('h2');
    name.innerText = country.name.common;
    countryDiv.appendChild(name);
    const capital = document.createElement('p');
    capital.innerText = `Capital: ${country.capital[0]}`;
    countryDiv.appendChild(capital);
    const region = document.createElement('p');
    region.innerText = `Region: ${country.region}`;
    countryDiv.appendChild(region);
    const subregion = document.createElement('p');
    subregion.innerText = `Subregion: ${country.subregion}`;
    countryDiv.appendChild(subregion);
    
    // Add currency and population
    const currency = document.createElement('p');
    currency.innerText = `Currency: ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})`;
    countryDiv.appendChild(currency);
    const population = document.createElement('p');
    population.innerText = `Population: ${country.population}`;
    countryDiv.appendChild(population);

    // Add "more details" button and COVID data container
    const moreDetailsBtn = document.createElement('button');
    moreDetailsBtn.innerText = 'More details';
    const covidDataDiv = document.createElement('div');
    countryDiv.appendChild(moreDetailsBtn);
    countryDiv.appendChild(covidDataDiv);

    // Add event listener for the "more details" button
    moreDetailsBtn.addEventListener('click', () => {
      // Fetch COVID data for the country
      const covidUrl = `https://covid-api.mmediagroup.fr/v1/cases?country=${country.name.common}`;
      fetch(covidUrl)
        .then(response => response.json())
        .then(covidData => {
          // Display COVID data in the container
          covidDataDiv.innerHTML = `
            <h3>COVID data for ${country.name.common}</h3>
            <p>Total cases: ${covidData.All.confirmed}</p>
            <p>Total deaths: ${covidData.All.deaths}</p>
            <p>Total recoveries: ${covidData.All.recovered}</p>
          `;
        })
        .catch(error => console.error(error));
    });

    container.appendChild(countryDiv);
  }
}
