import React from 'react'
import L from 'leaflet'

const style = {
  width: "100%",
  height: "400px"
};

class ViewRouteMap extends React.Component {

  componentDidMount() {
    let x_coord = this.props.route.sites[0].x_coordinate
    let y_coord = this.props.route.sites[0].y_coordinate

    this.map = L.map('map', { dragging: false ,
                              scrollWheelZoom: false,
                              keyboard: false,
                              boxZoom: false,
                              tap: false,
                              touchZoom: false,
                              doubleClickZoom: false,
                              zoomControl: false,
                              touchZoom: false  }).setView([x_coord, y_coord], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'streets-v9',
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    }).addTo(this.map)

    L.marker([x_coord, y_coord], {
        title: "Start Here!"
    }).addTo(this.map).bindPopup("Start Here!");

  }

  render() {
    return (
      <div id="map" style={style} />
    )
  }

}

export default ViewRouteMap
