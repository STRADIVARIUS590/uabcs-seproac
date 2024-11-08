import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import AddEditForm from './AddEditForm';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
 
export const AddEditUserPage = () => { 
  return (
    <div>
      <AddEditForm/>
    </div>
  );
};

