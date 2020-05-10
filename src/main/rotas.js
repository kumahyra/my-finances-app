import React from 'react'

import Login from '../views/login'
import CadastrUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import { AuthConsumer } from './provedorAutenticacao'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location }} } />
                )
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastrUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={ context.isAutenticado} />)}
    </AuthConsumer>
)