"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { collect } from "collect.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { PencilIcon, Trash, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import PreviewYield from "../_components/PreviewYield";

export default function Yield() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inventoryDate, setInventoryDate] = useState("");

  // Client state values
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [ProductName, setProductName] = useState("");
  const [bathNumber, setBathNumber] = useState("");

  // Product state values
  const [purchase, setPurchase] = useState("");
  const [weight, setWeight] = useState("");

  // Table state values
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [previewInv, setPreviewInventory] = useState(false);
  const [margin, setMargin] = useState(0);

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
    calculateTotal();
  }, [quantity, price, calculateTotal]);

  // Fonction calculate margin
  function calculateMargin() {
    const marginPrice = totalAmount - purchase;
    const margin = (marginPrice / purchase) * 100;
    return margin.toFixed(2);
  }

  useEffect(() => {
    setMargin(calculateMargin());
  }, [totalAmount, purchase, calculateMargin]);

  // Calculate total amount  
  function calculateTotalAmount() {
    const allItems = items.map((item) => item.total);
    setTotalAmount(collect(allItems).sum());
  }

  useEffect(() => {
    calculateTotalAmount();
  }, [items, calculateTotalAmount]);

  // Delete function in table items
  function handleDelete(id) {
    setItems(items.filter((row) => row.id !== id));
    toast.error("Item deleted successfully");
  }

  // Edit function in table items
  function handleEdit(id) {
    const itemToEdit = items.find((row) => row.id === id);
    setItems(items.filter((row) => row.id !== id));
    setIsEditing(true);
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
      scale: 4, 
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
    ProductName, setProductName,
    bathNumber, setBathNumber,
    item, setItem,
    quantity, setQuantity,
    price, setPrice,
    total, setTotal,
    items, setItems,
    notes, setNotes,
    totalAmount, setTotalAmount,
    purchase, setPurchase,
    weight, setWeight
  };
}

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="p-4 lg:pl-72 lg:py-16 bg-slate-900">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-white font-bold lg:text-5xl">
            Create yield
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
              <h2 className="text-slate-900 font-bold text-xl ">Yield details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="inventory-date">Yield Date</label>
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
                  <label htmlFor="client-product-department">Product name</label>
                  <input type="text"
                    id="client-product-department"
                    name="client-product-department"
                    placeholder="Client product department"
                    value={ProductName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="batch-number">Batch number</label>
                  <input type="text"
                    id="batch-number"
                    name="batch-number"
                    placeholder="Batch number"
                    value={bathNumber}
                    onChange={(e) => setBathNumber(e.target.value)}
                  />
                </article>
              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <article className="article">
                  <label htmlFor="weight">Weight</label>
                  <input type="number"
                    id="weight"
                    name="weight"
                    placeholder="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </article>

                <article className="article">
                  <label htmlFor="Purchase">Purchase price excluding tax</label>
                  <input type="number"
                    id="Purchase"
                    name="purchase"
                    placeholder="0"
                    value={purchase}
                    onChange={(e) => setPurchase(e.target.value)}
                  />
                </article>

              </div>
            </div>

            {/* Client details */}

            <h2 className="text-slate-900 font-bold text-xl my-8">Client details</h2>
            <div className="grid gap-8">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="article">
                  <label htmlFor="client-name">Clients name</label>
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
                  <div>{total} €</div>
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

        <div>
          {/* Invoice preview */}
          <div>
            <PreviewYield values={values} margin={margin} /> {/* Passez la marge ici */}
          </div>
          {previewInv && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/75">
              <div className="max-w-5xl mx-auto">
                <ul className="mt-16 flex items-center justify-between">
                  <li>
                    <Button onClick={createPDF} variant="secondary">
                      Download Yield
                    </Button>
                  </li>
                  <li>
                    <Button onClick={() => setPreviewInventory(false)} variant="custumOutline">
                      <XIcon />
                    </Button>
                  </li>
                </ul>
                <PreviewYield values={values} margin={margin} /> {/* Passez la marge ici */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}