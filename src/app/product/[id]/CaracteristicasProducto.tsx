import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

const DATA = [
  {
    especificacion: "Peso",
    valor: "4.6kg",
  },
  {
    especificacion: "Voltaje",
    valor: "120v",
  },
  {
    especificacion: "Potencia",
    valor: "1200w",
  },
  {
    especificacion: "Velocidad",
    valor: "3600rpm",
  },
  {
    especificacion: "Color",
    valor: "Naranja",
  },
  {
    especificacion: "Numero de parte",
    valor: "ROTO-1/2A7",
  },
]

function CaracteristicasProducto() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h2 className='text-lg'>Espeficicaciones técnicas</h2>
      <Table className='my-5 mx-auto min-w-fit max-w-[60%] rounded-lg overflow-hidden'>
        <TableBody>
          {DATA.map((item, index) => (
            <TableRow
              key={index}
              className='*:text-center odd:bg-gray-200 even:bg-gray-100 even:hover:bg-gray-100/80 odd:hover:bg-gray-200/80'
            >
              <TableCell className='p-1'>{item.especificacion}</TableCell>
              <TableCell className='p-1'>{item.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CaracteristicasProducto
