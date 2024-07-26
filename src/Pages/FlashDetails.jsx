import { useLocation } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SelectCard from "../Components/SelectCard";




// It access the current location object

export default function FlashDetails() {

    const location = useLocation();
    const flashCardData = location.state;
  
  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />
      <SelectCard location={location} flashCardData={flashCardData} />
    </div>
  );
}
