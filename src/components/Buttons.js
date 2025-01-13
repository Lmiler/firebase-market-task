import { useNavigate } from "react-router-dom";
import '../App.css'

function Buttons() {
    const navigate = useNavigate();

    function goHome () {
        navigate("/");
    }

    function goToCart () {
        navigate("/cart");
    }

    return (
        <div className="Buttons">
            <button onClick={goHome}>Home page</button>
            <button onClick={goToCart}>Go to cart</button>
        </div>
    )
}

export default Buttons;