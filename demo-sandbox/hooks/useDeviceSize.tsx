import { useEffect, useState } from "react";

/**
 * @hook useDeviceSize
 * @description
 * 현재 디바이스 너비, 높이 탐지
 */
const useDeviceSize = () => {
	const [ width, setWidth ] = useState(0);
	const [ height, setHeight ] = useState(0);

	useEffect(() => {
		let t = setTimeout(() => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
			clearTimeout(t);
		}, 1)
	}, []);

	return { width, height };
}

export default useDeviceSize;
