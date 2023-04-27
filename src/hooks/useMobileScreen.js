import { useEffect, useState } from "react";

const useMobileScreen = () => {
  const [mobileScreen, setMobileScreen] = useState(false)
  //to handle screenSIZE
  useEffect(() => {
    const screenSize = document.getElementById('root').getBoundingClientRect().width

    if(screenSize < 490) setMobileScreen(screenSize)

  }, []);

  return mobileScreen
};

export default useMobileScreen;