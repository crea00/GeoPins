import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import Context from '../../context';


const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    console.log('TCL: Login -> data', data)
    dispatch({ type: 'LOGIN_USER', payload: data.me })
  }

  return (
    <GoogleLogin
      clientId={'415518620022-0p0h1gn4jhgo1u3dpf59k99uo2mkplg1.apps.googleusercontent.com'}
      onSuccess={onSuccess}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  }
}

export default Login;
