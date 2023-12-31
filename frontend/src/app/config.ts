import { useSelector } from "react-redux";
import { selectActiveUserId } from "../stores/userModule";


export const AppSettingsProvider = () => {
  
  const activeUserId = useSelector(selectActiveUserId);

  
  const appSettings = {
    apiHost: 'http://localhost',
    apiPort: '3000',
    user_id: activeUserId
  };

 
  return {appSettings}
};
