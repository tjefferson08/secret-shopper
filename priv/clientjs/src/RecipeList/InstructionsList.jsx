import React, { Fragment } from 'react';

const InstructionsList = ({ instructions }) => (
  <Fragment>
    <h4>Instructions</h4>
    <ol>{instructions.map(inst => <li key={inst.id}>{inst.text}</li>)}</ol>
  </Fragment>
);

export default InstructionsList;
