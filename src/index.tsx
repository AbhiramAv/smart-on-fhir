// src/index.tsx
import { oauth2 as SMART } from 'fhirclient';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

SMART.authorize({
  clientId: "ea4f1e5a-9435-468a-a6c8-d557271bb3fa",
  scope: "launch/patient openid fhirUser patient/*.read Questionnaire.read Questionnaire.search QuestionnaireResponse.read QuestionnaireResponse.create QuestionnaireResponse.search Patient.read Patient.search Patient.create",
  redirectUri: "https://localhost:3000/callback",
  iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/"
});

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
