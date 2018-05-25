import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Font, Constants, MapView } from 'expo';
import { Container, Header, Tab, Tabs, Left, Body, Title, Right, Spinner } from 'native-base';
import SitesList from './components/SitesList';
import {initFirebase} from './utils/firebase';
import {checkAllDomains} from './utils/store';

export default class App extends Component {
    state = {
        loading: true
    };

    constructor() {
        super();
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });

        this.setState({ loading: false });
        initFirebase(this.onAdded, this.onRemoved)
        // checkAllDomains(this);
        //
        // window.setInterval(function () {
        //     checkAllDomains(this);
        // }, 10 * 60 * 1000); // ten minutes
    }

    onAdded(pingRef) {
        // Get that ping from firebase.
        const ping = pingRef.val();

        console.log(ping, "asd");
    }

    onRemoved(pingRef, prevChildKey) {
        for (let layer of layers) {
            let layerData = layer.getData();
            let i = 0;
            while (pingRef.val().latitude != layerData.getAt(i).lat()
            || pingRef.val().longitude != layerData.getAt(i).lng()) {
                i++;
            }
            layerData.removeAt(i);
        };
    }

    intersects (a, b) {
        let i;
        for (i in a) {
            if (b.indexOf(a[i]) > -1) {
                return true;
            }
        }
        return false;
    }

  render() {
      if (this.state.loading) {
          return <Spinner color='blue' />;
      }
      return (
          <Container>
              <Header>
                  <Left/>
                  <Body>
                  <Title>CensorMap</Title>
                  </Body>
                  <Right />
              </Header>
              {/*<Tabs initialPage={1}>*/}
                  {/*<Tab heading="Map">*/}
                      <MapView
                          style={{
                              flex: 1
                          }}
                          initialRegion={{
                              latitude: 37.78825,
                              longitude: -122.4324,
                              latitudeDelta: 100.0006,
                              longitudeDelta: 0.0421
                          }}
                      >
                          <MapView.Marker
                              coordinate={{
                                  latitude: 37.78825,
                                  longitude: -122.4324,
                              }}
                              pinColor="#313A75"
                          />
                          <MapView.Marker
                              coordinate={{
                                  latitude: -37.78825,
                                  longitude: -122.4324,
                              }}
                              pinColor="#AA3939"
                          />
                      </MapView>
                  {/*</Tab>*/}
                  {/*<Tab heading="Sites">*/}
                      {/*/!*<SitesList />*!/*/}
                  {/*</Tab>*/}
              {/*</Tabs>*/}
          </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
    flex: 1,
    height: 200
  }
});
