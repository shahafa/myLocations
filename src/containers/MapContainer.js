import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCoordinates } from '../actions/locations';
import Map from '../components/Map';

class MapContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    selectedLocation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      markers: this.markers(props.locations),
      center: this.center(props.selectedLocation),
      zoom: this.zoom(props.selectedLocation),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      markers: this.markers(nextProps.locations),
      center: this.center(nextProps.selectedLocation),
      zoom: this.zoom(nextProps.selectedLocation),
    });
  }

  markers = locations => (
    locations.map(location => (
      {
        position: {
          lat: parseInt(location.latitude, 10),
          lng: parseInt(location.longitude, 10),
        },
        content: location.name,
        showInfo: false,
        key: location.id,
      }))
  )

  center = selectedLocation => (
    {
      lat: selectedLocation ? parseInt(selectedLocation.latitude, 10) : 32,
      lng: selectedLocation ? parseInt(selectedLocation.longitude, 10) : 34,
    }
  )

  zoom = selectedLocation => (
    selectedLocation ? 8 : 3
  )

  handleMapClick = (event) => {
    const { dispatch } = this.props;
    dispatch(selectCoordinates(event.latLng.lat(), event.latLng.lng()));
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

  render() {
    const {
      markers,
      center,
      zoom,
    } = this.state;

    return (
      <Map
        onMapClick={this.handleMapClick}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
        markers={markers}
        center={center}
        zoom={zoom}
      />
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations.locations,
  selectedLocation: state.locations.selectedLocation,
});

export default connect(mapStateToProps)(MapContainer);
