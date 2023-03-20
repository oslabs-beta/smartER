import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

const Heading = ({title}: {title: string}) => <h2>{title}</h2>;

const Login: React.FC<{}> = () => {
  return (
    <>
      <div>HELLO WORLD</div>
      <Heading title="Hello" />
    </>
  );
};

export default Login;
