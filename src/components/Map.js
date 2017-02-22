/* eslint-disable react/no-unused-prop-types */

import React, { Component, PropTypes } from 'react';
import ReactGoogleMaps from './ReactGoogleMaps';

class Map extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
    selectCoordinates: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object,
  }

  static defaultProps = {
    selectedLocation: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: props.locations.map(location => (
        {
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          content: location.name,
          showInfo: false,
          key: location.id,
        }
      )),
      center: {
        lat: props.selectedLocation ? props.selectedLocation.latitude : 32,
        lng: props.selectedLocation ? props.selectedLocation.longitude : 34,
      },
      zoom: props.selectedLocation ? 8 : 3,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      markers: nextProps.locations.map(location => (
        {
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          content: location.name,
          showInfo: false,
          key: location.id,
        }
      )),
      center: {
        lat: nextProps.selectedLocation ? nextProps.selectedLocation.latitude : 32,
        lng: nextProps.selectedLocation ? nextProps.selectedLocation.longitude : 34,
      },
      zoom: nextProps.selectedLocation ? 8 : 3,
    });
  }

  handleMarkerClose = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => (marker === targetMarker ? { ...marker, showInfo: false } : marker)),
    });
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => (marker === targetMarker ? { ...marker, showInfo: true } : marker)),
    });
  }

  handleMapClick = (event) => {
    const { selectCoordinates } = this.props;
    selectCoordinates(event.latLng.lat(), event.latLng.lng());
  }

  render() {
    const {
      markers,
      center,
      zoom,
    } = this.state;

    return (
      <ReactGoogleMaps
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        markers={markers}
        onMapClick={this.handleMapClick}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
        center={center}
        zoom={zoom}
      />
    );
  }
}

export default Map;
