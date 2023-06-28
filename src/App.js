import React, { useState, useRef, useEffect } from "react"
import "./App.css"

function App() {
	const canvasRef = useRef(null)
	const [values, setValues] = useState({ a: 5, b: 8, c: 3 })

	const incrementValue = (key) => {
		setValues((prevValues) => ({
			...prevValues,
			[key]: prevValues[key] + 1,
		}))
	}

	const decrementValue = (key) => {
		setValues((prevValues) => ({
			...prevValues,
			[key]: prevValues[key] - 1,
		}))
	}

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")

		const renderGraph = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.fillStyle = "blue"

			const xStep = canvas.width / Object.keys(values).length
			let xPos = 0

			for (const key in values) {
				const value = values[key]
				const y = canvas.height - value * 10

				ctx.fillRect(xPos, y, xStep - 10, canvas.height - y)
				ctx.fillStyle = "red"

				ctx.font = "14px sans-serif"
				ctx.fillText(`${key}: ${value}`, xPos, y - 10)

				xPos += xStep
			}
		}

		renderGraph()
	}, [values])

	return (
		<div className='content-wrapper'>
			<div className='item item-1'>
				<p>a - {values.a}</p>
				<div className='buttons'>
					<button onClick={() => incrementValue("a")}>+</button>
					<button onClick={() => decrementValue("a")}>-</button>
				</div>
			</div>

			<div className='item item-1'>
				<p>b - {values.b}</p>
				<div className='buttons'>
					<button onClick={() => incrementValue("b")}>+</button>
					<button onClick={() => decrementValue("b")}>-</button>
				</div>
			</div>

			<div className='item item-1'>
				<p>c - {values.c}</p>
				<div className='buttons'>
					<button onClick={() => incrementValue("c")}>+</button>
					<button onClick={() => decrementValue("c")}>-</button>
				</div>
			</div>

			<div className='graph'>
				<canvas ref={canvasRef} width={400} height={300} />
			</div>
		</div>
	)
}

export default App
