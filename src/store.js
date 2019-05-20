import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

function configureStore(initialState) {
	const enhancer = compose(composeWithDevTools(applyMiddleware(thunk)))
	return createStore(reducers, initialState, enhancer)
}

const store = configureStore({})

export default store
