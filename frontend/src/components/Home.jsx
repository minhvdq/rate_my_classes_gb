import "bootstrap/dist/css/bootstrap.min.css"
import "./Home.css"
import Header from './Header'
import SearchBar from './SearchBar'
import { useEffect, useState } from "react"
import classService from '../services/class'

export default function Home({classes}) {

    return (
      <div className="mainPage">
        <Header />
        <form>
          <SearchBar classes={ classes  } top="40vh" marginLeft="15vw" width="70vw" />
        </form>
      </div>
    )
  }