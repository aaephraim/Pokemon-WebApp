import { Component,  } from "react";
import SearchedCard from "../components/SearchedCard";
import Card from "../components/Card";
import "./App.css";
import SearchBar from "../components/SearchBar";
import TitlePic from "../resources/logo_go.png";
import { type } from "@testing-library/user-event/dist/type";
import GeneratedCard from "../components/GeneratedCard";
// import { motion } from "framer-motion";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      generated: [],
      searched: [],
      pokeDex: [],
      searchField: "",
      url: "https://pokeapi.co/api/v2/pokemon/?limit=600",
      baseUrl: "https://pokeapi.co/api/v2/pokemon/",
      loading: true,
      notSearched: true,
      notGenerated: true,
      nextUrl: "",
      prevUrl: "",
      expanded: false,
    };
  }
  // all the functions
  searchfunc = (e) => {
    this.setState({ searchField: e.target.value });
  };
  queryfunc = () => {
    fetch(this.state.baseUrl.concat(this.state.searchField.toLowerCase()))
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          searched: data,
          notSearched: false,
          notGenerated: true,
        })
      )
      .catch((error) => {
        return;
      });
  };

  generatedfunc = () => {
    const id = JSON.stringify(Math.floor(Math.random() * 500));
    fetch(this.state.baseUrl + id)
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          generated: data,
          notGenerated: false,
          notSearched: true,
          searchField: data.name,
        })
      );
  };
  reload = () => {
    return window.location.reload(true);
  };

  enterKey = (event) => {
    return event.code === "Enter" ? this.queryfunc() : "";
  };
  detail = () => {return this.setState({expanded: !(this.state.expanded)})};

  // all the functions ends here.

  // componentdidmount here.
  componentDidMount() {
    fetch(this.state.url)
      .then((resp) => resp.json())
      .then((pokeData) =>
        this.setState({
          pokemon: pokeData.results.map(async (link) => {
            const res = await fetch(link.url);
            const info = await res.json();
            return this.setState({
              pokeDex: [...this.state.pokeDex, info],
            });
            // .sort0((info[i], info[i+1]) => info.id - info.id)
          }),
          nextUrl: pokeData.next,
          prevUrl: pokeData.previous,
          loading: false,
        })
      );
  }
  //  componentDidMount ends
  // render Starts

  render() {
    // destructuring.. from this.state
    const {
      baseUrl,
      generated,
      notGenerated,
      notSearched,
      searched,
      searchField,
      pokeDex,
      loading,
    } = this.state;
    // console.log(list)
    // console.log(pokemon, "pokemon")
    // console.log(pokeDex, "pokedex");
    // console.log(generated, "genrated")
    // console.log(searchField);

    // filter the duplicated >> sort the aaray with id >> display the searched item.

    const pokedex_filtered = [
      ...new Map(pokeDex.map((p) => [p.id, p])).values(),
    ]
      .toSorted((a, b) => (a.id > b.id ? 1 : -1))
      .filter((elem) => {
        return elem.name.toLowerCase().includes(searchField.toLowerCase());
      });

    return (
      <>
      <div className="docker">
        <div className="title">
          <img
            className="logo"
            alt="POKEMON"
            src={TitlePic}
            onClick={this.reload}
          />
        </div>
        <SearchBar
          search={this.searchfunc}
          searchButton={this.queryfunc}
          randButton={this.generatedfunc}
          enter={this.enterKey}
        />
        <div className="container">
            {loading ? (
            <h1 className="load">Loading Please Wait..!!</h1>
          ) : (
            pokedex_filtered.map(item => {
              return (
                <Card
                name ={item.name}
                id ={item.id}
                imgSrc={`${item.sprites.other.dream_world.front_default}`}
                hp= {item.stats[0].base_stat}
                exp= {item.base_experience}
                attack={item.stats[1].base_stat}
                defense= {item.stats[2].base_stat}
                speed={item.stats[5].base_stat}
                types={item.types}
                abilities={item.abilities}
                
               
              />
              );
            })
          )}
          
          {!notSearched && searched.id ? (
            <SearchedCard
              query={searched}
              loading={loading}
             
            />
          ) : (
            ""
          )}
          {!notGenerated && generated ? (
            <GeneratedCard
              random={generated}
              loading={loading}
             
            />
          ) : (
            ""
          )}
        </div>
      </div>
      </>
    );
  }
}

export default App;
