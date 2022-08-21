import React from "react";
import "./App.css";
// import './static/css/styles.css'
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./store/contexts/LoginContext";
import MainComponent from "./components/MainComponent";
import SelectedCourseContextProvider from "./store/contexts/SelectedCourseContext";

function App() {
	return (
		<LoginContextProvider>
			<SelectedCourseContextProvider>
				<BrowserRouter>
					<MainComponent />
				</BrowserRouter>
			</SelectedCourseContextProvider>
		</LoginContextProvider>
	);
}

export default App;
