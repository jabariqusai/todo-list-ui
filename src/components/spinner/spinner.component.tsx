import React from 'react';
import { Spin } from 'antd';

const Spinner: React.FC = () => (
  <div className="example" style={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>
    <Spin size='large'/>
  </div>
);

export default Spinner;