import { format } from 'date-fns';

export default function PreviewYield({ values, margin }) {
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
            Yield details
          </h2>
          <p className='text-muted-foreground'>
            {" "}
            {values.inventoryDate &&
              format(new Date(values.inventoryDate), "do MMMM yyyy")}
          </p>
          <p className='text-muted-foreground'>
            {values.productName}</p>

          <p className='text-muted-foreground'>
            <span>Batch number: </span>
            {values.bathNumber}</p>

          <p className='text-muted-foreground'>
            <span>Purchase price: </span>
            {values.purchase}€
          </p>

          <p className='text-muted-foreground'>
            Weight :
            {values.weight} KG
          </p>
        </article>

        <article className='mb-8'>
          <table width="100%">
            <thead>
              <tr className='bg-slate-200'>
                <td>Product Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>

            <tbody>
              {values.items.map((item) => (
                <tr key={item.id}>
                  <td className='text-muted-foreground text-sm'>{item.item}</td>
                  <td className='text-muted-foreground text-sm'>{item.quantity}</td>
                  <td className='text-muted-foreground text-sm'>{item.price}</td>
                  <td className='text-muted-foreground text-sm'>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article>
          <h2 className='text-2xl text-slate-900 font-bold mt-8'>
            Prix d'achat HT:
            <span className='text-3xl'> {values.purchase}</span>€
          </h2>
        </article>

        <article>
          <h2 className='text-2xl text-slate-900 font-bold'>
            Total des ventes:
            <span className='text-3xl'> {values.totalAmount}</span>€
          </h2>
        </article>
        <article>
          <h2 className='text-2xl text-slate-900 font-bold mb-8'>
            Marge:
            <span className='text-3xl'> {isNaN(margin) ? '0%' : `${margin}%`}</span>
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
