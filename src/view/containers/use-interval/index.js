import React, { useState, useEffect, useRef } from 'react'

function useInterval(callback, delay) {
	const savedCallback = useRef()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		if (delay !== null) {
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

//usage
useInterval(() => {
	// Your custom logic here
	setCount(count + 1)
}, 1000)
