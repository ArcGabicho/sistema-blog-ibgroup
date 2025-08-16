import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Blog from "./components/Blog";
import Servicios from "./components/Servicios";
import Paises from "./components/Paises";
import Footer from "./components/Footer";
import Chat from "./components/Chat";

export default function Page(){
    return (
        <>
            <Navbar />
            <Inicio />
            <Blog />
            <Servicios />
            <Nosotros />
            <Paises />
            <Footer />
            <Chat />
        </>
    )
}