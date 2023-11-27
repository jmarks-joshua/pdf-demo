'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import PdfViewer from './PdfViewer'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url,
).toString()


const A4Aspect = 701 / 992

const getPreviewDimensions = (container: HTMLDivElement | null) => {
	const containerWidth = (container?.clientWidth || 0) - 32 // 2x padding

	const width = containerWidth
	const height = width / A4Aspect
	return { width, height }
}

export default function PdfHandler(){
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [dimensions, setDimensions] = useState({width: 0, height: 0})
	
	useLayoutEffect(() => {
		setDimensions(getPreviewDimensions(containerRef.current)) // this feels a little hacky, but if you just do this calculation in the render the heights/widths don't adjust and it doesn't render the pages properly
	}, [])

	

	const {width, height} = dimensions
	return <div className='h-full w-full min-h-screen bg-gray-100  flex flex-row justify-center'>
		<div className="printcontent-main w-4/6" ref={containerRef}>
			<div className="m-auto h-ful" style={{ width }}>
				<PdfViewer file='sample.pdf' width={width} height={height} />
			</div>
		</div>
	</div>
}
