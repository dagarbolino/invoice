"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import PreviewInv from "../_components/PreviewInventory";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { PencilIcon, Trash, XIcon } from "lucide-react";

import { collect } from "collect.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from "uuid";

export default function Inventory() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inventoryDate, setInventoryDate] = useState("");

  // Client sate value
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientProductDepartment, setClientProductDepartment] = useState("");
  const [clientInventoryNumber, setClientInventoryNumber] = useState("");

  //Table state values
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [notes, setNotes] = useState("");

  const [isEdeting, setIsEditing] = useState(false);

  const [previewInv, setPreviewInventory] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();

    if (!item || !quantity || !price) {
      toast.error("Please fill in all fields");
    } else {
      const newItem = {
        id: uuidv4(),
        item,
        quantity,
        price,
        total: quantity * price,
      };
      setItems([newItem, ...items]);
      setItem("");
      setQuantity("");
      setPrice("");
      toast.success("Item added successfully");
    }
  }

  function calculateTotal() {
    setTotal(quantity * price);

  }
  useEffect(() => {
    calculateTotal(total);
  }, [quantity, price, total]);


  // Calculate total amount  
  function calculateTotalAmount() {
    const allItems = items.map((item) => item.total);

    setTotalAmount(collect(allItems).sum());
  }

  useEffect(() => {
    calculateTotalAmount();
  });


  //Delete function in table items
  function handleDelete(id) {
    setItems(items.filter((row) => row.id !== id))
    toast.error("Item deleted successfully")
  }

  //Edit function in table items
  function handleEdit(id) {
    const itemToEdit = items.find((row) => row.id === id);
    setItems(items.filter((row) => row.id !== id));
    setIsEditing(true)
    setItem(itemToEdit.item);
    setQuantity(itemToEdit.quantity);
    setPrice(itemToEdit.price);
  }

  // Create PDF
  function createPDF() {
    const invoice = document.getElementById("pdf");
    html2canvas(invoice, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
      scale: 4, // Adjust the scale value to resize the PDF
    }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${clientName}.pdf`);
    });
  }


  const values = {
    name, setName,
    email, setEmail,
    address, setAddress,
    phoneNumber, setPhoneNumber,
    inventoryDate, setInventoryDate,
    clientName, setClientName,
    clientEmail, setClientEmail,
    clientAddress, setClientAddress,
    clientProductDepartment, setClientProductDepartment,
    clientInventoryNumber, setClientInventoryNumber,
    item, setItem,
    quantity, setQuantity,
    price, setPrice,
    total, setTotal,
    items, setItems,
    notes, setNotes,
    totalAmount, setTotalAmount,
  }

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="p-4 lg:pl-72 lg:py-16 bg-slate-900">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-white font-bold lg:text-5xl">
            Create Inventory
          </h1>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <section className="lg:pl-72 px-4 mt-8 lg:grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-slate-900 font-bold text-xl mb-8">
              Your details
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="name">Your name</label>
                  <input type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <small>Your official name, or company name.</small>
                </article>

                <article className="article">
                  <label htmlFor="email">Your email</label>
                  <input type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small>Your email is optional.</small>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">


                <article className="article">
                  <label htmlFor="phone-number">Phone number</label>
                  <input type="text"
                    id="phone-number"
                    name="phone-number"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <small>Your phone number or phone number company.</small>
                </article>
              </div>


              {/* Inventory details */}
              <h2 className="text-slate-900 font-bold text-xl ">Inventory details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="inventory-date">Inventory Date</label>
                  <input type="date"
                    id="inventory-date"
                    name="inventory-date"
                    placeholder="inventory date"
                    value={inventoryDate}
                    onChange={(e) => setInventoryDate(e.target.value)}
                  />
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-product-department">Client product department</label>
                  <input type="text"
                    id="client-product-department"
                    name="client-product-department"
                    placeholder="Client product department"
                    value={clientProductDepartment}
                    onChange={(e) => setClientProductDepartment(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="client-inventory-number">Client inventory number</label>
                  <input type="text"
                    id="client-inventory-number"
                    name="client-inventory-number"
                    placeholder="Client inventory number"
                    value={clientInventoryNumber}
                    onChange={(e) => setClientInventoryNumber(e.target.value)}
                  />
                </article>
              </div>
            </div>

            {/* Client details */}

            <h2 className="text-slate-900 font-bold text-xl my-8">Client details</h2>
            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-name">Client s name</label>
                  <input type="text"
                    id="client-name"
                    name="client-name"
                    placeholder="Client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="client-email">Client email</label>
                  <input type="email"
                    id="client-email"
                    name="client-email"
                    placeholder="Client email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-address">client address</label>
                  <input type="text"
                    id="client-address"
                    name="client-address"
                    placeholder="Client address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </article>
              </div>



            </div>


            {/* Item descriptions */}

            <h2 className="text-slate-900 font-bold text-xl my-8">
              Products descriptions
            </h2>

            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="item-name">Product name</label>
                  <input type="text"
                    id="item-name"
                    name="item-name"
                    placeholder="Product name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="quantity">Quantity</label>
                  <input type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </article>
              </div>



              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="price">Price</label>
                  <input type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </article>


                <article className="article">
                  <label htmlFor="total">Total</label>
                  <div>{total}</div>
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="default">Add Product</Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <article className="flex items-center justify-between"
                    key={item.id}>
                    <div className="flex gap-4">
                      <p>{item.item}</p>
                      <p>{item.quantity}</p>
                      <p>{item.price}</p>
                    </div>

                    <div>
                      <ul className="flex gap-4">
                        <li>
                          <Button variant="destructive"
                            onClick={() => handleDelete(item.id)}>
                            <Trash />
                          </Button>
                        </li>
                        <li>
                          <Button variant="secondary"
                            onClick={() => handleEdit(item.id)}>
                            <PencilIcon />
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </article>
                ))}

              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="additional-notes">Additional notes</label>
                  <textarea
                    name="additional-notes"
                    id="additional-notes"
                    cols="30" rows="5"
                    placeholder="Important information the client should know about"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </article>
              </div>
            </div>

            <div className="mt-8 pb-12 ">
              <Button onClick={() => setPreviewInventory(true)}>
                Preview Inventory
              </Button>
            </div>
          </form>
        </div>

        {/* Invoice preview */}
        <div>
          <PreviewInv values={values} />
        </div>

        {previewInv && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/75">
            <div className="max-w-5xl mx-auto">
              <ul className="mt-16 flex items-center justify-between">
                <li>
                  <Button onClick={createPDF}
                    variant="secondary">
                    Download Inventory
                  </Button>
                </li>
                <li>
                  <Button onClick={() => setPreviewInventory(false)}
                    variant="custumOutline">
                    <XIcon />
                  </Button>
                </li>
              </ul>

              <PreviewInv values={values} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}