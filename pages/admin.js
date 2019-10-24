import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';
import AdminPanel from '../components/AdminPanel';
import Agenda from '../components/Dropzone';
import styled from 'styled-components';

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
`;

const Admin = () => (
  <ColumnContainer>
    <Column background="white">
      <AdminPanel />
    </Column>
    <Column background="white">
      <Agenda />
    </Column>
  </ColumnContainer>
);

export default Admin;
