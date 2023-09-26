import "./styles.css";
import data from "../src/countries.json";
import Card from "../src/components/Card";
import { useState } from "react";

export default function App() {
  function createCard(props) {
    return (
      <Card
        image={props.image}
        name={props.name}
        capital={props.capital}
        population={props.population}
        continent={props.continent}
      />
    );
  }

  function sort(option) {
    if (option === "alpha") {
      return sortAlpha();
    } else if (option === "<") {
      return sortAsc();
    } else if (option === ">") {
      return sortDesc();
    } else if (option === "shuffle") {
      return sortShuffle(data.countries);
    } else {
      return data.countries;
    }
  }

  function sortAlpha() {
    const countries = data.countries;
    return countries.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  function sortAsc() {
    const countries = data.countries;
    return countries.sort(function (a, b) {
      return a.population - b.population;
    });
  }

  function sortDesc() {
    const countries = data.countries;
    return countries.sort(function (a, b) {
      return b.population - a.population;
    });
  }

  function sortShuffle(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i]
      ];
    }
    return shuffledArray;
  }

  function filter(list, option) {
    return list.filter(function (country) {
      if (option === "all") {
        return country;
      } else if (option === "1") {
        return country.population < 100000000;
      } else if (option === "100m") {
        return country.population >= 100000000;
      } else if (option === "200m") {
        return country.population >= 200000000;
      } else if (option === "500m") {
        return country.population >= 500000000;
      } else if (option === "1b") {
        return country.population >= 1000000000;
      } else {
        return country.continent.toLowerCase() === option.toLowerCase();
      }
    });
  }

  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOption(e.target.value);
  }
  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  const sortedCountries = sort(sortOption);
  const filteredCountries = filter(sortedCountries, filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div class="filters">
        <label>
          Filters:
          <select name="filter" value={filterOption} onChange={handleFilter}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="by population">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
        <label>
          Sort By:
          <select name="sort" value={sortOption} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
      </div>
      <div className="feed">{filteredCountries.map(createCard)}</div>
    </div>
  );
}
