import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import Carros from './src/services/sqlite/Carros'

const printCarros = (carro) => {
  console.log(`id:${carro.id}, marca:${carro.marca}, model:${carro.model}, hp:${carro.hp}`)
}

export default function App() {

  //forced error catch
  Carros.find( -1 ) 
    .then( carro => printCarros(carro) )
    .catch( err => console.log(err) )

  //create
  Carros.create( {marca:'vw', model:'brasilia', hp:65} )
    .then( id => console.log('Carros criado com o id: '+ id) )
    .catch( err => console.log(err) )

  Carros.create( {marca:'vw', model:'fusca', hp:34} )
    .then( id => console.log('Carros criado com o id: '+ id) )
    .catch( err => console.log(err) )

  Carros.create( {marca:'ford', model:'corcel', hp:70} )
    .then( id => console.log('Carros criado com o id: '+ id) )
    .catch( err => console.log(err) )

  //find id=1
  Carros.find( 1 ) 
    .then( carro => printCarros(carro) )
    .catch( err => console.log(err) )

  //find marca=vw
  Carros.findBymarca( 'vw' ) 
    .then( carros => console.log(carros) )
    .catch( err => console.log(err) )

  //update
  Carros.update( 1, {marca:'gm', model:'corsa', hp:70} )
    .then( updated => console.log('Carros atualizados: '+ updated) )
    .catch( err => console.log(err) )
  
  //all
  Carros.all()
    .then( 
      carros => carros.forEach( c => printCarros(c) )
    )

  //delete
  Carros.remove(1)
    .then( updated => console.log('Carros removidos: '+ updated) )
    .catch( err => console.log(err) )
  
  Carros.remove(2)
    .then( updated => console.log('Carros removidos: '+ updated) )
    .catch( err => console.log(err) )

  Carros.remove(3)
    .then( updated => console.log('Carros removidos: '+ updated) )
    .catch( err => console.log(err) )

  //forced empty array (all=[])
  Carros.all()
    .then( 
      carros => console.log(carros)
    )

  return (
    <View style={styles.container}>
      <Text>(Check Console)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});
