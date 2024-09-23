const HomePage = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="max-w-2xl w-full bg-zinc-700 shadow-md rounded-lg p-8 ">
                <h1 className="text-4xl font-bold text-white mb-6 text-center">Bienvenido a tu Libreta de Contactos</h1>
                <p className="text-zinc-300 text-lg mb-8 text-center">
                    Aquí podrás gestionar tus contactos de manera fácil y segura. Accede a tus números de teléfono, direcciones y más, 
                    todo en un solo lugar.
                </p>
                {/* Placeholder for future contact details */}
                <div className="mt-12">
                    <div className=" text-center">
                        <p className="text-zinc-400">
                            Accede a tu cuenta para empezar a ver y gestionar tus contactos.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomePage;
