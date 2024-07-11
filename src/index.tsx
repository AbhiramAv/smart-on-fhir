// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { oauth2 as SMART } from 'fhirclient';
import App from './App';
import './index.css';

SMART.authorize({
  clientId: "9e43034e-949f-41f5-880e-eb31a7663bee",
  scope: "launch/patient openid fhirUser patient/*.read Questionnaire.read Questionnaire.search QuestionnaireResponse.read QuestionnaireResponse.create QuestionnaireResponse.search Patient.read Patient.search Patient.create",
  redirectUri: "http://localhost:3000/callback",
  iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/"
});
