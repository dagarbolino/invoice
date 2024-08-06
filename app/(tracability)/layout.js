import Sidebar from "./_components/sidebar";

export default function InventoryLayout({children}) {
  return <>
    <Sidebar />
    {children}</>
}