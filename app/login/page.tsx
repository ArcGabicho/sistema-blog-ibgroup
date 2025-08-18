"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../utils/firebase";
import { toast } from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
      toast.success("¡Login exitoso!");
      window.location.href = "/admin";
    } catch {
      toast.error("Correo o contraseña incorrectos");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-lg sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Ingresar</h1>
            <p className="mt-2 text-gray-500">
              Ingresa tus datos a continuación para acceder al panel.
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mt-6">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@ibgroup.com"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="NA"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Correo Electronico
                </label>
                {errors.email && (
                  <span className="text-red-600 text-xs">{errors.email.message}</span>
                )}
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="admin123"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Contraseña
                </label>
                {errors.password && (
                  <span className="text-red-600 text-xs">{errors.password.message}</span>
                )}
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-lg cursor-pointer bg-gradient-to-r from-red-900 to-red-500 text-white px-3 py-4 hover:from-red-800 hover:to-red-500 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Ingresando...
                    </span>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                No tienes una cuenta?{" "}
                <Link
                  href="/"
                  className="font-semibold text-red-600 hover:underline focus:text-red-800 focus:outline-none"
                >
                  Salir
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}