import "bootstrap/dist/css/bootstrap.min.css"
import "./Home.css"
import Header from './Header'
import SearchBar from './SearchBar'
import { useEffect, useState } from "react"
import classService from '../services/class'

export default function Home({classes, curUser, setCurUser}) {

    return (
      <div className="mainPage">
        <Header curUser={curUser} setCurUser={setCurUser} />
        <form>
          <SearchBar classes={ classes  } top="40vh" marginLeft="15vw" width="70vw" />
        </form>
      </div>
    )
  }