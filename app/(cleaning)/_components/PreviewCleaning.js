import { format } from 'date-fns/format';

export default function PreviewInventory({ values }) {
  return (
    <>
      <div
        id='pdf'
        className='sticky top-4 border border-slate-300 p-4 rounded-lg scale-75 bg-white'>
        <article className='flex flex-col items-end justify-end'>
          <h2 className='text-2xl text-slate-900 font-bold'>{values.name}</h2>
          <p className='text-muted-foreground'>{values.email}</p>
          <p className='text-muted-foreground'>{values.address}</p>
        </article>

        <article className='my-8'>
          <h2 className='text-2xl text-slate-900 font-bold'>
            {values.clientName}
          </h2>
          <p className='text-muted-foreground'>{values.clientEmail}</p>
          <p className='text-muted-foreground'>{values.clientAddress}</p>


        </article>

        <article className='my-8 flex flex-col items-end justify-end'>
          <h2 className='text-2xl text-slate-900 font-bold'>
            Tracability details
          </h2>
          <p className='text-muted-foreground'>
            Tracability date: {" "}
            <span className='font-semibold'>
              {values.traceabilityDate &&
                format(new Date(values.traceabilityDate), "do MMMM yyyy")}
            </span>

          </p>
          <p className='text-muted-foreground'>
            Product department name:
            <span className='font-semibold'> {values.clientProductDepartment}</span>
          </p>

        </article>

        <article className='mb-8'>
          <table width="100%">
            <thead>
              <tr className='bg-slate-200 h-10 justify-center items-center'>
                <td>Product Name</td>
                <td>number lot</td>
                <td>Receipt date</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>

            <tbody>
              {values.items.map((item) => (
                <tr key={item.id}>
                  <td className='text-muted-foreground text-sm'>{item.item}</td>
                  <td className='text-muted-foreground text-sm'>{item.itemNumber}</td>
                  <td className='text-muted-foreground text-sm'>{values.receiptDate &&
                    format(new Date(values.receiptDate), "do MMMM yyyy")}</td>
                  <td className='text-muted-foreground text-sm'>{item.quantity}</td>
                  <td className='text-muted-foreground text-sm'>{item.price}</td>
                  <td className='text-muted-foreground text-sm'>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article>
          <h2 className='text-4xl text-slate-900 font-bold my-8'>
            {values.totalAmount} €
          </h2>
        </article>

        <article className='pb-8'>
          <h4 className='text-lg text-slate-800 font-bold'>
            Notes
          </h4>
          <p className='text-muted-foreground w-1/2 text-xs'>{values.notes}</p>
        </article>


        {/* Inventory footer */}
        <article className='border-t border-slate-300 py-8'>
          <ul className='flex flex-wrap items-center justify-center gap-4'>
            <li className='text-muted-foreground text-sm'>
              <span className='text-slate-800 font-bold'>Name of creator: </span>
              {values.name}
            </li>
            <li className='text-muted-foreground text-sm'>
              <span className='text-slate-800 font-bold'>Email: </span>
              {values.email}
            </li>
            <li className='text-muted-foreground text-sm'>
              <span className='text-slate-800 font-bold'>Phone: </span>
              {values.phoneNumber}
            </li>
          </ul>
        </article>
      </div>
    </>
  );
}
