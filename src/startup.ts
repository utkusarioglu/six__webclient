import ReactGa from 'react-ga';
import { GA_ID } from '_config';
import rest from '_services/rest/rest';
/**
 * Handles events that need to happen at startup
 */
export default async function startup() {
  ReactGa.initialize(GA_ID);

  await rest.getSession();

}
