import React, { useState } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import RightSidebar from "./common/right-sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import {ApolloProvider,ApolloClient, InMemoryCache} from '@apollo/client'; 

//import { UserContextProvider } from "../context/UserContext";


//import { UserContextProvider } from '../context/UserContextProvider';

axios.defaults.baseURL = 'http://localhost:8000';

axios.defaults.withCredentials =true


const cache = new InMemoryCache(

	{
		typePolicies: {
			Query: {
				fields:{

					products: {
						merge(existing , incoming){
							return incoming;
						}
					}
,

					product: {
						merge(existing , incoming){
							return incoming;
						}
					}

			
				}
			}
		}
	}
);


const client = new ApolloClient({

	uri:'http://localhost:8000/graphql',
	cache
	
});

const App = (props) => {
	const initialState = {
		ltr: true,
		divName: "RTL",
	};

	const [side, setSide] = useState(initialState);

	const ChangeRtl = (divName) => {
		if (divName === "RTL") {
			document.body.classList.add("rtl");
			setSide({ divName: "LTR" });
		} else {
			document.body.classList.remove("rtl");
			setSide({ divName: "RTL" });
		}
	};
	return (

		
		<ApolloProvider client={client}>
   <>
		
		<div>
			<div className="page-wrapper">
				<Header />
			
				<div className="page-body-wrapper">
					<Sidebar />
					<RightSidebar />
					<div className="page-body"><Outlet/></div>
					<Footer />
				</div>
			</div>
			<div
				className="btn-light custom-theme"
				onClick={() => ChangeRtl(side.divName)}
			>
				{side.divName}
			</div>
		</div>
		
		</>

		</ApolloProvider>
	);
};
export default App;

