import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Paises from "./components/Paises";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

export default function Page(){
    return (
        <>
            <Navbar />
            <Inicio />
            <Nosotros />
            <Servicios />
            <Paises />
            <Blog />
            <Footer />
        </>
    )
}