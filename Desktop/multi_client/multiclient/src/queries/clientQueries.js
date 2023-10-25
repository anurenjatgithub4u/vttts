
import {gql} from '@apollo/client';




const GET_CLIENTS = gql`
query getClients {
	clients{
      id
	  name 
	  price
	  description
	}
}

`;


export {GET_CLIENTS};