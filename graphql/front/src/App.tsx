import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import routes from './routes';
import client from './graphql/client';

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Switch>
                        {routes.map(({ path, exact, component }, index) => (
                            <Route key={index} path={path} exact={exact}>
                                {component}
                            </Route>
                        ))}
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        </>
    );
}

export default App;
