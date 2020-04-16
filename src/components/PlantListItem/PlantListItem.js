import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PlantListItem.css'

export default class PlantListItem extends Component {
  render() {
    const { plant } = this.props
    

    return (
      <Link 
          to={{pathname:`/plant/${plant.id}`, state: {id:plant.id}}} 
          className='PlantListItem'>
        <div className='PlantListItem__container'>
            <div className="PlantListItemImage_container">
              <img src={plant.image} alt={plant.type} />
            </div>
            <h2 className='PlantListItem__heading'>{plant.name}</h2>
            <p><em>{plant.type}</em></p>
        </div>
      </Link>
    )
  }
}

