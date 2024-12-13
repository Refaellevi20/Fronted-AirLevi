import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { store } from './store/store' 
import { RootCmp } from './RootCmp'
import './services/i18n.js'

import './assets/styles/main.scss'

// import webpack from 'webpack'

// module.exports = {
//     // Other configurations...
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env.REACT_APP_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
//         })
//     ]
// }

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router>
			<RootCmp />
		</Router>
	</Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register()