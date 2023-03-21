import React, {FC, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {GlobalContext} from '../GlobalContext';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>;

const Login: React.FC<{}> = () => {
  const context = useContext(GlobalContext);

  return (
    <>
      <div>HELLO WORLD</div>
      <Heading title="Hello" />
      <div>{context.email}</div>

      <button onClick={context.setEmail}>Click me</button>
    </>
  );
};

export default Login;
