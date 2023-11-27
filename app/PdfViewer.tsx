'use client'

import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url,
).toString()

type PdfViewerProps = {
	file?: string
	width: number
	height: number
}

function PdfViewer({ width, height, file }: PdfViewerProps){
	const [numberOfPages, setNumberOfPages] = useState<number | null>(null)
	const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
		setNumberOfPages(numPages)
	}

	const error = <span>
	Error loading pdf. Please ensure your browser is up-to-date
	</span>

	return <Document
		file={file}
		onLoadSuccess={onDocumentLoadSuccess}
		error={error}
	>
		{
			Array.from(new Array(numberOfPages), (_, index) => {
				// eslint-disable-next-line react/jsx-key
				return <Page key={`key_${index}`} renderTextLayer={false} className="mt-4 bg-white" pageNumber={index + 1} width={width} height={height} />
			})
		}
	</Document>
}

export default PdfViewer