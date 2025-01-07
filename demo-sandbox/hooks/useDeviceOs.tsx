enum OsType {
	WINDOWS = "windows",
	ANDROID = "android",
	MAC = "macintosh",
	IPHONE = "iphone",
	IPAD = "ipad",
	OSX = "mac os x",
	IOS = "ios",
}

/**
 * @hook useDeviceOS
 * @description
 * 현재 OS 탐지
 */
const useDeviceOS = (): string => {
	if (typeof navigator !== "undefined") {
		let lowerCase = navigator.userAgent.toLowerCase();
		if (lowerCase.indexOf(OsType.ANDROID) > -1) return OsType.ANDROID;
		if (
			lowerCase.indexOf(OsType.IOS) > -1 ||
			lowerCase.indexOf(OsType.IPHONE) > -1 ||
			lowerCase.indexOf(OsType.IPAD) > -1
		)
			return OsType.IOS;
	}
	return OsType.WINDOWS;
}

export default useDeviceOS;
export { OsType };
