import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { checkLogin } from './actions/AuthActions'
import { NavigationActions, StackActions } from 'react-navigation'

export class Preload extends Component{

    static navigationOptions = {
        title: '',
        header: null
    }

    constructor(props){
        super(props)
        this.state={}

        this.props.checkLogin()
        this.directPages = this.directPages.bind(this)
    }

    directPages(){
        
        switch (this.props.status) {
            case 1:
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Conversas'})
                    ]
                }))
                break

            case 2:
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Home'})
                    ]
                }))
                break
        }
    }

    componentDidMount(){
        this.directPages()
    }

    componentDidUpdate(){
        this.directPages()
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Carregando...{this.props.status}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state)=>{
    return {
        status: state.auth.status
    }
}

const PreloadConnect = connect(mapStateToProps, {checkLogin})(Preload)

export default PreloadConnect