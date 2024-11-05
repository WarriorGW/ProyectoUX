"use client"
import BodyWrapper from "@/components/BodyWrapper"
import { CheckIcon, Star } from "lucide-react"
import Link from "next/link"

function AcercaDe() {
  return (
    <div className='w-full '>
      <div className='relative'>
        <img
          src='fondo.jpg'
          alt='landig-page-image'
          className='w-full  sm:h-56 md:h-full'
        />
        <div className='absolute inset-0 flex flex-col justify-center px-4 text-center max-w-full md:max-w-[600px]'>
          <p className=' text-left text-white text-sm sm:text-base sm:text-center md:text-3xl font-bold mx-auto'>
            ¡CONOCE MÁS DE NUESTROS PRODUCTOS Y NUESTRA FERRETERÍA!
          </p>
          <div className='mt-5 -ml-60 sm:mt-14 sm:ml-0'>
            <Link
              href='/'
              className='bg-primary text-white md:text-lg rounded-lg py-1.5 px-2 text-sm sm:py-3 sm:px-6 sm:text-base hover:bg-sky-700'
            >
              Conocer más
            </Link>
          </div>
        </div>
      </div>

      <div className='relative flex justify-center items-center'></div>

      <BodyWrapper>
        <div>
          <p className='text-2xl font-bold text-center text-black mt-32 mb-10 sm:text-3xl'>
            ¿Quiénes Somos?
          </p>

          <section className='flex flex-col md:flex-row justify-center items-center mt-14'>
            <section className='px-4 md:px-0'>
              <p>
                <span className='font-bold'>
                  {" "}
                  En PADI Ferretería, nos enorgullece ser la tienda oficial de
                  las mejores marcas
                </span>
                , ofreciendo a nuestros clientes un amplio surtido y variedad de
                productos para satisfacer todas sus necesidades. Nuestra visión
                es consolidarnos como la principal opción de compra para
                aquellos que buscan calidad y excelencia en herramientas y
                artículos ferreteros. Trabajamos de la mano con marcas
                reconocidas como TRUPER, FOSET, y muchas más, asegurando que
                nuestros clientes encuentren productos de la más alta calidad y
                durabilidad.
              </p>
              <br />
              <p>
                La misión de PADI Ferretería es proporcionar a nuestros clientes
                una experiencia de compra única, brindando asesoramiento
                especializado y un servicio personalizado. Nos esforzamos por
                ser un referente en el mercado, destacando por la confiabilidad
                de nuestras marcas y la diversidad de productos disponibles. En
                PADI Ferretería, no solo vendemos herramientas, ofrecemos
                soluciones que impulsan el éxito y la eficiencia en cada
                proyecto.
              </p>
            </section>
            <img
              src='/woman-us.png'
              alt='Imagen de una mujer en una ferretería'
              className='md:ml-40 mt-6 md:mt-0 w-1/3 sm:w-52'
            />
          </section>
        </div>
        <div className='flex flex-col justify-center items-center mt-10'>
          <img
            src='icon-circular.png'
            alt=''
            className='w-72 hidden sm:block'
          />
          <p className='pt-4 text-3xl font-bold text-center text-black sm:text-2xl'>
            ¿Por qué elegirnos?
          </p>
        </div>

        <section className='text-left items-center mt-24  sm:text-center'>
          <ul className='list-disc flex flex-col items-center text-lg sm:text-2xl px-4'>
            <li className='mb-4'>
              <span className='font-bold'>Amplia Variedad de Productos:</span>{" "}
              Contamos con todo lo que necesitas para tus proyectos.
            </li>
            <li className='mb-4'>
              <span className='font-bold'>Asesoría Personalizada:</span> Nuestro
              equipo está siempre listo para ayudarte.
            </li>
            <li className='mb-4'>
              <span className='font-bold'>Precios Competitivos:</span> Ofrecemos
              los mejores precios del mercado.
            </li>
            <li className='mb-4'>
              <span className='font-bold'>Calidad Garantizada:</span> Solo
              trabajamos con productos de las mejores marcas.
            </li>
          </ul>

          <p className='mt-32 text-lg sm:text-2xl'>
            4.8/5 estrellas basadas en{" "}
            <span className='font-extrabold'>2000</span> reseñas de clientes
            satisfechos.
          </p>
          <p className='mt-32 text-2xl'>
            4.8/5 estrellas basadas en{" "}
            <span className='font-extrabold'>2000</span> reseñas de clientes
            satisfechos.&apos;
          </p>
        </section>

        <div className='flex flex-col md:flex-row justify-center mt-36'>
          <div className='flex flex-col gap-4 lg:pr-8 xl:pr-20'>
            <div className='flex gap-0.5 mb-2'>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user1'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <CheckIcon className='ml-2 h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'> Compra Verificada</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-lg leading-8'>
              <p className='text-sm sm:text-xl'>
                Increíble experiencia en la ferretería PADI. Su amplio
                inventario y la atención personalizada de su equipo hacen que
                cada visita sea una delicia. Siempre encuentro lo que necesito y
                más, ¡definitivamente la mejor opción para mis proyectos de
                mejoramiento del hogar!
              </p>
              <p className='text-xl'>
                &apos;Increíble experiencia en la ferretería PADI. Su amplio
                inventario y la atención personalizada de su equipo hacen que
                cada visita sea una delicia. Siempre encuentro lo que necesito y
                más, ¡definitivamente la mejor opción para mis proyectos de
                mejoramiento del hogar!&apos;
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-4 lg:pr-8 xl:pr-20 mt-8 md:mt-0'>
            <div className='flex gap-0.5 mb-2'>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-2.png'
                  alt='user2'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <Star className='h-5 w-5 text-yellow-300 fill-yellow-300' />
                    <CheckIcon className='ml-2 h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'> Compra Verificada</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-lg leading-8'>
              <p className='text-sm sm:text-xl'>
                ¡La ferretería PADI es simplemente excelente! Desde la facilidad
                de navegación en su tienda hasta la eficiencia en la entrega de
                mis productos, no puedo estar más satisfecho. Su compromiso con
                la calidad y el servicio al cliente es evidente en cada
                interacción. ¡Recomendado al 100%!
              </p>
              <p className='text-xl'>
                &apos;¡La ferretería PADI es simplemente excelente! Desde la
                facilidad de navegación en su tienda hasta la eficiencia en la
                entrega de mis productos, no puedo estar más satisfecho. Su
                compromiso con la calidad y el servicio al cliente es evidente
                en cada interacción. ¡Recomendado al 100%!&apos;
              </p>
            </div>
          </div>
        </div>
      </BodyWrapper>
    </div>
  )
}

export default AcercaDe
